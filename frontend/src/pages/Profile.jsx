//Post létrehozoja  profile
import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import ProfilePostCard from "../components/ProfilePostCard";
import PostService from "../services/PostsServices";
import { getAccessToken } from "../common/utils";
import UserBlockUnblockButton from "../components/UserBlockUnblockButton";
import UserFollowUnFollowButton from "../components/UserFollowUnFollowButton";
import UserService from "../services/UserServices";
import AnimatedMotion from "../common/AnimatedMotion";
import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import AnimatedStat from "../common/AnimatedStat";



function Profile() {
  const { user } = useContext(UserContext);
  const [filteredUser, setFilteredUser] = useState();
  const { userId } = useParams();
  const [filteredUserPost, setFilteredUserPost] = useState();
  const access_token = getAccessToken();
  const viewUser = filteredUser?.id;
  const userFollower = filteredUser?.followers?.includes(user?.id);
  const userBlocked =user?.blocked?.includes(filteredUser?.id);

  const count = useMotionValue(0);
  const rounded = useTransform(count, Math.round);
  

  const viewUserData = async () => {
    try {
      if (access_token && viewUser && user?.id) {
        if (!filteredUser.viewers.includes(user?.id)) {
          await UserService.profileViewrs(access_token, viewUser);
          setFilteredUser((prevFilteredUser) => ({
            ...prevFilteredUser,
            viewers: [...prevFilteredUser.viewers, user?.id],
            viewersCount: prevFilteredUser.viewers.length + 1,
          }));
        }
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    if (user?.id && filteredUser) {
      viewUserData();
    }
  }, [access_token, viewUser, user?.id]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          // Keresd meg a megfelelő felhasználót a userId alapján
          const userById = allUser.find((user) => user?.id === userId);
          setFilteredUser(userById);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token, userId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token && filteredUser && filteredUser.posts) {
          const fetchedPosts = await PostService.getAllPosts(access_token);
          const filteredUserPostIds = filteredUser.posts || [];
          const filteredUsersPosts = fetchedPosts.filter((post) =>
            filteredUserPostIds.includes(post.id)
          );
          setFilteredUserPost(filteredUsersPosts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token, filteredUser]);

  useEffect(() => {
    const animation = animate(count, 50, {
      duration: 2
    });

    return animation.stop;
  }, []);

  return (
    <>
    <AnimatedMotion animationName="pageAnimation">
      <div className="mt-5 ml-5 icon text-lg">
        <p className="text-gray-800 mt-5 hover:text-gray-500">
          <Link to="/" className="flex items-center">
            <FaArrowLeft className="mr-1 " />
          </Link>
        </p>
      </div>
      <div className="p-4 md:p-10 flex justify-center items-center">
        <div className="pt-8 bg-white mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:grid md:grid-cols-4 flex justify-around text-center order-last md:order-first mt-20 md:mt-0">
              <AnimatedStat value={filteredUser?.followersCount} label="Follower" />
              <AnimatedStat value={filteredUser?.postCounts} label="Post" />
              <AnimatedStat value={filteredUser?.viewersCount} label="Viewers" />
              <AnimatedStat value={filteredUser?.comments?.length} label="Comments" />
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={filteredUser?.profilePhoto}
                  alt=""
                  className="rounded-full w-48 h-48"
                />
              </div>
            </div>
            <div className="space-x-2 md:space-x-4  flex justify-between mt-32 md:mt-0 md:justify-center ">
              {user?.id !== filteredUser?.id && (
                <>
                  <button
                    className={`profilButton ${
                      userFollower ? "bg-gray-400" : "bg-gray-700"
                    }`}
                    disabled={userFollower}
                  >
                    <UserBlockUnblockButton filteredUserId={filteredUser?.id} />
                  </button>
                  <button
                    className={`profilButton ${
                      userBlocked ? "bg-blue-300" : "bg-blue-500"
                    }`}
                    disabled={userBlocked}
                  >
                    <UserFollowUnFollowButton
                      filteredUserId={filteredUser?.id}
                      filteredUser={filteredUser}
                      setFilteredUser={setFilteredUser}
                    />
                  </button>
                </>
              )}
            </div>
          </div>
          <div className="mt-20 text-center border-b pb-12">
            <h1 className="text-4xl font-medium text-gray-700">
              {filteredUser?.fullname}
            </h1>
            <p>{filteredUser?.email}</p>
          </div>
          <div className="mt-12 ">
            <p className="text-gray-600 text-center font-light lg:px-16 text-4xl mb-8">
              Posts
            </p>
            <div className="m-2 flex-wrap md:flex justify-center items-center">
              {filteredUserPost?.map((userCard) => (
                <ProfilePostCard userCard={userCard} key={userCard?._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </AnimatedMotion>
  </>
  );
}

export default Profile;
