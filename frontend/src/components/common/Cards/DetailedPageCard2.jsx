


import React, { useEffect, useState } from "react";
import Card from "../Cards/Card";

const DetailedPageCard2 = () => {
  const [moral, setMoral] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => setMoral(data));
  }, []);

  return (
    <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-18 my-12 bg-[--white] text-[--text-dark]">
      {/* Mobile View: Stack Layout */}
      <div className="block md:hidden">
        <div className="flex flex-col gap-6 items-center">
          {moral.map((story) => (
            <div key={story.id} className="w-full max-w-sm">
              <Card story={story} />
            </div>
          ))}
        </div>
      </div>

      {/* Desktop View: Grid Layout */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {moral.map((story) => (
          <div key={story.id}>
            <Card story={story} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedPageCard2;
