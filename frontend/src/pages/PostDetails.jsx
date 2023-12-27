import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import DeleteModal from "../components/DeleteModal";
import CreateComment from "../components/CreateComment";
import PostAllComment from "../components/PostAllComment";
import Card from "../components/Card";

function PostDetails() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  console.log(postData);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

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
        <Card postData={postData} />

        <div className="mt-10">
          <Link to="/" className="btn-dark">
            Back
          </Link>
          <Link to="/" className="btn-dark">
            Like
          </Link>
          <Link to="/" className="btn-dark">
            Dislike
          </Link>
          <button className="btn-dark">Comments</button>
          <Link to={`/update/${postId}`} className="btn-dark">
            Update
          </Link>
          <button
            className="btn-dark"
            type="button"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
          {deleteModal && (
            <DeleteModal setDeleteModal={setDeleteModal} postId={postId} />
          )}
        </div>
        <CreateComment postId={postId} />
        <PostAllComment postId={postId} />
       
      </div>
    </div>
  );
}

export default PostDetails;
