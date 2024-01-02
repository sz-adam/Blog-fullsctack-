import React, { useContext, useEffect, useState } from "react";
import CommentServices from "../services/CommentServices";
import { getAccessToken } from "../common/utils";
import { AiTwotoneDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import EditComment from "./EditComment";
import { UserContext } from "../context/UserContext";
import UserService from "../services/UserServices";
import { Link } from "react-router-dom";

function PostAllComment({ comment, post, fetchCommentsPost }) {
  const { user } = useContext(UserContext);
  const access_token = getAccessToken();
  const commentId = comment?._id;
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState("");
  const [editedCommentId, setEditedCommentId] = useState(null);
  const [commentSearchUserName, setCommentSearchUserName] = useState();
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
        fetchCommentsPost();
        closeEditing();
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          const filteredUsers =
            allUser?.filter((user) => comment?.user === user.id) || [];
          setCommentSearchUserName(filteredUsers[0] || {});
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token]);

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
      }
      fetchCommentsPost();
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
          <div className="text-center">
            <p className="px-4  ">{comment.description}</p>
          </div>
        )}
        <div className="flex justify-center items-center space-x-4">
          {user?._id === comment?.user ? (
            <div className="flex items-center justify-center space-x-2">
              <BiEdit
                onClick={() => openEditing(commentId, comment.description)}
                className=" cursor-pointer text-xl icon"
              />
              <AiTwotoneDelete
                className="cursor-pointer text-xl icon"
                onClick={() => deleteComment(commentId)}
              />
            </div>
          ) : (
            ""
          )}

          <div>
            <p className="text-sm"> {formatDate(comment?.createdAt)}</p>
            <Link
              to={`/profile/${commentSearchUserName?.id}`}
              state={{ user: commentSearchUserName }}
            >
              <p className="text-gray-500 text-sm">
                @{commentSearchUserName?.fullname}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostAllComment;
