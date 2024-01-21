import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { AuthUserContext } from "./context/AuthUserContext";
import { useEffect, useState } from "react";
import { lookInSession } from "./common/session";
import PostDetails from "./pages/PostDetails";
import WritePost from "./pages/WritePost";
import UpdatePost from "./pages/UpdatePost";
import { UserContextProvider } from "./context/UserContext";
import UserProfile from "./pages/UserProfile";
import Profile from "./pages/Profile";
import UserSettings from "./pages/UserSettings";
import { getAccessToken } from "./common/utils";
import PostService from "./services/PostsServices";
import AdminPages from "./pages/AdminPages";

function App() {
  const [authUser, setAuthUser] = useState(AuthUserContext);
  const [posts, setPosts] = useState([]);
  const [searchPost, setSearchPost] = useState("");
  const access_token = getAccessToken();
  const isAdmin = authUser?.data?.isAdmin;

  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setAuthUser(JSON.parse(userInSession));
    }
  }, []);

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
        console.error('Error fetching posts:', error);
      }
    };

    fetchData();
  }, [access_token, searchPost]);  

  const filteredPosts = posts.filter((post) =>
  post.title.toLowerCase().includes(searchPost.toLowerCase())
);


  return (
    <>
      <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
        <UserContextProvider>
          <Router>          
            <Navbar searchPost={searchPost} setSearchPost={setSearchPost} />
            <Routes>
              <Route path="/" element={<Home posts={filteredPosts} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/write" element={<WritePost />} />
              <Route path="/adminPage" element={isAdmin ? <AdminPages /> : <Navigate to="/" />} />
              <Route path="/update/:postId" element={<UpdatePost />} />
              <Route path="/post/:postId" element={<PostDetails />} />
              <Route path="/profile/:userId" element={<Profile />} />
              <Route path="/userprofile/:userId" element={<UserProfile />} />
              <Route path="/settings/:userId" element={<UserSettings />} />
            </Routes>
          </Router>
        </UserContextProvider>
      </AuthUserContext.Provider>
    </>
  );
}

export default App;
