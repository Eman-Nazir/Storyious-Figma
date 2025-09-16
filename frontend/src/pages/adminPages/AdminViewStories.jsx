import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, []);

  const fetchStories = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/stories");
      setStories(res.data?.data || []);
    } catch (error) {
      console.error("Error fetching stories:", error);
      toast.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this story?")) return;
    try {
      await axios.delete(`http://localhost:8000/api/stories/${id}`);
      setStories(stories.filter((story) => story._id !== id));
      toast.success("Story deleted successfully");
    } catch (err) {
      toast.error("Failed to delete story");
    }
  };

  const handleEdit = (story) => {
    navigate("/admin/stories/create", { state: { story } });
  };

  const handleAddStory = () => {
    navigate("/admin/stories/create");
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading stories...</p>
      </div>
    );

  return (
   <div className="sm:p-6 bg-white shadow-lg rounded-xl  mx-auto mt-6">

      <ToastContainer position="top-right" autoClose={3000} />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--pink-dark)]">Stories</h2>
        <button
          onClick={handleAddStory}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          <FaPlus /> Add Story
        </button>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-xs sm:text-sm">
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold hidden md:table-cell">Intro</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Category</th>
              <th className="px-4 py-3 text-left font-semibold">Featured Image</th>
              <th className="px-4 py-3 text-center font-semibold hidden sm:table-cell">Views</th>
              <th className="px-4 py-3 text-center font-semibold hidden sm:table-cell">Read Time</th>
              <th className="px-4 py-3 text-center font-semibold hidden md:table-cell">Comments</th>
              <th className="px-4 py-3 text-left font-semibold hidden lg:table-cell">Created</th>
              <th className="px-4 py-3 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {stories.length > 0 ? (
              stories.map((story, index) => (
                <tr
                  key={story._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 align-top">{index + 1}</td>
                  <td className="px-4 py-3 font-medium text-gray-900 align-top max-w-xs">
                    <div className="line-clamp-2">{story.title}</div>
                  </td>
                  <td className="px-4 py-3 text-gray-500 align-top max-w-xs truncate hidden md:table-cell">
                    {story.introText || "No intro"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 align-top">
                    {story.author?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 align-top hidden lg:table-cell">
                    {story.category?.name || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-gray-700 align-top">
                    {story.featuredImage ? (
                      <img
                        src={story.featuredImage}
                        alt={story.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 align-top hidden sm:table-cell">
                    {story.meta?.views || 0}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 align-top hidden sm:table-cell">
                    {story.meta?.readTime || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center text-gray-700 align-top hidden md:table-cell">
                    {story.commentsCount || 0}
                  </td>
                  <td className="px-4 py-3 text-gray-500 align-top hidden lg:table-cell">
                    {new Date(story.createdAt).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-4 py-3 align-top">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(story)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        title="Edit story"
                      >
                        <FaEdit className="text-sm" />
                      </button>
                      <button
                        onClick={() => handleDelete(story._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200 transition-colors"
                        title="Delete story"
                      >
                        <FaTrash className="text-sm" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="11" className="px-4 py-12 text-center text-gray-500">
                  <div className="flex flex-col items-center">
                    <FaImage className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No stories found</p>
                    <p className="text-sm mt-1">Get started by adding your first story</p>
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

export default AdminViewStories;
