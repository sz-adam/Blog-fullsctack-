import React, { useState, useEffect } from "react";

function UserBlockUnblockButton() {
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

  const handleBlocked = () => {
    console.log("Profil blokkolva!");
  };

  const handleUnBlocked = () => {
    console.log("Profil feloldva!");
  };

  return <p onClick={handleClick}>{profileBlock ? "Un Blocked" : "Blocked"}</p>;
}

export default UserBlockUnblockButton;
