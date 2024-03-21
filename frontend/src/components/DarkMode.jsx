import React, { useState, useEffect, useContext } from "react";
import { FaMoon } from "react-icons/fa";
import { IoMdSunny } from "react-icons/io";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";

function DarkMode({ darkMode, setDarkMode }) {
  const access_token = getAccessToken();
  const { user, setUser } = useContext(UserContext);
  //console.log(user);

  //Javítani hogy ne csak a menü lenyitásra állítsa vissza a dark modot !!!!!!!!!!!!!!!!!!!!

  useEffect(() => {
    // Ha igaz,  sötét módot
    if (user.darkMode) {
      setDarkMode(true);
      document.body.classList.add("dark");
    } else {
      // Ha  hamis, visszaváltunk 
      setDarkMode(false);
      document.body.classList.remove("dark");
    }
  }, [user.darkMode]);

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
