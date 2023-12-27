import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";
import { UserContext } from "../context/userContext";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";
import DeleteModal from "../components/DeleteModal";
import CreateComment from "../components/CreateComment";

function PostDetails() {
  const { postId } = useParams();
  const [postData, setPostData] = useState(null);
  const { user } = useContext(UserContext);
  const access_token = user?.data?.token;
  const navigate = useNavigate();
  const [deleteModal, setDeleteModal] = useState(false);
  console.log(postData)

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
    <div className="mt-8 p-4 bg-white flex justify-center items-center ">
      {postData && (
        <div>
          <div className="flex justify-end">
            <p className="text-gray-500">
              <span>Create : </span>
              {formatDate(postData.createdAt)}
            </p>
          </div>
          <div className=" md:flex justify-center items-center text-center w-full">
            <div className="w-full md:w-1/3 flex justify-center object-cover mb-4 md:mb-0">
              <img src={postData.photo} alt={postData.title} />
            </div>
            <div className="ml-4 flex-1 min-w-2/3">
              <h1 className="text-3xl font-bold mb-2">{postData.title}</h1>
              <p className="text-gray-600 mb-4">{postData.description}</p>
              <div className="flex items-center space-x-4">
                <span className="text-gray-400 inline-flex items-center leading-none  border-r-2 border-gray-200 mr-3 py-1 pr-3">
                  <AiOutlineLike />
                  <p className="ml-1">{postData.likesCount}</p>
                </span>
                <span className="text-gray-400 inline-flex items-center leading-none  ">
                  <AiOutlineDislike />
                  <p className="ml-1">{postData.disLikesCount}</p>
                </span>
              </div>
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
                <Link to="/" className="btn-dark">
                  Comments
                </Link>
                <Link to={`/update/${postId}`} className="btn-dark">
                  Update
                </Link>
               {/** <Link to={`/delete/${postId}`} className="btn-dark">
                  Delete
                </Link>
                 */}

                <button
                  className="btn-dark"
                  type="button"
                  onClick={() => setDeleteModal(true)}
                >
                 Delete
                </button>
                {deleteModal && <DeleteModal  setDeleteModal={setDeleteModal} postId={postId}/> }
              </div>
              <CreateComment postId={postId}/>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PostDetails;
