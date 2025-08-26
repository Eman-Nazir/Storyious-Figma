


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { faqData } from '../data/faqData';
import { ArrowLeft, Facebook, X, Linkedin, Instagram } from 'lucide-react';

const FAQAnswer = () => {
  const { slug } = useParams();
  const faq = faqData.find(item => item.slug === slug);

  if (!faq) {
    return (
      <div className="p-6 text-center text-red-500">
        <h2 className="text-xl font-bold mb-4">FAQ Not Found</h2>
        <Link
          to="/faqs"
          className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--primary-hover-color)] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to FAQ
        </Link>
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-10 lg:px-20 py-10 space-y-10 max-w-4xl mx-auto">
      {/* Question & Answer */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4">{faq.question}</h1>
        <p className="text-[var(--text-muted)] text-justify mb-6 text-base sm:text-lg leading-relaxed">
          {faq.answer}
        </p>
        <Link
          to="/faqs"
          className="inline-flex items-center gap-2 bg-[var(--primary-color)] text-white px-4 py-2 rounded hover:bg-[var(--primary-hover-color)] transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to FAQ
        </Link>
      </div>

      {/* Share Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-center bg-[var(--primary-color)] text-white px-4 py-4 rounded-lg">
        <span className="mb-3 sm:mb-0 text-sm sm:text-base">Found Helpful? Share it</span>
        <div className="flex space-x-4">
          <a href="#" aria-label="Facebook">
            <Facebook className="h-5 w-5 hover:scale-110 transition" />
          </a>
          <a href="#" aria-label="Twitter / X">
            <X className="h-5 w-5 hover:scale-110 transition" />
          </a>
          <a href="#" aria-label="LinkedIn">
            <Linkedin className="h-5 w-5 hover:scale-110 transition" />
          </a>
          <a href="#" aria-label="Instagram">
            <Instagram className="h-5 w-5 hover:scale-110 transition" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQAnswer;
