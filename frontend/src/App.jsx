import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import { UserContext } from './context/userContext';
import { useEffect, useState } from "react";
import { lookInSession } from "./common/session";

function App() {
  const [user, setUser] = useState(UserContext)

  
  useEffect(() => {
    const userInSession = lookInSession("user");
    if (userInSession) {
      setUser(JSON.parse(userInSession));
    }
  }, []);
  return (
    <>
    <UserContext.Provider value={{ user, setUser }} >
      <Router>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
