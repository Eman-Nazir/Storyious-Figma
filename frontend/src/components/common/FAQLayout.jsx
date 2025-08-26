



import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

const FAQLayout = ({ data }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAnswer = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="space-y-4 mx-10">
      {data.map((item, index) => (
        <div key={index} className="pb-4">
          <div
            className="flex items-start cursor-pointer gap-4 p-4 rounded-md bg-[var(--bg-section)]"
            onClick={() => toggleAnswer(index)}
          >
            <div className="bg-[var(--gradient-start)] p-2 rounded-sm">
              <ChevronDown
                size={18}
                className={`text-[var(--pink-dark)] transition-transform duration-300 ${
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
      ))}
    </div>
  );
};

export default FAQLayout;
