

import React from 'react';
import { FiArrowRight } from 'react-icons/fi';

const DiscoverMore = () => {
  const topics = [
    'CSS Essays', 'PMS Essays', 'Civil Judge Essays', 'PMS Ministerial Essays',
    'Precis Writing', 'Comprehension', 'Letters', 'Applications',
    'Urdu To English Translation', 'Punctuation'
  ];

  return (
    <div className="max-w-4xl w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8 font-sans">

      {/* Visit Website Button */}
      <div className="bg-[var(--white)] shadow-sm rounded-md">
        <button className="w-full flex items-center justify-center gap-2 text-[var(--primary-color)] border border-[var(--primary-color)] rounded-md px-4 py-2 text-sm sm:text-base hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition">
          Visit Website
          <FiArrowRight className="text-lg" />
        </button>
      </div>

      {/* Gradient Box */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] p-4 sm:p-6 space-y-6 rounded-md shadow-sm">
        <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-[var(--text-dark)] text-center sm:text-left">
          Discover More Topics
        </h1>
        
        <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
          {topics.map((topic, index) => (
            <button
              key={index}
              className="whitespace-nowrap bg-[var(--white)] text-[var(--text-light-muted)] border border-[var(--border-muted)] rounded-md py-2 px-4 text-sm sm:text-base shadow-sm hover:bg-[var(--primary-color)] hover:text-[var(--white)] transition"
            >
              {topic}
            </button>
          ))}
        </div>
      </div>

      {/* Review Section */}
      <div className="space-y-4">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black)] text-center sm:text-left">
          How We Have Reviewed This Story!
        </h2>
        <p className="text-justify leading-relaxed text-[var(--text-gray)] text-sm sm:text-base md:text-lg">
          At Storyious, all stories are meticulously written and carefully reviewed for originality, clarity, emotional impact, and storytelling quality. We strictly prioritise human-written content, but we also accept AI-assisted work if it delivers authentic, engaging, meaningful, and useful narratives. Each story is evaluated based on creativity, structure, and alignment with our literary standards. Only stories that meet our editorial criteria are published, ensuring our readers enjoy high-quality, heartfelt storytelling.
        </p>
      </div>
    </div>
  );
};

export default DiscoverMore;
