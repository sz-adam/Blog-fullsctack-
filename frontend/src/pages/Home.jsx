import { useContext, useEffect, useState } from "react";
import PostCard from "../components/PostCard";
import CarouselHome from "../components/CarouselHome";
import { getAccessToken } from "../common/utils";
import PostService from "../services/PostsServices";
import AnimatedMotion from "../common/AnimatedMotion";
import SortedPost from "../components/SortedPost";
import { UserContext } from "../context/UserContext";
import AdminWritemodal from "../components/AdminWritemodal";

function Home({ searchPost }) {
  const access_token = getAccessToken();
  const [posts, setPosts] = useState([]);
  const { user } = useContext(UserContext);
  const [sortBy, setSortBy] = useState("date");
  const [showAdminWrite, setShowAdminWrite] = useState(false);
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
        {user?.isBlocked && (
          <div className="w-full flex justify-center items-center">
            <p className="text-center font-semibold text-xl border rounded-full bg-rose-500 text-TextWhite p-2 md:p-5 mt-10 md:m-2">
              Write a message when the user is blocked{" "}
              <span
                className="font-bold cursor-pointer"
                onClick={() => setShowAdminWrite(true)}
              >
                Click
              </span>
              !{" "}
            </p>
          </div>
        )}
        {showAdminWrite && (
          <AdminWritemodal            
            setShowAdminWrite={setShowAdminWrite}
          />
        )}
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
