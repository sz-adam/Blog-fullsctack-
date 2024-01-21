import React from "react";
import PostCard from "../components/PostCard";
import AllCategory from "../components/allCategory";

function Home({posts}) {

  return (
    <>
    {posts.length === 0 ?(
     <div className="flex items-center justify-center h-screen" >
      <h1 className="text-2xl md:text-6xl text-center font-extrabold text-transparent bg-clip-text log-reg-color">
      There are no results for your search criteria
      </h1>
    </div> ):(
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
    
    )}
    </>
  );
}

export default Home;
