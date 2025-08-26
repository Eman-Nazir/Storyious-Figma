


import { X } from "lucide-react";

const Subscribe = ({ show, onClose }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur px-4 py-6">
      <div className="relative bg-[var(--white)] rounded-xl w-full max-w-md p-6 md:p-8 shadow-lg text-center mt-10 mb-6">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 text-[var(--text-muted)] hover:text-[var(--text-dark)]"
        >
          <X />
        </button>

        {/* Success Message */}
        <div className="bg-green-100 text-green-700 mx-4 text-sm py-2 px-4 rounded-md mb-4 hidden md:block">
          You have successfully subscribed for updates!
        </div>

        <h2 className="text-xl font-semibold mb-3 text-[var(--text-dark)]">
          Subscribe to Storyious!
        </h2>

        <p className="text-sm text-[var(--text-gray)] mb-4">
          Love stories? Join our community of story lovers today and don’t miss a single tale!
          Subscribe to Storyious and get the latest stories, featured reads, and exclusive content
          delivered straight to your inbox. Whether you enjoy magical fairytales, moral lessons, or
          bedtime classics, there’s always something new waiting for you.
        </p>

        <input
          type="email"
          placeholder="Enter your Email address"
          className="w-full border rounded-md px-3 py-2 text-sm mb-4 focus:outline-none focus:ring-2 focus:ring-[var(--pink-dark)]"
        />

        <button
          onClick={onClose}
          className="bg-[var(--pink-dark)] text-[var(--white)] text-sm px-5 py-2 rounded-md w-full hover:bg-pink-700"
        >
          Deactivate
        </button>

        {/* Disclaimer */}
        <p className="text-xs text-[var(--text-muted)] mt-4 flex items-start justify-center gap-1 flex-wrap">
          <span className="mt-0.5">
            <input type="checkbox" checked readOnly className="accent-[var(--pink-dark)]" />
          </span>
          By subscribing, you agree to our{" "}
          <a href="#" className="underline text-[var(--text-gray)] ml-1">
            Disclaimer
          </a>{" "}
          and{" "}
          <a href="#" className="underline text-[var(--pink-dark)] ml-1">
            Privacy Policy
          </a>.
        </p>
      </div>
    </div>
  );
};

export default Subscribe;
