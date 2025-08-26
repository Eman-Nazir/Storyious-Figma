


import React from 'react';
import relatedStory1 from "../../../assets/images/relatedStory1.png";
import relatedStory2 from "../../../assets/images/relatedStory2.png";
import { CalendarRange, Clock7, Eye } from "lucide-react";

const RelatedStories = () => {
  const relatedStories = [
    {
      id: 1,
      title: "Chasing Sunsets: The World's Most Scenic Destinations",
      categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
      date: "24 Nov. 2024",
      readTime: "35 Min. Read",
      views: "35k Views",
      image: relatedStory1
    },
    {
      id: 2,
      title: "Hidden Gems: Europe's Best Kept Secret Destinations",
      categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
      date: "24 Nov. 2024",
      readTime: "35 Min. Read",
      views: "35k Views",
      image: relatedStory2
    },
    {
      id: 3,
      title: "Hidden Gems: Europe's Best Kept Secret Destinations",
      categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
      date: "24 Nov. 2024",
      readTime: "35 Min. Read",
      views: "35k Views",
      image: relatedStory2
    }
  ];

  return (
    <div className="flex flex-col gap-6 w-full my-10 px-6">
      {relatedStories.map((story) => (
        <div
          key={story.id}
          className="flex flex-col md:flex-row gap-3 pb-5 border-b-2 border-[var(--gray-light)] overflow-hidden"
        >
          <img
            src={story.image}
            alt={story.title}
            className="w-full md:w-[200px] h-[200px] md:h-[150px] object-cover rounded-md"
          />
          <div className="py-2 md:pr-2 space-y-2 flex-1">
            <div className="text-sm text-[var(--primary-color)] flex flex-wrap gap-1">
              {story.categories.map((cat, id) => (
                <span key={id}>{cat}.</span>
              ))}
            </div>
            <h3 className="font-semibold text-base md:text-sm">{story.title}</h3>
            <div className="text-sm text-[var(--text-light-muted)] flex gap-x-4 flex-wrap">
              <span className="flex items-center gap-1">
                <CalendarRange className="w-4 h-4" /> {story.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock7 className="w-4 h-4" /> {story.readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" /> {story.views}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RelatedStories;

