

import React from 'react';

import HiddenGemsPage from '../sections/StoryDetailedPage/FeaturedStory/HiddenGemsPage';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import History from '../sections/StoryDetailedPage/1stStory/History';
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import LoadMore from '../sections/StoryDetailedPage/1stStory/LoadMore';
import RelatedStories from '../sections/StoryDetailedPage/1stStory/RelatedStories';
import Images from '../sections/StoryDetailedPage/1stStory/Images';

const HiddenGemsDetailPage = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 max-w-[1200px] mx-auto px-4 lg:px-0 my-10">

      <div className="flex-1 space-y-6">
        <HiddenGemsPage />         
        <DiscoverMore />           
        <History />                
        <Comment />               
        <CommentsList />          
        <Comment />                
        <LoadMore />              
        <RelatedStories />        
      </div>

      <div className="w-full lg:w-[30%]">
        <Images />                 
      </div>

    </div>
  );
};

export default HiddenGemsDetailPage;
