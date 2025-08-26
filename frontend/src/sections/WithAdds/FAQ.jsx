



import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "Who is Sir Syed Kazim Ali?",
      answer:
        "It takes 2-3 weeks to get your first blog post ready. That includes the in-depth research & creation of your monthly content marketing strategy that we do before writing your first blog post, Ipsum available.",
    },
    {
      question:
        "For how long has he been teaching CSS, PMS, and Descriptive aspirants?",
      answer:
        "Sir Syed Kazim Ali has been teaching CSS, PMS, and Descriptive exam aspirants for over 15 years, helping thousands of students achieve success in their competitive exams.",
    },
    {
      question: "Where can I find his successful students' essays?",
      answer:
        "You can find successful students' essays on the official website's 'Hall of Fame' section or in the published books compiling top-scoring answers from past exams.",
    },
    {
      question: "Is there a free trial?",
      answer:
        "Yes, we offer a 7-day free trial for new students to experience our teaching methodology and essay evaluation system before committing to a subscription plan.",
    },
    {
      question: "How does online essay evaluation work?",
      answer:
        "Our online essay evaluation system allows you to submit your essays digitally. Our expert evaluators provide detailed feedback, grading, and suggestions for improvement within 48 hours of submission.",
    },
    {
      question:
        "If I don't buy a subscription plan, can I get my essay evaluated?",
      answer:
        "Yes, we offer pay-per-evaluation options for students who don't wish to commit to a full subscription. You can purchase individual essay evaluations as needed.",
    },
  ];

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="bg-[var(--white)] px-4 sm:px-10 py-10">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-2xl md:text-4xl font-bold mb-8 text-[var(--text-dark)]">
          FAQs
        </h2>

        <div className="space-y-4">
          {faqs.map((item, index) => (
            <div
              key={index}
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

                {/* Question and answer */}
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
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
