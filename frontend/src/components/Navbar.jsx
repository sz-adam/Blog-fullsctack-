import React, { useContext } from "react";
import { Link } from "react-router-dom";
import UserNavigationMenu from "./UserNavigationMenu";
import { AuthUserContext } from "../context/AuthUserContext";

function Navbar() {
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  const access_token = authUser?.data?.token;

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
        <div className="flex items-center">
          <Link to="/write" className="mr-10 hover:text-slate-500"> Write </Link>
          <UserNavigationMenu />
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
