import React, {  useEffect, useState } from "react";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";

//Bottom lenyomására a state nem változik javítani 

function UserFollowUnFollowButton({ filteredUserId }) {
  const storedProfileFollow = localStorage.getItem("userFollow");
  const [userFollow, setUserFollow] = useState(storedProfileFollow === "true");
  const access_token = getAccessToken();

  useEffect(() => {
    localStorage.setItem("userFollow", userFollow);
  }, [userFollow]);

  const handleClick = () => {
    setUserFollow((prevUserFollow) => !prevUserFollow);

    if (userFollow) {
      handleUnFollowed();
    } else {
      handleFollow();
    }
  };

  const handleFollow = async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.followUser(access_token, filteredUserId);
        console.log("Követve", filteredUserId);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnFollowed = async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.unfollowUser(access_token, filteredUserId);
        console.log("Kikövetve", filteredUserId);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return <p onClick={handleClick}>{userFollow ? "Un Follow" : "Follow"}</p>;
}

export default UserFollowUnFollowButton;
