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
  console.log(userPosts);

  const followUserData = async () => {
    try {
      if (access_token) {
        const following = await UserService.followingsArray(access_token);
        return following;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const blockedUserData = async () => {
    try {
      if (access_token) {
        const blockedUser = await UserService.blocksArray(access_token);
        return blockedUser;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };
  const followersData = async () => {
    try {
      if (access_token) {
        const followerUser = await UserService.followersArray(access_token);
        return followerUser;
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const userPostsComponents =
    userPosts.length > 0 ? (
      userPosts.map((userCard) => (
        <div key={userCard._id}>
          <ProfilePostCard userCard={userCard} />
        </div>
      ))
    ) : (
      <div className="place-items-center py-10 text-center w-full">
        <h1 className="text-2xl md:text-6xl font-extrabold text-transparent bg-clip-text log-reg-color">
        You haven't published a post yet!
        </h1>
      </div>
    );

  const userPorifileTabs = [
    { id: "posts", label: "Posts", component: userPostsComponents },
    {
      id: "following",
      label: "Following",
      component: <UserList fetchData={followUserData} />,
    },
    {
      id: "follower",
      label: "Follower",
      component: <UserList fetchData={followersData} />,
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
            className="font-semibold mx-2 text-base md:text-xl"
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
          <div className="md:flex">{tab.component}</div>
        </div>
      ))}
    </div>
  );
};

export default UserProfileNavigation;
