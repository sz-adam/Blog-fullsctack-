import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaRegEdit } from "react-icons/fa";
import DeleteModal from "./DeleteModal";

function Card({ postData, postId }) {
  const [deleteModal, setDeleteModal] = useState(false);
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  console.log(postData)
  return (
    <div>
      <div className="flex justify-around mb-4 mt-2 md:mb-6 items-center">
        <p className="text-gray-500">
          <Link to="/" className="flex items-center">
            <FaArrowLeft className="mr-1" /> Back
          </Link>
        </p>
        <p className="text-gray-500">
          <span className="font-bold">Create:</span>{" "}
          {formatDate(postData?.createdAt)}
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
          <div className="flex justify-end  ">
            <Link to={`/update/${postId}`}>
              <FaRegEdit className="icon text-gray-600" />
            </Link>
            <AiTwotoneDelete
              className="icon text-red-600 cursor-pointer"
              onClick={() => setDeleteModal(true)}
            />
          </div>
          {deleteModal && (
            <DeleteModal setDeleteModal={setDeleteModal} postId={postId} />
          )}

          <h1 className="text-3xl font-bold mb-2">{postData?.title}</h1>
          <h2 className="font-medium text-gray-400 mb-1 py-10">
            CATEGORY: {postData?.title}
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
