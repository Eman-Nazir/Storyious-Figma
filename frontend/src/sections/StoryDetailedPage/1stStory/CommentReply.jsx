import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import recaptcha from "../../../assets/images/recaptcha.png";
import { RefreshCcwDot } from "lucide-react";

const CommentReply = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-[var(--text-dark)]">
        Leave a Reply
      </h2>

      {/* REPLY FORM (STATIC) */}
      <form className="border border-[var(--border-light)] rounded-lg p-4 sm:p-6 space-y-6 bg-[var(--white)] shadow-sm">
        <div>
          <label className="block font-medium mb-1 text-[var(--text-dark)]">
            Name <span className="text-[var(--pink-dark)]">*</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            className="w-full border border-[var(--border-light)] rounded px-4 py-2 text-sm"
          />
        </div>

        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1 text-[var(--text-dark)]">
              Phone <span className="text-[var(--pink-dark)]">*</span>
            </label>
            <PhoneInput
              country={"pk"}
              inputClass="w-full border border-[var(--border-light)] rounded px-4 py-2 text-sm"
              placeholder="+92 300 1234567"
            />
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1 text-[var(--text-dark)]">
              Email <span className="text-[var(--pink-dark)]">*</span>
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full border border-[var(--border-light)] rounded px-4 py-2 text-sm"
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                className="mr-2 accent-[var(--pink-dark)]"
              />
              <label className="text-sm text-[var(--text-dark)]">
                Show email publicly
              </label>
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-1 text-[var(--text-dark)]">
            Reply <span className="text-[var(--pink-dark)]">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write your reply here..."
            className="w-full border border-[var(--border-light)] rounded px-4 py-2 text-sm resize-none"
          />
        </div>

      

        {/* CAPTCHA */}
        <div className="flex items-center gap-3 p-3 border border-[var(--border-light)] rounded">
          <input type="checkbox" className="accent-[var(--pink-dark)]" />
          <span className="text-sm">I'm not a robot</span>
          <img src={recaptcha} alt="CAPTCHA" className="h-8" />
        </div>

        {/* CONSENT TEXT (same styling as above) */}
        <div className="px-3 ">
          <p className="text-sm text-[var(--text-dark)]">
            Save my details in this browser for the next time I comment.
          </p>
          <p className="text-xs text-[var(--text-gray)] mt-2 leading-relaxed">
            By replying, you agree to{" "}
            <a
              href="#"
              className="text-[var(--primary-color)] hover:underline"
            >
              Howtests' Terms of Use
            </a>{" "}
            and acknowledge{" "}
            <a
              href="#"
              className="text-[var(--primary-color)] hover:underline"
            >
              Howtests' Privacy Policy
            </a>
            .
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="px-6 py-2 rounded border border-[var(--primary-color)] text-[var(--primary-color)] hover:bg-[var(--primary-color)/10] transition text-sm"
          >
            Clear
          </button>

          <button
            type="submit"
            className="px-6 py-2 rounded bg-[var(--primary-color)] text-white hover:bg-[var(--primary-hover-color)] transition text-sm"
          >
            Post Reply
          </button>
        </div>
      </form>

      {/* STATIC REPLY BELOW */}
      <div className="mt-10 space-y-6">
        <div className="p-4 rounded shadow-sm bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-md font-semibold text-[var(--text-dark)]">
                Eman
              </h4>
              <p className="text-sm text-[var(--text-gray-light)]">
                eman@email.com
              </p>
            </div>
            <p className="text-xs text-[var(--gray-muted)]">Aug 15, 2025</p>
          </div>
          <p className="mt-2 text-[var(--text-gray)] text-sm">
            This is a really good article. Thanks for sharing!
          </p>
        </div>
      </div>

      {/* Load More Button */}
      <div className="py-4">
        <button className="w-full flex items-center justify-center gap-2 text-[var(--text-muted)] border border-[var(--text-muted)] rounded-md px-4 py-2">
          <RefreshCcwDot className="w-5 h-5" />
          Load More
        </button>
      </div>
    </div>
  );
};

export default CommentReply;
