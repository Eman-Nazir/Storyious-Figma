import { useEffect, useState } from 'react';
import Community from "../components/common/Community";
import BlogCard from "../components/common/Cards/BlogCard";
import { RefreshCcwDot } from 'lucide-react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api/blogs';

const BlogsPage = () => {
  const [articles, setArticles] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const res = await axios.get(API_URL);
        const data = res.data;

        if (data.success && data.data?.blogs) setArticles(data.data.blogs);
        else if (data.success && data.blogs) setArticles(data.blogs);
        else setArticles(data);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  const visibleBlogs = articles.slice(0, visibleCount);

  const handleLoadMore = () => {
    if (visibleCount < articles.length) setVisibleCount(prev => prev + 4);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-pink-500"></div>
          <p className="mt-4 text-gray-500">Loading articles...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)] text-red-500">
        Error: {error}
      </div>
    );

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

      {/* Blog Cards */}
      <div className="w-full px-4 sm:px-6 md:px-8 flex flex-col items-start">
        <div className="w-full max-w-4xl ml-0 md:ml-8 lg:ml-20 space-y-6">
          {visibleBlogs && visibleBlogs.length > 0 ? (
            visibleBlogs.map((article) => <BlogCard key={article._id} article={article} />)
          ) : (
            <p className="text-center text-gray-500">No articles found.</p>
          )}
        </div>

        {/* Load More Button */}
        {articles.length > 0 && (
          <div className="py-6 w-full max-w-4xl ml-0 md:ml-8 lg:ml-20 flex justify-center">
            <button
              onClick={handleLoadMore}
              disabled={visibleCount >= articles.length}
              className={`w-full max-w-md flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white font-medium transition
                ${visibleCount >= articles.length
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-pink-500 hover:bg-pink-600"
                }`}
            >
              <RefreshCcwDot className="w-5 h-5" />
              {visibleCount >= articles.length ? "No more blogs" : "Load More"}
            </button>
          </div>
        )}
      </div>

      <Community />
    </div>
  );
};

export default BlogsPage;
