
import React, { useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CommentReply = ({ parentCommentId, onReplyAdded, onCancel }) => {
  const { id } = useParams();
  const [country, setCountry] = useState("pk");
  const [number, setNumber] = useState("");
  const [showEmail, setShowEmail] = useState(true);
  const [saveDetails, setSaveDetails] = useState(true);
  const [agree, setAgree] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [replyText, setReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const replyData = {
        name,
        email,
        showEmail,
        phoneNumber: number,
        countryCode: country,
        replyText,
        saveDetails,
        agreeTerms: agree,
        parentCommentId,
        storyId: id,
      };

      await axios.post(
        "http://localhost:8000/api/comments/reply",
        replyData,
        { withCredentials: true } 
      );

      setName("");
      setEmail("");
      setReplyText("");
      setNumber("");
      setShowEmail(true);
      setSaveDetails(true);
      setAgree(false);

      if (onReplyAdded) onReplyAdded();
      toast.success("Reply posted successfully ");
    } catch (error) {
      console.error("Error posting reply:", error);
      toast.error("Failed to post reply. Please login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-2 bg-gray-100 rounded">
      <input
        type="text"
        placeholder="Name"
        className="w-full p-2 border rounded"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required={showEmail}
      />
      <PhoneInput
        country={country}
        value={number}
        onChange={(phone, data) => {
          setNumber(phone);
          setCountry(data.countryCode);
        }}
        inputClass="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Your reply..."
        className="w-full p-2 border rounded"
        value={replyText}
        onChange={(e) => setReplyText(e.target.value)}
        required
      />
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={agree} onChange={() => setAgree(!agree)} required />
        <span>I agree to terms and conditions</span>
      </div>
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={loading || !agree}
          className="p-2 bg-pink-500 text-white rounded disabled:opacity-50"
        >
          {loading ? "Posting..." : "Post Reply"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="p-2 bg-gray-300 rounded"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default CommentReply;
