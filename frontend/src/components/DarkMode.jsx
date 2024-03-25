import React, { useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";

function DarkMode({ darkMode, setDarkMode }) {
  const access_token = getAccessToken();
  const { setUser } = useContext(UserContext);

  const toggleDarkMode = async () => {
    try {
      await UserService.userDarkMode(access_token);
      setDarkMode(!darkMode);
      setUser((prevUser) => ({
        ...prevUser,
        darkMode: !prevUser.darkMode,
      }));
    } catch (error) {
      console.error("Failed to toggle dark mode:", error);
    }
  };

  return (
    <div className="text-center pt-1 block">
      <button onClick={toggleDarkMode} className="text-4xl text-black">
        {darkMode ? <IoMdSunny /> : <FaMoon />}
      </button>
    </div>
  );
}

export default DarkMode;
