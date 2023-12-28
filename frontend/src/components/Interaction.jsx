import React from "react";
import { AiOutlineLike } from "react-icons/ai";
import { AiOutlineDislike } from "react-icons/ai";

function Interaction({postData}) {
  return (
    <>
      <span className="text-gray-400 inline-flex items-center leading-none  border-gray-200 pr-5 text-xl">
        <AiOutlineLike className="mr-1" />
        <p>{postData?.likesCount}</p>
      </span>
      <span className="text-gray-400 inline-flex items-center leading-none  border-gray-200 pr-5 text-xl">
        <AiOutlineDislike className="mr-1" />
        <p>{postData?.disLikesCount}</p>
      </span>
    </>
  );
}

export default Interaction;
