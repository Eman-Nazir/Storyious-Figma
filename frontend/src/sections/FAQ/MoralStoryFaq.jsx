import React from "react";
import FAQLayout from "../../components/common/FAQLayout";


const moralFaqs = [
  {
    question: "What are Moral Stories?",
    answer:
      "Moral stories are narratives that convey life lessons, ethical principles, or core values. These stories are often simple but impactful, making it easier for children and adults to understand right from wrong through relatable situations and characters.",
  },
  {
    question: "Are these suitable for all ages?",
    answer:
      "Yes, moral stories are crafted to be age-appropriate and educational for readers of all ages. Whether it's a child learning the value of honesty or an adult reflecting on compassion, these stories are relevant across generations.",
  },
  {
    question: "Do Moral Stories help in character building?",
    answer:
      "Absolutely. Moral stories play a key role in character development, especially in young readers. They help shape attitudes, behaviors, and decision-making by embedding strong values such as kindness, integrity, empathy, and responsibility.",
  },
  {
    question: "Are these stories based on real-life experiences?",
    answer:
      "Some moral stories are inspired by real-life events or timeless folk tales, while others are fictional. Regardless of their origin, they are written to highlight universal truths and human experiences that readers can relate to and learn from.",
  },
  {
    question: "Can Moral Stories be used in classrooms or parenting?",
    answer:
      "Yes, moral stories are excellent tools for both teaching and parenting. Educators and parents often use them to introduce complex concepts like fairness, gratitude, or teamwork in a way that's easy to understand and remember.",
  },
];

const MoralStoryFaq = () => (
  <div className="my-10 max-w-[1200px] mx-auto lg:px-8">
    <h2 className="text-1xl md:text-4xl font-bold mb-6 ml-8">FAQs</h2>

    <FAQLayout data={moralFaqs} />
  </div>
);

export default MoralStoryFaq;
