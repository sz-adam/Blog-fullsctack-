import React from "react";
import { FaEye } from "react-icons/fa";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

function postCard({ post }) {
  console.log(post);
  return (
    <>
      <div className="p-1 w-full md:w-1/2">
        <div className="h-full border-2 border-gray-200 border-opacity-60 rounded-2xl overflow-hidden">
          <img
            className="h-48 md:h-48 w-full object-cover object-center"
            src={post.photo}
            alt="blog"
          />
          <div className="p-6">
            <h2 className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1">
              CATEGORY: {post.category.title}
            </h2>
            <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
             {post.title}
            </h1>

            <div className="flex items-center flex-wrap">
              <button className="btn-dark px-10">
                View
              </button>
              <span className="text-gray-400 mr-3 inline-flex items-center ml-auto leading-none  pr-3 border-r-2 border-gray-200">
                <FaEye />
                <p className="ml-1">{post.viewsCount}</p>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none  border-r-2 border-gray-200 mr-3 py-1 pr-3">
                <AiOutlineLike />
                <p className="ml-1">{post.likesCount}</p>
              </span>
              <span className="text-gray-400 inline-flex items-center leading-none  ">
                <AiOutlineDislike />
                <p className="ml-1">{post.disLikesCount}</p>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default postCard;
