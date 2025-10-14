import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  Bookmark,
  Clock7,
  Eye,
  CalendarRange,
  PlayCircle,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import { toast } from "react-toastify";

const UserProfilePage = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");
  const [removingBookmark, setRemovingBookmark] = useState(null);

  useEffect(() => {
    fetchUserBookmarks();
  }, [activeTab]);

  const fetchUserBookmarks = async () => {
    try {
      setLoading(true);
      const url =
        activeTab === "all"
          ? "http://localhost:8000/api/bookmarks/my-bookmarks"
          : `http://localhost:8000/api/bookmarks/my-bookmarks?type=${activeTab}`;

      const response = await axios.get(url, { withCredentials: true });
      if (response.data.success) {
        setBookmarks(response.data.data.bookmarks || []);
      } else {
        setBookmarks([]);
      }
    } catch (error) {
      console.error("Error fetching bookmarks:", error);
      toast.error("Failed to load bookmarks");
      setBookmarks([]);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (bookmarkId) => {
    try {
      setRemovingBookmark(bookmarkId);
      await axios.delete(`http://localhost:8000/api/bookmarks/${bookmarkId}`, {
        withCredentials: true,
      });
      setBookmarks((prev) => prev.filter((b) => b._id !== bookmarkId));
      toast.success("Bookmark removed successfully!");
    } catch (error) {
      console.error("Error removing bookmark:", error);
      toast.error("Failed to remove bookmark");
      fetchUserBookmarks();
    } finally {
      setRemovingBookmark(null);
    }
  };

  const getYouTubeId = (url) => {
    if (!url) return null;
    const regExp =
      /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };

  const getBlogImage = (blog) => {
    if (!blog || !blog.cards || !Array.isArray(blog.cards)) return null;
    const cardWithImage = blog.cards.find((card) => card.image);
    return cardWithImage ? cardWithImage.image : null;
  };

  const formatImageUrl = (imagePath) => {
    if (!imagePath) return null;
    if (imagePath.startsWith("http")) return imagePath;
    return `http://localhost:8000/${imagePath.replace(/\\/g, "/")}`;
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  const renderThumbnail = (bookmark) => {
    const content = bookmark.story || bookmark.blog;
    const type = bookmark.story ? "story" : "blog";
    const isVideo = bookmark.story?.type === "video";
    let imageUrl = null;

    if (type === "story") {
      if (isVideo) {
        if (content.videoUrl) {
          return (
            <>
              <img
                src={`https://img.youtube.com/vi/${getYouTubeId(
                  content.videoUrl
                )}/mqdefault.jpg`}
                alt={content.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <PlayCircle className="w-8 h-8 text-white opacity-80" />
              </div>
            </>
          );
        } else if (content.featuredImage) {
          imageUrl = content.featuredImage;
        }
      } else {
        imageUrl = content.featuredImage;
      }
    } else if (type === "blog") {
      const blogImage = getBlogImage(content);
      imageUrl = blogImage ? formatImageUrl(blogImage) : null;
    }

    if (imageUrl) {
      return (
        <img
          src={imageUrl}
          alt={content.title}
          className="w-full h-full object-cover"
        />
      );
    }

    return (
      <div className="w-full h-full bg-gray-100 flex flex-col items-center justify-center text-gray-400">
        <ImageIcon className="w-6 h-6 mb-1" />
        <span className="text-xs">No Image</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-pink-500"></div>
          <p className="mt-4 text-gray-500 text-lg">Loading bookmarks...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
          My Bookmarks
        </h1>
        <p className="text-gray-600 text-sm sm:text-base">
          Your saved stories and blogs
        </p>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 mb-6 overflow-x-auto">
        <nav className="flex space-x-6 min-w-max sm:min-w-0 justify-center sm:justify-start">
          {[
            { key: "all", label: "All Bookmarks" },
            { key: "story", label: "Stories" },
            { key: "blog", label: "Blogs" },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`py-2 px-1 border-b-2 font-medium text-sm sm:text-base ${
                activeTab === tab.key
                  ? "border-pink-500 text-pink-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              {tab.label} (
              {
                bookmarks.filter((b) =>
                  tab.key === "all" ? true : b.type === tab.key
                ).length
              }
              )
            </button>
          ))}
        </nav>
      </div>

      {/* Bookmarks */}
      {bookmarks.length === 0 ? (
        <div className="text-center py-16 px-4">
          <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
            No bookmarks yet
          </h3>
          <p className="text-gray-500 mb-4 text-sm sm:text-base">
            {activeTab === "all"
              ? "You haven't bookmarked any stories or blogs yet."
              : `You haven't bookmarked any ${
                  activeTab === "story" ? "stories" : "blogs"
                } yet.`}
          </p>
          <Link
            to={activeTab === "blog" ? "/blogs" : "/stories"}
            className="inline-flex items-center px-4 py-2 text-sm sm:text-base font-medium rounded-md shadow-sm text-white bg-pink-600 hover:bg-pink-700"
          >
            Explore{" "}
            {activeTab === "all"
              ? "Content"
              : activeTab === "story"
              ? "Stories"
              : "Blogs"}
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
          {bookmarks.map((bookmark) => {
            const content = bookmark.story || bookmark.blog;
            if (!content) return null;
            const isVideo = bookmark.story?.type === "video";
            const type = bookmark.story ? "story" : "blog";

            return (
              <div
                key={bookmark._id}
                className="bg-white rounded-lg border border-gray-200 overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                {/* Thumbnail */}
                <div className="relative w-full h-40 sm:h-48 md:h-44">
                  {renderThumbnail(bookmark)}
                </div>

                {/* Content */}
                <div className="p-4 flex flex-col justify-between flex-grow">
                  <div>
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          type === "story"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {type === "story" ? "Story" : "Blog"}
                      </span>
                      {type === "story" && isVideo && (
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          Video
                        </span>
                      )}
                    </div>

                    <Link to={`/${type}/${content._id || content.id}`}>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 hover:text-pink-600 transition-colors line-clamp-2">
                        {content.title}
                      </h3>
                    </Link>

                    {content.introText && (
                      <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                        {content.introText}
                      </p>
                    )}
                  </div>

                  {/* Meta Info + Remove */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-xs text-gray-500 mt-3 gap-2">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="flex items-center">
                        <CalendarRange className="w-3 h-3 mr-1" />
                        {formatDate(content.createdAt)}
                      </span>
                      <span className="flex items-center">
                        <Clock7 className="w-3 h-3 mr-1" />
                        {type === "story" && isVideo
                          ? `${content.meta?.duration || "5 Min"} Watch`
                          : `${content.meta?.readTime || "5 Min"} Read`}
                      </span>
                      <span className="flex items-center">
                        <Eye className="w-3 h-3 mr-1" />
                        {content.meta?.views || 0} views
                      </span>
                    </div>

                    <button
                      onClick={() => removeBookmark(bookmark._id)}
                      disabled={removingBookmark === bookmark._id}
                      className="flex items-center gap-1 text-gray-400 hover:text-red-500 transition-colors disabled:opacity-50"
                    >
                      {removingBookmark === bookmark._id ? (
                        <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                      ) : (
                        <>
                          <Trash2 className="w-4 h-4" />
                          <span className="hidden sm:inline">Remove</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default UserProfilePage;
