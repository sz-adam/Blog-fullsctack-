import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoKeyOutline } from "react-icons/io5";
import { IoManOutline } from "react-icons/io5";
import InputBox from "../components/InputBox";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";

function UserSettings() {
  const [activeTab, setActiveTab] = useState("userData");
  const { user, setUser } = useContext(UserContext);

  const [newFirstname, setNewFirstname] = useState("");
  const [newLastname, setNewLastname] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const access_token = getAccessToken();

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };
  const handleProfileUpdate = async (event) => {
    event.preventDefault();
    try {
      if (access_token) {
        const updatedProfile = await UserService.userUpdateProfile(access_token, {
          //új adatok
          firstname: newFirstname,
          lastname: newLastname,
          email: newEmail,     
        });
        setUser(updatedProfile);
  
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="md:flex  min-h-screen">
      {/* Oldalsáv */}
      <div className="bg-gray-400 w-full md:w-1/6  p-4 ">
        <div className="mt-5 ml-5 icon text-lg">
          <Link to={`/userProfile/${user?.id}`}>
            <FaArrowLeft className="mr-1 " />
          </Link>
        </div>
        <h2 className="text-2xl font-semibold mb-4 pb-1 border-b-2 text-center">
          Settings
        </h2>

        <h1 className="text-center font-bold pb-5 text-2xl">
          {user?.fullname}
        </h1>
        <div>
          <ul className="text-center ">
            <li
              className={`cursor-pointer py-2  font-semibold rounded-2xl ${
                activeTab === "userData" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTabClick("userData")}
            >
              User Details
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold rounded-2xl ${
                activeTab === "password" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTabClick("password")}
            >
              Change password
            </li>
            <li
              className={`cursor-pointer py-2 font-semibold rounded-2xl ${
                activeTab === "deleteUser" ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => handleTabClick("deleteUser")}
            >
              Delete User
            </li>
          </ul>
        </div>
      </div>

      {/* Tartalom */}
      <div className="w-full md:w-3/4 p-8">
        {activeTab === "userData" && (
          <div>
            <h1 className="text-2xl font-semibold mb-6 text-center"> Details</h1>
            <div className="flex justify-center items-center w-full h-full md:h-[85vh]">
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
          </div>
        )}

        {activeTab === "password" && (
          <div>
            <h1 className="text-2xl font-semibold mb-6 text-center"> Change password</h1>
            <div className="flex justify-center items-center w-full h-full md:h-[85vh]">
              <form className="w-[85%] max-w-[400px]">
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
        )}

        {activeTab === "deleteUser" && (
          <div className="flex justify-center items-center w-full h-full md:h-[85vh] text-center">
            <div>
              <h1 className="text-2xl font-semibold mb-6">
                Are you sure you want to delete the registration?
              </h1>

              <button className="bg-red-500 py-2 px-10 text-white font-semibold text-xl rounded-full hover:bg-red-800">
                Yes
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserSettings;
