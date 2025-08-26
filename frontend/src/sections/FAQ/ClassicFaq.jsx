import React from "react";
import FAQLayout from "../../components/common/FAQLayout";

const classicFaqs = [
  {
    question: "What are Classic Stories?",
    answer:
      "Classic stories are timeless literary works that have influenced generations through their universal themes, memorable characters, and powerful storytelling. They are widely respected for their cultural, historical, or artistic value and are often studied in schools and enjoyed by readers of all ages.",
  },
  {
    question: "Why are Classic Stories still important today?",
    answer:
      "Classic stories remain relevant because they explore themes like love, justice, sacrifice, and human nature—concepts that never go out of style. They also offer a glimpse into the societies and values of earlier times, helping readers understand both the past and the human experience.",
  },
  {
    question: "Are Classic Stories suitable for children?",
    answer:
      "Many classic stories are adapted for younger audiences. While the original texts may use older language or complex ideas, simplified versions make it easier for children to understand and enjoy the lessons and plots.",
  },
  {
    question: "Do Classic Stories only come from Western literature?",
    answer:
      "Not at all. Classics exist in every culture. From Shakespeare’s plays to the Arabian Nights, from ancient Indian epics like the Ramayana to Chinese classics like Journey to the West—every region has its own set of timeless stories that have shaped generations.",
  },
  {
    question: "How can reading Classic Stories benefit young readers?",
    answer:
      "Classic stories improve language skills, critical thinking, and cultural awareness. They expose readers to rich vocabulary, complex characters, and deep moral questions—encouraging reflection and discussion beyond the story itself.",
  },
];

const ClassicFaq = () => (
  <div className="my-10 max-w-[1200px] mx-auto lg:px-8">
    <h2 className="text-1xl md:text-4xl font-bold mb-6 ml-8">FAQs</h2>
    <FAQLayout data={classicFaqs} />
  </div>
);

export default ClassicFaq;
