

import React from 'react';
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import HistoryCheckbox from '../../../assets/icons/HistoryCheckbox';
import { Link } from 'react-router-dom';

const History = ({ writer, storyDate }) => {
  if (!writer) return null;

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 text-[var(--text-dark)] font-sans">
      
      <div className="relative pl-8">
        <div className="flex items-center relative">
          <div className="w-5 h-5 rounded-full flex items-center justify-center">
            <HistoryCheckbox />
          </div>
          <h2 className="ml-3 text-xl font-semibold text-[var(--pink-dark)]">History</h2>
        </div>

        <div className="ml-2 h-8 w-[2px] bg-[var(--text-gray-opacity)] my-1"></div>

        <div className="ml-1 flex items-center relative">
          <div className="w-3 h-3 rounded-full bg-[var(--text-gray)] flex-shrink-0"></div>
          <p className="ml-3 font-semibold text-lg">
            {storyDate ? new Date(storyDate).toLocaleDateString() : 'Unknown Date'}
          </p>
        </div>

        <div className="ml-2 h-20 w-[2px] bg-[var(--text-gray-opacity)] my-1">
          <div className="my-3 ml-4 w-[100px] flex flex-col gap-3">
            <span className="text-sm text-[var(--text-gray)]">Written By</span>
            <span className="text-sm font-semibold text-[var(--text-gray-light)]">
              {writer.name}
            </span>
          </div>
        </div>
      </div>

      {/* Author Info */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] p-4 sm:p-6 rounded-xl shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <img
          src={writer.image}
          alt={writer.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div className="space-y-2">
          <h3 className="font-bold text-lg">{writer.name}</h3>
          <p className="text-sm text-[var(--text-gray)] leading-relaxed">
            {writer.shortBio}
          </p>
         <Link
  to={`/writers/${writer.slug}`}
  className="text-[var(--pink-dark)] text-sm font-semibold inline-block"
>
  Visit Writer
</Link>

        </div>
      </div>

      {/* Share Section */}
      <div className="bg-[var(--pink-dark)] text-[var(--white)] flex flex-col sm:flex-row justify-between items-center p-4 rounded-md space-y-3 sm:space-y-0 sm:space-x-4">
        <span className="font-semibold text-center sm:text-left">Share This Story</span>
        <div className="flex flex-wrap justify-center sm:justify-end gap-2">
          <a href="#" className="bg-[var(--white)] text-[var(--pink-dark)] p-2 rounded-md"><FaFacebookF /></a>
          <a href="#" className="bg-[var(--white)] text-[var(--pink-dark)] p-2 rounded-md"><FaXTwitter /></a>
          <a href="#" className="bg-[var(--white)] text-[var(--pink-dark)] p-2 rounded-md"><FaLinkedinIn /></a>
          <a href="#" className="bg-[var(--white)] text-[var(--pink-dark)] p-2 rounded-md"><FaPinterestP /></a>
          <a href="#" className="bg-[var(--white)] text-[var(--pink-dark)] p-2 rounded-md"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default History;
