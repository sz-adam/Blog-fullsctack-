import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import PostService from "../services/PostsServices";
import PostCard from "../components/PostCard";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [noLoginPosts, setNoLoginPosts] = useState([]);
  const access_token = user?.data?.token;

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
    <div className=" flex flex-col justify-center items-center">
      {access_token ? (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      ) : (
        <div className="flex space-x-4 items-center">
          {noLoginPosts.map((post) => <PostCard key={post.id} post={post} />)
      }
        </div>
      )}
    </div>
  );
}

export default Home;
