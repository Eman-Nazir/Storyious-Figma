


import React, { useEffect, useState } from "react";
import YoutubeCard from "../Cards/YoutubeCard";

const DetailedVideoCard2 = () => {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_VIDEOS)
      .then((res) => res.json())
      .then((data) => setVideo(data));
  }, []);

  return (
    <div className="mx-0 px-0 sm:px-4 md:px-12 md:mx-0 lg:mx-20 bg-[--white] text-[--text-dark]">
      {/* Mobile View */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-6 items-center mx-0">
          {video.map((story) => (
            <div key={story.id} className="sm:max-w-[380px]">
              <YoutubeCard story={story} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {video.map((story) => (
          <YoutubeCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
};

export default DetailedVideoCard2;
