import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";

function PostSearch({searchPost, setSearchPost}) {
  const [searchVisibility, setSearchVisibility] = useState(false);

  return (
    <>
      <button
        className="md:hidden bg-grey w-10 h-10 border-2 rounded-full  border-green-400 flex items-center justify-center text-xl animate-pulse"
        onClick={() => setSearchVisibility(!searchVisibility)}
      >
        <CiSearch className="text-TextWhite"/>
      </button>
      <div
        className={
          "absolute  w-full left-0 top-full  py-4 px-2 md:border-0 md:block md:relative md:inset-0 md:p-0 md:w-auto md:opacity-100 " +
          (searchVisibility ? "opacity-100" : "opacity-0")
        }
      >
        <input
          type="text"
          placeholder="Search"
          value={searchPost}
          onChange={(e) => setSearchPost(e.target.value)}
          className="w-full border-2 py-2.5 border-green-400  focus:outline-none rounded-full px-3 md:pl-12"
        />

        <CiSearch className="absolute  right-10 md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-xl text-DeepGray" />
      </div>
    </>
  );
}

export default PostSearch;
