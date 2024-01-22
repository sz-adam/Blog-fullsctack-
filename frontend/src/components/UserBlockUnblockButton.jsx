import React, { useState, useEffect, useContext } from "react";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";
import { UserContext } from "../context/UserContext";

function UserBlockUnblockButton({filteredUserId , setFilteredUser}) {
  const access_token = getAccessToken();
  const [profileBlock, setProfileBlock] = useState(false);
  const { user, setUser } = useContext(UserContext);  
  const userBlockeds= user? user.blocked : [];

  useEffect(() => {
    setProfileBlock(userBlockeds.includes(filteredUserId))
  }, [userBlockeds, filteredUserId]); 

  const handleBlocked =async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.blockUser(access_token, filteredUserId);
        const updatedAllUser = await UserService.allUser(access_token);
        const updatedUser = updatedAllUser.find((user) => user.id === filteredUserId);
        console.log("Blokkolva", filteredUserId);

        setUser((prevUser) => ({
          ...prevUser,
          blocked: [...prevUser.blocked, filteredUserId],
          blockedCount: prevUser.blocked.length + 1
        }));
        setProfileBlock(updatedUser)
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleUnBlocked =async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.unBlockUser(access_token, filteredUserId);
        console.log("Feloldva", filteredUserId);
        const updatedAllUser = await UserService.allUser(access_token);
        const updatedUser = updatedAllUser.find((user) => user.id === filteredUserId);

        setUser((prevUser) => ({
          ...prevUser,
          blocked: prevUser.blocked.filter((id) => id !== filteredUserId),
          blockedCount: prevUser.blocked.length - 1
        }));
        setProfileBlock(updatedUser)
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const handleClick = () => {
    setProfileBlock((prevProfileBlock) => !prevProfileBlock);

    if (profileBlock) {
      handleUnBlocked();
    } else {
      handleBlocked();
    }
  };

  return <p onClick={handleClick}>{profileBlock ? "Un Blocked" : "Blocked"}</p>;
}

export default UserBlockUnblockButton;
