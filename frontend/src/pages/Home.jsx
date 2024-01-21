import React from "react";
import PostCard from "../components/PostCard";
import AllCategory from "../components/allCategory";

function Home({posts}) {

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex flex-col justify-end items-center w-full">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <div className="w-64 flex justify-center">
        <AllCategory />
      </div>
    </div>
  );
}

export default Home;
