import React from 'react';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";
import { LuCopyCheck } from "react-icons/lu";
import Share from "../../../assets/icons/Share";
import featured3 from "../../../assets/images/featured3.jpg";
import NFT from "../../../assets/images/NFT.png";
import boyInStrert from "../../../assets/images/boyInStreet.png";
import DetailPageVideo from "../../../assets/videos/DeatilPageVideo.mp4";
import { FaWhatsapp } from "react-icons/fa";

const tabs = [
  "Bedtime Stories",
  "Bedtime Stories for Kids",
  "Bedtime Stories for Adults",
  "Free Unique Bedtime Stories",
  "Bedtime Stories for American Kids",
  "Bedtime Stories for Americans",
];

const HiddenGemsPage = () => {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Heading and Tags */}
      <div>
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[var(--black)]">
          Hidden Gems: Europe’s Best Kept Secret Destinations
        </h1>
        <div className="flex flex-wrap gap-2 mt-2">
          <p className="text-sm sm:text-base text-[var(--primary-color)]">5 Min Stories.</p>
          <p className="text-sm sm:text-base text-[var(--primary-color)]">Bedtime Stories.</p>
          <p className="text-sm sm:text-base text-[var(--primary-color)]">Moral Stories</p>
        </div>
      </div>

      {/* Meta Data Row */}
      <div className="flex flex-col sm:flex-row sm:justify-between border-t border-b border-[var(--gray-mid)] py-3 gap-4">
        <div className="w-full flex flex-wrap justify-between items-center gap-y-2 text-[var(--gray-mid)] text-sm sm:text-base">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="flex items-center gap-1 whitespace-nowrap">
              <CalendarRange className="w-4 h-4" /> 24 Nov. 2024
            </p>
            <p className="flex items-center gap-1 whitespace-nowrap">
              <Clock7 className="w-4 h-4" /> 35 Min.
            </p>
            <p className="flex items-center gap-1 whitespace-nowrap">
              <Eye className="w-4 h-4" /> 35k
            </p>
            <p className="items-center gap-1 whitespace-nowrap hidden sm:flex">
              <GoComment className="w-5 h-5" /> 2k Comments
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Share />
            <LuCopyCheck className="text-[var(--gray-mid)] w-6 h-6 rounded-sm border border-[var(--gray-mid)] p-1" />
          </div>
        </div>
      </div>

      {/* Intro Text */}
      <p className="text-sm sm:text-base md:text-lg leading-relaxed text-justify text-[var(--text-gray)]">
        Agriculture has been the backbone of human sustenance since the dawn of civilization, providing the vital link between the soil beneath his feet and the nourishment on his plate.
      </p>

      <img
        src={featured3}
        alt="Feature"
        className="rounded-md w-full object-cover my-3 shadow-sm max-h-[600px]"
      />

      {/* Floating Share Bar */}
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50 max-w-full px-2">
        <div className="bg-[var(--white)] rounded-full shadow-md border border-[var(--gray-mid)] px-4 py-2 flex items-center gap-4">
          <FaWhatsapp className="text-[var(--whatsapp-green)] w-6 h-6 cursor-pointer hover:scale-110 transition" />
          <Share />
          <LuCopyCheck className="text-[var(--gray-mid)] w-6 h-6 cursor-pointer hover:scale-110 transition" />
        </div>
      </div>

      {/* Article Content */}
      <div className="space-y-4">
        <p className="text-justify leading-relaxed text-[var(--text-gray)]">
          Theoretically, the <span className="text-[var(--primary-color)] font-semibold">"World Food System"</span> and "The Economics of Agriculture" dimensions are integral in shaping food production...
        </p>

        <p className="text-justify leading-relaxed text-[var(--text-gray)]">
          Throughout history, the advancing economics of agriculture has significantly impacted the world food system, resulting in positive and negative outcomes...
        </p>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black)] my-2">
          Sign Up To Read This Article And Everything Else
        </h2>

        <p className="text-justify leading-relaxed text-[var(--text-gray)]">
          Theoretically, the "World Food System" and "The Economics of Agriculture" dimensions are integral...
        </p>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black)] my-2">
          How can I manage refractory chronic migraine?
        </h2>

        <p className="text-[var(--text-gray)] text-justify leading-relaxed">
          There’s no cure for migraine, including refractory chronic migraine. Management of the condition means trying to reduce your number of migraine days by:
        </p>

        <ul className="list-disc pl-5 text-[var(--text-gray)] space-y-1">
          <li>avoiding your triggers</li>
          <li>seeking out alternative therapies</li>
          <li>making certain lifestyle changes</li>
        </ul>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black)] my-2">
          When does chronic migraine become refractory?
        </h2>

        <p className="text-[var(--text-gray)] text-justify leading-relaxed">
          Experts do not <span className="text-[var(--primary-color)] font-semibold">universally agree</span> on the criteria...
        </p>
        <p className="text-[var(--text-gray)] text-justify leading-relaxed">
          According to the <span className="text-[var(--primary-color)] font-semibold">ICHD-3</span>, it can even be difficult...
        </p>
        <p className="text-[var(--text-gray)] text-justify leading-relaxed">
          Despite the differing criteria, a 2019 review outlines several things doctors can look for...
        </p>

        <ul className="list-disc pl-5 text-[var(--text-gray)] space-y-3">
          <li>
            <span className="font-semibold">Preventive treatments have failed:</span> Several preventive treatments aim...
          </li>
          <li>
            <span className="font-semibold">Alternative therapies have failed:</span> If you’ve tried things like acupuncture...
          </li>
          <li>
            <span className="font-semibold">Doctors have considered medication overuse headache (MOH):</span> Some people with chronic migraine...
          </li>
        </ul>

        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <video className="w-full h-auto rounded-md" controls>
            <source src={DetailPageVideo} type="video/mp4" />
          </video>
        </div>

        <img
          src={NFT}
          alt="NFT"
          className="w-full rounded-lg my-5 max-h-[500px] object-cover shadow-sm"
        />

        <img
          src={boyInStrert}
          alt="Boy In Street"
          className="w-full rounded-lg mt-5 max-h-[500px] object-cover shadow-sm"
        />
        <p className="text-xs sm:text-sm text-[var(--text-gray)] text-center">Infographic by Maya Chastain</p>

        <p className="text-[var(--text-gray)] text-justify leading-relaxed my-4">
          There’s no cure for migraine, including refractory chronic migraine. Management...
        </p>

        <p className="font-semibold text-center text-[var(--text-gray)] my-4">
          "There’s no cure for migraine, including refractory chronic migraine. Management of the condition means trying to reduce your number of migraine days by Preventive treatment aims to reduce the frequency."
        </p>

        <p className="text-[var(--text-gray)] text-justify leading-relaxed my-2">
          There’s no cure for migraine, including refractory chronic migraine. Management...
        </p>

        <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--black)] my-2">
          Takeaway
        </h2>

        <p className="text-[var(--text-gray)] text-justify leading-relaxed">
          There’s no cure for migraine, including refractory chronic migraine. Management...
        </p>
      </div>

      {/* Tabs & CTA */}
      <div className="space-y-6 font-sans">
        <div className="flex flex-wrap gap-2">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className={`px-3 py-1 text-sm rounded-md border transition 
                ${tab === "Bedtime Stories for Kids"
                  ? "bg-[var(--primary-color)] text-white"
                  : "bg-[var(--white)] text-gray-800 border-gray-300"
                }
                hover:bg-[var(--primary-color)] hover:text-white`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="bg-[#fdf6f8] p-6 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
          <div className="max-w-2xl">
            <h2 className="text-2xl font-semibold mb-2">Want To Read More Stories?</h2>
            <p className="text-gray-700 w-[500px]">
              Dive deeper into the world of storytelling with Storyious. Explore our vast collection of captivating tales across genres—from heartfelt moral stories to thrilling adventures and magical fairytales.
            </p>
          </div>
          <button className="bg-[var(--primary-color)] text-white my-1.5 px-6 py-2 rounded-md text-base font-medium ">
            Read More
          </button>
        </div>
      </div>
    </div>
  );
};

export default HiddenGemsPage;
