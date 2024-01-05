import React, { useState } from "react";
import { AiFillDislike } from "react-icons/ai";


function PostDislike({ post, setPost }) {
  const [isDisliked, setIsDisliked] = useState(false);

  return (
    <div
      className="pl-10 cursor-pointer flex justify-center items-center"
      onClick={() => setIsDisliked(!isDisliked)}
    >
      <AiFillDislike 
        className={`text-3xl mr-1 ${isDisliked ? "text-blue-500" : ""}`}
      />
      <sub>{post?.disLikesCount}</sub>
    </div>
  );
}

export default PostDislike;
