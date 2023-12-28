import React, { useContext, useState } from "react";

import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import CommentServices from "../services/CommentServices";
import { UserContext } from "../context/userContext";
import InputBox from "./InputBox";

function PostAllComment({ comments, updateComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;

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
              <InputBox
                type="text"
                value={editedComment}
                onChange={(e) => setEditedComment(e.target.value)}
              />
            ) : (
              <p>{comment.description}</p>
            )}
          </div>
          <div className="flex flex-col justify-end ml-2">
            <div className="flex mb-1">
              {isEditing && editedCommentId === comment._id ? (
                <div className="flex flex-col mr-5">
                  <button onClick={handleCommentUpdate} className="hover:text-gray-500 border-b-2">Save</button>
                  <button onClick={closeEditing} className="hover:text-gray-500">Cancel</button>
                </div>
              ) : (
                <FaRegEdit
                  className="icon text-gray-600"
                  onClick={() => openEditing(comment._id, comment.description)}
                />
              )}
              <AiTwotoneDelete className="icon text-red-600 cursor-pointer" />
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
