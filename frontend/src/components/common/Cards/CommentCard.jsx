import React, { useState } from "react";
import {
  FiMessageCircle,
  FiCornerUpRight,
  FiThumbsUp,
  FiThumbsDown,
  FiTrash2,
} from "react-icons/fi";
import axios from "axios";
import CommentReply from "../../../sections/StoryDetailedPage/1stStory/CommentReply";
import { toast } from "react-toastify";

const showVoteError = (error) => {
  if (error.response?.status === 401) {
    toast.error("Please log in to vote.");
    return;
  }

  toast.error(
    error.response?.data?.message ||
      "Unable to save your vote. Please try again."
  );
};

const CommentCard = ({
  comment,
  onUpdateComment,
  onUpdateReply,
  onDeleteComment,
  onDeleteReply,
  onRefresh,
}) => {
  const {
    _id: commentId,
    name,
    email,
    showEmail,
    text: commentText,
    createdAt,
    likesCount = 0,
    dislikesCount = 0,
    replies = [],
    user,
  } = comment;

  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isVoting, setIsVoting] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleVote = async (direction) => {
    if (isVoting) return;

    setIsVoting(true);

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL +
          "/api/comments/" +
          direction +
          "/" +
          commentId,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.data) {
        onUpdateComment(commentId, response.data.data);
      } else {
        toast.error("Unable to save your vote. Please try again.");
      }
    } catch (error) {
      showVoteError(error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        import.meta.env.VITE_API_URL + "/api/comments/" + commentId,
        {
          withCredentials: true,
        }
      );

      onDeleteComment(commentId);
      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete comment"
      );
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onRefresh();
  };

  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div className="p-4 rounded shadow-sm bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-md font-semibold text-[var(--text-dark)]">
            {name}
          </h4>

          {showEmail && email && (
            <p className="text-sm text-[var(--text-gray-light)]">
              {email}
            </p>
          )}
        </div>

        <p className="text-xs text-[var(--gray-muted)]">{date}</p>
      </div>

      <p className="mt-2 text-[var(--text-gray)] text-sm">
        {commentText}
      </p>

      <div className="mt-3 flex items-center gap-4">
        <button
          type="button"
          aria-label="Like comment"
          onClick={() => handleVote("like")}
          disabled={isVoting}
          className="flex items-center gap-1 text-sm text-[var(--text-gray-light)] hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <FiThumbsUp /> {likesCount}
        </button>

        <button
          type="button"
          aria-label="Dislike comment"
          onClick={() => handleVote("dislike")}
          disabled={isVoting}
          className="flex items-center gap-1 text-sm text-[var(--text-gray-light)] hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <FiThumbsDown /> {dislikesCount}
        </button>
      </div>

      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-4 text-[var(--text-gray-light)]">
          <button
            type="button"
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-sm hover:text-[var(--primary-color)]"
          >
            <FiCornerUpRight /> Reply
          </button>

          {replies.length > 0 && (
            <button
              type="button"
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-sm hover:text-[var(--primary-color)]"
            >
              <FiMessageCircle /> {replies.length}{" "}
              {showReplies ? "Hide Replies" : "Replies"}
            </button>
          )}
        </div>

        {user && (
          <button
            type="button"
            aria-label="Delete comment"
            onClick={handleDelete}
            className="text-sm text-red-500 hover:text-red-700"
          >
            <FiTrash2 />
          </button>
        )}
      </div>

      {showReplyForm && (
        <div className="mt-4">
          <CommentReply
            parentCommentId={commentId}
            onReplyAdded={handleReplyAdded}
            onCancel={() => setShowReplyForm(false)}
          />
        </div>
      )}

      {showReplies && replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
          {replies.map((reply) => (
            <ReplyCard
              key={reply._id}
              reply={reply}
              commentId={commentId}
              onUpdateReply={onUpdateReply}
              onDeleteReply={onDeleteReply}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ReplyCard = ({
  reply,
  commentId,
  onUpdateReply,
  onDeleteReply,
}) => {
  const [isVoting, setIsVoting] = useState(false);

  const handleVote = async (direction) => {
    if (isVoting) return;

    setIsVoting(true);

    try {
      const response = await axios.put(
        import.meta.env.VITE_API_URL +
          "/api/comments/reply/" +
          direction +
          "/" +
          reply._id,
        {},
        {
          withCredentials: true,
        }
      );

      if (response.data.success && response.data.data) {
        onUpdateReply(commentId, reply._id, response.data.data);
      } else {
        toast.error("Unable to save your vote. Please try again.");
      }
    } catch (error) {
      showVoteError(error);
    } finally {
      setIsVoting(false);
    }
  };

  const handleDelete = async () => {
    if (
      !window.confirm("Are you sure you want to delete this reply?")
    ) {
      return;
    }

    try {
      await axios.delete(
        import.meta.env.VITE_API_URL +
          "/api/comments/reply/" +
          reply._id,
        {
          withCredentials: true,
        }
      );

      onDeleteReply(commentId, reply._id);
      toast.success("Reply deleted successfully!");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete reply"
      );
    }
  };

  return (
    <div className="p-3 bg-gray-50 rounded">
      <div className="flex justify-between">
        <div>
          <strong className="text-sm">{reply.name}</strong>

          {reply.showEmail && reply.email && (
            <p className="text-xs text-gray-500">{reply.email}</p>
          )}
        </div>

        <span className="text-xs text-gray-500">
          {new Date(reply.createdAt).toLocaleDateString()}
        </span>
      </div>

      <p className="text-sm mt-1">{reply.replyText}</p>

      <div className="mt-2 flex items-center gap-4">
        <button
          type="button"
          aria-label="Like reply"
          onClick={() => handleVote("like")}
          disabled={isVoting}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <FiThumbsUp /> {reply.likesCount || 0}
        </button>

        <button
          type="button"
          aria-label="Dislike reply"
          onClick={() => handleVote("dislike")}
          disabled={isVoting}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary-color)] disabled:opacity-50"
        >
          <FiThumbsDown /> {reply.dislikesCount || 0}
        </button>

        {reply.user && (
          <button
            type="button"
            aria-label="Delete reply"
            onClick={handleDelete}
            className="text-xs text-red-500 hover:text-red-700 ml-auto"
          >
            <FiTrash2 />
          </button>
        )}
      </div>
    </div>
  );
};

export default CommentCard;