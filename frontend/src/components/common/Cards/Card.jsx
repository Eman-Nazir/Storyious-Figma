import React from "react";
import { Link } from "react-router-dom";
import { Clock7, Eye, CalendarRange } from "lucide-react";

const Card = ({ story, noClamp }) => {
  const getCategoryName = () => {
    if (story && story.categories && Array.isArray(story.categories) && story.categories.length > 0) {
      if (typeof story.categories[0] === 'object' && story.categories[0] !== null) {
        return story.categories[0].name || "Story";
      }
      return story.categories[0] || "Story";
    }
    
    if (story && story.category && typeof story.category === 'object' && story.category !== null) {
      return story.category.name || "Story";
    }
    
    return (story && story.category) || "Story"; 
  };

  const getAllCategoryNames = () => {
    if (story && story.categories && Array.isArray(story.categories) && story.categories.length > 0) {
      return story.categories.map(cat => {
        if (typeof cat === 'object' && cat !== null) {
          return cat.name || "Story";
        }
        return cat;
      }).filter(Boolean);
    }
    return [getCategoryName()];
  };

  const storyId = story && story._id ? story._id : "";
  const storyTitle = story && story.title ? story.title : "Untitled Story";
  const storyIntroText = story && story.introText ? story.introText : "";
  const storyContent = story && story.content ? story.content : "";
  const storyImage = story && story.featuredImage ? story.featuredImage : "";
  const storyCreatedAt = story && story.createdAt ? story.createdAt : "";
  const storyMeta = story && story.meta ? story.meta : {};
  
  let description = storyIntroText;
  if (!description && storyContent) {
    const plainText = storyContent.replace(/<[^>]*>/g, '').substring(0, 100);
    description = plainText + (plainText.length >= 100 ? "..." : "");
  }
  if (!description) {
    description = "No description available";
  }

  const formattedStory = {
    id: storyId,
    title: storyTitle,
    description: description,
    image: storyImage,
    date: storyCreatedAt ? new Date(storyCreatedAt).toLocaleDateString() : "Unknown date",
    readTime: storyMeta.readTime || "0 min",
    views: storyMeta.views || 0,
    category: getCategoryName(), 
    categories: getAllCategoryNames(),
    path: `/story/${storyId}`
  };

  const cardContent = (
    <div
      className="w-full bg-[--white] rounded-xl overflow-hidden shadow border border-[--border-muted] p-1 hover:shadow-lg transition cursor-pointer h-full flex flex-col"
      style={{ backgroundColor: "var(--white)", borderColor: "var(--border-muted)" }}
    >
      {formattedStory.image ? (
        <img
          src={formattedStory.image}
          alt={formattedStory.title}
          className="h-48 w-full object-cover rounded-lg"
          onError={(e) => {
            e.target.style.display = 'none';
            const fallback = e.target.parentNode.querySelector('.image-fallback');
            if (fallback) {
              fallback.style.display = 'flex';
            }
          }}
        />
      ) : null}
      
      <div className="image-fallback" style={{ display: formattedStory.image ? 'none' : 'flex' }}>
        <div className="h-48 w-full bg-gray-200 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">No image</span>
        </div>
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div
          className={`text-sm font-semibold text-[--pink-dark] mb-1 ${
            noClamp ? "" : "line-clamp-1"
          }`}
          style={{ color: "var(--pink-dark)" }}
        >
          {formattedStory.categories.map((cat, index) => (
            <span key={index}>
              {cat}
              {index < formattedStory.categories.length - 1 ? ", " : ""}
            </span>
          ))}
          <span className="text-[--pink-dark]"> • {formattedStory.readTime}</span>
        </div>

        <h3
          className={`text-md font-bold mb-1 ${
            noClamp ? "" : "line-clamp-2 min-h-[50px]"
          }`}
          style={{ color: "var(--text-dark)" }}
        >
          {formattedStory.title}
        </h3>

        <p
          className={`text-sm flex-grow ${noClamp ? "" : "line-clamp-3"}`}
          style={{ color: "var(--text-muted)" }}
        >
          {formattedStory.description}
        </p>

        <div className="text-xs text-gray-500 flex flex-wrap gap-3 mt-3 pt-3 border-t border-[--border-muted]">
          <span className="flex gap-1 items-center whitespace-nowrap">
            <CalendarRange className="w-3 h-3" /> 
            {formattedStory.date}
          </span>
          <span className="flex gap-1 items-center whitespace-nowrap">
            <Clock7 className="w-3 h-3" /> 
            {formattedStory.readTime}
          </span>
          <span className="flex gap-1 items-center whitespace-nowrap">
            <Eye className="w-3 h-3" /> 
            {formattedStory.views} Views
          </span>
        </div>
      </div>
    </div>
  );

  return formattedStory.id ? (
    <Link to={formattedStory.path} className="block h-full">
      {cardContent}
    </Link>
  ) : (
    <div className="h-full">{cardContent}</div>
  );
};

export default Card;