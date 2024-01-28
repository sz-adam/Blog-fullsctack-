import React from "react";
import PostCard from "../components/PostCard";
import CarouselHome from "../components/CarouselHome";

function Home({posts}) {

  return (
    <>
    <CarouselHome posts={posts}/>
    {posts.length === 0 ?(
     <div className="flex items-center justify-center h-screen" >
      <h1 className="text-2xl md:text-6xl text-center font-extrabold text-transparent bg-clip-text log-reg-color">
      There are no results for your search criteria
      </h1>
    </div> ):(   
      <div className="grid  sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
    </div>    
    )}
    </>
  );
}

export default Home;
