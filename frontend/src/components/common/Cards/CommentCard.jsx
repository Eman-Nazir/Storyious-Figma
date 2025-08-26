import React from 'react';
import { FiMessageCircle, FiCornerUpRight } from 'react-icons/fi';

const CommentCard = ({ name, email, comment, date, showActions, marginLeft }) => {
  return (
    <div
      className={`p-4 rounded shadow-sm bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] ${marginLeft}`}
    >
      <div className="flex justify-between items-start">
        <div>
          <h4 className="text-md font-semibold text-[var(--text-dark)]">{name}</h4>
          {email && (
            <p className="text-sm text-[var(--text-gray-light)]">{email}</p>
          )}
        </div>
        <p className="text-xs text-[var(--gray-muted)]">{date}</p>
      </div>
      <p className="mt-2 text-[var(--text-gray)] text-sm">{comment}</p>

      {showActions && (
        <div className="mt-3 flex justify-end gap-4 text-[var(--text-gray-light)]">
          <button className="flex items-center gap-1 text-sm">
            <FiCornerUpRight /> Reply
          </button>
          <button className="flex items-center gap-1 text-sm">
            <FiMessageCircle /> 3
          </button>
        </div>
      )}
    </div>
  );
};

export default CommentCard;
