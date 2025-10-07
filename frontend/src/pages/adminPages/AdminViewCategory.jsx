import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage, setCategoriesPerPage] = useState(4);
  const navigate = useNavigate();

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [statusFilter]);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === "all"
          ? "http://localhost:8000/api/categories"
          : `http://localhost:8000/api/categories?status=${statusFilter}`;

      const res = await axios.get(url);
      setCategories(res.data.data || []);
    } catch (error) {
      toast.error("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
      toast.success("Category deleted successfully");
    } catch (err) {
      toast.error("Failed to delete category");
    }
  };

  const handleEdit = (category) => {
    navigate("/admin/story-categories/create", { state: { category } });
  };

  const handleAddCategory = () => {
    navigate("/admin/story-categories/create");
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000/${imagePath.replace(/\\/g, "/")}`;
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center";
    return status === "active"
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  // Filter by search
  const filteredCategories = categories.filter((cat) => {
    const search = searchTerm.toLowerCase();
    return (
      cat.name?.toLowerCase().includes(search) ||
      cat.description?.toLowerCase().includes(search)
    );
  });

  const totalCategories = filteredCategories.length;
  const totalPages = Math.ceil(totalCategories / categoriesPerPage);

  const indexOfLast = currentPage * categoriesPerPage;
  const indexOfFirst = indexOfLast - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading categories...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Categories</h2>
        <button
          onClick={handleAddCategory}
          className="flex items-center gap-2 bg-[var(--pink-dark)] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          <FaPlus /> Add Category
        </button>
      </div>

      {/* Filters */}
      <div className="mb-6 bg-gray-50 border border-gray-200 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Categories</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Search input */}
        <div className="flex items-center gap-2 w-full sm:w-64">
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Per page:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={categoriesPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0 && value <= 50) {
                setCategoriesPerPage(value);
                setCurrentPage(1);
              }
            }}
            className="border border-gray-300 rounded-lg px-2 py-1 w-20 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 shadow overflow-hidden">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-sm">
              <th className="px-4 py-4 text-left font-semibold w-12">#</th>
              <th className="px-4 py-4 text-left font-semibold w-20">Image</th>
              <th className="px-4 py-4 text-left font-semibold w-64">Name</th>
              <th className="px-4 py-4 text-left font-semibold w-96">Description</th>
              <th className="px-4 py-4 text-center font-semibold w-28">Status</th>
              <th className="px-4 py-4 text-left font-semibold w-32">Created</th>
              <th className="px-4 py-4 text-center font-semibold w-28">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentCategories.length > 0 ? (
              currentCategories.map((cat, index) => (
                <tr
                  key={cat._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4 text-center">
                    {(currentPage - 1) * categoriesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-4">
                    {cat.image ? (
                      <img
                        src={getImageUrl(cat.image)}
                        alt={cat.name}
                        className="h-12 w-12 object-cover rounded border"
                        onError={(e) => {
                          e.target.src = "/placeholder.png";
                        }}
                      />
                    ) : (
                      <div className="h-12 w-12 bg-gray-100 flex items-center justify-center rounded">
                        <FaImage className="text-gray-400 h-5 w-5" />
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-4 font-medium text-gray-900">
                    {cat.name}
                  </td>
                  <td className="px-4 py-4 text-gray-600 max-w-md truncate">
                    {cat.description || "No description provided"}
                  </td>
                  <td className="px-4 py-4 text-center">
                    <span className={getStatusBadge(cat.status)}>
                      {cat.status || "inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(cat.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(cat)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        title="Edit category"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(cat._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        title="Delete category"
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
                  colSpan="7"
                  className="px-6 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <FaImage className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No categories found</p>
                    <p className="text-sm mt-1">
                      {statusFilter === "all"
                        ? "Get started by adding your first category"
                        : `No ${statusFilter} categories found`}
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

export default AdminViewCategory;
