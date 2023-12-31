import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";
import Card from "../components/Card";
import { FaRegComment } from "react-icons/fa";
import Interaction from "../components/Interaction";
import CommentServices from "../services/CommentServices";
import { getAccessToken } from "../common/utils";
import CreateComment from "../components/CreateComment";
import PostAllComment from "../components/PostAllComment";

function PostDetails() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const [allComments, setAllComments] = useState([]);
  const access_token = getAccessToken();
  const [showCreateComment, setShowCreateComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          // Fetch post details
          const postDetails = await PostService.singlePosts(
            access_token,
            postId
          );
          setPostData(postDetails);

          // Fetch all comments for the post
          const comments = await CommentServices.allpostComment(
            access_token,
            postId
          );
          setAllComments(comments);
        } else {
          // Handle case when there is no access_token
          // or redirect to login page, etc.
        }
      } catch (error) {
        console.error("Error fetching post details or comments:", error);
      }
    };

    fetchData();
  }, [access_token, postId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-11/12 justify-center items-center ">
        <Card postData={postData} postId={postId} />

        <div className="flex flex-col items-center justify-center text-center space-x-4 mb-4 w-full">
          <div>
            <Interaction postData={postData} />
            <span
              className="text-gray-400 inline-flex items-center leading-none text-xl cursor-pointer"
              onClick={() => setShowCreateComment(true)}
            >
              <FaRegComment className="mr-1" />
              <p>Comment</p>
            </span>
          </div>
          <div className="mt-5">
            {showCreateComment ? (
              <CreateComment
                postId={postId}
                setShowCreateComment={setShowCreateComment}
                setAllComments={setAllComments}
              />
            ) : null}
          </div>
        </div>
        <PostAllComment
          postId={postId}
          allComments={allComments}
          setAllComments={setAllComments}
        />
      </div>
    </div>
  );
}

export default PostDetails;
