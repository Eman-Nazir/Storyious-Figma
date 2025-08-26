import React from "react";
import FAQLayout from "../../components/common/FAQLayout";

const fableFaqs = [
  {
    question: "What are Fables Stories?",
    answer:
      "Fables are short fictional stories that use animals, plants, or objects as characters to convey a clear moral or lesson. They are often simple in structure but powerful in meaning, teaching values like honesty, wisdom, and kindness through storytelling.",
  },
  {
    question: "How are fables different from other stories?",
    answer:
      "Unlike other stories, fables are brief and always end with a clear moral. The characters are usually animals with human behaviors, and the purpose is to teach a specific lesson in a way that's fun and easy to remember.",
  },
  {
    question: "Who is the most well-known author of fables?",
    answer:
      "Aesop, an ancient Greek storyteller, is one of the most famous fable writers. His stories, such as 'The Lion and the Mouse' and 'The Tortoise and the Hare', are still widely read and taught around the world today.",
  },
  {
    question: "Are fables suitable for young children?",
    answer:
      "Yes, fables are ideal for children because they combine entertaining characters with valuable life lessons. The stories are simple, engaging, and help kids understand right from wrong in a meaningful way.",
  },
  {
    question: "Do fables always involve animals?",
    answer:
      "Most traditional fables use animals with human traits, but some may feature objects or mythical creatures. What makes a story a fable is not just the characters, but the moral message it delivers at the end.",
  },
];

const FablesFaq = () => (
  <div className="my-10 max-w-[1200px] mx-auto lg:px-8">
    <h2 className="text-1xl md:text-4xl font-bold mb-6 ml-8">FAQs</h2>
    <FAQLayout data={fableFaqs} />
  </div>
);

export default FablesFaq;
