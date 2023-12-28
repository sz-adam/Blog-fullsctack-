import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import CreateComment from "../components/CreateComment";
import PostAllComment from "../components/PostAllComment";
import Card from "../components/Card";
import { FaRegComment } from "react-icons/fa";
import Interaction from "../components/Interaction";

function PostDetails() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const navigate = useNavigate();
  const [showCreateComment, setShowCreateComment] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const postDetails = await PostService.singlePosts(
            access_token,
            postId
          );
          setPostData(postDetails);
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };
    fetchData(access_token, postId);
  }, [access_token, postId]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col w-11/12 justify-center items-center ">
        <Card postData={postData} postId={postId} />

        <div className="flex flex-col items-center justify-center text-center space-x-4 mb-4 w-full">
          <div >
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
            {showCreateComment ? <CreateComment postId={postId} /> : null}
          </div>
        </div>
        <PostAllComment postId={postId} />
      </div>
    </div>
  );
}

export default PostDetails;
