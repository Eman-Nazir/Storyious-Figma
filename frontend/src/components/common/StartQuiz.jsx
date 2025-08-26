



import React from 'react';
import { X } from "lucide-react";
import Annoucement from '../../assets/icons/Annoucement';

const StartQuiz = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm z-50 px-4 py-8">
      <div className="relative bg-[var(--white)] rounded-xl shadow-2xl w-full max-w-md overflow-hidden">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-dark)] z-10"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex justify-center pt-6">
          <Annoucement />
        </div>

        <div className="p-6 space-y-6 text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-[var(--text-dark)]">
            Something Amazing is Coming to Storyious!
          </h1>

          <div className="space-y-4 text-[var(--text-gray)] text-sm md:text-base">
            <p>
              Get ready for something extraordinary! We're about to launch a powerful new feature that will redefine how you read, experience, and connect with stories. It's bold, it's brilliant, and it's just around the corner!
            </p>
            <p>
              Keep checking back, because the future of storytelling is about to unfold, only on Storyious. Are you ready to be amazed?
            </p>
          </div>

          <button className="w-full py-3 px-6 bg-[var(--pink-dark)] text-[var(--white)] font-bold rounded-md shadow-md hover:bg-pink-700">
            I'm Ready!
          </button>
        </div>
      </div>
    </div>
  );
};

export default StartQuiz;
