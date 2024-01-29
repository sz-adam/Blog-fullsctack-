import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UserProfileNavigation from "../components/UserProfileNavigation";
import { TfiCup } from "react-icons/tfi";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const awardColor = () => {
    if (user?.userAward === "Bronze") {
      return "text-8xl text-orange-500 ";
    } else if (user?.userAward === "Silver") {
      return "text-8xl text-stone-300";
    } else if (user?.userAward === "Gold") {
      return "text-8xl text-yellow-400";
    } 
  };
  return (
    <>
      <div className="mt-5 ml-5 icon text-lg">
        <Link to="/">
          <FaArrowLeft className="mr-1 " />
        </Link>
      </div>
      <div className="p-4 md:p-10 flex justify-center items-center">
        <div className="pt-8 bg-white mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:grid md:grid-cols-4 flex justify-around text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {user?.followersCount}
                </p>
                <p className="text-gray-400">Followers</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {user?.followingCount}
                </p>
                <p className="text-gray-400">Following</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {user?.posts?.length}
                </p>
                <p className="text-gray-400">Post</p>
              </div>

              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {user?.userAward}
                </p>
                <p className="text-gray-400">User Award</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={user?.profilePhoto}
                  alt=""
                  className="rounded-full w-48 h-48"
                />
              </div>
            </div>

            <div className="mx-auto">
             <p>  <TfiCup className={awardColor()} /></p>
             <p className="text-center pt-3 font-bold text-gray-700 text-xl"> {user?.userAward}</p>
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {user?.fullname}
            </h1>
            <p>{user?.email}</p>
          </div>
          <UserProfileNavigation />
        </div>
      </div>
    </>
  );
}

export default UserProfile;
