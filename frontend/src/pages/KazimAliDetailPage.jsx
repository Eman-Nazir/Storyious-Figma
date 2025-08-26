


import React, { useState } from 'react';
import moral1 from "../../src/assets/images/moral1.jpg";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import AllStories from './AllStories';

const KazimAliDetailPage = () => {
  const [showFullBio, setShowFullBio] = useState(false);

  const shortBio = `Syed Kazim Ali Shah is an accomplished author with a talent for weaving rich, relatable tales. His writing brings characters to life in unforgettable ways.`;

  const fullBio = `Syed Kazim Ali Shah is an accomplished writer and storyteller celebrated for his ability to bring characters and ideas vividly to life. With a keen eye for human nature and cultural nuance, he crafts narratives that bridge tradition and modernity, drawing readers into rich, immersive worlds. His work often explores themes of identity, belonging, and the quiet struggles that shape everyday lives, making his stories deeply relatable and emotionally resonant. Syed Kazim Ali Shah has earned a reputation for clear, elegant prose that balances lyrical beauty with precise observation. He is dedicated to using storytelling as a tool for empathy, connection, and understanding, believing that a well-told tale can illuminate even the most hidden corners of the human experience. Beyond his writing, he is known for mentoring aspiring authors, sharing his knowledge generously and encouraging new voices to find their own unique style. His commitment to literary excellence and cultural heritage positions him as an influential figure in contemporary writing. Readers appreciate his authenticity, compassion, and the universal truths embedded in his work, which continues to captivate and inspire audiences both locally and internationally. Syed Kazim Ali Shah’s stories remind us of the enduring power of words to transform and unite.`;

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      {/* Top Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-30 pt-10 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] flex flex-col md:flex-row gap-6 md:gap-10 items-center py-6 my-6">
        <img
          src={moral1}
          alt="Syed Kazim Ali Shah"
          className="w-full max-w-[250px] rounded-lg object-cover"
        />

        <div className="space-y-3 text-center md:text-left">
          <h1 className="font-bold text-2xl text-[var(--text-dark)]">
            Syed Kazim Ali Shah
          </h1>

          {/* Desktop Bio */}
          <p className="hidden md:block max-w-[700px] text-[var(--text-gray)]">
            {shortBio}
          </p>

          <div className="flex justify-center md:justify-start flex-wrap gap-2 pt-2">
            {[FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram].map((Icon, index) => (
              <a
                key={index}
                href="#"
                className="bg-[var(--white)] border border-[var(--primary-color)] text-[var(--primary-color)] p-2 rounded-md"
              >
                <Icon />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section */}
      <div className="m-0 md:m-10 px-4 sm:px-10 md:px-20">
        <h1 className="font-bold text-xl mb-2 text-[var(--text-dark)]">About the Writer</h1>

        <p className="hidden md:block text-justify leading-relaxed text-sm text-[var(--text-gray)]">
          {fullBio}
        </p>

        <div className="block md:hidden">
          <p className="text-justify text-sm text-[var(--text-gray)]">
            {showFullBio ? fullBio : shortBio}
          </p>
          <button
            className="mt-2 mb-2 px-4 py-1 rounded-md text-[var(--white)] bg-[var(--primary-color)] hover:bg-[var(--primary-hover-color)] text-sm"
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

export default KazimAliDetailPage;
