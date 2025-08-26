
import React from "react";
import { Link } from "react-router-dom";
import { Clock7, Eye, CalendarRange, BookOpen, UserRound } from "lucide-react";

const Card = ({ story, noClamp }) => {
  const cardContent = (
    <div
      className="w-full bg-[--white] rounded-xl overflow-hidden shadow border border-[--border-muted] p-1 hover:shadow-lg transition cursor-pointer"
      style={{ backgroundColor: "var(--white)", borderColor: "var(--border-muted)" }}
    >
      <img
        src={story.image}
        alt={story.title}
        className="h-48 w-full object-cover rounded-lg"
      />

      <div className="p-4 flex flex-col justify-between">
        {story.categories?.length > 0 && (
          <div
            className={`text-sm font-semibold text-[--pink-dark] mb-1 space-x-1 ${
              noClamp ? "" : "line-clamp-2 h-[48px]"
            }`}
            style={{ color: "var(--pink-dark)" }}
          >
            {story.categories.map((cat, idx) => (
              <span key={idx} className="mr-1">
                {cat}.
              </span>
            ))}
          </div>
        )}

        <h3
          className={`text-md font-bold mb-1 ${
            noClamp ? "" : "line-clamp-3 h-[50px]"
          }`}
          style={{ color: "var(--text-dark)" }}
        >
          {story.title}
        </h3>

        <p
          className={`text-sm ${noClamp ? "" : "line-clamp-2 h-[40px]"}`}
          style={{ color: "var(--text-muted)" }}
        >
          {story.description}
        </p>

        

        <div className="text-xs text-gray-500 flex flex-nowrap gap-3 mt-3">
  {story?.date && (
    <span className="flex gap-2 items-center whitespace-nowrap">
      <CalendarRange /> {story.date}
    </span>
  )}
  {story?.readTime && (
    <span className="flex gap-2 items-center whitespace-nowrap">
      <Clock7 /> {story.readTime}
    </span>
  )}
  {story?.views && (
    <span className="flex gap-2 items-center whitespace-nowrap">
      <Eye /> {story.views} View
    </span>
  )}
  {story?.allstories && (
    <span className="flex gap-2 items-center whitespace-nowrap">
      <BookOpen /> {story.allstories}
    </span>
  )}
  {story?.reader && (
    <span className="flex gap-2 items-center whitespace-nowrap">
      <UserRound /> {story.reader}k Readers
    </span>
  )}
</div>

      </div>
    </div>
  );

  return story?.path ? <Link to={story.path}>{cardContent}</Link> : cardContent;
};

export default Card;
