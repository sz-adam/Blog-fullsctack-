import React, { useEffect, useState } from "react";
import PostService from "../services/PostsServices";
import PostCard from "../components/PostCard";
import AllCategory from "../components/allCategory";
import { getAccessToken } from "../common/utils";


function Home() {
  const [posts, setPosts] = useState([]);
  const access_token = getAccessToken();
 

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
  }, [access_token]);

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
