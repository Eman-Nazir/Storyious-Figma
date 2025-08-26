




import React from 'react';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";
import { LuCopyCheck } from "react-icons/lu";
import Share from "../assets/icons/Share";
import videoPage2 from "../../src/assets/videos/videoPage2.mp4";
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import LoadMore from '../sections/StoryDetailedPage/1stStory/LoadMore';
import RelatedStoriesVideo from '../sections/RelatedStoriesVideo';

const SilentCradelVideoDetailPage = () => {
  return (
    <div className="w-full py-10 bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="max-w-screen-xl mx-auto px-4 md:px-0 md:pl-[261px] md:pr-[259px] space-y-6">

        <h1 className="text-2xl sm:text-3xl font-bold">The Silent Cradle</h1>

        <div className="flex flex-wrap gap-2">
          <p className="text-sm text-[var(--primary-color)]">5 Min Stories.</p>
          <p className="text-sm text-[var(--primary-color)]">Bedtime Stories.</p>
          <p className="text-sm text-[var(--primary-color)]">Moral Stories</p>
        </div>

        <div className="flex flex-col sm:flex-row sm:justify-between border-t border-b border-[var(--border-muted)] py-3 gap-4">
          <div className="w-full flex flex-wrap justify-between items-center gap-y-2 text-[var(--text-muted)] text-sm sm:text-base">

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
              <LuCopyCheck className="text-[var(--text-muted)] w-6 h-6 rounded-sm border border-[var(--text-muted)] p-1" />
            </div>
          </div>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-light)]">
          Agriculture has been the backbone of human sustenance...
        </p>

        <div className="w-full rounded-lg overflow-hidden shadow-lg">
          <video className="w-full rounded-md" controls>
            <source src={videoPage2} type="video/mp4" />
          </video>
        </div>

        <p className="text-justify leading-relaxed text-[var(--text-light)]">
          Theoretically, the <span className="text-[var(--primary-color)] text-lg">"World Food System"</span>...
        </p>

        <p className="text-justify leading-relaxed text-[var(--text-light)]">
          Throughout history, the advancing economics of agriculture...
        </p>

        <h2 className="text-xl sm:text-2xl font-bold my-2">
          Sign Up To Read This Article And Everything Else
        </h2>
        <p className="text-justify leading-relaxed text-[var(--text-light)]">
          Theoretically, the "World Food System" and "The Economics of Agriculture"...
        </p>

        <h2 className="text-xl sm:text-2xl font-bold my-2">
          How can I manage refractory chronic migraine?
        </h2>
        <p className="text-[var(--text-light)] text-justify leading-relaxed">
          There’s no cure for migraine, including refractory chronic migraine...
        </p>
        <ul className="list-disc pl-5 text-[var(--text-light)] space-y-1">
          <li>avoiding your triggers</li>
          <li>seeking out alternative therapies</li>
          <li>making certain lifestyle changes</li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold my-2">
          When does chronic migraine become refractory?
        </h2>
        <p className="text-[var(--text-light)] text-justify leading-relaxed">
          Experts do not <span className="text-[var(--primary-color)] text-lg">universally agree</span>...
        </p>
        <p className="text-[var(--text-light)] text-justify leading-relaxed">
          According to the <span className="text-[var(--primary-color)] text-lg">ICHD-3</span>...
        </p>
        <p className="text-[var(--text-light)] text-justify leading-relaxed">
          Despite the differing criteria, a 2019 review outlines...
        </p>
        <ul className="list-disc pl-5 text-[var(--text-light)] space-y-3">
          <li>
            <span className="font-semibold">Preventive treatments have failed:</span> Several preventive treatments...
          </li>
          <li>
            <span className="font-semibold">Alternative therapies have failed:</span> If you’ve tried...
          </li>
          <li>
            <span className="font-semibold">Doctors have considered medication overuse headache (MOH):</span> ...
          </li>
        </ul>

        <h2 className="text-xl sm:text-2xl font-bold my-2">
          How can I manage refractory chronic migraine?
        </h2>
        <ul className="list-disc pl-5 text-[var(--text-light)] space-y-1">
          <li>avoiding your triggers</li>
          <li>seeking out alternative therapies</li>
          <li>making certain lifestyle changes</li>
        </ul>

        <DiscoverMore />
        <History />
        <Comment />
        <CommentsList />
        <Comment />
        <LoadMore />
        <RelatedStoriesVideo />

      </div>
    </div>
  );
};

export default SilentCradelVideoDetailPage;