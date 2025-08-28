import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
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
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// Icon map for social links
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
  const navigate = useNavigate();

  const fetchAuthors = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/authors");
      setAuthors(res.data.data);
    } catch (err) {
      toast.error("Failed to fetch authors");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuthors();
  }, []);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading authors...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Authors</h2>
        <button
          onClick={() => navigate("/admin/authors/create")}
          className="bg-[var(--pink-dark)] hover: text-white font-medium py-2 px-4 rounded-lg transition-colors"
        >
          Add New Author
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
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
            {authors.length > 0 ? (
              authors.map((author) => (
                <tr
                  key={author._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  {/* Author Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-12">
                        {author.image ? (
                          <img
                            src={`http://localhost:8000/uploads/${author.image}`}
                            alt={author.name}
                            className="h-12 w-12 rounded-full object-cover"
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
                          {author.email || "No email provided"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Verified Status */}
                  <td className="px-6 py-4 text-center">
                    <div className="flex justify-center">
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
                    </div>
                  </td>

                  {/* Social Links */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      {author.socials && author.socials.length > 0 ? (
                        author.socials.map((s) => {
                          const Icon = iconMap[s.icon.toLowerCase()] || null;
                          return Icon ? (
                            <a
                              key={s._id}
                              href={s.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="h-8 w-8 flex items-center justify-center rounded-full bg-gray-100 text-pink-600 hover:bg-pink-100 hover:text-pink-700 transition-colors"
                            >
                              <Icon className="text-sm" />
                            </a>
                          ) : null;
                        })
                      ) : (
                        <span className="text-xs text-gray-400">
                          No socials
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Created At */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(author.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(author)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        title="Edit author"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(author._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        title="Delete author"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <FaUser className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No authors found</p>
                    <p className="text-sm mt-1">
                      Get started by adding your first author
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminViewAuthor;