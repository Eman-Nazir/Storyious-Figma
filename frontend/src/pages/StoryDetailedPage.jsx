

import React, { useState, useEffect } from 'react';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";
import { LuCopyCheck } from "react-icons/lu";
import Share from "../assets/icons/Share";
import { FaWhatsapp } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import axios from 'axios';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import Ads from '../sections/StoryDetailedPage/1stStory/Ads';

const tabs = [
  "Bedtime Stories",
  "Bedtime Stories for Kids",
  "Bedtime Stories for Adults",
  "Free Unique Bedtime Stories",
  "Bedtime Stories for American Kids",
  "Bedtime Stories for Americans",
];

const   StoryDetailPage = () => {
  const { id } = useParams();
  const [story, setStory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshComments, setRefreshComments] = useState(0);
  const [commentsCount, setCommentsCount] = useState(0);

  const handleCommentAdded = () => {
    setRefreshComments(prev => prev + 1);
    setCommentsCount(prev => prev + 1);
  };

  useEffect(() => {
    const fetchStory = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/stories/${id}`);
        const storyData = response.data.data || response.data;
        setStory(storyData);
        fetchCommentsCount();
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch story');
        setLoading(false);
        console.error("Error fetching story:", err);
      }
    };

    fetchStory();
  }, [id]);

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

  const createMarkup = (htmlContent) => {
    return { __html: htmlContent || "" };
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-10 py-10">
      {/* Main Content & Images in Flex */}
      <div className="flex flex-col lg:flex-row lg:gap-8">
        {/* Left Content */}
        <div className="flex-1 space-y-6 lg:pr-4">
          {/* Heading and Tags */}
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--black)]">
              {story.title || "Untitled Story"}
            </h1>
            <div className="flex flex-wrap gap-2 mt-2">
              <p className="text-sm sm:text-base text-[var(--primary-color)]">{story.meta?.readTime || "0 min"}</p>
              <p className="text-sm sm:text-base text-[var(--primary-color)]">Bedtime Stories.</p>
              <p className="text-sm sm:text-base text-[var(--primary-color)]">Moral Stories</p>
            </div>
          </div>

          {/* Meta Data Row */}
          <div className="flex flex-col sm:flex-row sm:justify-between border-t border-b border-[var(--gray-mid)] py-3 gap-4">
            <div className="w-full flex flex-wrap justify-between items-center gap-y-2 text-[var(--gray-mid)] text-sm sm:text-base">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <CalendarRange className="w-4 h-4" /> 
                  {story.createdAt ? new Date(story.createdAt).toLocaleDateString() : "Unknown date"}
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <Clock7 className="w-4 h-4" /> {story.meta?.readTime || "0 min"}
                </p>
                <p className="flex items-center gap-1 whitespace-nowrap">
                  <Eye className="w-4 h-4" /> {story.meta?.views || 0} views
                </p>
                <p className="items-center gap-1 whitespace-nowrap hidden sm:flex">
                  <GoComment className="w-5 h-5" /> {commentsCount} Comments
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Share />
                <LuCopyCheck className="text-[var(--gray-mid)] w-6 h-6 rounded-sm border-[var(--border-muted)] border p-1" />
              </div>
            </div>
          </div>

          {/* Intro Text */}
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify text-[var(--text-gray)]">
            {story.introText || "No introduction available."}
          </p>

          {story.featuredImage && (
            <img
              src={story.featuredImage}
              alt="Feature"
              className="rounded-md w-full object-cover my-3 shadow-sm max-h-[600px]"
            />
          )}

          {/* Article Content */}
          <div className="space-y-4" dangerouslySetInnerHTML={createMarkup(story.content)} />

          {/* Tabs & CTA */}
          <div className="space-y-6 font-sans">
            <div className="flex flex-wrap gap-2">
              {tabs.map((tab, index) => (
                <button
                  key={index}
                  className={`px-3 py-1 text-sm rounded-md border transition 
                    ${tab === "Bedtime Stories for Kids"
                      ? "bg-[var(--primary-color)] text-white border-[var(--primary-color)]"
                      : "bg-[var(--white)] text-gray-800 border-[var(--border-muted)]"
                    }
                    hover:bg-[var(--primary-color)] hover:text-white`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="bg-[#fdf6f8] p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              <div className="max-w-2xl">
                <h2 className="text-2xl font-semibold mb-2">Want To Read More Stories?</h2>
                <p className="text-gray-700 w-[500px]">
                  Dive deeper into the world of storytelling with Storyious. Explore our vast collection of captivating tales across genres—from heartfelt moral stories to thrilling adventures and magical fairytales.
                </p>
              </div>
              <button className="bg-[var(--primary-color)] text-white my-1.5 px-6 py-2 rounded-md text-base font-medium">
                Read More
              </button>
            </div>

            <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
              <DiscoverMore />
            </div>

            <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
              <History />
            </div>
          </div>

          {/* Comment Components */}
          <Comment onCommentAdded={handleCommentAdded} />
          <CommentsList refresh={refreshComments} />
        </div>

        {/* Right Images Section */}
        <div className="w-full lg:w-1/3 flex-shrink-0 lg:pl-4 space-y-4">
          <Ads />
        </div>
      </div>
    </div>
  );
};

export default  StoryDetailPage;
