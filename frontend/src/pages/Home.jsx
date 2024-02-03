import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CarouselHome from "../components/CarouselHome";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import AnimatedMotion from "../common/AnimatedMotion";

function Home({ searchPost }) {
  const access_token = getAccessToken();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedPosts;
        if (access_token) {
          fetchedPosts = await PostService.getAllPosts(access_token);
        } else {
          fetchedPosts = await PostService.getAllPosts();
        }
        setPosts(fetchedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token, searchPost]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchPost.toLowerCase())
  );

  return (
    <>
     <AnimatedMotion animationName="pageAnimation">
     {filteredPosts.length > 0 && <CarouselHome posts={filteredPosts} />}
      {filteredPosts.length === 0 ? (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl md:text-6xl text-center font-extrabold text-transparent bg-clip-text log-reg-color">
            There are no results for your search criteria
          </h1>
        </div>
      ) : (
        <div className="grid  sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 ">
          {filteredPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      )}
         </AnimatedMotion>
    </>
  );
}

export default Home;
