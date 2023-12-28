import React, { useContext } from "react";
import CommentServices from "../services/CommentServices";
import { UserContext } from "../context/userContext";
import { AiTwotoneDelete } from "react-icons/ai";

function DeleteComment({ updateComments, comment }) {
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;

  const handleDeleteComment = async (commentId) => {
    try {
      // check for access_token and CommentID
      if (access_token && commentId) {
        // We retrieve the details of the category based on the CommentID
        await CommentServices.deleteComment(access_token, commentId);
        updateComments();
        console.log("sikeres törlés");
      }
    } catch (error) {
      console.error("Hiba a kategória részleteinek lekérésekor:", error);
    }
  };

  return (
    <>
      <AiTwotoneDelete
        className="icon text-red-600 cursor-pointer"
        onClick={() => handleDeleteComment(comment._id)}
      />
    </>
  );
}

export default DeleteComment;
