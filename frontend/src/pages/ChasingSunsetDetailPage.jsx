import React from 'react'
import Comment from '../sections/StoryDetailedPage/1stStory/Comment'
import History from '../sections/StoryDetailedPage/1stStory/History'
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore'
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList'
import LoadMore from '../sections/StoryDetailedPage/1stStory/LoadMore'
import RelatedStories from '../sections/StoryDetailedPage/1stStory/RelatedStories'
import Images from '../sections/StoryDetailedPage/1stStory/Images'
import ChasingSunsetPage from '../sections/StoryDetailedPage/FeaturedStory/ChasingSunsetPage'



const ChasingSunsetDetailPage = () => {
  return (
    <div  className='my-8 lg:mx-10 flex lg:gap-8  ' >

      <div>
       <ChasingSunsetPage/>
      <DiscoverMore/>
      <History/>
      <Comment/>  {/* commnet form  */}
      <CommentsList/>
      <Comment/>
      <LoadMore/>
      <RelatedStories/>
      </div>

      <div>
        <Images/>
      </div>
      

    </div>
    
  )
}

export default ChasingSunsetDetailPage


