



import React from 'react';
import { X } from 'lucide-react';

const StorySubmitPopUp = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.8)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[var(--white)] w-[600px] rounded-lg shadow-lg relative p-8 text-center">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[var(--text-muted)] hover:text-[var(--text-dark)]"
        >
          <X />
        </button>

        <h2 className="text-xl font-bold mb-4 text-[var(--text-dark)]">
          Thank You for Sharing Your Story!
        </h2>

        <p className="mb-4 text-[var(--text-gray)]">
          You've successfully submitted your story. Our editorial team will review your story to ensure it aligns with our storytelling standards and content guidelines.
        </p>
        <p className="mb-4 text-[var(--text-gray)]">
          If your story meets our criteria, it will be accepted and published within 5 business days. Due to the high volume of submissions we receive, we may not be able to respond individually to stories that do not meet our editorial needs.
        </p>
        <p className="mb-6 text-[var(--text-gray)]">
          If your story is not published within 15 days, it may indicate that it was not selected for publication at this time. Thank you for contributing to Storyious; we truly value your voice and creativity!
        </p>

        <button
          onClick={onClose}
          className="bg-[var(--pink-dark)] hover:bg-pink-700 text-[var(--white)] px-6 py-2 rounded font-semibold"
        >
          OK
        </button>
      </div>
    </div>
  );
};

export default StorySubmitPopUp;
