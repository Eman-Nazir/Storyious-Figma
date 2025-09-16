
import React, { useState, useEffect } from 'react';
import CommentCard from '../../../components/common/Cards/CommentCard.jsx';
import axios from 'axios';
import { useParams } from 'react-router-dom';

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

      const response = await axios.get(url, { withCredentials: true });
      setComments(response.data.data);
    } catch (error) {
      console.error("Error fetching comments:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-6">Loading comments...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {comments.length === 0 ? (
        <p className="text-center text-gray-500 py-6">No comments yet. Be the first to comment!</p>
      ) : (
        comments.map((comment) => (
          <CommentCard
            key={comment._id}
            commentId={comment._id}
            name={comment.name}
            email={comment.showEmail ? comment.email : null}
            comment={comment.text}
            date={new Date(comment.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
            likes={comment.likes.length}
            dislikes={comment.dislikes.length}
            replies={comment.replies}
            userId={comment.user?._id}
            onAction={fetchComments}
          />
        ))
      )}
    </div>
  );
};

export default CommentsList;