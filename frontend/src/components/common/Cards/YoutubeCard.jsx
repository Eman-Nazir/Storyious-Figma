


import React from "react";
import { Link } from "react-router-dom";
import { ImYoutube } from "react-icons/im";
import {
  Clock7,
  Eye,
  CalendarRange,
  BookOpen,
  UserRound
} from "lucide-react";

const YoutubeCard = ({ story, noClamp }) => {
  const cardContent = (
    <div className="w-full bg-[--white] rounded-xl overflow-hidden shadow border border-[--border-muted] p-1 hover:shadow-lg transition cursor-pointer">
      
      <div className="relative h-48 w-full">
        <img
          src={story.image}
          alt={story.title}
          className="h-full w-full object-cover rounded-lg"
        />

        {story.youtubePath && (
          <Link
            to={story.youtubePath}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="bg-red-600 px-3 py-2 rounded-lg inline-flex items-center justify-center">
              <ImYoutube className="text-[--white] text-4xl" />
            </div>
          </Link>
        )}
      </div>

      <div className="p-4 flex flex-col justify-between">
        {story.categories?.length > 0 && (
          <div
            className={`text-sm font-semibold text-[--pink-dark] mb-1 space-x-1 ${
              noClamp ? "" : "line-clamp-2 h-[48px]"
            }`}
          >
            {story.categories.map((cat, idx) => (
              <span key={idx} className="mr-1">
                {cat}.
              </span>
            ))}
          </div>
        )}

        <h3
          className={`text-md font-bold text-[--text-dark] mb-1 ${
            noClamp ? "" : "line-clamp-3 h-[50px]"
          }`}
        >
          {story.title}
        </h3>

        <p
          className={`text-sm text-[--text-muted] ${
            noClamp ? "" : "line-clamp-2 h-[40px]"
          }`}
        >
          {story.description}
        </p>
      </div>
    </div>
  );

  return story?.path ? <Link to={story.path}>{cardContent}</Link> : cardContent;
};

export default YoutubeCard;
