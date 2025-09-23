import React, { useState, useEffect } from 'react';
import { Clock7, Eye, CalendarRange, PlayCircle } from "lucide-react";
import { GoComment } from "react-icons/go";
import { LuCopyCheck } from "react-icons/lu";
import Share from "../assets/icons/Share";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import Ads from '../sections/StoryDetailedPage/1stStory/Ads';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';

const StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshComments, setRefreshComments] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);
  const [relatedStories, setRelatedStories] = useState([]);
  const [loadingRelated, setLoadingRelated] = useState(true);

  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
    setCommentsCount(prev => prev + 1);
  };

  const getYouTubeId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : null;
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stories/${id}`);
        const storyData = response.data.data || response.data;
        setStory(storyData);
        fetchCommentsCount();
        fetchRelatedStories(storyData.type);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch story');
        setLoading(false);
        console.error("Error fetching story:", err);
      }
    };

    fetchStory();
  }, [id]);

  const fetchRelatedStories = async (type) => {
    try {
      setLoadingRelated(true);
      const response = await axios.get(`http://localhost:8000/api/stories?type=${type}&limit=3&exclude=${id}`);
      if (response.data.success && response.data.data) {
        const filteredStories = response.data.data
          .filter(s => s._id !== id && s.type === type)
          .slice(0, 3);
        setRelatedStories(filteredStories);
      } else {
        setRelatedStories([]);
      }
      setLoadingRelated(false);
    } catch (error) {
      console.error("Error fetching related stories:", error);
      setRelatedStories([]);
      setLoadingRelated(false);
    }
  };

  const fetchCommentsCount = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/comments?storyId=${id}`);
      if (response.data.success && response.data.data) {
        setCommentsCount(response.data.data.length);
      }
    } catch (error) {
      console.error("Error fetching comments count:", error);
    }
  };

  useEffect(() => {
    fetchCommentsCount();
  }, [refreshComments]);

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (!story) return <div className="text-center py-8">Story not found</div>;

  const createMarkup = (htmlContent) => ({ __html: htmlContent || "" });
  const isVideo = story.type === "video";

  return (
    <div className="w-full flex justify-center px-4 sm:px-6 lg:px-10 py-10">
      <div className="w-full max-w-[1200px] flex gap-6">
        
        {/* Main Content */}
        <div className={`${isVideo ? "w-full" : "flex-1 lg:pr-6"}`}>
          <div className="space-y-6">
            
            {/* Title */}
            <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 ${isVideo ? "text-center" : ""}`}>
              {story.title || "Untitled Story"}
            </h1>

            {/* Meta Data */}
            <div className="flex flex-wrap justify-between items-center border-t border-b border-gray-200 py-3 gap-4 text-gray-600 text-sm sm:text-base">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <CalendarRange className="w-4 h-4" /> 
                  {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <Clock7 className="w-4 h-4" /> 
                  {isVideo ? `${story.meta?.duration || "5 Min"} Watch` : `${story.meta?.readTime || "0 Min"} Read`}
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <Eye className="w-4 h-4" /> {story.meta?.views || 0} views
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <GoComment className="w-5 h-5" /> {commentsCount} Comments
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Share />
                <LuCopyCheck className="text-gray-600 w-6 h-6 rounded-sm border-gray-300 border p-1" />
              </div>
            </div>

            {/* Intro Text */}
            {story.introText && (
              <p className={`text-base md:text-lg leading-relaxed text-gray-700 ${isVideo ? "text-center" : ""}`}>
                {story.introText}
              </p>
            )}

            {/* Video or Image */}
            <div className={`w-full flex justify-center my-6`}>
              {isVideo ? (
                story.videoUrl ? (
                  <div className="w-full aspect-video rounded-lg overflow-hidden shadow-lg">
                    <iframe
                      width="100%"
                      height="100%"
                      src={`https://www.youtube.com/embed/${getYouTubeId(story.videoUrl)}`}
                      title={story.title}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full"
                    ></iframe>
                  </div>
                ) : story.videoFile ? (
                  <video
                    className="w-full aspect-video rounded-lg shadow-lg"
                    controls
                    src={story.videoFile}
                  ></video>
                ) : null
              ) : story.featuredImage ? (
                <img
                  src={story.featuredImage}
                  alt={story.title || "Story featured image"}
                  className="rounded-lg w-full max-w-4xl object-cover shadow-lg"
                />
              ) : null}
            </div>

            {/* Content */}
            {story.content && (
              <div className={`mt-6 ${isVideo ? "bg-gray-50 p-6 rounded-lg" : ""}`}>
                {isVideo && <h2 className="text-2xl font-semibold mb-4 text-gray-900">Video Description</h2>}
                <div 
                  className={`${!isVideo ? "prose max-w-none text-gray-800" : "text-gray-700"}`}
                  dangerouslySetInnerHTML={createMarkup(story.content)}
                />
              </div>
            )}
            <DiscoverMore/>
             <History writer={story.author} storyDate={story.createdAt} />

            {/* Comments */}
            <Comment onCommentAdded={handleCommentAdded} />
            <CommentsList refresh={refreshComments} />

            {/* Related Stories */}
            {relatedStories.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Related {isVideo ? 'Videos' : 'Stories'}
                </h2>
                <div className="space-y-6">
                  {relatedStories.map((relatedStory, index) => {
                    const isRelatedVideo = relatedStory.type === "video";

                    return (
                      <div key={relatedStory._id} className={index !== relatedStories.length - 1 ? "pb-6 border-b" : ""}>
                        <Link to={`/story/${relatedStory._id}`} className="flex gap-4 group">
                          
                          {/* Thumbnail */}
                          <div className="w-40 h-28 rounded-md overflow-hidden relative flex-shrink-0">
                            {isRelatedVideo ? (
                              relatedStory.videoUrl ? (
                                <>
                                  <img
                                    src={`https://img.youtube.com/vi/${getYouTubeId(relatedStory.videoUrl)}/mqdefault.jpg`}
                                    alt={relatedStory.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </>
                              ) : relatedStory.featuredImage ? (
                                <>
                                  <img
                                    src={relatedStory.featuredImage}
                                    alt={relatedStory.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                  />
                                  <div className="absolute inset-0 flex items-center justify-center">
                                    <PlayCircle className="w-8 h-8 text-white opacity-80 group-hover:opacity-100 transition-opacity" />
                                  </div>
                                </>
                              ) : (
                                <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                  <PlayCircle className="w-8 h-8 text-gray-500" />
                                </div>
                              )
                            ) : relatedStory.featuredImage ? (
                              <img
                                src={relatedStory.featuredImage}
                                alt={relatedStory.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                              />
                            ) : (
                              <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                <span className="text-gray-500">No Image</span>
                              </div>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1">
                            {/* Categories from backend */}
                            <div className="text-sm font-medium mb-1 space-x-1">
                              {relatedStory.categories && relatedStory.categories.length > 0 ? (
                                relatedStory.categories.map((cat, i) => (
                                  <span 
                                    key={cat._id} 
                                    className="text-pink-600"
                                  >
                                    {cat.name}{i < relatedStory.categories.length - 1 && " · "}
                                  </span>
                                ))
                              ) : (
                                <span className="text-gray-500">No Category</span>
                              )}
                            </div>
                            
                            {/* Title */}
                            <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-pink-600 transition-colors line-clamp-2">
                              {relatedStory.title}
                            </h3>
                            
                            {/* Meta */}
                            <div className="flex items-center text-xs text-gray-500 space-x-3">
                              <span className="flex items-center">
                                <CalendarRange className="w-3 h-3 mr-1" />
                                {relatedStory.createdAt ? new Date(relatedStory.createdAt).toLocaleDateString('en-US', { 
                                  day: 'numeric', 
                                  month: 'short', 
                                  year: 'numeric' 
                                }) : "Unknown date"}
                              </span>
                              <span className="flex items-center">
                                <Clock7 className="w-3 h-3 mr-1" />
                                {isRelatedVideo ? `${relatedStory.meta?.duration || "5 Min"} Watch` : `${relatedStory.meta?.readTime || "5 Min"} Read`}
                              </span>
                              <span className="flex items-center">
                                <Eye className="w-3 h-3 mr-1" />
                                {relatedStory.meta?.views || 0} View
                              </span>
                            </div>
                          </div>
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* No Related */}
            {!loadingRelated && relatedStories.length === 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  Related {isVideo ? 'Videos' : 'Stories'}
                </h2>
                <p className="text-gray-500 text-center py-4">
                  No related {isVideo ? 'videos' : 'stories'} found at the moment.
                </p>
              </div>
            )}

          </div>
        </div>

        {/* Ads Sidebar */}
        {!isVideo && (
          <div className="w-64 flex-shrink-0 hidden lg:block">
            <Ads />
          </div>
        )}

      </div>
    </div>
  );
};

export default StoryDetailPage;
