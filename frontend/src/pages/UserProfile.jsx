import React, { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { Link } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import UserProfileNavigation from "../components/UserProfileNavigation";
import { TfiCup } from "react-icons/tfi";
import AnimatedMotion from "../common/AnimatedMotion";

function UserProfile() {
  const { user, setUser } = useContext(UserContext);
  const awardColor = () => {
    if (user?.userAward === "Bronze") {
      return "w-40 h-40 text-orange-500 ";
    } else if (user?.userAward === "Silver") {
      return "w-40 h-40 text-stone-300";
    } else if (user?.userAward === "Gold") {
      return "w-40 h-40 text-yellow-400";
    }
  };
  return (
    <>
      <AnimatedMotion animationName="pageAnimation">
        <div className="mt-5 ml-5 icon text-lg">
          <Link to="/">
            <FaArrowLeft className="mr-1 " />
          </Link>
        </div>
        <div className="flex-col flex md:flex-row justify-evenly items-center pt-10">
          <img
            src={user?.profilePhoto}
            alt=""
            className="rounded-full w-48 h-48 "
          />

          <div className="mt-10">
            <p>
              <TfiCup className={awardColor()} />
            </p>
            <p className="text-center pt-3 font-bold text-gray-700 text-xl">
              {user?.userAward}
            </p>
          </div>
        </div>
        <div className="mt-20 text-center border-b pb-12">
              <h1 className="text-4xl font-medium text-gray-700">
                {user?.fullname}
              </h1>
              <p>{user?.email}</p>
            </div>
        
        <div className="p-4 md:p-10 flex justify-center items-center">
          <div className="pt-8 bg-white md:mt-5 mt-0">
            <div className=" my-auto mx-auto">
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
            </div>
           
            <UserProfileNavigation />
          </div>
        </div>
      </AnimatedMotion>
    </>
  );
}

export default UserProfile;
