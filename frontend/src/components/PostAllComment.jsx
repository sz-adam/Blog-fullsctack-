import React from "react";

import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";

function PostAllComment({ comments }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };



  console.log(comments);
  return (
    <div className="w-full md:w-1/2 p-4">
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2 p-2 bg-gray-100 flex rounded-lg">
          <div className="flex-grow">
            <p>{comment.description}</p>
          </div>
          <div className="flex flex-col justify-end ml-2">
            <div className="flex mb-1">
              <FaRegEdit className="icon text-gray-600" />
              <AiTwotoneDelete className="icon text-red-600 cursor-pointer" />
            </div>
            <div>
              <p className="font-bold text-gray-500 text-xs">
                {comment.author}
                {formatDate(comment?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostAllComment;
