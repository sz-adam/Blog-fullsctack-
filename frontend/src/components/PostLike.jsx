import React, { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/UserContext";

function PostLike({ post, setPost }) {
  const [isliked, setIsLiked] = useState(false);
  const { postId } = useParams();
  const access_token = getAccessToken();
  const { user, setUser } = useContext(UserContext);

  const fetchLikesPost = async () => {
    try {
      if (access_token && postId) {
        await PostService.likePost(access_token, postId);
        const updatePost = await PostService.singlePosts(access_token, postId);
        setPost(updatePost);
      }
    } catch (error) {
      console.error("Error fetching post details or posts:", error);
    }
  };

  return (
    <div
      className="cursor-pointer flex justify-center items-center"
      onClick={() => setIsLiked(!isliked)}
    >
      <AiFillLike
        className={`text-3xl mr-1" ${isliked ? "text-blue-500" : ""}`}
        onClick={fetchLikesPost}
      />
      <sub>{post?.likesCount}</sub>
    </div>
  );
}

export default PostLike;
