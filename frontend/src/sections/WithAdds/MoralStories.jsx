

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Card from "../../components/common/Cards/Card";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import Community from "../../components/common/Community";

const MoralStories = () => {
  const [morals, setMorals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL)
      .then((res) => res.json())
      .then((data) => setMorals(data));
  }, []);

  return (
    <>
      <div className="py-10 px-4 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-[var(--text-dark)]">Moral Stories</h1>
          <Link
            to="/allstories"
            className="flex gap-2 text-sm text-[var(--text-gray)] hover:underline"
          >
            View All{" "}
            <ArrowRight className="w-4 h-4 mt-1 text-[var(--text-gray)]" />
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm mb-6 text-[var(--text-muted)]">
          Discover timeless lessons and valuable morals through engaging stories
          that leave a lasting impact.
        </p>

        {/* Mobile slider */}
        <div className="md:hidden flex flex-col items-center">
          {morals.length > 0 && (
            <div className="w-full max-w-[380px]">
              <Card story={morals[activeIndex]} /> {/* prop pass to child component Card.jsx */}
            </div>
          )}

          {/* dots */}
          <div className="flex justify-center gap-2 mt-4">
            {morals.map((_, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`w-3 h-3 rounded-full ${
                  activeIndex === i
                    ? "bg-[var(--dot-active)]"
                    : "bg-[var(--dot-inactive)]"
                }`}
              
              />
            ))}
          </div>
        </div>

        {/* Desktop grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
          {morals.map((story) => (
            <Card key={story.id} story={story} />
          ))}
        </div>
      </div>

      <Community />
    </>
  );
};

export default MoralStories;
