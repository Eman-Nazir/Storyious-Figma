


import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaYoutube } from "react-icons/fa";

const RelatedStoriesVideo = () => {
  const [videos, setVideos] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_VIDEOS)
      .then((res) => res.json())
      .then((data) => setVideos(data));
  }, []);

  return (
    <div className="w-full px-6">
      <h1 className="text-xl sm:text-3xl font-bold text-[var(--text-dark)] mb-4 text-center md:text-left">
        Related Stories
      </h1>

      {/* MOBILE */}
      <div className="block md:hidden">
        {videos.length > 0 && (
          <div className="flex justify-center px-4">
            <div className="w-full max-w-[350px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition">
              <div className="relative">
                <img
                  src={videos[activeIndex].image}
                  alt={videos[activeIndex].title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
                {videos[activeIndex].youtubePath && (
                  <Link
                    to={videos[activeIndex].youtubePath}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={`Watch video: ${videos[activeIndex].title}`}
                  >
                    <div className="bg-[var(--color-pink)] p-3 rounded-full hover:scale-110 transition">
                      <FaYoutube className="text-white text-3xl" />
                    </div>
                  </Link>
                )}
              </div>
              <div className="p-4 flex flex-col justify-between h-[120px]">
                <h3 className="text-md font-bold text-[var(--text-dark)] mb-1 line-clamp-2">
                  {videos[activeIndex].title}
                </h3>
                <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                  {videos[activeIndex].description}
                </p>
              </div>
            </div>
          </div>
        )}

        {videos.length > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                aria-label={`Show video ${i + 1}`}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  activeIndex === i
                    ? "bg-[var(--color-pink)] scale-110"
                    : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* DESKTOP */}
      <div className="hidden md:grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 justify-center">
        {videos.map((story) => (
          <div
            key={story.id}
            className="relative w-full max-w-[350px] bg-white rounded-xl overflow-hidden shadow hover:shadow-lg transition mx-auto"
          >
            <div className="relative">
              <img
                src={story.image}
                alt={story.title}
                className="h-48 w-full object-cover rounded-t-lg"
              />
              {story.youtubePath && (
                <Link
                  to={story.youtubePath}
                  className="absolute inset-0 flex items-center justify-center"
                  aria-label={`Watch video: ${story.title}`}
                >
                  <div className="bg-[var(--color-pink)] p-3 rounded-full hover:scale-110 transition">
                    <FaYoutube className="text-white text-3xl" />
                  </div>
                </Link>
              )}
            </div>
            <div className="p-4 flex flex-col justify-between h-[120px]">
              <h3 className="text-md font-bold text-[var(--text-dark)] mb-1 line-clamp-2">
                {story.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] line-clamp-2">
                {story.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedStoriesVideo;
