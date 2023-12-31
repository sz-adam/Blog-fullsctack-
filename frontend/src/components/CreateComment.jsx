import React, { useState } from "react";
import InputBox from "./InputBox";
import { getAccessToken } from "../common/utils";
import CommentServices from "../services/CommentServices";
import { useNavigate } from "react-router-dom";

function CreateComment({ setShowCreateComment, postId, setAllComments }) {
  const access_token = getAccessToken();
  const [createComments, setCreateComments] = useState("");

  const handleCreateComment = async (event) => {
    event.preventDefault();
    try {
      // Check if there is an access_token and postId
      if (access_token && postId) {
        // Create a new comment using the CommentServices
        const newComment = await CommentServices.createComment(access_token, {
          postId,
          description: createComments,
        });
        setCreateComments(newComment);
        setAllComments((prevComments) => [...prevComments, newComment]);
        setShowCreateComment(false);
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
          value={createComments}
          onChange={(event) => setCreateComments(event.target.value)}
        />
        <button
          type="submit"
          className="editText focus:ring focus:ring-green-500 bg-green-400 text-white text-lg"
        >
          Sending
        </button>
        <button
          type="button"
          className="editText focus:ring focus:ring-red-500 bg-red-400 text-white text-lg"
          onClick={() => setShowCreateComment(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateComment;
