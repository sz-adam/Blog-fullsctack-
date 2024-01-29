import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../services/PostsServices";
import { Link } from "react-router-dom";
import CommentServices from "../services/CommentServices";
import { getAccessToken } from "../common/utils";
import PostAllComment from "../components/PostAllComment";
import Loader from "../components/Loader";
import { UserContext } from "../context/UserContext";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import CategoryService from "../services/CategoryServices";
import DeleteModal from "../components/DeleteModal";
import CreateComment from "../components/CreateComment";
import UserService from "../services/UserServices";
import { FaArrowLeft } from "react-icons/fa";
import PostLikeDislike from "../components/PostLikeDislike";

function PostDetails() {
  const { postId } = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);
  const access_token = getAccessToken();
  const [comment, setComment] = useState("");
  const [loader, setLoader] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const [category, setCategory] = useState("");
  const categoryId = post?.category;
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchUser, setSearchUser] = useState();

  ///single post
  const fetchPost = async () => {
    try {
      if (access_token && postId) {
        // Fetch post details
        const postDetails = await PostService.singlePosts(access_token, postId);
        setPost(postDetails);
        // Fetch all users
        const allUser = await UserService.allUser(access_token);
        // Find the user based on post's user ID
        const userById = allUser.find((user) => postDetails?.user === user.id);
        setSearchUser(userById);
      }
    } catch (error) {
      console.error("Error fetching post details or posts:", error);
    }
  };

  //all comments
  const fetchCommentsPost = async () => {
    setLoader(true);
    try {
      if (access_token && postId) {
        // Fetch post details
        const comments = await CommentServices.allpostComment(
          access_token,
          postId
        );
        setComments(comments);
        setLoader(false);
      }
    } catch (error) {
      setLoader(true);
      console.error("Error fetching post details or comments:", error);
    }
  };

  useEffect(() => {
    fetchCommentsPost();
    fetchPost();
  }, [postId, access_token]);

  //create comments
  const fetchCreateComment = async (event) => {
    event.preventDefault();
    try {
      // Check if there is an access_token and postId
      if (access_token && postId) {
        // Create a new comment using the CommentServices
        const newComment = await CommentServices.createComment(access_token, {
          postId,
          description: comment,
        });
        setComment("")
        setComments((prevComments) => [...prevComments, newComment]);
        // window.location.reload(true)
      }
    } catch (error) {
      // Log and handle errors if any occur during the comment creation
      console.error("Error creating comment:", error);
    }
  };

  //single category
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token && categoryId && post?.user) {
          const postsData = await CategoryService.singleCategory(
            access_token,
            categoryId
          );
          setCategory(postsData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token, categoryId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div>
      {loader ? (
        <div className="h-[80vh] flex justify-center items-center w-full">
          <Loader />
        </div>
      ) : (
        <div className="px-8 md:px-[200px] mt-8 mb-8">
          <p className="text-gray-500 mb-5">
            <Link to="/" className="flex items-center">
              <FaArrowLeft className="mr-1 " /> Back
            </Link>
          </p>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-black md:text-3xl">
              {post?.title}
            </h1>
            {user?._id === post?.user && (
              <div className="flex items-center justify-center space-x-2">
               <Link to={`/update/${postId}`}>
                  <BiEdit className="cursor-pointer text-xl icon" />
                </Link>
                <p
                  className="cursor-pointer"
                  onClick={() => setDeleteModal(true)}
                >
                  <MdDelete className="cursor-pointer text-xl icon" />
                </p>
                {deleteModal && (
                  <DeleteModal
                    setDeleteModal={setDeleteModal}
                    postId={postId}
                  />
                )}
              </div>
            )}
          </div>
          <div className="flex flex-col  mt-2 md:mt-4">
            <p className="text-gray-500">
              Create: {formatDate(post?.createdAt)}{" "}
            </p>
            <Link to={`/profile/${searchUser?.id}`} key={searchUser?.id}>
              <p className="text-gray-500">@{searchUser?.fullname}</p>
            </Link>
          </div>
          <img
            src={post?.photo}
            className="w-full md:w-1/2 mx-auto mt-8"
            alt=""
          />
          <p className="mx-auto mt-8">{post?.description}</p>
          <div className="flex items-center justify-between mt-8 space-x-4 font-semibold">
            <div className="flex">
              <p className="pr-10">Categories:</p>
              <p>{category?.title}</p>
            </div>
            {user?._id === post?.user ? (
              ""
            ) : (
              <PostLikeDislike setPost={setPost} post={post} />
            )}
          </div>
          <div className="flex flex-col justify-center items-center mt-4">
            <h3 className="mt-6 mb-4 font-semibold">Comments:</h3>
            {/* write a comment */}
            <div className="mt-4 w-full md:w-1/2 ">
              <CreateComment
                fetchCreateComment={fetchCreateComment}
                comment={comment}
                setComment={setComment}
              />
            </div>
          </div>
          {comments?.map((comment) => (
            <PostAllComment
              key={comment._id}
              comment={comment}
              post={post}
              fetchCommentsPost={fetchCommentsPost}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default PostDetails;
