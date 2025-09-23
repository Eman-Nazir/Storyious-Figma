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

const AuthorCard = ({ writer }) => {
  const validSocials = writer.socials
    ? writer.socials.filter(
        social =>
          social &&
          social.platform &&
          social.url &&
          social.url.trim() !== "" &&
          social.url !== "undefined"
      )
    : [];

  return (
    <div className="flex flex-col min-h-[480px] p-4 sm:mx-4 sm:mt-10 rounded-md shadow-md bg-[var(--white)]">
      {/* Writer Image */}
      <img
        src={writer.image}
        alt={writer.name}
        className="rounded-md object-cover h-[200px] w-full mb-3"
      />

      {/* Writer Name */}
      <h2 className="text-xl font-bold text-[var(--text-dark)] line-clamp-2 h-[48px]">
        {writer.name}
      </h2>

      {/* Short Bio */}
      <p className="text-sm text-[var(--text-muted)] line-clamp-3 h-[60px] mt-1">
        {writer.shortBio}
      </p>

      {/* Social Icons */}
      <div className="flex items-center gap-2 mt-2 h-[44px]">
        {validSocials.length > 0 ? (
          <div className="flex flex-wrap justify-start gap-2">
            {validSocials.map((social, index) => {
              const Icon = iconMap[social.platform];
              return Icon ? (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${writer.name} on ${social.platform}`}
                  className="p-2 rounded-md border border-[var(--pink-dark)] text-[var(--pink-dark)]
                             hover:bg-[var(--pink-dark)] hover:text-[var(--white)] transition-colors duration-200"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ) : null;
            })}
          </div>
        ) : (
          <span className="text-xs text-gray-400">No social links</span>
        )}
      </div>

      {/* Visit Writer Button */}
      <div className="mt-4 pt-3">
        <Link to={`/writers/${writer.slug}`}>
          <button className="w-full bg-[var(--pink-dark)] text-[var(--white)] border border-[var(--pink-dark)]
                             px-4 py-2 rounded-md hover:bg-[var(--white)] hover:text-[var(--pink-dark)]
                             transition-colors duration-200">
            Visit Writer
          </button>
        </Link>
      </div>
    </div>
  );
};

export default AuthorCard;
