



import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Card from "../../src/components/common/Cards/Card.jsx";
import { faqData } from '../data/faqData';
import { Link } from 'react-router-dom';
import BlogCard from "../components/common/Cards/BlogCard";
import { Search, X } from 'lucide-react';
import Community from "../components/common/Community";

const sidebarItems = [
  "CPF Writing Rules", "Privacy Policy", "Terms of Use", "CPF Editorial Policy",
  "Content Integrity", "Disclaimer", "Plagiarism Guidelines", "Copyright Violations",
  "CPF Advertising Policy", "Cookies Policy", "Trademark Violations"
];

const API_URL = import.meta.env.VITE_API_URL_ARTICLES;
const VIDEO_API = import.meta.env.VITE_API_URL_VIDEOS;
const STORIES_API = import.meta.env.VITE_API_URL_ALLSTORIES;

const cpfSections = [
  {
    title: "Nationality",
    content: [
      "Must be a citizen of Pakistan or permanent resident of AJK.",
      "Dual nationals must renounce foreign nationality upon selection."
    ]
  },
  {
    title: "Educational Qualification",
    content: [
      "Minimum bachelor’s degree (14 years of education).",
      "Third division is acceptable only if master’s is 2nd or 1st division."
    ]
  },
  {
    title: "Age Limit",
    content: [
      "General: 21 to 30 years",
      "Relaxation: Up to 32 years for select categories"
    ]
  }
];

const SearchPage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const queryParam = params.get('term') || '';

  const [searchTerm, setSearchTerm] = useState(queryParam);
  const [allStories, setAllStories] = useState([]);
  const [articles, setArticles] = useState([]);
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    setSearchTerm(queryParam);
  }, [queryParam]);

  useEffect(() => {
    fetch(STORIES_API).then(res => res.json()).then(setAllStories);
    fetch(API_URL).then(res => res.json()).then(setArticles);
    fetch(VIDEO_API).then(res => res.json()).then(setVideos);
  }, []);

  const filterData = (items) => {
    return items.filter(
      item =>
        item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const filteredStories = filterData(allStories);
  const filteredArticles = filterData(articles);
  const filteredVideos = filterData(videos);
  const filteredCPF = cpfSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.some(line => line.toLowerCase().includes(searchTerm.toLowerCase()))
  );
  const filteredFAQs = faqData.filter(faq =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const showNoResults =
    filteredStories.length === 0 &&
    filteredArticles.length === 0 &&
    filteredVideos.length === 0 &&
    filteredCPF.length === 0 &&
    filteredFAQs.length === 0 &&
    searchTerm;

  return (
    <div className="bg-[var(--bg-section)] text-[var(--text-dark)]">
      {/* Search Bar */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 pt-6 pb-4 bg-white shadow">
        <div className="flex items-center gap-2 bg-gray-100 rounded-md border border-gray-300 px-3 py-2 max-w-xl">
          <Search className="text-gray-500" />
          <input
            type="text"
            placeholder="Search anything..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none px-2"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')}>
              <X className="text-gray-500" />
            </button>
          )}
        </div>
      </div>

      {showNoResults && (
        <p className="text-center text-red-500 text-xl mt-10">No results found for "{searchTerm}"</p>
      )}

      {filteredStories.length > 0 && (
        <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
          <h2 className="text-2xl font-bold mb-2">All Stories</h2>
          <p className="text-md mb-6">
            Discover the full collection of stories on Storyious! From timeless classics and magical fairytales to thought-provoking moral tales and spine-chilling scary stories.
          </p>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredStories.map((story) => (
              <Card key={story.id} story={story} noClamp={true} />
            ))}
          </div>
        </section>
      )}

      {filteredVideos.length > 0 && (
        <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)]">
          <h2 className="text-2xl font-bold mb-2">Video Stories</h2>
          <p className="text-md mb-6">
            Experience storytelling like never before with Storyious Video Stories! Watch captivating tales come to life through engaging visuals and narration.
          </p>
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredVideos.map((video) => (
              <Card key={video.id} story={video} />
            ))}
          </div>
        </section>
      )}

      {filteredArticles.length > 0 && (
        <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
          <h2 className="text-2xl font-bold mb-2">Blogs</h2>
          <p className="text-md mb-8">
            Explore Storyious Blogs for insights on storytelling, writing tips, author journeys, and the impact of literature.
          </p>
          <div className="space-y-6">
            {filteredArticles.map((article) => (
              <BlogCard key={article.id} article={article} />
            ))}
          </div>
        </section>
      )}

      {filteredFAQs.length > 0 && (
        <section className="py-12 px-4 sm:px-6 md:px-10 lg:px-20 bg-gradient-to-r from-[var(--gradient-end)] to-[var(--gradient-start)]">
          <h2 className="text-2xl font-bold mb-6">Story FAQs</h2>
          <p className="text-md mb-6">
            Have questions about stories? Find clear answers to general queries about stories, their types, reading tips, and much more.
          </p>
          <div className="space-y-2">
            {filteredFAQs.map((faq) => (
              <Link
                key={faq.slug}
                to={`/faqs/${faq.slug}`}
                className="block px-4 py-3 bg-white rounded-md shadow hover:bg-gray-50 border border-gray-200"
              >
                {faq.question}
              </Link>
            ))}
          </div>
        </section>
      )}

      {(filteredCPF.length > 0 || searchTerm === '') && (
        <section className="flex flex-col lg:flex-row gap-10 px-6 lg:px-16 py-8 bg-white">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl lg:text-4xl font-bold">CPF Rules</h2>
            {filteredCPF.map((section, i) => (
              <div key={i} className="bg-gray-50 p-4 rounded-md border border-gray-200">
                <h3 className="text-xl font-semibold mb-2">{section.title}</h3>
                <ul className="list-disc pl-6 space-y-2">
                  {section.content.map((line, j) => (
                    <li key={j}>{line}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="w-full lg:w-80">
            <ul className="border rounded-md border-[var(--gray-light)] overflow-hidden px-4">
              <li className="border-b border-[var(--gray-light)] py-3 text-xl font-semibold text-[var(--primary-color)]">
                Story Rules
              </li>
              {sidebarItems.map((item, i) => (
                <li
                  key={i}
                  className="py-3 text-sm text-gray-800 border-b border-[var(--gray-light)] last:border-b-0 hover:bg-gray-50 cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <Community />
    </div>
  );
};

export default SearchPage;