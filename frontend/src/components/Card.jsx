import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "./DeleteModal";
import { getAccessToken } from "../common/utils";
import CategoryService from "../services/CategoryServices";
import { UserContext } from "../context/UserContext";
import UserService from "../services/UserServices";

function Card({ postData, postId }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const [category, setCategory] = useState("");
  const [allUsers, setAllUsers] = useState();
  const access_token = getAccessToken();
  const categoryId = postData?.category;
  const { user } = useContext(UserContext);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  //category
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token && categoryId) {
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          setAllUsers(allUser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token]);
  const filteredUsers =
    allUsers?.filter((user) => postData?.user === user.id) || [];  

  return (
    <div>
      <div className="flex justify-around mb-4 mt-2 md:mb-6 items-center">
        <p className="text-gray-500">
          <Link to="/" className="flex items-center">
            <FaArrowLeft className="mr-1" /> Back
          </Link>
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Create:</span>
          {formatDate(postData?.createdAt)}
        </p>
        <p className="text-gray-500">
          {filteredUsers.map((filteredUser) => (
            
            <span className="font-bold" key={filteredUser.id}>Create: {filteredUser?.fullname} {filteredUser.email}</span>
          ))}
        </p>
      </div>

      {/**post */}
      <div className="lg:flex justify-center items-center text-center w-full xl:w-3/4 mx-auto pr-2">
        {/** foto*/}
        <div className="w-full md:w-1/2 lg:w-1/3  flex justify-center mb-4 mx-auto">
          <img
            src={postData?.photo}
            alt={postData?.title}
            className="object-cover rounded-lg"
          />
        </div>
        {/**description */}
        <div className="md:w-full lg:w-2/3 mx-auto md:ml-10">
          {user?._id === postData?.user && (
            <div className="flex justify-end  ">
              <Link to={`/update/${postId}`}>
                <FaRegEdit className="icon text-gray-600" />
              </Link>
              <AiTwotoneDelete
                className="icon text-red-600 cursor-pointer"
                onClick={() => setDeleteModal(true)}
              />
            </div>
          )}
          {deleteModal && (
            <DeleteModal setDeleteModal={setDeleteModal} postId={postId} />
          )}

          <h1 className="text-3xl font-bold mb-2">{postData?.title}</h1>
          <h2 className="font-medium text-gray-400 mb-1 py-10">
            CATEGORY: {category?.title}
          </h2>
          <p className="text-gray-600 mb-4 text-justify">
            {postData?.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
