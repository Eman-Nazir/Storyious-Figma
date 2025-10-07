import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import axios from "axios";

const FAQList = () => {
  const [search, setSearch] = useState(""); 
  const [filterText, setFilterText] = useState(""); 
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/faqs/category/competitive-exams"
        );
        setFaqs(res.data.data);
      } catch (error) {
        console.error("Error fetching FAQs", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(filterText.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setFilterText(search); 
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-128px)]">
        <div className="flex flex-col items-center">
          {/* Pink spinner */}
          <div className="w-12 h-12 border-4 border-t-4 border-gray-300 rounded-full animate-spin border-t-pink-500"></div>
          <p className="mt-4 text-gray-500">Loading FAQs...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Header Section */}
      <div
        className="px-4 sm:px-6 md:px-10 lg:px-20 py-14"
        style={{
          background:
            "linear-gradient(to right, var(--gradient-start), var(--gradient-end))",
        }}
      >
        <h1 className="font-bold text-2xl mb-2 text-[var(--text-dark)]">
          Competitive Exams FAQs
        </h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Commonly asked questions about competitive exams, with clear answers
          to help in your preparation.
        </p>
      </div>

      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6">
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)} 
            onKeyDown={handleKeyDown} 
            className="w-full border px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-1"
            style={{
              borderColor: "var(--border-muted)",
              color: "var(--text-dark)",
              backgroundColor: "var(--white)",
              "--tw-ring-color": "var(--primary-color)",
            }}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <Link
                key={faq.slug}
                to={`/faqs/${faq.slug}`}
                className="block px-4 py-3 text-base sm:text-lg border-b hover:bg-gray-50 transition"
                style={{
                  color: "var(--text-dark)",
                  borderColor: "var(--gray-light)",
                }}
              >
                {faq.question}
              </Link>
            ))
          ) : (
            <p className="text-[var(--text-muted)]">
              No results found for "{filterText}"
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default FAQList;
