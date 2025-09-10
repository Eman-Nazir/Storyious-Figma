

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Card from "../../components/common/Cards/Card";
import { Link } from "react-router-dom";
import Community from "../../components/common/Community";
import axios from "axios";

const ClassicStories = () => {
  const [morals, setMorals] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMorals = async () => {
      try {
        // Fetch stories from your backend
        const response = await axios.get("http://localhost:8000/api/stories?populate=category");
        
        const stories = response.data.data || response.data || [];
        
        // Get only the first 3 stories
        const firstThreeStories = stories.slice(0, 3);
        
        setMorals(Array.isArray(firstThreeStories) ? firstThreeStories : []);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch stories');
        setLoading(false);
        console.error("Error fetching stories:", err);
      }
    };

    fetchMorals();
  }, []);

  if (loading) return <div className="text-center py-8">Loading stories...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (morals.length === 0) return <div className="text-center py-8">No stories found</div>;

  return (
    <>
      <div className="py-10 px-4 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-[var(--text-dark)]">Classic Stories</h1>
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
              <Card story={morals[activeIndex]} />
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
            <Card key={story._id} story={story} />
          ))}
        </div>
      </div>

      <Community />
    </>
  );
};

export default ClassicStories;