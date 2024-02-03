import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import { MdMonochromePhotos } from "react-icons/md";
import UpdateProfilePhoto from "../components/UpdateProfilePhoto";
import UserProfileSettings from "../components/UserProfileSettings";
import UserPasswordSettings from "../components/UserPasswordSettings";
import UserDeleteAccount from "../components/UserDeleteAccount";
import AnimatedMotion from "../common/AnimatedMotion";

function UserSettings() {
  const [activeTab, setActiveTab] = useState("userData");
  const { user } = useContext(UserContext);
  const [updateProfilePhotos, setUpdateProfilePhotos] = useState(false);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <AnimatedMotion animationName="pageAnimation">
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
            <h1 className="text-2xl font-semibold mb-6 text-center">
              Edit Profil
            </h1>

            <div className="w-40 h-40 bg-indigo-100 rounded-full shadow-2xl flex mx-auto mt-10 mb-20 md:mb-0 relative">
              <img
                src={user?.profilePhoto}
                alt=""
                className="rounded-full w-40 h-40"
              />
              <MdMonochromePhotos
                className="absolute bottom-0 right-0 text-2xl cursor-pointer"
                onClick={() => setUpdateProfilePhotos(true)}
              />
            </div>
            {updateProfilePhotos && (
              <UpdateProfilePhoto
                setUpdateProfilePhotos={setUpdateProfilePhotos}
              />
            )}

            <UserProfileSettings />
          </div>
        )}

        {activeTab === "password" && <UserPasswordSettings />}

        {activeTab === "deleteUser" && <UserDeleteAccount />}
      </div>
    </div>
    </AnimatedMotion>
    
  );
}

export default UserSettings;
