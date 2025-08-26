

import React from 'react';
import {
  FaFacebookF,
  FaXTwitter,
  FaLinkedinIn,
  FaPinterestP,
  FaInstagram
} from 'react-icons/fa6';
import { Link } from "react-router-dom";

const iconMap = {
  facebook: FaFacebookF,
  twitter: FaXTwitter,
  linkedin: FaLinkedinIn,
  pinterest: FaPinterestP,
  instagram: FaInstagram
};

const WriterCard = ({ writer }) => {
  const cardContent = 
    <div className="flex flex-col h-[480px] p-4 sm:mx-4 sm:mt-10 rounded-md shadow-sm bg-[--white]">
      <img
        src={writer.image}
        alt={writer.title}
        className="rounded-md object-cover h-[200px] w-full mb-3"
      />

      <h2 className="text-xl font-bold text-[--text-dark] line-clamp-2 h-[48px]">
        {writer.title}
      </h2>

      <p className="text-sm text-[--text-muted] line-clamp-3 h-[60px] mt-1">
        {writer.description}
      </p>

      <div className="flex items-center gap-2 mt-2 h-[44px]">
        {writer.icons?.length > 0 && (
          <div className="flex flex-wrap justify-start gap-2">
            {writer.icons.map((name, i) => {
              const Icon = iconMap[name];
              return Icon ? (
                <button
                  key={i}
                  className="bg-[--white] border border-[--border-muted] text-[--text-muted] p-2 rounded-md"
                >
                  <Icon />
                </button>
              ) : null;
            })}
          </div>
        )}
      </div>

      <div className="mt-4 pt-3">
        <button className="w-full bg-[--white] text-[--pink-dark] border border-[--pink-dark] px-4 py-2 rounded-md hover:bg-[--pink-dark] hover:text-[--white] transition">
          Visit Writer
        </button>
      </div>
    </div>;

  return writer?.path ? <Link to={writer.path}>{cardContent}</Link> : cardContent;
};

export default WriterCard;
