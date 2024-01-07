import React, { useContext, useEffect, useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/UserContext";

function PostLikeDislike({ post, setPost }) {
  const [isLiked, setIsLiked] = useState(false);
  const [isDisliked, setIsDisliked] = useState(false);
  const { postId } = useParams();
  const access_token = getAccessToken();
  const { user } = useContext(UserContext);

  // Ellenőrizzük, hogy a felhasználó már dislikolta-e a posztot
  const isUserDislikedPost = () => {
    return post?.disLikes?.includes(user?.id);
  };
    // Ellenőrizzük, hogy a felhasználó már lájkolta-e a posztot
  const isUserLikedPost = () => {
    return post?.likes?.includes(user?.id);
  };

  useEffect(() => {  
    setIsLiked(isUserLikedPost);   
    setIsDisliked(isUserDislikedPost);
  }, [post?.likes, post?.disLikes,user]);

  const handleLikePost = async () => {
    try {
      if (access_token && postId) {
        const updatedPost = await PostService.likePost(access_token, postId);
        setPost(updatedPost);
        setIsLiked(true);
        setIsDisliked(false);
      }
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  const handleDislikePost = async () => {
    try {
      if (access_token && postId) {
        const updatedPost = await PostService.disLikePost(access_token, postId);
        setPost(updatedPost);
        setIsLiked(false);
        setIsDisliked(true);
      }
    } catch (error) {
      console.error("Error disliking post:", error);
    }
  };

  return (
    <div className="flex items-center">
        {/** dislike eltünik*/}
      {isDisliked === true ? (
        ""
      ) : (
        <div className="flex flex-col justify-end items-end mr-1">
          <AiFillLike
            className={`text-3xl cursor-pointer m-1 ${
              isLiked ? "text-blue-500" : ""
            }`}
            onClick={handleLikePost}
          />
          <sub>{post?.likesCount}</sub>
        </div>
      )}

      {/**like eltűnik */}
      {isLiked === true ? (
        ""
      ) : (
        <div className="flex flex-col justify-end items-end mr-1">
          <AiFillDislike
            className={`text-3xl cursor-pointer m-1 ${
              isDisliked ? "text-blue-500" : ""
            }`}
            onClick={handleDislikePost}
          />
          <sub>{post?.disLikesCount}</sub>
        </div>
      )}
    </div>
  );
}

export default PostLikeDislike;
