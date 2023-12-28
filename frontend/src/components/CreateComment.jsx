import React, { useContext, useState } from "react";
import InputBox from "./InputBox";
import CommentServices from "../services/CommentServices";
import { UserContext } from "../context/userContext";

function CreateComment({ postId, onCommentCreated, setShowCreateComment }) {
  const [comment, setComment] = useState("");
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;

  const handleCreateComment = async (event) => {
    event.preventDefault();
    try {
      if (access_token && postId) {
        const newComment = await CommentServices.createComment(access_token, {
          postId,
          description: comment,
        });

        // After creating the comment, call the onCommentCreated function
        onCommentCreated(newComment);
        setShowCreateComment(false);
      }
    } catch (error) {
      console.error("Error creating comment:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateComment}>
        <InputBox
          type="text"
          placeholder="comment"
          value={comment}
          onChange={(event) => setComment(event.target.value)}
        />
        <button type="submit" className="btn-dark">
          Sending
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
