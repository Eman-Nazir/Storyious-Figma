



import React, { useState } from 'react';
import writer3 from "../../src/assets/images/writer3.jpg";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import AllStories from './AllStories';

const AliNadeemDetailPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = `A respected author and historian, Ali Nadeem Rezavi combines meticulous research with compelling prose. His writing offers readers a deeper understanding of cultural and historical contexts.`;

  const fullBio = `Ali Nadeem Rezavi is an esteemed writer and historian renowned for his meticulous research and engaging prose that bring the past vividly to life. With a deep commitment to uncovering and interpreting historical narratives, he has dedicated his career to exploring the cultural, architectural, and political heritage of South Asia. His writing stands out for its clarity and depth, making complex historical subjects accessible to a wide audience without sacrificing scholarly rigor. Ali Nadeem Rezavi’s work often highlights the intricate details of Mughal architecture, court culture, and the evolution of society, offering readers fresh perspectives and valuable insights. Beyond his academic expertise, he is passionate about education and fostering an appreciation for history among students and the general public. His lectures, articles, and books reflect his belief that understanding the past is essential to shaping an informed and thoughtful society. Through his dedication to research and storytelling, Ali Nadeem Rezavi has become a respected voice in historical scholarship. His ability to blend scholarly precision with engaging narrative ensures his work resonates with both specialists and casual readers alike, preserving the richness of cultural heritage for future generations to explore and appreciate.`;

  return (
    <div>
      {/* Top Section */}
      <div className='px-4 sm:px-6 md:px-10 lg:px-30 pt-10 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 my-6'>
        
        <img
          src={writer3}
          alt='Ali Nadeem Rezavi'
          className='w-full max-w-[250px] rounded-lg object-cover'
        />

        <div className='space-y-3 text-center md:text-left'>
          <h1 className='font-bold text-2xl text-[var(--text-dark)]'>
            Ali Nadeem Rezavi
          </h1>

          <p className='hidden md:block max-w-[700px] text-[var(--text-gray)]'>
            {shortBio}
          </p>

          <div className="flex justify-center md:justify-start flex-wrap gap-2 pt-2">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-[var(--white)] border border-[var(--pink-dark)] text-[var(--pink-dark)] p-2 rounded-md"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className='m-0 md:m-10 px-6 sm:px-10 md:px-20'>
        <h1 className='font-bold text-xl mb-2 text-[var(--text-dark)]'>About the Writer</h1>

        <p className='hidden md:block text-justify leading-relaxed text-sm text-[var(--text-gray)]'>
          {fullBio}
        </p>

        <div className='block md:hidden'>
          <p className='text-justify text-sm text-[var(--text-gray)]'>
            {showFullBio ? fullBio : shortBio}
          </p>
          <button
            className='mt-2 mb-2 px-4 py-1 rounded-md text-white bg-[var(--pink-dark)] text-sm'
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>

      <AllStories />
    </div>
  );
};

export default AliNadeemDetailPage;

