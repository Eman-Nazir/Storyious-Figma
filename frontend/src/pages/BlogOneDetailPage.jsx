



import { useState } from 'react';
import { Clock7, Eye, CalendarRange } from "lucide-react";
import { GoComment } from "react-icons/go";
import Share from "../../src/assets/icons/Share";
import { LuCopyCheck } from "react-icons/lu";
import blog1 from "../../src/assets/images/blog1.jpg";
import blog2 from "../../src/assets/images/blog2.jpg";
import blog3 from "../../src/assets/images/blog3.jpg";
import ReadMore from "../../src/components/common/ReadMore";
import Comment from '../sections/StoryDetailedPage/1stStory/Comment';
import History from '../sections/StoryDetailedPage/1stStory/History';
import DiscoverMore from '../sections/StoryDetailedPage/1stStory/DiscoverMore';
import CommentsList from '../sections/StoryDetailedPage/1stStory/CommentsList';
import RelatedStories from '../sections/StoryDetailedPage/1stStory/RelatedStories';
import StartQuiz from "../../src/components/common/StartQuiz";
import { FaFacebookF, FaXTwitter, FaLinkedinIn, FaPinterestP, FaInstagram } from 'react-icons/fa6';
import CommentReply from '../sections/StoryDetailedPage/1stStory/CommentReply';

const BlogOneDetailPage = () => {
  const [quizpopup, setquizpopup] = useState(false);

  return (
    <div className="flex flex-col lg:flex-row lg:gap-16 mx-4 sm:mx-6 lg:mx-14 my-10 lg:my-14">

      {/* LEFT SIDE */}
      <div className="flex-1 space-y-5">

        <h1 className="text-2xl sm:text-3xl font-bold text-[var(--text-dark)]">
          13 Complete Protein Sources for Vegetarians
        </h1>

        

        <div className="flex flex-col sm:flex-row sm:justify-between border-t border-b border-[var(--text-muted)] py-3 gap-4">
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

        <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-gray)]">
          Agriculture has been the backbone of human sustenance since the dawn of <br className="hidden sm:block" />
          civilization, providing the <span className="text-[var(--pink-dark)] text-lg">vital link</span> between the soil beneath his feet and the nourishment on his plate.
        </p>

        {/* BLOG CARDS */}
        {[blog1, blog2, blog3].map((img, idx) => (
          <div key={idx} className="border border-[var(--gray-light)] rounded-md p-4 space-y-4">
            <div className="flex gap-3 items-center">
              <div className="bg-[color:var(--pink-dark)/0.1] pt-3 text-lg font-bold w-[48px] h-[50px] text-center rounded-md">{idx + 1}</div>
              <h1 className="text-lg font-bold text-[var(--text-dark)]">Tamás Hám-Szabó</h1>
            </div>
            <img src={img} alt={`blog${idx + 1}`} className="rounded-md my-4 w-full max-h-[425px] object-cover" />
            <h1 className="text-lg font-bold text-[var(--text-dark)]">Syed Abubaker Ali Gilani Designer?</h1>
            <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-gray)]">
              The content published on HowTests, including One-Liner MCQs, blogs, and articles, is created for educational and informational purposes only to assist competitive exam aspirants in their preparation. While our experts and readers actively monitor and update the material to ensure accuracy, <span className="text-[var(--pink-dark)] text-lg">HowTests</span> does not guarantee absolute correctness, completeness, or timeliness of the content.
            </p>
            {idx < 2 && (
              <button className="bg-[var(--pink-dark)] text-white px-4 py-3 rounded-md cursor-pointer">Visit Author</button>
            )}
          </div>
        ))}

        <p className="text-base sm:text-lg leading-relaxed text-justify text-[var(--text-gray)]">
          The content published on HowTests, including One-Liner MCQs, blogs, and articles, is created for educational and informational purposes only to assist competitive exam aspirants in their preparation. While our experts and readers actively monitor and update the material to ensure accuracy, <span className="text-[var(--pink-dark)] text-lg">HowTests</span> does not guarantee absolute correctness, completeness, or timeliness of the content.
        </p>

        <ReadMore />
        <DiscoverMore />
        <History />
        <Comment />
        <CommentsList />
        <CommentReply/>
        <RelatedStories />
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden lg:flex flex-col space-y-5 w-[300px] mt-10">

        <div className="bg-[var(--bg-section)] p-4 space-y-4 rounded-md">
          <h1 className="text-[var(--text-gray)] font-semibold">Do you have Enough Time?</h1>
          <p className="text-sm text-[var(--text-muted)]">
            Take our 10-minute quiz, with lifelines and swapping options, for a quick and reliable snapshot of your English proficiency.
          </p>
          <button
            onClick={() => setquizpopup(true)}
            className="bg-[var(--pink-dark)] px-4 py-2 text-white rounded-md text-sm font-medium cursor-pointer">
            Start Quiz
          </button>
        </div>

        <div className="flex flex-col p-4 rounded-md space-y-3 border border-[var(--gray-light)]">
          <h1 className="text-[var(--text-muted)] font-semibold">Follow Us On</h1>
          <div className="flex flex-wrap justify-center gap-2">
            <a href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md"><FaFacebookF /></a>
            <a href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md"><FaXTwitter /></a>
            <a href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md"><FaLinkedinIn /></a>
            <a href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md"><FaPinterestP /></a>
            <a href="#" className="bg-white border border-[var(--gray-light)] text-[var(--text-muted)] p-2 rounded-md"><FaInstagram /></a>
          </div>
        </div>

        <div className="px-6 py-20 bg-[var(--bg-section)] text-center">
          <h1 className="font-bold text-[var(--text-dark)]">ADS</h1>
          <p className="text-sm text-[var(--text-gray)] mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas magni cupiditate aliquam quibusdam nostrum accusantium fuga delectus quo exercitationem!
          </p>
        </div>
      </div>

      <StartQuiz show={quizpopup} onClose={() => setquizpopup(false)} />
    </div>
  );
};

export default BlogOneDetailPage;
