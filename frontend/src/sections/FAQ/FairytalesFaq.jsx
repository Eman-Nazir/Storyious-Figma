import React from "react";
import FAQLayout from "../../components/common/FAQLayout";

const fairytalesFaqs = [
  {
    question: "What are Fairytales?",
    answer:
      "Fairytales are magical stories that often include imaginary creatures, enchanted lands, and heroic characters. These stories typically involve good versus evil and end with a happy or meaningful resolution.",
  },
  {
    question: "Why are Fairytales important for children?",
    answer:
      "Fairytales spark creativity and imagination in young minds. They also introduce children to moral values such as kindness, bravery, honesty, and the triumph of good over evil through captivating storytelling.",
  },
  {
    question: "Do Fairytales always have a happy ending?",
    answer:
      "Most fairytales end happily, reinforcing the idea that goodness is rewarded. Even when there's danger or a villain, the hero usually overcomes challenges and the story concludes with a positive message.",
  },
  {
    question: "Are Fairytales suitable for all age groups?",
    answer:
      "Yes, fairytales are enjoyed by children, teens, and even adults. While younger readers enjoy the fantasy elements, older audiences can appreciate the deeper symbolism and life lessons within the stories.",
  },
  {
    question: "What makes a story a Fairytale?",
    answer:
      "A fairytale usually involves magical elements, fantasy settings like castles or forests, and characters like fairies, princes, witches, or talking animals. The goal is to entertain while teaching lessons through imaginative plots.",
  },
];

const FairytalesFaq = () => (
  <div className="my-10 max-w-[1200px] mx-auto lg:px-8">
    <h2 className="text-1xl md:text-4xl font-bold mb-6 ml-8">FAQs</h2>
    <FAQLayout data={fairytalesFaqs} />
  </div>
);

export default FairytalesFaq;
