

import React from "react";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { FaPinterestP } from "react-icons/fa6";
import TwitterX from "../../assets/icons/TwitterX";

const Community = () => {
  const socialLinks = [
    {
      icon: <Facebook className="text-[var(--pink-dark)] w-5 h-5" />,
      url: "https://www.facebook.com/people/Storyious/100094542077338/",
    },
    {
      icon: <TwitterX />,
      url: "https://www.whatsapp.com/channel/0029Varce6hISTkE01NLxH38",
    },
    {
      icon: <Linkedin className="text-[var(--pink-dark)] w-5 h-5" />,
      url: "https://www.linkedin.com/company/storyious/",
    },
    {
      icon: <Instagram className="text-[var(--pink-dark)] w-5 h-5" />,
      url: "https://www.instagram.com/storyious_/?igsh=YmJ0eGh0eW5tYmJ5",
    },
    {
      icon: <FaPinterestP className="text-[var(--pink-dark)] w-5 h-5" />,
      url: "https://www.pinterest.com/storyious/",
    },
  ];

  return (
    <div
      className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 my-10 min-h-[240px] rounded-md
      pt-[69px] pb-[69px] px-[150px]
      max-sm:pt-[39px] max-sm:pb-[39px] max-sm:px-[20px]"
    >
      <h1 className="text-lg sm:text-xl md:text-2xl font-bold mb-4 text-[var(--text-dark)]">
        Community
      </h1>

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 flex-wrap">
        <p className="text-sm sm:text-base text-[var(--text-gray)] leading-relaxed text-justify lg:max-w-[70%]">
          Join the Storyious community on social media! Connect with fellow
          readers and writers, share your favorite stories, and stay updated on
          the latest tales, writing tips, and storytelling events.
        </p>

        <div className="flex gap-4 lg:gap-5 flex-wrap">
          {socialLinks.map(({ icon, url }, index) => (
            <a
              key={index}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 border-2 border-[var(--pink-dark)] rounded-md flex items-center justify-center hover:bg-[var(--pink-dark)] hover:text-white transition"
            >
              {icon}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Community;
