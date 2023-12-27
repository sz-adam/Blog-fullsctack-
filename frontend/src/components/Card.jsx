import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

function Card({ postData }) {
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <div>
      <div className="flex justify-end mb-4 mt-2 md:mb-6 items-center ">
        <p className="text-gray-500">
          <span className="font-bold">Create:</span>{" "}
          {formatDate(postData?.createdAt)}
        </p>
      </div>

      {/**post */}
      <div className="lg:flex justify-center items-center text-center w-full ">
        {/** foto*/}
        <div className="w-full md:w-1/2 lg:w-1/3 flex justify-center mb-4 mx-auto">
          <img
            src={postData?.photo}
            alt={postData?.title}
            className="object-cover rounded-lg"
          />
        </div>
        {/**description */}
        <div className="md:w-full lg:w-2/3 mx-auto md:ml-10">
          <h1 className="text-3xl font-bold mb-2">{postData?.title}</h1>
          <p className="text-gray-600 mb-4 text-justify">
            {postData?.description}
          </p>

          <div className="flex items-center space-x-4 mb-4">
            <span className="text-gray-400 inline-flex items-center leading-none border-r-2 border-gray-200 pr-3">
              <AiOutlineLike className="mr-1" />
              <p>{postData?.likesCount}</p>
            </span>
            <span className="text-gray-400 inline-flex items-center leading-none">
              <AiOutlineDislike className="mr-1" />
              <p>{postData?.disLikesCount}</p>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
