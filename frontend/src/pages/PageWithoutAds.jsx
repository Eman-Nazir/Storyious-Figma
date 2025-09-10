import React from 'react'
import FeaturedStories from '../sections/WithAdds/FeaturedStories'
import MoralStories from '../sections/WithAdds/MoralStories'
import ScaryStories from '../sections/WithAdds/ScaryStories'
import ClassicStories from '../sections/WithAdds/ClassicStories'
import Fables from '../sections/WithAdds/Fables'
import BedtimeStories from '../sections/WithAdds/BedtimeStories'
import FairytalesStories from '../sections/WithAdds/FairytalesStories'
import FAQ from '../sections/WithAdds/FAQ'
const PageWithoutAds = () => {
  return (
    <div>
        <FeaturedStories/>
        <MoralStories/>
        <ScaryStories/>
        <ClassicStories/>
        <Fables/>
        <BedtimeStories/>
        <FairytalesStories/>
        <FAQ/>
                
    </div>
  )
}

export default PageWithoutAds