import React, { useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CarouselHome from "../components/CarouselHome";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import AnimatedMotion from "../common/AnimatedMotion";
import SortedPost from "../components/SortedPost";

function Home({ searchPost }) {
  const access_token = getAccessToken();
  const [posts, setPosts] = useState([]);
  const [sortBy, setSortBy] = useState("date");
  console.log(posts[0]);
  const handleSortChange = (selectedValue) => {
    setSortBy(selectedValue);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let fetchedPosts;
        if (access_token) {
          fetchedPosts = await PostService.getAllPosts(access_token);
        } else {
          fetchedPosts = await PostService.getAllPosts();
        }

        let sortedPosts;
        // sort date
        if (sortBy === "date") {
          sortedPosts = fetchedPosts.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
          );
        }
        // sort likes
        else if (sortBy === "likes") {
          sortedPosts = fetchedPosts.sort(
            (a, b) => b.likesCount - a.likesCount
          );
        }
        // sort comments
        else if (sortBy === "comments") {
          sortedPosts = fetchedPosts.sort(
            (a, b) => b.comments.length - a.comments.length
          );
        }
        // sort views
        else if (sortBy === "views") {
          sortedPosts = fetchedPosts.sort(
            (a, b) => b.viewsCount - a.viewsCount
          );
        }
        // sort postName
        else if (sortBy === "postName") {
          sortedPosts = fetchedPosts.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
        }
        //sort username
        else if (sortBy === "userName") {
          sortedPosts = fetchedPosts.sort((a, b) =>
            a.user.fullname.localeCompare(b.user.fullname)
          );
        }

        setPosts(sortedPosts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token, searchPost, sortBy]);

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchPost.toLowerCase())
  );

  return (
    <>
      <AnimatedMotion animationName="pageAnimation">
        {filteredPosts.length > 0 && <CarouselHome posts={filteredPosts} />}
        <SortedPost sortBy={sortBy} handleSortChange={handleSortChange} />
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
