import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import PostService from '../services/PostsServices';
import { UserContext } from '../context/userContext';
import { useNavigate, Link } from "react-router-dom";

function PostDetails() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const navigate = useNavigate();
console.log(postData)
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const postDetails = await PostService.singlePosts(access_token, postId);
          setPostData(postDetails);
        } else{
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching post details:", error);       
      }
    };
    fetchData(access_token, postId);
  }, [access_token, postId]);

  return (
    <div>
      <h1>Post Details - ID: {postId}</h1>
    
      
       
   
    </div>
  );
}

export default PostDetails;
