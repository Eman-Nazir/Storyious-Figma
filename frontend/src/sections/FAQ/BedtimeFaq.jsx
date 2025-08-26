import React from "react";
import FAQLayout from "../../components/common/FAQLayout";

const bedtimeFaqs = [
  {
    question: "What are Bedtime Stories?",
    answer:
      "Bedtime Stories are short, calming tales meant to relax children (and adults!) before sleep. They often feature gentle adventures, soothing rhythms, and positive messages.",
  },
  {
    question: "Are the Bedtime Stories on Storyious suitable for all ages?",
    answer: "Yes, they are designed to be enjoyed by everyone, including children and adults.",
  },
  {
    question: "How long are the Bedtime Stories?",
    answer: "Most stories range from 3 to 10 minutes.",
  },
  {
    question: "Can I read Storyious Bedtime Stories for free?",
    answer: "Yes, many stories are free on Storyious.",
  },
  {
    question: "How often are new Bedtime Stories added?",
    answer: "We add new stories weekly.",
  },
];

const BedtimeFaq = () => (  


  
  <div className="my-10 max-w-[1200px] mx-auto lg:px-8 ">
    <h2 className="text-2xl md:text-4xl font-bold mb-8 ml-8">FAQs</h2>
    <FAQLayout data={bedtimeFaqs}  />
  </div>
);

export default BedtimeFaq;
