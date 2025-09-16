import React, { useState } from 'react';
import { FiMessageCircle, FiCornerUpRight, FiThumbsUp, FiThumbsDown, FiEdit, FiTrash2 } from 'react-icons/fi';
import axios from 'axios';
import CommentReply from '../../../sections/StoryDetailedPage/1stStory/CommentReply';

const CommentCard = ({ 
  commentId, 
  name, 
  email, 
  comment, 
  date, 
  likes, 
  dislikes, 
  replies, 
  userId,
  onAction 
}) => {
  const [showReplyForm, setShowReplyForm] = useState(false);
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axios.put(
        `http://localhost:8000/api/comments/like/${commentId}`,
        {},
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error liking comment:", error);
      alert("Failed to like comment. Please login.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    setIsDisliking(true);
    try {
      await axios.put(
        `http://localhost:8000/api/comments/dislike/${commentId}`,
        {},
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error disliking comment:", error);
      alert("Failed to dislike comment. Please login.");
    } finally {
      setIsDisliking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this comment?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/comments/${commentId}`,
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error deleting comment:", error);
      alert("Failed to delete comment");
    }
  };

  const handleReplyAdded = () => {
    setShowReplyForm(false);
    onAction();
  };

  return (
    <div className="p-4 rounded shadow-sm bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)]">
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-md font-semibold text-[var(--text-dark)]">{name}</h4>
          {email && <p className="text-sm text-[var(--text-gray-light)]">{email}</p>}
        </div>
        <p className="text-xs text-[var(--gray-muted)]">{date}</p>
      </div>
      <p className="mt-2 text-[var(--text-gray)] text-sm">{comment}</p>

      {/* Like/Dislike buttons */}
      <div className="mt-3 flex items-center gap-4">
        <button 
          onClick={handleLike} 
          disabled={isLiking}
          className="flex items-center gap-1 text-sm text-[var(--text-gray-light)] hover:text-[var(--primary-color)]"
        >
          <FiThumbsUp /> {likes || 0}
        </button>
        <button 
          onClick={handleDislike} 
          disabled={isDisliking}
          className="flex items-center gap-1 text-sm text-[var(--text-gray-light)] hover:text-[var(--primary-color)]"
        >
          <FiThumbsDown /> {dislikes || 0}
        </button>
      </div>

      {/* Action buttons */}
      <div className="mt-3 flex justify-between items-center">
        <div className="flex gap-4 text-[var(--text-gray-light)]">
          <button 
            onClick={() => setShowReplyForm(!showReplyForm)}
            className="flex items-center gap-1 text-sm hover:text-[var(--primary-color)]"
          >
            <FiCornerUpRight /> Reply
          </button>
          {replies && replies.length > 0 && (
            <button 
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1 text-sm hover:text-[var(--primary-color)]"
            >
              <FiMessageCircle /> {replies.length} {showReplies ? 'Hide Replies' : 'Replies'}
            </button>
          )}
        </div>

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

      {showReplies && replies && replies.length > 0 && (
        <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
          {replies.map(reply => (
            <ReplyCard 
              key={reply._id} 
              reply={reply} 
              onAction={onAction}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ReplyCard = ({ reply, onAction }) => {
  const [isLiking, setIsLiking] = useState(false);
  const [isDisliking, setIsDisliking] = useState(false);

  const handleLike = async () => {
    setIsLiking(true);
    try {
      await axios.put(
        `http://localhost:8000/api/comments/reply/like/${reply._id}`,
        {},
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error liking reply:", error);
      alert("Failed to like reply. Please login.");
    } finally {
      setIsLiking(false);
    }
  };

  const handleDislike = async () => {
    setIsDisliking(true);
    try {
      await axios.put(
        `http://localhost:8000/api/comments/reply/dislike/${reply._id}`,
        {},
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error disliking reply:", error);
      alert("Failed to dislike reply. Please login.");
    } finally {
      setIsDisliking(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this reply?")) return;
    try {
      await axios.delete(
        `http://localhost:8000/api/comments/reply/${reply._id}`,
        { withCredentials: true }
      );
      onAction();
    } catch (error) {
      console.error("Error deleting reply:", error);
      alert("Failed to delete reply");
    }
  };

  return (
    <div className="p-3 bg-gray-50 rounded">
      <div className="flex justify-between">
        <div>
          <strong className="text-sm">{reply.name}</strong>
          {reply.showEmail && <p className="text-xs text-gray-500">{reply.email}</p>}
        </div>
        <span className="text-xs text-gray-500">
          {new Date(reply.createdAt).toLocaleDateString()}
        </span>
      </div>
      <p className="text-sm mt-1">{reply.replyText}</p>

      <div className="mt-2 flex items-center gap-4">
        <button 
          onClick={handleLike} 
          disabled={isLiking}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary-color)]"
        >
          <FiThumbsUp /> {reply.likes?.length || 0}
        </button>
        <button 
          onClick={handleDislike} 
          disabled={isDisliking}
          className="flex items-center gap-1 text-xs text-gray-500 hover:text-[var(--primary-color)]"
        >
          <FiThumbsDown /> {reply.dislikes?.length || 0}
        </button>

        {reply.user && (
          <button 
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




