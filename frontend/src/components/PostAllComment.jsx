import React, { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import CommentServices from "../services/CommentServices";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { AuthUserContext } from "../context/AuthUserContext";

function PostAllComment({ comments, updateComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const access_token = authUser?.data?.token;

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

  return (
    <div className="w-full md:w-1/2 p-4">
      {comments.map((comment) => (
        <div key={comment._id} className="mb-2 p-2 bg-gray-100 flex ">
          <div className="flex-grow">
            {isEditing && editedCommentId === comment._id ? (
              <EditComment
                editedComment={editedComment}
                setEditedComment={setEditedComment}
                handleCommentUpdate={handleCommentUpdate}
                closeEditing={closeEditing}
              />
            ) : (
              <p>{comment.description}</p>
            )}
          </div>
          <div className="flex flex-col justify-end ml-2">
            <div className="flex mb-1">
              <FaRegEdit
                className="icon text-gray-600"
                onClick={() => openEditing(comment._id, comment.description)}
              />
              <DeleteComment
                updateComments={updateComments}
                comment={comment}
              />
            </div>
            <div>
              <p className="font-bold text-gray-500 text-xs">
                {comment.author}
                {formatDate(comment?.createdAt)}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PostAllComment;
