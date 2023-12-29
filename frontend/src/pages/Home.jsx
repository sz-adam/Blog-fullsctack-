import React, { useEffect, useState } from "react";
import PostService from "../services/PostsServices";
import PostCard from "../components/PostCard";
import AllCategory from "../components/allCategory";
import { getAccessToken } from "../common/utils";

function Home() {

  const [posts, setPosts] = useState([]);
  const [noLoginPosts, setNoLoginPosts] = useState([]);
  const access_token = getAccessToken();
  const postsToShow = access_token ? posts : noLoginPosts;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const postsData = await PostService.getAllPosts(access_token);
          setPosts(postsData);
        } else {
          const noLoginPostsData = await PostService.getAllPosts();
          setNoLoginPosts(noLoginPostsData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token]);

  return (
    <div className="flex flex-col justify-center items-center">
      <AllCategory />
      {postsToShow.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}

export default Home;
