// PostAllComment.js

import React, { useContext, useEffect, useState } from "react";
import CommentServices from "../services/CommentServices";
import { UserContext } from "../context/userContext";

function PostAllComment({ postId, commentList }) {
  const [comments, setComments] = useState([]);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allComments = await CommentServices.allpostComment(access_token, postId);
          setComments(allComments);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };
    fetchData();
  }, [postId, access_token]);

  return (
    <div>
      <ul>
      {commentList.map((comment) => (
          <li key={comment._id}>{comment.description}</li>
        ))}
      </ul>
    </div>
  );
}

export default PostAllComment;
