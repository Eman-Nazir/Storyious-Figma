import React from 'react';

const ReadMore = () => {
  return (
    <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 my-10 rounded-md
      pt-[69px] pb-[69px] pl-[150px] pr-[150px]
      max-sm:pt-[32px] max-sm:pb-[32px] max-sm:pl-[20px] max-sm:pr-[20px]">

      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-[var(--text-dark)]">
        Want to Read More Stories?
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
        <p className="text-sm sm:text-base text-[var(--text-gray)] leading-relaxed text-justify lg:w-[70%]">
          Dive deeper into the world of storytelling with Storyious. Explore our vast collection of captivating tales across  
          genres—from heartfelt moral stories to thrilling adventures and magical fairytales. 
        </p>

        <button className="bg-[var(--pink-dark)] text-[var(--white)] py-2 px-6 rounded-md cursor-pointer whitespace-nowrap">
          Read More
        </button>
      </div>
    </div>
  );
};

export default ReadMore;
