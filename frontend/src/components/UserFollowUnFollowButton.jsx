import React, { useContext, useEffect, useState } from "react";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import { UserContext } from "../context/UserContext";

function UserFollowUnFollowButton({ filteredUserId, setFilteredUser }) {
  const { user, setUser } = useContext(UserContext);
  const [userFollow, setUserFollow] = useState(false);
  const access_token = getAccessToken();
  const userFollowings = user ? user.following : [];

  useEffect(() => {
    setUserFollow(userFollowings.includes(filteredUserId));
  }, [userFollowings, filteredUserId]);

  const handleFollow = async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.followUser(access_token, filteredUserId);
        const updatedAllUser = await UserService.allUser(access_token);
        const updatedUser = updatedAllUser.find(
          (user) => user.id === filteredUserId
        );

        setUser((prevUser) => ({
          ...prevUser,
          following: [...prevUser.following, filteredUserId],
          followingCount: prevUser.following.length + 1,
        }));
        setFilteredUser(updatedUser);
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnFollowed = async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.unfollowUser(access_token, filteredUserId);
        const updatedAllUser = await UserService.allUser(access_token);
        const updatedUser = updatedAllUser.find(
          (user) => user.id === filteredUserId
        );

        setUser((prevUser) => ({
          ...prevUser,
          following: prevUser.following.filter((id) => id !== filteredUserId),
          followingCount: prevUser.following.length - 1,
        }));
        setFilteredUser(updatedUser);
      }
    } catch (error) {
      console.error("Error unfollowing user:", error);
    }
  };

  const handleClick = async () => {
    setUserFollow((prevUserFollow) => !prevUserFollow);

    if (userFollow) {
      await handleUnFollowed();
    } else {
      await handleFollow();
    }
  };

  return <p onClick={handleClick}>{userFollow ? "Un Follow" : "Follow"}</p>;
}

export default UserFollowUnFollowButton;
