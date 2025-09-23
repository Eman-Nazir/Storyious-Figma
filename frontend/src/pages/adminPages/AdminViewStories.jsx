
import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaEdit, FaTrash, FaImage, FaPlus, FaVideo, FaTimes, FaYoutube, FaFilter } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const navigate = useNavigate();

  useEffect(() => {
    fetchStories();
  }, [statusFilter]);

  const fetchStories = async () => {
    try {
      const url = statusFilter === "all" 
        ? "http://localhost:8000/api/stories"
        : `http://localhost:8000/api/stories?status=${statusFilter}`;
      
      const res = await axios.get(url);
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

  const getYouTubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  const getYouTubeThumbnail = (url, quality = 'mqdefault') => {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const openVideoModal = (story) => {
    if (story.type === "video") {
      if (story.videoUrl) {
        setSelectedVideo({
          type: 'youtube',
          url: story.videoUrl,
          title: story.title
        });
      } else if (story.videoFile) {
        setSelectedVideo({
          type: 'file',
          url: story.videoFile,
          title: story.title
        });
      }
      setShowModal(true);
    }
  };

  const closeVideoModal = () => {
    setShowModal(false);
    setSelectedVideo(null);
  };

  const getStatusBadge = (status) => {
    const baseClasses = "px-2 py-1 rounded-full text-xs font-medium";
    if (status === 'active') {
      return `${baseClasses} bg-green-100 text-green-800`;
    } else {
      return `${baseClasses} bg-red-100 text-red-800`;
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading stories...</p>
      </div>
    );

  return (
    <div className="sm:p-6 bg-white shadow-lg rounded-xl mx-auto mt-6">
      <ToastContainer position="top-right" autoClose={3000} />

      {/* Video Modal */}
      {showModal && selectedVideo && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg overflow-hidden w-full max-w-3xl">
            <div className="flex justify-between items-center px-4 py-2 bg-gray-800 text-white">
              <h3 className="text-lg font-medium">{selectedVideo.title}</h3>
              <button 
                onClick={closeVideoModal}
                className="text-white hover:text-gray-300"
              >
                <FaTimes size={20} />
              </button>
            </div>
            <div className="p-1 bg-black">
              {selectedVideo.type === 'youtube' ? (
                <div className="relative pt-[56.25%]"> 
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(selectedVideo.url)}?autoplay=1`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                  />
                </div>
              ) : (
                <div className="w-full">
                  <video 
                    controls 
                    autoPlay 
                    className="w-full h-auto max-h-[70vh]"
                  >
                    <source src={selectedVideo.url} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--pink-dark)]">
          Stories
        </h2>
        <button
          onClick={handleAddStory}
          className="flex items-center gap-2 bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 transition"
        >
          <FaPlus /> Add Story
        </button>
      </div>

      {/* Filter Section */}
      <div className="mb-6 bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700">Filter by Status:</label>
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none" 
          >
            <option value="all">All Stories</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <span className="text-sm text-gray-600">
            Showing {stories.length} stories
          </span>
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full border-collapse text-sm sm:text-base">
          <thead>
            <tr className="bg-pink-100 text-pink-800 uppercase text-xs sm:text-sm">
              <th className="px-4 py-3 text-left font-semibold">#</th>
              <th className="px-4 py-3 text-left font-semibold">Title</th>
              <th className="px-4 py-3 text-left font-semibold">Type</th>
              <th className="px-4 py-3 text-left font-semibold">Status</th>
              <th className="px-4 py-3 text-left font-semibold">Author</th>
              <th className="px-4 py-3 text-left font-semibold">Categories</th>
              <th className="px-4 py-3 text-left font-semibold">Media</th>
              <th className="px-4 py-3 text-center font-semibold">Views</th>
              <th className="px-4 py-3 text-center font-semibold">Read Time</th>
              <th className="px-4 py-3 text-center font-semibold">Comments</th>
              <th className="px-4 py-3 text-left font-semibold">Created</th>
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
                  <td className="px-4 py-3">{index + 1}</td>
                  <td className="px-4 py-3 font-medium">{story.title}</td>
                  <td className="px-4 py-3">
                    {story.type === "video" ? (
                      <span>
                        Video
                      </span>
                    ) : (
                      "Written"
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <span className={getStatusBadge(story.status)}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{story.author?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    {story.categories?.map((c) => c.name).join(", ") || "N/A"}
                  </td>
                  <td className="px-4 py-3">
                    {story.type === "video" ? (
                      story.videoUrl ? (
                        <div 
                          className="relative group cursor-pointer"
                          onClick={() => openVideoModal(story)}
                        >
                          <img
                            src={getYouTubeThumbnail(story.videoUrl)}
                            alt={story.title}
                            className="h-16 w-28 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity bg-black bg-opacity-40 rounded">
                            <div className="bg-red-600 rounded-full p-2">
                              <FaYoutube className="text-white text-xl" />
                            </div>
                          </div>
                          <div className="text-xs mt-1 text-blue-500 truncate max-w-[112px]">
                            Click to play
                          </div>
                        </div>
                      ) : story.videoFile ? (
                        <div 
                          className="relative group cursor-pointer"
                          onClick={() => openVideoModal(story)}
                        >
                          <div className="h-16 w-28 bg-gray-100 rounded flex items-center justify-center">
                            <video
                              src={story.videoFile}
                              className="h-full w-full object-cover rounded"
                            />
                          </div>
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity bg-black bg-opacity-40 rounded">
                            <div className="bg-blue-600 rounded-full p-2">
                              <FaVideo className="text-white text-xl" />
                            </div>
                          </div>
                          <div className="text-xs mt-1 text-blue-500 truncate max-w-[112px]">
                            Click to play
                          </div>
                        </div>
                      ) : (
                        "No Video"
                      )
                    ) : story.featuredImage ? (
                      <img
                        src={story.featuredImage}
                        alt={story.title}
                        className="h-12 w-12 object-cover rounded"
                      />
                    ) : (
                      "N/A"
                    )}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {story.meta?.views || 0}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {story.meta?.readTime || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {story.commentsCount || 0}
                  </td>
                  <td className="px-4 py-3">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-center space-x-2">
                      <button
                        onClick={() => handleEdit(story)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(story._id)}
                        className="h-8 w-8 flex items-center justify-center rounded-lg bg-red-100 text-red-700 hover:bg-red-200"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="12"
                  className="px-4 py-12 text-center text-gray-500"
                >
                  <div className="flex flex-col items-center">
                    <FaImage className="h-12 w-12 text-gray-300 mb-2" />
                    <p className="text-lg font-medium">No stories found</p>
                    <p className="text-sm mt-1">
                      {statusFilter === 'all' 
                        ? "Get started by adding your first story" 
                        : `No ${statusFilter} stories found`}
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

export default AdminViewStories;