


import { useState, useEffect } from 'react';
import Community from "../../src/components/common/Community";
import WriterCard from "../../src/components/common/Cards/WriterCard";

const WriterPage = () => {
  const [writers, setWriters] = useState([]);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL_WRITERS)
      .then((res) => res.json())
      .then((data) => setWriters(data));
  }, []);

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
          <WriterCard key={writer.id} writer={writer} />
        ))}
      </div>

      <Community />
    </div>
  );
};

export default WriterPage;
