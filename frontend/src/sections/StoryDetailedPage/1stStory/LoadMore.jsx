


import React from 'react';
import CommentCard from '../../../components/common/Cards/CommentCard';
import { RefreshCcwDot } from 'lucide-react';

const LoadMore = () => {
  const comments = [
    {
      name: 'John E. Konrad',
      comment:
        'Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.',
      date: 'Aug 18, 2021',
    },
  ];

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6 space-y-6">
      {/* Comments List */}
      <div className="space-y-4">
        {comments.map((item, index) => (
          <CommentCard
            key={index}
            name={item.name}
            email={item.email || ''}
            comment={item.comment}
            date={item.date}
            showActions
            marginLeft=""
          />
        ))}
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

export default LoadMore;
