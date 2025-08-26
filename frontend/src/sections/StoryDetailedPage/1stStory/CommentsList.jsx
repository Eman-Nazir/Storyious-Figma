import React from 'react';
import CommentCard from '../../../components/common/Cards/CommentCard';

const CommentsList = () => {
  const comments = [
    {
      name: 'Ralph Edwards',
      email: 'ralphedwards@gmail.com',
      comment: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras.',
      date: 'Aug 19, 2021'
    },
    {
      name: 'Ralph Edwards',
      comment: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras.',
      date: 'Aug 19, 2021'
    },
    {
      name: 'John E. Konrad',
      comment: 'Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.',
      date: 'Aug 18, 2021'
    },
    {
      name: 'Ralph Edwards',
      comment: 'In mauris porttitor tincidunt mauris massa sit lorem sed scelerisque. Fringilla pharetra vel massa enim sollicitudin cras.',
      date: 'Aug 19, 2021'
    },
    {
      name: 'John E. Konrad',
      comment: 'Fringilla pharetra vel massa enim sollicitudin cras. At pulvinar eget sociis adipiscing eget donec ultrices nibh tristique.',
      date: 'Aug 18, 2021'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 space-y-4">
      {comments.map((item, index) => (
        <CommentCard
          key={index}
          name={item.name}
          email={item.email}
          comment={item.comment}
          date={item.date}
          showActions={index !== 3}  
          marginLeft={index === 3 ? 'sm:ml-8' : ''}
        />
      ))}
    </div>
  );
};

export default CommentsList;



