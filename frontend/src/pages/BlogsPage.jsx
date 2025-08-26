




import { useEffect, useState } from 'react';
import Community from "../components/common/Community";
import BlogCard from "../components/common/Cards/BlogCard";
import { RefreshCcwDot } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL_ARTICLES;

const BlogsPage = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setArticles(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div>
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#F8EDF1] to-[#F6F8FD] mb-8 py-10 sm:py-14 px-4 sm:px-6 md:px-8 lg:px-28">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1A1A1A] mb-4">Blogs</h1>
        <div className="max-w-3xl">
          <p className="text-base sm:text-lg text-black leading-relaxed text-justify">
            Explore Storyious Blogs for insights on storytelling, writing tips, author journeys, and the impact of literature. Dive into articles that inspire creativity, nurture writers, and celebrate the power of stories.
          </p>
        </div>
      </div>

      {/* Blog Cards & Button */}
      <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col items-start">
        {/* Cards Container */}
        <div className="w-full max-w-4xl ml-0 md:ml-8 lg:ml-20">
          {articles.length > 0 ? (
            articles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))
          ) : (
            <p className="text-center text-gray-500">Loading articles...</p>
          )}
        </div>

        {/* Load More Button */}
        <div className="py-6 w-full max-w-4xl ml-0 md:ml-8 lg:ml-20">
          <div className="flex justify-center">
            <button className="w-full max-w-md flex items-center justify-center gap-2 text-[#787878] border border-[#787878] rounded-md px-4 py-2 hover:bg-[#f8f8f8] transition">
              <RefreshCcwDot className="w-5 h-5" />
              Load More
            </button>
          </div>
        </div>
      </div>

      <Community />
    </div>
  );
};

export default BlogsPage;

