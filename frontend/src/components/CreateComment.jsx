import React, { useContext, useState } from "react";
import InputBox from "./InputBox";
import CommentServices from "../services/CommentServices";
import { UserContext } from "../context/userContext";

function CreateComment({ postId, setShowCreateComment, updateComments }) {
  const [comment, setComment] = useState("");
  const { user, setUser } = useContext(UserContext);
  const access_token = user?.data?.token;

  const handleCreateComment = async (event) => {
    event.preventDefault();
    try {
      // Check if there is an access_token and postId
      if (access_token && postId) {
        // Create a new comment using the CommentServices
        const createCommentResponse = await CommentServices.createComment(
          access_token,
          {
            postId,
            description: comment,
          }
        );
        setShowCreateComment(false);
        updateComments()    
      }
    } catch (error) {
      // Log and handle errors if any occur during the comment creation
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
      <button className="btn-white" onClick={() => setShowCreateComment(false)}>
          Cancel
        </button>
    </div>
  );
}

export default CreateComment;
