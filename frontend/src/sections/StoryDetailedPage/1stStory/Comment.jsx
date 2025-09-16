
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import recaptcha from "../../../assets/images/recaptcha.png";
import axios from "axios";
import { useParams } from "react-router-dom";

const Comment = ({ onCommentAdded }) => {
  const { id } = useParams();
  const [country, setCountry] = useState("pk");
  const [number, setNumber] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const [saveDetails, setSaveDetails] = useState(true);
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [commentText, setCommentText] = useState("");
  const [isHuman, setIsHuman] = useState(false);
  const [loading, setLoading] = useState(false);

  const isBlogPage = window.location.pathname.includes('/blog/');
  const isStoryPage = window.location.pathname.includes('/story/');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const commentData = {
        text: commentText,
        name,
        email,
        showEmail,
        phoneNumber: number,
        countryCode: country,
        saveDetails,
      };

      if (isBlogPage) {
        commentData.blogId = id;
      } else if (isStoryPage) {
        commentData.storyId = id;
      }

      await axios.post(
        "http://localhost:8000/api/comments",
        commentData,
        { withCredentials: true }
      );

      setName("");
      setEmail("");
      setCommentText("");
      setNumber("");
      setShowEmail(true);
      setSaveDetails(true);
      setAgree(false);
      setIsHuman(false);

      // Notify parent component
      if (onCommentAdded) onCommentAdded();

      alert("Comment posted successfully!");
      console.error("Error posting comment:", error);
      alert("Failed to post comment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = (e) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setCommentText("");
    setNumber("");
    setShowEmail(true);
    setSaveDetails(true);
    setAgree(false);
    setIsHuman(false);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 font-sans">
      <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-[var(--text-dark)]">
        Comments
      </h2>

      <form
        className="border border-[var(--border-light)] rounded-lg p-4 sm:p-6 space-y-6 bg-[var(--white)] shadow-sm"
        onSubmit={handleSubmit}
      >
        {/* Name */}
        <div>
          <label className="block font-medium mb-1 text-[var(--text-dark)]">
            Name <span className="text-[var(--pink-dark)]">*</span>
          </label>
          <input
            type="text"
            placeholder="Write your name here"
            className="w-full border border-[var(--border-light)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pink-strong)] transition text-sm"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        {/* Contact & Email */}
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <label className="block font-medium mb-1 text-[var(--text-dark)]">
              Contact Number <span className="text-[var(--pink-dark)]">*</span>
            </label>
            <PhoneInput
              country={country}
              placeholder="Enter Phone Number"
              value={number}
              onChange={(value, countryData) => {
                setNumber(value);
                setCountry(countryData.countryCode);
              }}
              countryCodeEditable={false}
              enableSearch={true}
              inputClass="!w-full border border-[var(--border-light)] rounded px-4 py-2 text-sm"
              required
            />
            <p className="text-xs text-[var(--text-muted)] mt-1">
              We do not show it on your comment
            </p>
          </div>

          <div className="flex-1">
            <label className="block font-medium mb-1 text-[var(--text-dark)]">
              Email <span className="text-[var(--pink-dark)]">*</span>
            </label>
            <input
              type="email"
              placeholder="Write your email here"
              className="w-full border border-[var(--border-light)] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[var(--pink-strong)] text-sm transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="flex items-center mt-1">
              <input
                type="checkbox"
                checked={showEmail}
                onChange={() => setShowEmail(!showEmail)}
                className="mr-2 accent-[var(--pink-dark)]"
              />
              <label className="text-sm text-[var(--text-dark)]">
                Show it on my comment
              </label>
            </div>
          </div>
        </div>

        {/* Comment Text */}
        <div>
          <label className="block font-medium mb-1 text-[var(--text-dark)]">
            Comments <span className="text-[var(--pink-dark)]">*</span>
          </label>
          <textarea
            rows={4}
            placeholder="Write your comments here"
            className="w-full border border-[var(--border-light)] rounded px-4 py-2 focus:outline-none text-sm transition resize-none"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            required
          />
        </div>

        {/* Save Details */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={saveDetails}
            onChange={() => setSaveDetails(!saveDetails)}
            className="accent-[var(--pink-dark)]"
          />
          <label className="text-sm text-[var(--text-dark)] leading-snug">
            Save my details in this browser for the next time I comment.
          </label>
        </div>

        {/* Terms and Privacy */}
        <div className="flex items-start gap-2">
          <input
            type="checkbox"
            checked={agree}
            onChange={() => setAgree(!agree)}
            className="accent-[var(--pink-dark)] mt-1"
            required
          />
          <label className="text-sm text-[var(--text-dark)] leading-snug">
            By replying, you agree to Howtests'{" "}
            <a
              href="#"
              className="text-[var(--pink-dark)] font-medium underline hover:text-[var(--primary-hover-color)] transition"
            >
              Terms of Use
            </a>{" "}
            and acknowledge Howtests'{" "}
            <a
              href="#"
              className="text-[var(--pink-dark)] font-medium underline hover:text-[var(--primary-hover-color)] transition"
            >
              Privacy Policy
            </a>.
          </label>
        </div>

        {/* Fake ReCAPTCHA */}
        <div className="mt-2 border border-[var(--gray-muted)] rounded p-3 w-full sm:w-auto flex flex-col sm:flex-row items-start sm:items-center gap-3">
          <div className="flex items-center">
            <input 
              type="checkbox" 
              className="accent-[var(--pink-dark)] w-4 h-4 mr-2" 
              checked={isHuman}
              onChange={() => setIsHuman(!isHuman)}
              required
            />
            <span className="text-sm font-medium text-[var(--text-dark)]">
              I'm not a robot
            </span>
          </div>
          <img src={recaptcha} alt="reCAPTCHA" className="w-10 h-10" />
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row justify-end gap-3 pt-2">
          <button
            onClick={handleReset}
            className="px-6 py-2 rounded bg-[var(--pink-light)] text-[var(--pink-strong)] hover:bg-[var(--pink-hover)] text-sm transition w-full sm:w-auto"
            disabled={loading}
          >
            Reset
          </button>
          <button
            type="submit"
            className="px-6 py-2 rounded bg-[var(--primary-color)] text-[var(--white)] hover:bg-[var(--primary-hover-color)] text-sm transition w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? "Posting..." : "Post Comment"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Comment;


