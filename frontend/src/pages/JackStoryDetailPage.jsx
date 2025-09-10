

import React from 'react';
import Jack1stDay from '../sections/StoryDetailedPage/1stStory/Jack1stDay';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import RelatedStories from '../sections/StoryDetailedPage/1stStory/RelatedStories';
import Images from '../sections/StoryDetailedPage/1stStory/Images';
import CommentReply from '../sections/StoryDetailedPage/1stStory/CommentReply';


const JackStoryDetailPage = () => {
  return (
    <div className="my-8 lg:mx-10 flex flex-col lg:flex-row gap-6 lg:gap-8 bg-[var(--bg-section)] text-[var(--text-dark)]">

      {/* Left Content */}
      <div className="flex-1 space-y-6">
        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <Jack1stDay />
        </div>

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <DiscoverMore />
        </div>

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <History />
        </div>

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <Comment /> {/* Comment form */}
        </div>

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <CommentsList />
        </div>

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <CommentReply />
        </div>

       

        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <RelatedStories />
        </div>
      </div>

      {/* Right Content */}
      <div className="w-full lg:w-[30%]">
        <div className="bg-[var(--white)] p-4 rounded-lg shadow-sm">
          <Images />
        </div>
      </div>

    </div>
  );
};

export default JackStoryDetailPage;