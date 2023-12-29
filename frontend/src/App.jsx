import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
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
import { UserContext } from "./context/userContext";

function App() {
  const [authUser, setAuthUser] = useState(AuthUserContext);
  const {user, setUser} =useState(UserContext);
  console.log(user)

  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setAuthUser(JSON.parse(userInSession));
    }
  }, []);
  return (
    <>
      <AuthUserContext.Provider value={{ authUser, setAuthUser }}>
        <UserContext.Provider value={{user, setUser}} >
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/write" element={<WritePost />} />
            <Route path="/update/:postId" element={<UpdatePost />} />
            <Route path="/post/:postId" element={<PostDetails />} />
          </Routes>
        </Router>
        </UserContext.Provider>
      </AuthUserContext.Provider>
    </>
  );
}

export default App;
