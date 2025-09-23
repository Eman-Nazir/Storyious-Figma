

import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewCategory = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
  }, [statusFilter]);

  const fetchCategories = async () => {
    try {
      const url =
        statusFilter === "all"
          ? "http://localhost:8000/api/categories"
          : `http://localhost:8000/api/categories?status=${statusFilter}`;

      const res = await axios.get(url);
      setCategories(res.data.data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;
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

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-3 py-1 rounded-full text-xs font-semibold shadow-sm";
    if ((status || "active") === "active") {
      return `${baseClasses} bg-green-100 text-green-700 border border-green-300`;
    } else {
      return `${baseClasses} bg-red-100 text-red-700 border border-red-300`;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">
          Loading categories...
        </p>
      </div>
    );

  return (
    <div className="p-8 bg-white shadow-xl rounded-2xl max-w-7xl mx-auto mt-6 border border-gray-200">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">
          Categories
        </h2>
        <button
          onClick={() => navigate("/admin/story-categories/create")}
          className="bg-[var(--pink-dark)] hover:bg-pink-700 text-white font-medium py-2 px-6 rounded-lg transition-all flex items-center gap-2 shadow"
        >
          <FaPlus /> Add New Category
        </button>
      </div>

      <div className="mb-6 bg-gray-50 p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm "
          >
            <option value="all">All Categories</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <span className="text-sm text-gray-600 font-medium">
          Showing <span className="text-[var(--pink-dark)]">{categories.length}</span> categories
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-gradient-to-r from-pink-100 to-pink-200 text-pink-900 uppercase text-sm tracking-wider">
              <th className="px-6 py-4 text-left font-semibold">Category</th>
              <th className="px-6 py-4 text-left font-semibold">Description</th>
              <th className="px-6 py-4 text-center font-semibold">Status</th>
              <th className="px-6 py-4 text-center font-semibold">Image</th>
              <th className="px-6 py-4 text-left font-semibold">Created</th>
              <th className="px-6 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 bg-white">
            {categories.length > 0 ? (
              categories.map((category) => (
                <tr
                  key={category._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  {/* Name */}
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {category.name}
                  </td>

                  {/* Description */}
                  <td className="px-6 py-4 max-w-xs">
                    <p className="text-sm text-gray-600 truncate">
                      {category.description || "No description provided"}
                    </p>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4 text-center">
                    <span className={getStatusBadge(category.status)}>
                      {category.status || "active"}
                    </span>
                  </td>

                  {/* Image */}
                  <td className="px-6 py-4 text-center">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="h-12 w-12 object-cover rounded-lg shadow"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center shadow-inner">
                        <FaImage className="h-6 w-6 text-gray-400" />
                      </div>
                    )}
                  </td>

                  {/* Created */}
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(category.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(category)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors shadow"
                        title="Edit category"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors shadow"
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
                  colSpan="6"
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
    </div>
  );
};

export default AdminViewCategory;
