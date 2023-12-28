// PostAllComment.js

import React from "react";

function PostAllComment({ comments }) {
  return (
    <div>
      <ul>
        {comments.map((comment) => (
          <li key={comment._id}>{comment.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostAllComment;
