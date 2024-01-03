import React, { useState, useEffect } from "react";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";

function UserBlockUnblockButton({filteredUserId}) {
  const access_token = getAccessToken();
  const storedProfileBlock = localStorage.getItem("profileBlock");
  const [profileBlock, setProfileBlock] = useState(
    storedProfileBlock === "true"
  );

  useEffect(() => {
    localStorage.setItem("profileBlock", profileBlock);
  }, [profileBlock]);

  const handleClick = () => {
    setProfileBlock((prevProfileBlock) => !prevProfileBlock);

    if (profileBlock) {
      handleUnBlocked();
    } else {
      handleBlocked();
    }
  };

  const handleBlocked =async () => {
    try {
      if (access_token && filteredUserId) {
        await UserService.blockUser(access_token, filteredUserId);
        console.log("Blokkolva", filteredUserId);
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
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return <p onClick={handleClick}>{profileBlock ? "Un Blocked" : "Blocked"}</p>;
}

export default UserBlockUnblockButton;
