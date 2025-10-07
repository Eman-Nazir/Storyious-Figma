import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram,
  FaCheckCircle,
  FaTimesCircle,
  FaEdit,
  FaTrash,
  FaUser,
  FaFilter,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const iconMap = {
  facebook: FaFacebookF,
  twitter: FaTwitter,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  instagram: FaInstagram,
};

const AdminViewAuthor = () => {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [verifiedFilter, setVerifiedFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [authorsPerPage, setAuthorsPerPage] = useState(4);

  const navigate = useNavigate();

  useEffect(() => {
    fetchAuthors();
  }, [verifiedFilter]);

  const fetchAuthors = async () => {
    try {
      const url =
        verifiedFilter === "all"
          ? "http://localhost:8000/api/authors"
          : `http://localhost:8000/api/authors?verified=${verifiedFilter}`;
      const res = await axios.get(url);
      setAuthors(res.data.data || []);
    } catch (err) {
      toast.error("Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this author?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/authors/${id}`);
      toast.success("Author deleted successfully");
      setAuthors(authors.filter((a) => a._id !== id));
    } catch (err) {
      toast.error("Failed to delete author");
    }
  };

  const handleEdit = (author) => {
    navigate("/admin/authors/create", { state: { author } });
  };

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  const filteredAuthors = authors.filter((author) => {
    const search = searchTerm.toLowerCase();
    return (
      author.name?.toLowerCase().includes(search) ||
      author.shortBio?.toLowerCase().includes(search)
    );
  });

  const totalAuthors = filteredAuthors.length;
  const totalPages = Math.ceil(totalAuthors / authorsPerPage);

  const indexOfLast = currentPage * authorsPerPage;
  const indexOfFirst = indexOfLast - authorsPerPage;
  const currentAuthors = filteredAuthors.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading authors...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Authors</h2>
        <button
          onClick={() => navigate("/admin/authors/create")}
          className="bg-[var(--pink-dark)] text-white font-medium py-2 px-5 rounded-lg shadow hover:opacity-90 transition"
        >
          + Add Author
        </button>
      </div>

      <div className="mb-6 bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <FaFilter className="text-gray-600" />
          <label className="text-sm font-medium text-gray-700">
            Filter by Verification:
          </label>
          <select
            value={verifiedFilter}
            onChange={(e) => setVerifiedFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm"
          >
            <option value="all">All Authors</option>
            <option value="true">Verified</option>
            <option value="false">Not Verified</option>
          </select>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 w-full sm:w-64">
          <input
            type="text"
            placeholder="Search authors..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>

        {/* Authors per page */}
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Per page:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={authorsPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0 && value <= 50) {
                setAuthorsPerPage(value);
                setCurrentPage(1);
              }
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-sm">
              <th className="px-6 py-4 text-left font-semibold">Author</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-center font-semibold">Socials</th>
              <th className="px-6 py-4 text-left font-semibold">Created</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentAuthors.length > 0 ? (
              currentAuthors.map((author) => {
                const validSocials = author.socials
                  ? author.socials.filter(
                      (s) =>
                        s &&
                        s.platform &&
                        s.url &&
                        s.url.trim() !== "" &&
                        s.url !== "undefined"
                    )
                  : [];

                return (
                  <tr
                    key={author._id}
                    className="hover:bg-pink-50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12">
                          {author.image ? (
                            <img
                              src={author.image}
                              alt={author.name}
                              className="h-12 w-12 rounded-full object-cover border"
                            />
                          ) : (
                            <div className="h-12 w-12 rounded-full bg-pink-100 flex items-center justify-center">
                              <FaUser className="h-6 w-6 text-pink-400" />
                            </div>
                          )}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {author.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {author.shortBio && author.shortBio.length > 50
                              ? `${author.shortBio.substring(0, 50)}...`
                              : author.shortBio || "—"}
                          </div>
                        </div>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-center">
                      {author.isVerified ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <FaCheckCircle className="mr-1 text-green-500" />
                          Verified
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <FaTimesCircle className="mr-1 text-red-500" />
                          Not Verified
                        </span>
                      )}
                    </td>

                    <td className="px-6 py-4 text-center">
                      <div className="flex justify-center space-x-2">
                        {validSocials.length > 0 ? (
                          validSocials.map((social) => {
                            const Icon = iconMap[social.platform.toLowerCase()];
                            return Icon ? (
                              <a
                                key={social._id || social.platform}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-pink-600 hover:bg-pink-200 transition-colors"
                              >
                                <Icon className="text-sm" />
                              </a>
                            ) : null;
                          })
                        ) : (
                          <span className="text-xs text-gray-400">No socials</span>
                        )}
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500">
                      {author.createdAt
                        ? new Date(author.createdAt).toLocaleDateString("en-GB", {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          })
                        : "—"}
                    </td>

                    <td className="px-6 py-4">
                      <div className="flex justify-center space-x-2">
                        <button
                          onClick={() => handleEdit(author)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          <FaEdit className="text-sm" />
                        </button>
                        <button
                          onClick={() => handleDelete(author._id)}
                          className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        >
                          <FaTrash className="text-sm" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="5" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FaUser className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No authors found</p>
                    <p className="text-sm mt-1">
                      {verifiedFilter === "all"
                        ? "Get started by adding your first author"
                        : `No ${
                            verifiedFilter === "true"
                              ? "verified"
                              : "unverified"
                          } authors found`}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-6 flex-wrap">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-3 py-1.5 rounded-md text-sm font-medium border transition ${
                currentPage === i + 1
                  ? "bg-pink-600 text-white border-pink-600"
                  : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminViewAuthor;
