import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { removeFormSession } from "../common/session";
import { AuthUserContext } from "../context/AuthUserContext";
import { UserContext } from "../context/UserContext";

const UserNavigationPanel = () => {
  const { authUser,setAuthUser } = useContext(AuthUserContext);
  const { user,setUser } = useContext(UserContext);

  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    removeFormSession("user");
    setAuthUser(null);
    navigate("/");
  };

  return (
    <div className="relative hover:text-slate-500">
      <div
        onClick={toggleDropdown}
        className="flex justify-center items-center cursor-pointer"
      >
        <img src={user?.profilePhoto} className="w-10 h-10 rounded-full" />
        <p className="px-2">{user?.firstname}</p>
      </div>
      {isOpen && (
        <div className="bg-white absolute right-10 top-12 border border-grey w-60 z-10 " onClick={() => setIsOpen(false)}>
          <Link to={`/userProfile/${user?.id}`} className="link pl-8 py-4 block text-black hover:text-slate-500">
            Profile
          </Link>
          <Link to="/" className="link pl-8 py-4 block text-black hover:text-slate-500">
            Dashboard
          </Link>
          <Link to={`/settings/${user?.id}`} className="link pl-8 py-4 block text-black hover:text-slate-500">
            Settings
          </Link>
          <span className="absolute border-t border-grey w-full text-black "></span>
          <div
            className=" p-4 hover:bg-grey w-full pl-8 py-4 cursor-pointer text-center bg-blue-500"
            onClick={handleLogout}
          >
            <h1 className="font-bold text-xl my-1 text-black">Sign Out</h1>
            <p className="text-dark-grey text-black">
              @{user?.fullname}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserNavigationPanel;
