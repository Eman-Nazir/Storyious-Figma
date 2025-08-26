


import React from 'react';
import ElijahQuest from '../sections/StoryDetailedPage/3rdStory/ElijahQuest';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import LoadMore from '../sections/StoryDetailedPage/1stStory/LoadMore';
import RelatedStories from '../sections/StoryDetailedPage/1stStory/RelatedStories';
import Images from '../sections/StoryDetailedPage/1stStory/Images';

const ElijahQuestStoryDetailPage = () => {
  return (
    <div className="my-8 px-4 lg:px-10 flex flex-col lg:flex-row gap-8 max-w-[1200px] mx-auto bg-[var(--white)] text-[var(--text-dark)]">

      {/* Left Content */}
      <div className="flex-1 space-y-6">
        <ElijahQuest />
        <DiscoverMore />
        <History />
        <Comment /> {/* comment form */}
        <CommentsList />
        <Comment />
        <LoadMore />
        <RelatedStories />
      </div>

      {/* Right Sidebar (Images) */}
      <div className="w-full lg:w-[300px]">
        <Images />
      </div>

    </div>
  );
};

export default ElijahQuestStoryDetailPage;
