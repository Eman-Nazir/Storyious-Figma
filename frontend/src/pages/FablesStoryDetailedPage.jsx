



import React from 'react';
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1';
import ReadMore from "../components/common/ReadMore";
import DetailedPageCard2 from '../components/common/Cards/DetailedPageCard2';
import Community from '../components/common/Community';
import FablesFaq from '../sections/FAQ/FablesFaq';
import ScaryStories from '../sections/WithAdds/ScaryStories';

const FablesStoryDetailedPage = () => {
  return (
    <div>

      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Fables Stories</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Discover the charm of timeless Fables Stories. These short tales often feature clever animals and simple plots,
            each ending with a valuable life lesson that teaches honesty, patience, wisdom, or kindness.
          </p>
        </div>
      </div>

      <div className="my-10 px-4 sm:px-6 md:px-12 lg:px-[140px] text-justify max-w-screen-xl">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Fables Stories</strong>, where imagination meets wisdom.
          These beautifully crafted tales use talking animals and everyday situations to gently guide readers toward important values.
          Fables are fun to read and easy to remember, making them perfect for young minds learning right from wrong.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Each fable ends with a simple but powerful moral — a takeaway that sticks with the reader.
          From the patience of a turtle to the cleverness of a crow, every story reflects real-life choices and consequences in a way children can understand.
          Dive into our world of fables and enjoy storytelling that teaches through imagination.
        </p>
      </div>

      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard2 />
      <Community />
      <FablesFaq />
    </div>
  );
};

export default FablesStoryDetailedPage;
