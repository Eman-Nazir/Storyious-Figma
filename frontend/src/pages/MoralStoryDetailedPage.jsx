



import React from 'react';
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1';
import ReadMore from "../components/common/ReadMore";
import DetailedPageCard2 from '../components/common/Cards/DetailedPageCard2';
import Community from '../components/common/Community';
import MoralStoryFaq from '../sections/FAQ/MoralStoryFaq';

const MoralStoryDetailedPage = () => {
  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Moral Stories</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Enrich young minds with values and wisdom through our Moral Stories. These thought-provoking tales help children understand right from wrong
            and encourage kindness, honesty, and empathy in everyday life.
          </p>
        </div>
      </div>

      <div className="my-10 px-4 sm:px-6 md:px-12 lg:px-[140px] text-justify max-w-screen-xl">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Moral Stories</strong>, where timeless values come to life through engaging narratives.
          Our Moral Stories are thoughtfully crafted to inspire good character, kindness, honesty, and responsibility in young minds.
          Through relatable characters and meaningful situations, each story delivers a lesson that gently guides readers toward better choices in everyday life.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          At Storyious, we believe that stories shape character. Whether you're a parent, teacher, or young learner, our collection of Moral Stories provides
          an enjoyable way to teach life’s most important values. Keep exploring, keep learning, and let each story leave a positive mark on your heart and actions.
        </p>
      </div>

      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard2 />
      <Community />
      <MoralStoryFaq />
    </div>
  );
};

export default MoralStoryDetailedPage;
