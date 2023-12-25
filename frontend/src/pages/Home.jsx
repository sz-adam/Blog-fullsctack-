import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../context/userContext";

function Home() {
  const { user, setUser } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [noLoginPosts, setNoLoginPosts] = useState([]);
  const access_token = user?.data?.token;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const response = await axios.get(import.meta.env.VITE_API_ALLPOSTS, {
            headers: {
              Authorization: `Bearer ${access_token}`,
            },
          });
          setPosts(response.data.data);
        } else {
          const response = await axios.get(
            import.meta.env.VITE_API_NOLOGINPOSTS
          );
          setNoLoginPosts(response.data.data);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token]);
  import.meta.env.VITE_API_LOGIN;
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
