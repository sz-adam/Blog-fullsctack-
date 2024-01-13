import React, { useContext, useState } from 'react'
import UserService from '../services/UserServices';
import { IoKeyOutline } from "react-icons/io5";
import InputBox from "../components/InputBox";
import { getAccessToken } from '../common/utils';
import { UserContext } from '../context/UserContext';

function UserPasswordSettings() {
    const [newPassword, setNewPassword] = useState("");
    const { user, setUser } = useContext(UserContext);
  const access_token = getAccessToken();
    //password update
  const handleProfilePasswordUpdate = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        const updatedPassword = await UserService.userUpdatePassword(
          access_token,
          {
            password: newPassword,
          }
        );
        setUser({ ...user, ...updatedPassword });
        console.log(updatedPassword);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };
  return (
    <div>
    <h1 className="text-2xl font-semibold mb-6 text-center">
      {" "}
      Change password
    </h1>
    <div className="flex justify-center items-center w-full h-full md:h-[85vh]">
      <form
        className="w-[85%] max-w-[400px]"
        onSubmit={handleProfilePasswordUpdate}
      >
        <InputBox
          type="password"
          placeholder="New Password"
          icon={IoKeyOutline}
          value={newPassword}
          onChange={(event) => setNewPassword(event.target.value)}
          required={true}
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
  </div>
  )
}

export default UserPasswordSettings