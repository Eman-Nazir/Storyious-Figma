import React from "react";
import { CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";

const BlogCard = ({ article }) => {
  if (!article) return null;

  const contentCard = (
    <div className="flex flex-row gap-4 md:gap-5 border-b border-[--border-muted] pb-6 mb-4 cursor-pointer">
      <img
        src={article.image}
        alt={article.title}
        className="w-40 h-auto sm:h-28 object-cover rounded-md flex-shrink-0"
      />

      <div className="flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-sm sm:text-lg md:text-xl font-semibold mb-2 text-[--text-dark] hover:underline">
            {article.title}
          </h2>

          <p className="hidden sm:block text-sm md:text-base text-[--text-muted] sm:line-clamp-2">
            {article.description}
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs md:text-sm text-[--text-muted] mt-3">
          <CalendarDays className="w-4 h-4" />
          <span>{article.date}</span>
        </div>
      </div>
    </div>
  );

  return article?.path ? <Link to={article.path}>{contentCard}</Link> : contentCard;
};

export default BlogCard;
