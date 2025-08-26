import React from "react";
import FAQLayout from "../../components/common/FAQLayout";

const scaryFaqs = [
  {
    question: "Are the Scary Stories safe for kids?",
    answer:
      "Yes, absolutely! All our scary stories are carefully written to be spooky but safe for children. They create a sense of mystery and adventure without being too intense or frightening.",
  },
  {
    question: "Do these stories have happy or positive endings?",
    answer:
      "Most of our stories end with a positive, light-hearted, or humorous twist. While the middle of the story may have suspense, the ending usually brings relief or a fun surprise.",
  },
  {
    question: "What age group are these stories suitable for?",
    answer:
      "Our scary stories are best suited for children aged 7 and above. They’re written to entertain kids who enjoy harmless chills and gentle thrills without any disturbing content.",
  },
  {
    question: "Are monsters or ghosts real in these stories?",
    answer:
      "In our stories, monsters and ghosts are mostly fictional characters used to spark curiosity and imagination. Sometimes they even turn out to be friendly or funny by the end!",
  },
  {
    question: "Can I read these stories aloud during sleepovers or storytime?",
    answer:
      "Yes! These stories are perfect for reading aloud in groups, especially during sleepovers, school events, or family storytime. They’re designed to be fun, interactive, and safe for everyone.",
  },
];

const ScaryFaq = () => (
  <div className="my-10  max-w-[1200px] mx-auto lg:px-8">
    <h2 className="text-1xl md:text-4xl font-bold mb-6 ml-8">FAQs</h2>
    <FAQLayout data={scaryFaqs} />
  </div>
);

export default ScaryFaq;
