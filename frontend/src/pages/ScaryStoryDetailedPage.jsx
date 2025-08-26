


import React from 'react';
import DetailedPageCard1 from '../components/common/Cards/DetailedPageCard1';
import ReadMore from "../components/common/ReadMore";
import DetailedPageCard2 from '../components/common/Cards/DetailedPageCard2';
import Community from '../components/common/Community';
import ScaryFaq from '../sections/FAQ/ScaryFaq';

const ClassicStoryDetailedPage = () => {
  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14 px-4 sm:px-6 md:px-8 lg:px-[140px] h-[200px] max-sm:pb-[250px]">
        <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)]">Scary Stories</h1>

        <div className="md:flex-row items-start lg:items-center">
          <p className="text-md sm:text-base text-[var(--text-dark)] leading-relaxed text-justify">
            Enter a world of spine-tingling tales with our Scary Stories. These thrilling narratives are filled with eerie mysteries, spooky twists,
            and exciting moments that will keep young readers on the edge of their seats—without being too frightening.
          </p>
        </div>
      </div>

      <div className="my-10 px-4 sm:px-6 md:px-12 lg:px-[140px] text-justify max-w-screen-xl">
        <p className="text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          Welcome to <strong>Storyious Scary Stories</strong>, where suspense and curiosity come together in fun, mysterious tales made especially for young readers. 
          Our stories are carefully crafted to spark imagination through harmless thrills, eerie characters, and surprising endings that stir just the right amount of chills.
        </p>

        <p className="mt-4 text-sm sm:text-base text-[var(--text-dark)] leading-relaxed">
          These tales aren’t about nightmares—they’re about adventure. Whether it’s a haunted attic, a mysterious shadow, or a ghost with a funny secret, 
          Storyious offers safe yet exciting stories that are perfect for reading alone or sharing with friends. Step into our spooky world and enjoy storytelling that’s a little creepy, 
          a little kooky, and a lot of fun!
        </p>
      </div>

      <DetailedPageCard1 />
      <ReadMore />
      <DetailedPageCard2 />
      <Community />
      <ScaryFaq />
    </div>
  );
};

export default ClassicStoryDetailedPage;