import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ProfilePostCard from "./ProfilePostCard";

const UserProfileNavigation = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useContext(UserContext);

  const userPosts = user?.posts || [];

  const userPostsComponents = userPosts.map((userCard) => (
    <ProfilePostCard userCard={userCard} key={userCard._id} />
  ));

  const userPorifileTabs = [
    { id: "posts", label: "Posts", component: userPostsComponents },
    {
      id: "Followers",
      label: "Followers",
      component: <UserFollowersComponent />,
    },
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="flex justify-center items-center mt-12">
        {userPorifileTabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            style={{
              color: activeTab === tab.id ? "MediumSpringGreen" : "black",
            }}
            className="font-semibold mx-2 text-xl"
          >
            {tab.label}
          </button>
        ))}
      </div>

      {userPorifileTabs.map((tab) => (
        <div
          key={tab.id}
          style={{ display: activeTab === tab.id ? "block" : "none" }}
        >
          <div className="flex">{tab.component}</div>
        </div>
      ))}
    </div>
  );
};

const UserFollowersComponent = () => {};

export default UserProfileNavigation;
