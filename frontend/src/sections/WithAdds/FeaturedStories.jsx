


import { ArrowRight, CalendarRange, Clock7, Eye } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import featured1 from "../../assets/images/featured1.jpg";
import featured2 from "../../assets/images/featured2.jpg";
import featured3 from "../../assets/images/featured3.jpg";
import featured4 from "../../assets/images/featured4.jpg";

const data = [
  {
    id: 1,
    title: "Sustainable Travel Tips: Reducing Your Carbon Footprint",
    date: "24 Nov. 2024",
    readTime: "35 Min. Read",
    views: "35k View",
    categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
    image: featured1,
  },
  {
    id: 2,
    title: "Chasing Sunsets: The World’s Most Scenic Destinations",
    date: "24 Nov. 2024",
    readTime: "35 Min. Read",
    views: "35k View",
    categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
    image: featured2,
  },
  {
    id: 3,
    title: "Hidden Gems: Europe’s Best Kept Secret Destinations",
    date: "24 Nov. 2024",
    readTime: "35 Min. Read",
    views: "35k View",
    categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
    image: featured3,
  },
  {
    id: 4,
    title: "Mountain Escapes: Reconnect with Nature in Style",
    date: "24 Nov. 2024",
    readTime: "35 Min. Read",
    views: "35k View",
    categories: ["5 Min Stories", "Bedtime Stories", "Moral Stories"],
    image: featured4,
  },
];

const FeaturedStories = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="py-10 px-4 md:px-6 lg:px-24">
      {/* Top Gray Box */}
      <div
        className="w-full max-w-[760px] h-20 mx-auto mb-12 rounded-sm"
        style={{ backgroundColor: "var(--bg-section)" }}
      />

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="font-bold text-2xl text-[var(--text-dark)]">Featured Stories</h1>
        <Link
          to="/allstories"
          className="flex gap-2 text-sm text-[var(--blue-primary)] hover:underline"
        >
          View All <ArrowRight className="w-4 h-4 mt-1" />
        </Link>
      </div>

      {/* Description */}
      <p className="text-sm mb-6 text-[var(--text-muted)] leading-relaxed">
        Explore our Featured Stories—handpicked tales that showcase the best of
        storytelling. From heartwarming narratives to{" "}
        <br className="hidden lg:block" />
        thrilling adventures, these standout stories are reader favorites and
        editor’s picks on Storyious
      </p>

      {/* Mobile View: One Card + Dot Navigation */}
      <div className="block md:hidden">
        <div className="bg-[var(--white)] rounded-xl shadow-md overflow-hidden w-[90%] sm:w-[80%] mx-auto">
          <img
            src={data[activeIndex].image}
            alt={data[activeIndex].title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="text-sm text-[var(--primary-color)] font-semibold space-x-1">
              {data[activeIndex].categories.map((cat, id) => (
                <span key={id}>{cat}.</span>
              ))}
            </div>
            <h2 className="font-bold text-lg mt-2 text-[var(--text-dark)]">
              {data[activeIndex].title}
            </h2>
            <div className="text-sm text-[var(--text-muted)] mt-2 flex flex-wrap gap-x-4">
              <span className="flex items-center gap-1">
                <CalendarRange className="w-4 h-4 text-[var(--text-muted)]" /> {data[activeIndex].date}
              </span>
              <span className="flex items-center gap-1">
                <Clock7 className="w-4 h-4 text-[var(--text-muted)]" /> {data[activeIndex].readTime}
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4 text-[var(--text-muted)]" /> {data[activeIndex].views}
              </span>
            </div>
          </div>
        </div>

        {/* Dot Navigation */}
        <div className="flex justify-center gap-2 mt-4">
          {data.map((_, index) => (
            <button
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`w-3 h-3 rounded-full ${
                activeIndex === index
                  ? "bg-[var(--dot-active)]"
                  : "bg-[var(--dot-inactive)]"
              }`}
           
            />
          ))}
        </div>
      </div>

      {/* Tablet View: Show All 4 Cards */}
      <div className="hidden md:flex lg:hidden gap-4 mt-6 flex-wrap justify-center">
        {data.map((story) => (
          <div
            key={story.id}
            className="w-[47%] bg-[var(--white)] rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-3 space-y-2">
              <div className="text-xs text-[var(--primary-color)] font-semibold space-x-1">
                {story.categories.map((cat, idx) => (
                  <span key={idx}>{cat}.</span>
                ))}
              </div>
              <h2 className="font-bold text-sm text-[var(--text-dark)]">{story.title}</h2>
              <div className="text-xs text-[var(--text-muted)] flex gap-x-2 flex-wrap">
                <span className="flex items-center gap-1">
                  <CalendarRange className="w-4 h-4 text-[var(--text-muted)]" /> {story.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock7 className="w-4 h-4 text-[var(--text-muted)]" /> {story.readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-[var(--text-muted)]" /> {story.views}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop View*/}
      <div className="hidden lg:flex gap-6 mt-6">
        {/* Left Card */}
        <div className="w-[45%]">
          <div className="bg-[var(--white)] rounded-xl shadow-md overflow-hidden h-full">
            <img
              src={data[0].image}
              alt={data[0].title}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-4">
              <div className="text-sm text-[var(--primary-color)] font-semibold space-x-1">
                {data[0].categories.map((cat, idx) => (
                  <span key={idx}>{cat}.</span>
                ))}
              </div>
              <h2 className="font-bold text-xl mt-2 text-[var(--text-dark)]">{data[0].title}</h2>
              <div className="text-sm text-[var(--text-muted)] mt-2 flex gap-x-4 flex-wrap">
                <span className="flex items-center gap-1">
                  <CalendarRange className="w-4 h-4 text-[var(--text-muted)]" /> {data[0].date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock7 className="w-4 h-4 text-[var(--text-muted)]" /> {data[0].readTime}
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4 text-[var(--text-muted)]" /> {data[0].views}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right 3 Cards */}
        <div className="flex flex-col gap-6 w-[55%]">
          {data.slice(1, 4).map((story) => (
            <div
              key={story.id}
              className="flex gap-3 bg-[var(--white)] rounded-lg shadow-md overflow-hidden h-[150px]"
            >
              <img
                src={story.image}
                alt={story.title}
                className="w-36 h-full object-cover"
              />
              <div className="py-2 pr-2 space-y-2">
                <div className="text-sm text-[var(--primary-color)] space-x-1">
                  {story.categories.map((cat, id) => (
                    <span key={id}>{cat}.</span>
                  ))}
                </div>
                <h3 className="font-semibold text-sm text-[var(--text-dark)]">{story.title}</h3>
                <div className="text-sm text-[var(--text-muted)] flex gap-x-4 flex-wrap">
                  <span className="flex items-center gap-1">
                    <CalendarRange className="w-4 h-4 text-[var(--text-muted)]" /> {story.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock7 className="w-4 h-4 text-[var(--text-muted)]" /> {story.readTime}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-4 h-4 text-[var(--text-muted)]" /> {story.views}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Gray Box */}
      <div
        className="w-full max-w-[760px] h-20 mx-auto my-12 rounded-sm"
        style={{ backgroundColor: "var(--bg-section)" }}
      />
    </div>
  );
};

export default FeaturedStories;
