import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/userContext";
import { removeFormSession } from "../common/session";

function Navbar() {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const access_token= user?.data?.token
  
  const handleLogout = () => {
    removeFormSession("user");
    setUser(null);
    navigate('/login');
  };

  return (
    <div className="navbar justify-between p-4">
      <div>
        <Link to="/">
          <p className="text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text">
            MERN Blogs
          </p>
        </Link>
      </div>
      {access_token ? (
        <div>
          <button className="btn-dark" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div className="flex space-x-4 items-center">
          <Link to="/login" className="btn-dark">
            Login
          </Link>
          <Link to="/register" className="btn-white">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
