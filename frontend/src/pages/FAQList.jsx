



import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { faqData } from '../data/faqData';
import { Search } from 'lucide-react';

const FAQList = () => {
  const [search, setSearch] = useState('');

  const filtered = faqData.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      {/* Header Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-14" style={{ background: 'linear-gradient(to right, var(--gradient-start), var(--gradient-end))' }}>
        <h1 className="font-bold text-2xl mb-2 text-[var(--text-dark)]">Stories FAQS</h1>
        <p className="text-sm sm:text-base text-[var(--text-muted)]">
          Have questions about stories? Find clear answers to general queries about stories,
          their types, reading tips, and much more — making your storytelling and story-reading
          journey smooth and enjoyable.
        </p>
      </div>

      {/* Content Section */}
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-6">
        {/* Search Input */}
        <div className="relative w-full max-w-md mb-6">
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full border px-4 py-2 pr-10 rounded-md focus:outline-none focus:ring-1"
            style={{
              borderColor: 'var(--border-muted)',
              color: 'var(--text-dark)',
              backgroundColor: 'var(--white)',
              '--tw-ring-color': 'var(--primary-color)'
            }}
          />
          <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[var(--text-muted)] w-4 h-4" />
        </div>

        {/* FAQ List */}
        <div className="space-y-2">
          {filtered.length > 0 ? (
            filtered.map((faq) => (
              <Link
                key={faq.slug}
                to={`/faqs/${faq.slug}`}
                className="block px-4 py-3 text-base sm:text-lg border-b hover:bg-gray-50 transition"
                style={{
                  color: 'var(--text-dark)',
                  borderColor: 'var(--gray-light)',
                }}
              >
                {faq.question}
              </Link>
            ))
          ) : (
            <p className="text-[var(--text-muted)]">No results found for "{search}"</p>
          )}
        </div>
      </div>
    </>
  );
};

export default FAQList;
