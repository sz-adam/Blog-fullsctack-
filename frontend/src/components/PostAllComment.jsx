import React, { useState } from "react";
import CommentServices from "../services/CommentServices";
import { getAccessToken } from "../common/utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import EditComment from "./EditComment";

function PostAllComment({ comment, post }) {
  const access_token = getAccessToken();
  const commentId = comment?._id;
  console.log(comment);

  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const handleCommentUpdate = async () => {
    try {
      if (editedComment && editedCommentId) {
        await CommentServices.updateComments(access_token, editedCommentId, {
          description: editedComment,
        });
        updateComments();
        closeEditing();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const openEditing = (commentId, commentDescription) => {
    setIsEditing(true);
    setEditedCommentId(commentId);
    setEditedComment(commentDescription);
  };

  const closeEditing = () => {
    setIsEditing(false);
    setEditedCommentId(null);
    setEditedComment("");
  };

  const deleteComment = async () => {
    try {
      if (access_token) {
        await CommentServices.deleteComment(access_token, commentId);
        console.log("Comment deleted successfully", commentId);
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <div className="px-2 py-2 bg-gray-200 rounded-lg my-2">
      <div className="flex items-center justify-between text-center">
        {isEditing && editedCommentId === commentId ? (
          <EditComment
            editedComment={editedComment}
            setEditedComment={setEditedComment}
            handleCommentUpdate={handleCommentUpdate}
            closeEditing={closeEditing}
          />
        ) : (
          <div>
            <p className="px-4 mt-2 text-center">{comment.description}</p>
          </div>
        )}
        <div className="flex justify-center items-center space-x-4">
          <div className="flex items-center justify-center space-x-2">
            <BiEdit
              onClick={() => openEditing(commentId, c.description)}
              className=" cursor-pointer text-xl icon"
            />
            <AiTwotoneDelete
              className="cursor-pointer text-xl icon"
              onClick={() => deleteComment(commentId)}
            />
            <p> {formatDate(comment?.createdAt)}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAllComment;
