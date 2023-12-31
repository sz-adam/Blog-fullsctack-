import React, { useContext, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import CommentServices from "../services/CommentServices";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";
import { AuthUserContext } from "../context/AuthUserContext";

function PostAllComment({ allComments, setAllComments }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const access_token = getAccessToken();
  const { user } = useContext(UserContext);

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

        setAllComments((prevComments) =>
          prevComments.map((comment) =>
            comment._id === editedCommentId
              ? { ...comment, description: editedComment }
              : comment
          )
        );
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
      {allComments.map((comment) => (
        <div key={comment._id} className="mb-2 p-2 bg-gray-100 flex ">
          <div className="flex-grow">
            {isEditing && editedCommentId === comment._id ? (
              <EditComment
                editedComment={editedComment}
                setEditedComment={setEditedComment}
                handleCommentUpdate={handleCommentUpdate}
                closeEditing={closeEditing}
                editedCommentId={editedCommentId}
              />
            ) : (
              <p>{comment.description}</p>
            )}
          </div>
          <div className="flex flex-col justify-end ml-2">
            <div className="flex mb-1">
              {comment?.user === user?.id && (
                <>
                  <FaRegEdit
                    className="icon text-gray-600"
                    onClick={() =>
                      openEditing(comment._id, comment.description)
                    }
                  />
                  <DeleteComment comment={comment} />
                </>
              )}
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
