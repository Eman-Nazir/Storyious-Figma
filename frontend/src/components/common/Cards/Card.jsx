import React from "react";
import { Link } from "react-router-dom";
import { Clock7, Eye, CalendarRange } from "lucide-react";

const Card = ({ story, noClamp }) => {
  //  category name from story data
  const getCategoryName = () => {
    if (typeof story?.category === 'object' && story.category !== null) {
      return story.category.name || "Story";
    }
    return "Story"; 
  };

  const formattedStory = {
    id: story?._id || "",
    title: story?.title || "Untitled Story",
    description: story?.introText || "No description available",
    image: story?.featuredImage || "",
    date: story?.createdAt ? new Date(story.createdAt).toLocaleDateString() : "Unknown date",
    readTime: story?.meta?.readTime || "0 min",
    views: story?.meta?.views || 0,
    category: getCategoryName(), 
    path: `/story/${story?._id || ""}`
  };

  const cardContent = (
    <div
      className="w-full bg-[--white] rounded-xl overflow-hidden shadow border border-[--border-muted] p-1 hover:shadow-lg transition cursor-pointer"
      style={{ backgroundColor: "var(--white)", borderColor: "var(--border-muted)" }}
    >
      {formattedStory.image && (
        <img
          src={formattedStory.image}
          alt={formattedStory.title}
          className="h-48 w-full object-cover rounded-lg"
        />
      )}
      
      {!formattedStory.image && (
        <div className="h-48 w-full bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      )}

      <div className="p-4 flex flex-col justify-between">
        <div
          className={`text-sm font-semibold text-[--pink-dark] mb-1 space-x-1 ${
            noClamp ? "" : "line-clamp-2 h-[48px]"
          }`}
          style={{ color: "var(--pink-dark)" }}
        >
          <span>{formattedStory.category}.</span>
        </div>

        <h3
          className={`text-md font-bold mb-1 ${
            noClamp ? "" : "line-clamp-3 h-[50px]"
          }`}
          style={{ color: "var(--text-dark)" }}
        >
          {formattedStory.title}
        </h3>

        <p
          className={`text-sm ${noClamp ? "" : "line-clamp-2 h-[40px]"}`}
          style={{ color: "var(--text-muted)" }}
        >
          {formattedStory.description}
        </p>

        <div className="text-xs text-gray-500 flex flex-nowrap gap-3 mt-3">
          <span className="flex gap-2 items-center whitespace-nowrap">
            <CalendarRange /> {formattedStory.date}
          </span>
          <span className="flex gap-2 items-center whitespace-nowrap">
            <Clock7 /> {formattedStory.readTime}
          </span>
          <span className="flex gap-2 items-center whitespace-nowrap">
            <Eye /> {formattedStory.views} Views
          </span>
        </div>
      </div>
    </div>
  );

  return formattedStory.id ? <Link to={formattedStory.path}>{cardContent}</Link> : cardContent;
};

export default Card;