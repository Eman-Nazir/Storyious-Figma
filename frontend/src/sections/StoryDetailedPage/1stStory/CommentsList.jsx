import React, { useState, useEffect } from 'react';
import CommentCard from '../../../components/common/Cards/CommentCard.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CommentsList = ({ refresh }) => {
  const { id } = useParams();
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  const isBlogPage = window.location.pathname.includes('/blog/');
  const isStoryPage = window.location.pathname.includes('/story/');

  useEffect(() => {
    fetchComments();
  }, [id, refresh]);

  const fetchComments = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:8000/api/comments?`;

      if (isBlogPage) {
        url += `blogId=${id}`;
      } else if (isStoryPage) {
        url += `storyId=${id}`;
      }

      const response = await axios.get(url);
      setComments(response.data.data);

      // Removed the toast for "No comments yet"
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast.error("Failed to fetch comments. Please try again.", {
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateComment = (commentId, updatedComment) => {
    setComments(prevComments => 
      prevComments.map(comment => 
        comment._id === commentId 
          ? { ...comment, ...updatedComment }
          : comment
      )
    );
  };

  const updateReply = (commentId, replyId, updatedReply) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment._id === commentId) {
          const updatedReplies = comment.replies.map(reply =>
            reply._id === replyId
              ? { ...reply, ...updatedReply }
              : reply
          );
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  };

  const deleteComment = (commentId) => {
    setComments(prevComments => 
      prevComments.filter(comment => comment._id !== commentId)
    );
  };

  const deleteReply = (commentId, replyId) => {
    setComments(prevComments =>
      prevComments.map(comment => {
        if (comment._id === commentId) {
          const updatedReplies = comment.replies.filter(reply => reply._id !== replyId);
          return { ...comment, replies: updatedReplies };
        }
        return comment;
      })
    );
  };

  if (loading) return <div className="text-center py-6">Loading comments...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      <ToastContainer position="top-right" autoClose={3000} />
      {comments.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment._id}
            comment={comment}
            onUpdateComment={updateComment}
            onUpdateReply={updateReply}
            onDeleteComment={deleteComment}
            onDeleteReply={deleteReply}
            onRefresh={fetchComments}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;
