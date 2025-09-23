import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchBlogs();
  }, [statusFilter]);

  const fetchBlogs = async () => {
    try {
      const url =
        statusFilter === "all"
          ? "http://localhost:8000/api/blogs"
          : `http://localhost:8000/api/blogs?status=${statusFilter}`;

      const res = await axios.get(url);
      setBlogs(res.data.data?.blogs || []);
    } catch (error) {
      toast.error("Failed to load blogs");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/blogs/${id}`);
      setBlogs(blogs.filter((blog) => blog._id !== id));
      toast.success("Blog deleted successfully");
    } catch (err) {
      toast.error("Failed to delete blog");
    }
  };

  const handleEdit = (blog) => {
    navigate("/admin/blogs/create", { state: { blog } });
  };

  const handleAddBlog = () => {
    navigate("/admin/blogs/create");
  };

  const getImageUrl = (imagePath) => {
    if (!imagePath) return "/placeholder.png";
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000/${imagePath.replace(/\\/g, "/")}`;
  };

  const getStatusBadge = (status) => {
    const baseClasses =
      "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center";
    if (status === "active") {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6 overflow-hidden">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Blogs</h2>
        <button
          onClick={handleAddBlog}
          className="flex items-center gap-2 bg-[var(--pink-dark)] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-gray-50 border border-gray-200 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">
            Filter by Status:
          </label>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none"
          >
            <option value="all">All Blogs</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span className="text-sm text-gray-600">
            Showing {blogs.length} blogs
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-lg border border-gray-200 shadow overflow-hidden">
        <table className="w-full table-fixed border-collapse">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-sm">
              <th className="px-6 py-4 text-left font-semibold w-12">#</th>
              <th className="px-6 py-4 text-left font-semibold w-20">Image</th>
              <th className="px-6 py-4 text-left font-semibold w-48">Title</th>
              <th className="px-6 py-4 text-left font-semibold w-64">Intro</th>
              <th className="px-6 py-4 text-center font-semibold w-28">Status</th>
              <th className="px-6 py-4 text-center font-semibold w-20">Views</th>
              <th className="px-6 py-4 text-center font-semibold w-28">Read Time</th>
              <th className="px-6 py-4 text-center font-semibold w-28">Comments</th>
              <th className="px-6 py-4 text-left font-semibold w-32">Created</th>
              <th className="px-6 py-4 text-center font-semibold w-28">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">{index + 1}</td>
                  <td className="px-6 py-4">
                    <img
                      src={getImageUrl(blog.cards?.[0]?.image)}
                      alt={blog.title}
                      className="h-12 w-12 object-cover rounded border"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </td>
                  <td
                    className="px-6 py-4 font-medium text-gray-900 truncate"
                    title={blog.title}
                  >
                    {blog.title}
                  </td>
                  <td
                    className="px-6 py-4 text-sm text-gray-500 truncate"
                    title={blog.introText || "No intro"}
                  >
                    {blog.introText || "No intro"}
                  </td>
                  <td className="px-6 py-4 text-center">
                    <span className={getStatusBadge(blog.status)}>
                      {blog.status || "inactive"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {blog.meta?.views || 0}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {blog.meta?.readTime || "N/A"}
                  </td>
                  <td className="px-6 py-4 text-center text-gray-700">
                    {blog.commentsCount || 0}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(blog)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        title="Edit blog"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        title="Delete blog"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="10" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FaImage className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No blogs found</p>
                    <p className="text-sm mt-1">
                      {statusFilter === "all"
                        ? "Get started by adding your first blog"
                        : `No ${statusFilter} blogs found`}
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

export default AdminViewBlogs;
