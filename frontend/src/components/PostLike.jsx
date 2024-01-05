import React, { useState } from "react";
import { AiFillLike } from "react-icons/ai";

function PostLike({ post, setPost }) {
    const [isliked, setIsLiked] =useState(false);
    

  return (
    <div className="cursor-pointer flex justify-center items-center" onClick={() => setIsLiked(!isliked)}>
      <AiFillLike  className={`text-3xl mr-1" ${isliked ? "text-blue-500" : ""}`}/>
      <sub>{post?.likesCount}</sub>
    </div>
  );
}

export default PostLike;
