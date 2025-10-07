import { useState, useEffect } from 'react';
import Community from "../components/common/Community";
import AuthorCard from "../components/common/Cards/AuthorCard";

const AuthorPage = () => {
  const [writers, setWriters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/authors');
        if (!response.ok) {
          throw new Error('Failed to fetch authors');
        }
        const data = await response.json();
        setWriters(data.data); 
      } catch (err) {
        setError(err.message);
        console.error('Error fetching authors:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchWriters();
  }, []);

  if (loading) 
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        <div className="flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-pink-500"></div>
          <p className="mt-4 text-gray-500">Loading authors...</p>
        </div>
      </div>
    );

  if (error) 
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)] text-red-500">
        Error: {error}
      </div>
    );

  if (writers.length === 0)
    return (
      <div className="flex items-center justify-center min-h-[calc(100vh-128px)]">
        No authors found
      </div>
    );

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      <div className="bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] p-3 sm:p-6 space-y-6 rounded-md shadow-sm lg:px-[70px]">
        <h1 className="text-lg px-8 sm:text-xl md:text-2xl text-[var(--text-dark)] text-center sm:text-left font-bold">
          Story Writers
        </h1>
        <p className='px-8'>
          Discover the best story writers in the world on Storyious! From emerging voices to seasoned storytellers, explore the brilliant minds writing unforgettable tales that captivate millions of readers worldwide.
        </p>
      </div>

      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 py-10 px-4">
        {writers.map((writer) => (
          <AuthorCard key={writer._id} writer={writer} />
        ))}
      </div>

      <Community />
    </div>
  );
};

export default AuthorPage;
