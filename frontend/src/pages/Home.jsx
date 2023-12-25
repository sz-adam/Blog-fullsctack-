import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/userContext";
import PostService from "../services/PostsServices";

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
    <div>
      {access_token ? (
        posts.map((post) => (
          <div key={post._id}>
            <p>{post.title}</p>
          </div>
        ))
      ) : (
        <div className="flex space-x-4 items-center">
          {noLoginPosts.map((post) => (
            <div key={post._id}>
              <p>{post.title}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
