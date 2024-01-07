import React, { useContext, useState } from "react";
import { AiFillDislike } from "react-icons/ai";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";

function PostDislike({ post, setPost }) {
  const access_token = getAccessToken();
  const { user, setUser } = useContext(UserContext);
  const { postId } = useParams();

  //ellenörzi az aktuális user Id-ét a disLikes tömbben ha nincs benne beállítja a kéksszint
  //ha benne van nem csinál semmit se
  const isUserDislikedPost = () => {
    return post?.disLikes?.includes(user?.id);
  };

  const handleDisLikePost = async () => {
    try {
      if (access_token && postId) {
        const disLikePost = await PostService.disLikePost(access_token, postId);
        setPost(disLikePost);
      }
    } catch (error) {
      console.error("Error fetching post details or posts:", error);
    }
  };

  return (
    <div
      className="pl-10 cursor-pointer flex justify-center items-center"
      onClick={handleDisLikePost}
    >
      <AiFillDislike
        className={`text-3xl mr-1 ${
          isUserDislikedPost() ? "text-blue-500" : ""
        }`}
      />
      <sub>{post?.disLikesCount}</sub>
    </div>
  );
}

export default PostDislike;
