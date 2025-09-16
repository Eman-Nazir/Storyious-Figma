import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/blogs");
        console.log("Blogs API response:", res.data);
        setBlogs(res.data.data?.blogs || []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        toast.error("Failed to load blogs");
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Blogs</h2>
        <button
          onClick={handleAddBlog}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition-colors"
        >
          <FaPlus /> Add Blog
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-sm">
              <th className="px-4 py-4 text-left font-semibold">#</th>
              <th className="px-4 py-4 text-left font-semibold">Image</th>
              <th className="px-4 py-4 text-left font-semibold max-w-[200px]">Title</th>
              <th className="px-4 py-4 text-left font-semibold max-w-[250px]">Intro</th>
              <th className="px-4 py-4 text-center font-semibold">Views</th>
              <th className="px-4 py-4 text-center font-semibold">Read Time</th>
              <th className="px-4 py-4 text-center font-semibold">Comments</th>
              <th className="px-4 py-4 text-left font-semibold">Created</th>
              <th className="px-4 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {blogs.length > 0 ? (
              blogs.map((blog, index) => (
                <tr
                  key={blog._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  <td className="px-4 py-4">{index + 1}</td>
                  <td className="px-4 py-4">
                    <img
                      src={getImageUrl(blog.cards?.[0]?.image)}
                      alt={blog.title}
                      className="h-12 w-12 object-cover rounded"
                      onError={(e) => {
                        e.target.src = "/placeholder.png";
                      }}
                    />
                  </td>
                  <td
                    className="px-4 py-4 font-medium text-gray-900 max-w-[200px] truncate"
                    title={blog.title}
                  >
                    {blog.title}
                  </td>
                  <td
                    className="px-4 py-4 max-w-[250px] text-sm text-gray-500 truncate"
                    title={blog.introText || "No intro"}
                  >
                    {blog.introText || "No intro"}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-700">
                    {blog.meta?.views || 0}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-700">
                    {blog.meta?.readTime || "N/A"}
                  </td>
                  <td className="px-4 py-4 text-center text-gray-700">
                    {blog.commentsCount || 0}
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-500">
                    {new Date(blog.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-4">
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
                <td colSpan="9" className="px-6 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FaImage className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No blogs found</p>
                    <p className="text-sm mt-1">Get started by adding your first blog</p>
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
