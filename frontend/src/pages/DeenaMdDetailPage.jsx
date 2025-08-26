



import React, { useState } from 'react';
import writer2 from "../../src/assets/images/writer2.jpg";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import AllStories from './AllStories';

const DeenaMdDetailPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = `Deena Kuruvilla, MD is a dedicated physician and writer known for her clear, compassionate approach. She shares expert medical insights to help readers understand and manage their health.`;

  const fullBio = `Deena Kuruvilla, MD is a respected physician and writer known for her commitment to improving patient care through clear communication and evidence-based education. As a specialist with years of clinical experience, she understands the challenges patients face in navigating complex health information. Through her writing, Dr. Kuruvilla aims to bridge the gap between medical knowledge and everyday understanding, making health topics accessible and empowering for a broad audience. Her work combines medical expertise with compassion, offering practical advice and insights that help readers make informed decisions about their well-being. Whether addressing migraine management, chronic pain, or overall wellness, she emphasizes a patient-centered approach that respects individual needs and experiences. Beyond her clinical practice, Dr. Kuruvilla is dedicated to mentoring healthcare professionals and advocating for improved standards in patient education and care delivery. Her thoughtful, clear, and engaging writing has earned her a reputation as a trusted voice in medical communication. Through her articles, lectures, and patient resources, Deena Kuruvilla, MD continues to inspire confidence, promote understanding, and encourage proactive, informed health choices for people everywhere. Her work reflects a deep belief in the power of knowledge to transform health outcomes and improve lives.`;

  return (
    <div>
      {/* Top Section */}
      <div className='px-4 sm:px-6 md:px-10 lg:px-30 pt-10 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 my-6'>
        
        <img
          src={writer2}
          alt='Deena Kuruvilla'
          className='w-full max-w-[250px] rounded-lg object-cover'
        />

        <div className='space-y-3 text-center md:text-left'>
          <h1 className='font-bold text-2xl text-[var(--text-dark)]'>
            Deena Kuruvilla, MD
          </h1>

          {/* Desktop Bio */}
          <p className='hidden md:block max-w-[700px] text-[var(--text-dark)]'>
            {shortBio}
          </p>

          {/* Social Icons */}
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

      {/* About the Writer */}
      <div className='m-0 md:m-10 px-6 sm:px-10 md:px-20'>
        <h1 className='font-bold text-xl mb-2 text-[var(--text-dark)]'>About the Writer</h1>

        <p className='hidden md:block text-justify leading-relaxed text-sm text-[var(--text-dark)]'>
          {fullBio}
        </p>

        <div className='block md:hidden'>
          <p className='text-justify text-sm text-[var(--text-dark)]'>
            {showFullBio ? fullBio : shortBio}
          </p>
          <button
            className='mt-2 mb-2 px-4 py-1 rounded-md text-[var(--white)] bg-[var(--pink-dark)] text-sm'
            onClick={() => setShowFullBio(!showFullBio)}
          >
            {showFullBio ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>

      <AllStories />
    </div>
  );
}

export default DeenaMdDetailPage;
