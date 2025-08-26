import React from 'react';
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1';
import ReadMore from "../components/common/ReadMore";

import Community from '../components/common/Community';
import BedtimeFaq from '../sections/FAQ/BedtimeFaq';

const BedtimeDetailedPage = () => {
  return (
    <div>
      {/* Top Header Section */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Bedtime Stories</h1>
        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-gray)] leading-relaxed text-justify">
            End the day with calm and comfort through our Bedtime Stories. These gentle, soothing tales are ideal for helping children relax and drift off to sleep peacefully.
          </p>
        </div>
      </div>

      {/* Intro Text */}
      <div className="my-10 px-4 sm:px-6 md:px-12 lg:px-[140px] text-justify max-w-screen-xl">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Bedtime Stories</strong>. Drift into a world of imagination and wonder with Storyious' Bedtime Stories collection. 
          Our carefully crafted tales are designed to calm busy minds, spark beautiful dreams, and create magical nighttime routines 
          for readers of all ages. Whether you're looking for short, sweet stories or timeless adventures, you'll find the perfect 
          read to end every day with peace and joy.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          At Storyious, we believe every night deserves a magical ending. Our Bedtime Stories are more than just tales; they're 
          little journeys that nurture imagination, teach gentle lessons, and build lasting memories. Keep exploring, keep dreaming, 
          and let Storyious be a part of your perfect bedtime tradition.
        </p>
      </div>

      {/* Cards and Community Section */}
      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard1 />
      <Community />
      <BedtimeFaq />
    </div>
  );
};

export default BedtimeDetailedPage;
