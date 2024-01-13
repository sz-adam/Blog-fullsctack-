import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import ProfilePostCard from "./ProfilePostCard";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import UserList from "./UserProfileList";

const UserProfileNavigation = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const { user } = useContext(UserContext);
  const access_token = getAccessToken();

  const userPosts = user?.posts || []; //ne legyen undefined

  const followUserData = async () => {
    try {
      if (access_token) {
        const following = await UserService.followingsArray(access_token); 
        return following   
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const blockedUserData = async () => {
    try {
      if (access_token) {
        const blockedUser = await UserService.blocksArray(access_token);
        return blockedUser 
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const userPostsComponents = userPosts.map((userCard) => (
    <div key={userCard._id}>
      <ProfilePostCard userCard={userCard} />
    </div>
  ));

  const userPorifileTabs = [
    { id: "posts", label: "Posts", component: userPostsComponents },
    {
      id: "following",
      label: "Following",
      component: <UserList fetchData={followUserData} />,
    },
    {
      id: "blocked",
      label: "Blocked user",
      component: <UserList fetchData={blockedUserData} />,
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

export default UserProfileNavigation;
