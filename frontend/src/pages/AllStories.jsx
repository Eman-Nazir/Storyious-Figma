

import { useState, useEffect } from 'react';
import Card from "../../src/components/common/Cards/Card.jsx";
import Community from '../../src/components/common/Community.jsx'

const AllStories = () => {
  const [allstories, setallstories] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_ALLSTORIES)
      .then((res) => res.json())
      .then((data) => setallstories(data));
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] mb-8 py-14">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-12">
          <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-[var(--text-dark)] mb-2">
            All Stories
          </h1>
          <p className="text-md sm:text-base text-[var(--text-gray)] leading-relaxed text-justify">
            Discover the full collection of stories on Storyious! From timeless classics and magical fairytales to thought-provoking moral tales and spine-chilling
            scary stories, explore a world of storytelling for every mood and reader.
          </p>
        </div>
      </div>

      {/* Stories Grid */}
      <div className="max-w-[1200px] mx-auto sm:px-6 lg:px-8 my-28 grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {allstories.map((story) => (
          <Card key={story.id} story={story} noClamp={true} />
        ))}
      </div>

      {/* Community Section */}
      <Community />
    </div>
  );
}

export default AllStories;
