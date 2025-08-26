



import React from 'react';
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1';
import ReadMore from "../components/common/ReadMore";
import DetailedPageCard2 from '../components/common/Cards/DetailedPageCard2';
import Community from '../components/common/Community';
import ClassicFaq from '../sections/FAQ/ClassicFaq';

const ClassicStoryDetailedPage = () => {
  return (
    <div>

      {/* Header Section with Gradient Background */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Classic Stories</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Discover timeless lessons and enduring wisdom in our Classic and Fables Stories. These tales, often featuring animal characters with human traits,
            deliver powerful morals that spark curiosity and guide children in understanding life's essential values.
          </p>
        </div>
      </div>

      {/* Introduction Paragraphs */}
      <div className="my-10 px-4 sm:px-6 md:px-12 text-justify max-w-screen-xl lg:px-[140px]">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Classic and Fables Stories</strong>, where ancient wisdom meets engaging storytelling.
          Our stories are inspired by world-famous fables and timeless classics that have influenced generations. With talking animals, clever twists, and clear messages,
          each story leaves a lasting impression on young minds.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          These stories are more than just entertainment—they’re educational tools used in classrooms, homes, and libraries worldwide.
          Whether it’s the clever fox, the slow but steady tortoise, or other memorable characters, Storyious invites readers to explore life lessons through fun and imagination.
          Dive into these tales and enjoy the rich heritage of storytelling passed down through centuries.
        </p>
      </div>

      {/* Reusable Components */}
      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard2 />
      <Community />
      <ClassicFaq />

    </div>
  );
};

export default ClassicStoryDetailedPage;
