

import React, { useState } from 'react';
import writer1 from "../../src/assets/images/writer1.jpg";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import AllStories from './AllStories';

const AbubakerAliDetailPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = `A writer and designer, Syed Abubaker Ali Gilani is known for merging creative design principles with engaging storytelling.`;

  const fullBio = "Syed Abubaker Ali Gilani is an innovative writer and designer known for seamlessly blending visual artistry with compelling storytelling. With a background in design, he brings a unique aesthetic sensibility to his writing, crafting narratives that are as vivid and immersive as they are thoughtful. His stories often explore the relationship between form and meaning, inviting readers to see the world through a designer’s lens where every detail matters. Syed Abubaker believes that storytelling is not just about words but about creating an experience that resonates deeply and lingers in the mind. His work is marked by clarity, precision, and an eye for beauty, making his prose both accessible and richly textured. Beyond his own writing, he is passionate about sharing his creative process with others, mentoring emerging talents and encouraging interdisciplinary thinking. Whether he is developing a new concept, designing a visual narrative, or writing an evocative piece, Syed Abubaker Ali Gilani approaches every project with dedication and originality. His commitment to innovation and quality has earned him respect among peers and readers alike. Through his work, he continues to inspire others to see storytelling and design as interconnected arts capable of shaping how we understand and engage with the world.";

  return (
    <div>
      {/* Top Section */}
      <div className='px-4 sm:px-6 md:px-10 lg:px-30 pt-10 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 my-6'>
        
        <img
          src={writer1}
          alt='Abubaker Ali'
          className='w-full max-w-[250px] rounded-lg object-cover'
        />

        <div className='space-y-3 text-center md:text-left'>
          <h1 className='font-bold text-2xl text-[var(--text-dark)]'>
            Syed Abubaker Ali Gilani Designer
          </h1>

          {/* Desktop Bio */}
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

      {/* About the Writer Section */}
      <div className='m-0 md:m-10 px-6 sm:px-10 md:px-20'>
        <h1 className='font-bold text-xl mb-2 text-[var(--text-dark)]'>About the Writer</h1>

        {/* Desktop full bio */}
        <p className='hidden md:block text-justify leading-relaxed text-sm text-[var(--text-gray)]'>
          {fullBio}
        </p>

        {/* Mobile toggle bio */}
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

export default AbubakerAliDetailPage;
