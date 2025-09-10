

import { ArrowRight, CalendarRange, Clock7, Eye } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const FeaturedStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedStories = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/stories?populate=category");
        
        const allStories = response.data.data || response.data || [];
        
        const sortedStories = allStories.sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        });
        
        const lastThreeStories = sortedStories.slice(0, 3);
        
        const featuredStories = [...lastThreeStories];
        if (featuredStories.length > 0) {

          const firstStoryCopy = {...featuredStories[0]};
          featuredStories.push(firstStoryCopy);
        }
        
        setStories(featuredStories);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch featured stories');
        setLoading(false);
        console.error("Error fetching featured stories:", err);
      }
    };

    fetchFeaturedStories();
  }, []);

  // Format story data for display
  const formatStoryData = (story, index) => {
    if (!story) return null;
    
    return {
      id: story._id || "",
      title: story.title || "Untitled Story",
      date: story.createdAt ? new Date(story.createdAt).toLocaleDateString() : "Unknown date",
      readTime: story.meta?.readTime || "0 min",
      views: `${story.meta?.views || 0} Views`,
      categories: [story.category?.name || "Story"],
      image: story.featuredImage || "",
      link: `/story/${story._id || ""}`
    };
  };

  if (loading) return <div className="text-center py-8">Loading featured stories...</div>;
  if (error) return <div className="text-center py-8 text-red-500">{error}</div>;
  if (stories.length === 0) return <div className="text-center py-8">No featured stories found</div>;

  const formattedStories = stories.map((story, index) => formatStoryData(story, index)).filter(Boolean);

  return (
    <div className="py-10 px-4 md:px-6 lg:px-24 max-w-[1200px] mx-auto">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-[var(--text-dark)]">Featured Stories</h1>
        <Link
          to="/allstories"
          className="flex gap-2 text-sm text-[var(--text-gray)] hover:underline"
        >
          View All <ArrowRight className="w-5 h-5 text-[var(--text-gray)]" />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm text-[var(--text-muted)] mb-6">
        Explore our Featured Stories—handpicked tales that showcase the best of
        storytelling. From heartwarming narratives to{" "}
        <br className="hidden lg:block" />
        thrilling adventures, these standout stories are reader favorites and
        editor's picks on Storyious
      </p>

      {/* Mobile View */}
      <div className="block lg:hidden">
        <Link
          to={formattedStories[activeIndex].link}
          className="block w-[90%] sm:w-[80%] mx-auto"
        >
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <img
              src={formattedStories[activeIndex].image}
              alt={formattedStories[activeIndex].title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-[var(--primary-color)] font-semibold space-x-1">
                {formattedStories[activeIndex].categories.map((cat, id) => (
                  <span key={id}>{cat}.</span>
                ))}
                <span className="text-[var(--primary-color)]">{formattedStories[activeIndex].readTime}</span>
              </div>
              <h2 className="font-bold text-lg mt-2 text-[var(--text-dark)]">
                {formattedStories[activeIndex].title}
              </h2>
              <div className="text-sm text-[var(--text-muted)] mt-2 flex flex-wrap gap-x-4">
                <span className="flex items-center gap-1">
                  <CalendarRange className="w-4 h-4" /> {formattedStories[activeIndex].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock7 className="w-4 h-4" /> {formattedStories[activeIndex].readTime}
                  </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" /> {formattedStories[activeIndex].views}
                </span>
              </div>
            </div>
          </div>
        </Link>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {formattedStories.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index ? "bg-[var(--dot-active)]" : "bg-[var(--dot-inactive)]"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop View */}
      <div className="hidden lg:flex gap-6 mt-6">
        {/* Left Card - Show first story */}
        <div className="w-[45%]">
          <Link to={formattedStories[0].link} className="block h-full">
            <div className="bg-white rounded-xl shadow-md overflow-hidden h-full">
              <img
                src={formattedStories[0].image}
                alt={formattedStories[0].title}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-4">
                <div className="text-sm text-[var(--primary-color)] font-semibold space-x-1">
                  {formattedStories[0].categories.map((cat, idx) => (
                    <span key={idx}>{cat}</span>
                  ))}
                  <span className="text-[var(--primary-color)]">{formattedStories[0].readTime}</span>
                </div>
                <h2 className="font-bold text-xl mt-2 text-[var(--text-dark)]">{formattedStories[0].title}</h2>
                <div className="text-sm text-[var(--text-muted)] mt-2 flex gap-x-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarRange className="w-4 h-4" /> {formattedStories[0].date}
                  </span>
                   <span className="flex items-center gap-1">
                  <Clock7 className="w-4 h-4" /> {formattedStories[activeIndex].readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {formattedStories[0].views}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right 3 Cards - Show stories 1, 2, and 3 */}
        <div className="flex flex-col gap-6 w-[55%]">
          {formattedStories.slice(1, 4).map((story, index) => (
            <Link
              to={story.link}
              key={story.id + index}
              className="flex gap-3 bg-white rounded-lg shadow-md overflow-hidden h-[150px]"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-36 h-full object-cover"
              />
              <div className="py-2 pr-2 space-y-2">
                <div className="text-sm text-[var(--primary-color)] space-x-1 font-semibold">
                  {story.categories.map((cat, id) => (
                    <span key={id}>{cat}.</span>
                  ))}
                  <span className="text-[var(--primary-color)]">{story.readTime}</span>
                </div>
                <h3 className="font-semibold text-sm text-[var(--text-dark)]">{story.title}</h3>
                <div className="text-sm text-[var(--text-muted)] flex gap-x-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarRange className="w-4 h-4" /> {story.date}
                  </span>
                   <span className="flex items-center gap-1">
                  <Clock7 className="w-4 h-4" /> {formattedStories[activeIndex].readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4" /> {story.views}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedStories;