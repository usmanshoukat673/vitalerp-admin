import React, { useState, useEffect } from 'react';

const CommentCounter = ({ comments }) => {
  const [totalComments, setTotalComments] = useState(0);

  // Function to recursively count comments and replies
  const countTotalComments = (commentArray) => {
    let count = commentArray.length;
    commentArray.forEach((comment) => {
      count += countTotalComments(comment.replies);
    });
    return count;
  };

  useEffect(() => {
    // Count total comments when the comments prop changes
    const totalCount = countTotalComments(comments);
    setTotalComments(totalCount);
  }, [comments]);

  return (
    <div>
      Comments: {totalComments}
    </div>
  );
}

export default CommentCounter;
