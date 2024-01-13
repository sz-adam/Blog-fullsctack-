import React, { useContext, useEffect, useState } from "react";
import InputBox from "./InputBox";
import { IoManOutline } from "react-icons/io5";
import { MdOutlineMailOutline } from "react-icons/md";
import UserService from "../services/UserServices";
import { UserContext } from "../context/UserContext";
import { getAccessToken } from "../common/utils";

function UserProfileSettings() {
  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const { setUser } = useContext(UserContext);
  const access_token = getAccessToken();

  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        const updatedProfile = await UserService.userUpdateProfile(
          access_token,
          {
            //új adatok userService --userData--
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
          }
        );
        setUser(updatedProfile);
        setNewFirstname("");
        setNewLastname("");
        setNewEmail("");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="flex justify-center items-center w-full h-full md:h-[55vh] ">
      <form className="w-[85%] max-w-[400px]" onSubmit={handleProfileUpdate}>
        <InputBox
          type="text"
          placeholder="New First name"
          icon={IoManOutline}
          value={newFirstname}
          required={true}
          onChange={(event) => setNewFirstname(event.target.value)}
        />
        <InputBox
          type="text"
          placeholder="New Last name"
          icon={IoManOutline}
          value={newLastname}
          onChange={(event) => setNewLastname(event.target.value)}
          required={true}
          label="New Last name"
        />
        <InputBox
          type="email"
          placeholder="New Email"
          icon={MdOutlineMailOutline}
          value={newEmail}
          onChange={(event) => setNewEmail(event.target.value)}
        />
        <div className="flex justify-center items-center mt-10">
          <button
            className="border-2 bg-slate-500 text-white p-3 px-10 rounded-full font-bold hover:bg-slate-700"
            type="submit"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}

export default UserProfileSettings;
