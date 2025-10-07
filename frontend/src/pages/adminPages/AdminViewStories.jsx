import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import {
  FaEdit,
  FaTrash,
  FaImage,
  FaPlus,
  FaVideo,
  FaYoutube,
  FaTimes,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminViewStories = () => {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [storiesPerPage, setStoriesPerPage] = useState(4);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const handleSearchChange = useCallback((e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  }, []);

  useEffect(() => {
    fetchStories();
  }, [statusFilter]);

  const fetchStories = async () => {
    try {
      setLoading(true);
      const url =
        statusFilter === "all"
          ? "http://localhost:8000/api/stories"
          : `http://localhost:8000/api/stories?status=${statusFilter}`;
      const res = await axios.get(url);
      setStories(res.data?.data || []);
    } catch (error) {
      toast.error("Failed to load stories");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
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
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const getYouTubeThumbnail = (url, quality = "mqdefault") => {
    const videoId = getYouTubeId(url);
    if (!videoId) return null;
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  };

  const openVideoModal = (story) => {
    if (story.type === "video") {
      if (story.videoUrl) {
        setSelectedVideo({
          type: "youtube",
          url: story.videoUrl,
          title: story.title,
        });
      } else if (story.videoFile) {
        setSelectedVideo({
          type: "file",
          url: story.videoFile,
          title: story.title,
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
    const baseClasses =
      "px-2.5 py-0.5 rounded-full text-xs font-medium inline-flex items-center";
    return status === "active"
      ? `${baseClasses} bg-green-100 text-green-800`
      : `${baseClasses} bg-red-100 text-red-800`;
  };

  const filteredStories = stories.filter((story) => {
    const search = searchTerm.toLowerCase();
    return (
      story.title?.toLowerCase().includes(search) ||
      story.author?.name?.toLowerCase().includes(search)
    );
  });

  const totalStories = filteredStories.length;
  const totalPages = Math.ceil(totalStories / storiesPerPage);

  const indexOfLast = currentPage * storiesPerPage;
  const indexOfFirst = indexOfLast - storiesPerPage;
  const currentStories = filteredStories.slice(indexOfFirst, indexOfLast);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <p className="text-center text-gray-500 text-lg">Loading stories...</p>
      </div>
    );

  return (
    <div className="p-6 bg-white shadow-lg rounded-xl max-w-7xl mx-auto mt-6 overflow-hidden">
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
              {selectedVideo.type === "youtube" ? (
                <div className="relative pt-[56.25%]">
                  <iframe
                    src={`https://www.youtube.com/embed/${getYouTubeId(
                      selectedVideo.url
                    )}?autoplay=1`}
                    className="absolute top-0 left-0 w-full h-full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={selectedVideo.title}
                  />
                </div>
              ) : (
                <video
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[70vh]"
                >
                  <source src={selectedVideo.url} type="video/mp4" />
                </video>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-[var(--pink-dark)]">Stories</h2>
        <button
          onClick={handleAddStory}
          className="flex items-center gap-2 bg-[var(--pink-dark)] text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition"
        >
          <FaPlus /> Add Story
        </button>
      </div>

      {/* Filter + Search */}
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
            <option value="all">All Stories</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        {/* Search */}
        <div className="flex items-center gap-2 w-full sm:w-64">
          <input
            type="text"
            placeholder="Search stories..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="border border-gray-300 w-full rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-pink-300 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700">
            Stories per page:
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={storiesPerPage}
            onChange={(e) => {
              const value = Number(e.target.value);
              if (value > 0 && value <= 50) {
                setStoriesPerPage(value);
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
              <th className="px-4 py-4 text-left font-semibold">#</th>
              <th className="px-4 py-4 text-left font-semibold">Title</th>
              <th className="px-4 py-4 text-left font-semibold">Type</th>
              <th className="px-4 py-4 text-center font-semibold">Status</th>
              <th className="px-4 py-4 text-left font-semibold">Author</th>
              <th className="px-4 py-4 text-left font-semibold">Categories</th>
              <th className="px-4 py-4 text-center font-semibold">Media</th>
              <th className="px-4 py-4 text-center font-semibold">Views</th>
              <th className="px-4 py-4 text-center font-semibold">Read Time</th>
              <th className="px-4 py-4 text-center font-semibold">Comments</th>
              <th className="px-4 py-4 text-left font-semibold">Created</th>
              <th className="px-4 py-4 text-center font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {currentStories.length > 0 ? (
              currentStories.map((story, index) => (
                <tr
                  key={story._id}
                  className="hover:bg-pink-50 transition-colors duration-150"
                >
                  <td className="px-4 py-3 text-center">
                    {(currentPage - 1) * storiesPerPage + index + 1}
                  </td>
                  <td className="px-4 py-3 font-medium">{story.title}</td>
                  <td className="px-4 py-3 text-gray-700 capitalize">
                    {story.type || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span className={getStatusBadge(story.status)}>
                      {story.status}
                    </span>
                  </td>
                  <td className="px-4 py-3">{story.author?.name || "N/A"}</td>
                  <td className="px-4 py-3">
                    {story.categories?.map((c) => c.name).join(", ") || "N/A"}
                  </td>
                  <td className="px-4 py-3 text-center">
                    {story.type === "video" ? (
                      story.videoUrl ? (
                        <div
                          className="relative group cursor-pointer inline-block"
                          onClick={() => openVideoModal(story)}
                        >
                          <img
                            src={getYouTubeThumbnail(story.videoUrl)}
                            alt={story.title}
                            className="h-16 w-28 object-cover rounded"
                          />
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-80 transition-opacity bg-black bg-opacity-40 rounded">
                            <FaYoutube className="text-white text-xl" />
                          </div>
                        </div>
                      ) : (
                        "No Video"
                      )
                    ) : story.featuredImage ? (
                      <img
                        src={story.featuredImage}
                        alt={story.title}
                        className="h-12 w-12 object-cover rounded mx-auto"
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
                  <td className="px-4 py-3 text-gray-500">
                    {new Date(story.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3 text-center">
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

export default AdminViewStories;
