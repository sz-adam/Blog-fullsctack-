import React, { useEffect, useState } from "react";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";
import { Link } from "react-router-dom";

function UserFollowers() {
  const access_token = getAccessToken();
  const [followersUser, setFollowersUser] = useState([]);
  console.log(followersUser);

  useEffect(() => {
    const followUserData = async () => {
      try {
        if (access_token) {
          const followuser = await UserService.followersArray(access_token);
          setFollowersUser(followuser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    followUserData();
  }, [access_token]);

  return (
    <div className="md:grid md:grid-cols-3 lg:grid-cols-4 gap-10 mt-10 ">
      {followersUser?.map((followers) => (
        <div
          key={followers?.id}
          className="w-64 bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg m-10"
        >
          <div className="flex items-center justify-between">
            <p className="text-emerald-400 font-semibold mt-2.5">Active:</p>
            <span className="text-gray-400 text-sm">
              {followers?.lastActive}
            </span>
          </div>
          <div className="mt-6 w-fit mx-auto">
            <img
              src={followers?.profilePhoto}
              className="rounded-full w-28 h-28"
              alt="profile picture"
              srcset=""
            />
          </div>

          <div className="mt-8 text-center pb-2">
            <h2 className="text-white font-bold text-2xl tracking-wide">
              {followers?.fullname}
            </h2>
          </div>

          <p className="border-b-2 "></p>
          <div className="mt-3 text-white text-sm flex items-center justify-between">
            <div className="text-center">
              <p className="text-gray-400 font-semibold">Posts</p>
              <p>{followers?.postCounts}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-semibold">Followers</p>
              <p>{followers?.followersCount}</p>
            </div>
            <div className="text-center">
              <p className="text-gray-400 font-semibold">Following</p>
              <p>{followers?.followingCount}</p>
            </div>
          </div>
         <div className="mt-5 text-center">
         <Link to={`/profile/${followers.id}`} className="btn-dark ">
            View
          </Link>
         </div>
        </div>
      ))}
    </div>
  );
}

export default UserFollowers;
