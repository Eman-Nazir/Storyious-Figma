import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import axios from "axios";

const FAQ = ({ category = "general" }) => {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        let url = "http://localhost:8000/api/faqs";
        
        if (category && category !== "all") {
          url = `http://localhost:8000/api/faqs/category/${category}`;
        }
        
        const response = await axios.get(url);
        setFaqs(response.data.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Error fetching FAQs");
        console.error("Error fetching FAQs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchFAQs();
  }, [category]);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  if (loading) return <div className="text-center py-10">Loading FAQs...</div>;
  if (error) return <div className="text-center py-10 text-red-500">Error: {error}</div>;

  return (
    <div className="bg-[var(--white)] px-4 sm:px-10 py-10">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[var(--text-dark)]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.length === 0 ? (
            <p className="text-center py-10">No FAQs found.</p>
          ) : (
            faqs.map((item, index) => (
              <div
                key={item._id}
                className="border-b border-[var(--border-muted)] pb-4"
              >
                <div
                  className="flex items-start cursor-pointer gap-4 p-4 rounded-md bg-[var(--bg-section)]"
                  onClick={() => toggleAnswer(index)}
                >
                  <div className="bg-[var(--gradient-start)] p-2 rounded-sm">
                    <ChevronDown
                      size={18}
                      className={`text-[var(--primary-color)] transition-transform duration-300 ${
                        activeIndex === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>

                  <div className="flex-1">
                    <span className="text-lg font-medium text-[var(--text-dark)] block">
                      {item.question}
                    </span>

                    {activeIndex === index && (
                      <div className="mt-3">
                        <p className="text-[var(--text-muted)]">{item.answer}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;