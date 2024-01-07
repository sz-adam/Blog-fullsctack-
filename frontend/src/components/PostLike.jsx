import React, { useContext, useEffect, useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/UserContext";

function PostLike({ post, setPost }) {
  const { postId } = useParams();
  const access_token = getAccessToken();
  const { user, setUser } = useContext(UserContext);

  //ellenörzi az aktuális user Id-ét a likes tömbben ha nincs benne beállítja a kéksszint
  //ha benne van nem csinál semmit se
  const isUserLikedPost = () => {
    return post?.likes?.includes(user?.id);
  };

  const handleLikePost = async () => {
    try {
      if (access_token && postId) {
        const likepost = await PostService.likePost(access_token, postId);
        setPost(likepost);
      }
    } catch (error) {
      console.error("Error fetching post details or posts:", error);
    }
  };

  return (
    <div
      className="cursor-pointer flex justify-center items-center"
      onClick={handleLikePost}
    >
      <AiFillLike
        className={`text-3xl mr-1 ${isUserLikedPost() ? "text-blue-500" : ""}`}
      />
      <sub>{post?.likesCount}</sub>
    </div>
  );
}

export default PostLike;
