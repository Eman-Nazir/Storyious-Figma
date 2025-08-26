


import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import Card from "../../components/common/Cards/Card";
import { Link } from "react-router-dom";
import ReadMore from "../../components/common/ReadMore";

const FairytalesStories = () => {
  const [fairytale, setfairytale] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_CLASSIC)
      .then((res) => res.json())
      .then((data) => setfairytale(data));
  }, []);

  return (
    <>
      <div className="py-10 px-4 md:px-12 lg:px-24 max-w-[1200px] mx-auto">
        {/* Heading */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-2xl text-[var(--text-dark)]">Fairytales</h1>
          <Link
            to="/allstories"
            className="flex gap-2 text-sm text-[var(--blue-primary)] hover:underline"
          >
            View All <ArrowRight className="w-4 h-4 mt-1" />
          </Link>
        </div>

        {/* Description */}
        <p className="text-sm mb-6 text-[var(--text-muted)] leading-relaxed">
          Enter a world of magic and adventure with our Fairytales collection. From brave heroes to enchanted forests, these stories <br />
          spark imagination and wonder in young minds. Enter a world of magic and adventure with our Fairytales collection. From brave heroes to enchanted forests, these stories spark imagination and wonder in young minds.
        </p>

        {/* Mobile slider */}
        <div className="md:hidden flex flex-col items-center">
          {fairytale.length > 0 && (
            <div className="w-full max-w-[380px]">
              <Card story={fairytale[activeIndex]} />
            </div>
          )}

          {/* dots */}
          <div className="flex justify-center gap-2 mt-4">
            {fairytale.map((_, i) => (
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
          {fairytale.map((story) => (
            <Card key={story.id} story={story} />
          ))}
        </div>
      </div>

      <ReadMore />
    </>
  );
};

export default FairytalesStories;
