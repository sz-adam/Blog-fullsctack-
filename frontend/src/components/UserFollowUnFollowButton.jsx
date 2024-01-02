import React, { useEffect, useState } from "react";

function UserFollowUnFollowButton() {
  const storedProfileFollow = localStorage.getItem("userFollow");
  const [userFollow, setUserFollow] = useState(storedProfileFollow === "true");

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

  const handleFollow = () => {
    console.log("Profil követve!");
  };

  const handleUnFollowed = () => {
    console.log("Profil kikövetve!");
  };

  return <p onClick={handleClick}>{userFollow ? "Un Follow" : "Follow"}</p>;
}

export default UserFollowUnFollowButton;
