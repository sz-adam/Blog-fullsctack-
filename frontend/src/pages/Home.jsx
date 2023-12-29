import React, { useContext, useEffect, useState } from "react";
import PostService from "../services/PostsServices";
import PostCard from "../components/PostCard";
import AllCategory from "../components/allCategory";
import { AuthUserContext } from "../context/AuthUserContext";

function Home() {

  const [posts, setPosts] = useState([]);
  const [noLoginPosts, setNoLoginPosts] = useState([]);
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const access_token = authUser?.data?.token;
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
