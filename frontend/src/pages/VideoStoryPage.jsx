import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Community from "../components/common/Community";
import { FaPlay, FaClock, FaEye } from "react-icons/fa";

const VideoStoryPage = () => {
  const [videoStories, setVideoStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoStories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stories");
        const stories = response.data.data || response.data;
        const videoStories = stories.filter((story) => story.type === "video");
        setVideoStories(videoStories);
      } catch (error) {
        console.error("Error fetching video stories:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchVideoStories();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-[var(--bg-section)] text-[var(--text-dark)] min-h-[calc(100vh-128px)] flex justify-center items-center">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-pink-500"></div>
          <p className="mt-4 text-gray-500 text-lg">Loading video stories...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)] min-h-screen">
      {/* Container */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-12 px-4 sm:px-6 md:px-8 h-auto sm:h-[220px] flex flex-col justify-center rounded-lg">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--text-dark)] mb-3">
            Video Stories
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[var(--text-dark)] leading-relaxed max-w-3xl">
            Experience storytelling like never before with Storyious Video Stories! Watch captivating tales come to life through engaging visuals and narration, perfect for readers and viewers of all ages.
          </p>
        </div>

        {/* Stories Section */}
        <div className="pb-12">
          {videoStories.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-gray-600">No video stories available yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {videoStories.map((story) => (
                <Link
                  key={story._id}
                  to={`/story/${story._id}`}
                  className="block group"
                >
                  <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 flex flex-col h-full">
                    
                    {/* Thumbnail */}
                    <div className="relative overflow-hidden h-56 sm:h-60 lg:h-64">
                      {story.videoUrl ? (
                        <img
                          src={getYouTubeThumbnail(story.videoUrl)}
                          alt={story.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      ) : story.videoFile ? (
                        <video className="w-full h-full object-cover">
                          <source src={story.videoFile} type="video/mp4" />
                        </video>
                      ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                          <FaPlay className="text-4xl text-gray-400" />
                        </div>
                      )}

                      {/* Overlay Play Button */}
                      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-red-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                          <FaPlay className="text-white text-xl" />
                        </div>
                      </div>

                      {/* Video Badge */}
                      <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                        <FaPlay className="mr-1 text-red-400" />
                        <span>Video</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[3.5rem]">
                        {story.title}
                      </h3>

                      {story.introText && (
                        <p className="text-gray-600 text-sm mb-3 flex-1 line-clamp-2">
                          {story.introText}
                        </p>
                      )}

                      {/* Meta Info */}
                      <div className="mt-auto pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <div className="flex items-center">
                            <FaClock className="mr-1 text-gray-500" />
                            <span>{story.meta?.readTime || "N/A"}</span>
                          </div>
                          <div className="flex items-center">
                            <FaEye className="mr-1 text-gray-500" />
                            <span>{story.meta?.views || 0}</span>
                          </div>
                        </div>

                        {story.author && (
                          <p className="text-xs text-gray-500 mt-2">By {story.author.name}</p>
                        )}

                        {story.categories && story.categories.length > 0 && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {story.categories.slice(0, 2).map((category) => (
                              <span
                                key={category._id}
                                className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded"
                              >
                                {category.name}
                              </span>
                            ))}
                            {story.categories.length > 2 && (
                              <span className="text-xs text-gray-500">
                                +{story.categories.length - 2} more
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Community Section */}
        <Community />
      </div>
    </div>
  );
};

export default VideoStoryPage;
