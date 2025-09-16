

import React from 'react';
import ReadMore from "../components/common/ReadMore";
import Community from '../components/common/Community';

const VideoStoryPage = () => {
  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[300px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Video Stories</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Experience storytelling like never before with Storyious Video Stories! Watch captivating tales come to life through engaging visuals and narration, perfect for readers and viewers of all ages.
          </p>
        </div>
      </div>
      <ReadMore />
      <Community />
    </div>
  );
};

export default VideoStoryPage;
