
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Community from '../components/common/Community';
import { FaPlay, FaClock, FaEye } from 'react-icons/fa';

const VideoStoryPage = () => {
  const [videoStories, setVideoStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideoStories = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/stories');
        const stories = response.data.data || response.data;
        const videoStories = stories.filter(story => story.type === 'video');
        setVideoStories(videoStories);
      } catch (error) {
        console.error('Error fetching video stories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchVideoStories();
  }, []);

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

  if (loading) {
    return (
      <div className="bg-[var(--bg-section)] text-[var(--text-dark)] min-h-screen flex justify-center items-center">
        <div className="text-center text-lg font-medium">Loading video stories...</div>
      </div>
    );
  }

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)] min-h-screen">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[300px]">
        <h1 className="text-3xl font-bold text-[var(--text-dark)] mb-4">Video Stories</h1>
        <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify max-w-3xl">
          Experience storytelling like never before with Storyious Video Stories! Watch captivating tales come to life through engaging visuals and narration, perfect for readers and viewers of all ages.
        </p>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {videoStories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">No video stories available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ml-30">
            {videoStories.map((story) => (
              <Link key={story._id} to={`/story/${story._id}`} className="block group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                  <div className="relative overflow-hidden">
                    {story.videoUrl ? (
                      <img
                        src={getYouTubeThumbnail(story.videoUrl)}
                        alt={story.title}
                        className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : story.videoFile ? (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <video className="w-full h-full object-cover">
                          <source src={story.videoFile} type="video/mp4" />
                        </video>
                      </div>
                    ) : (
                      <div className="w-full h-48 bg-gray-200 flex items-center justify-center">
                        <FaPlay className="text-4xl text-gray-400" />
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-90 transition-opacity duration-300">
                      <div className="bg-red-600 rounded-full p-3 transform scale-90 group-hover:scale-100 transition-transform duration-300">
                        <FaPlay className="text-white text-xl" />
                      </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded flex items-center">
                      <FaPlay className="mr-1 text-red-400" />
                      <span>Video</span>
                    </div>
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2 min-h-[56px]">{story.title}</h3>
                    {story.introText && (
                      <p className="text-gray-600 text-sm mb-3 line-clamp-3 flex-1">{story.introText}</p>
                    )}
                    
                    <div className="mt-auto pt-3 border-t border-gray-100">
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <FaClock className="mr-1 text-gray-500" />
                          <span>{story.meta?.readTime || 'N/A'}</span>
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
                        <div className="mt-2">
                          <div className="flex flex-wrap gap-1">
                            {story.categories.slice(0, 2).map((category) => (
                              <span key={category._id} className="bg-pink-100 text-pink-800 text-xs px-2 py-1 rounded">
                                {category.name}
                              </span>
                            ))}
                            {story.categories.length > 2 && (
                              <span className="text-xs text-gray-500">+{story.categories.length - 2} more</span>
                            )}
                          </div>
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

      <Community />
    </div>
  );
};

export default VideoStoryPage;