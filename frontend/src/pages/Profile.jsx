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

function Profile() {
  const { user } = useContext(UserContext);
  const [filteredUser, setFilteredUser] = useState();
  const { userId } = useParams();
  const [filteredUserPost, setFilteredUserPost] = useState();
  const access_token = getAccessToken();

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

  return (
    <>
      <div className="mt-5 ml-5 icon text-lg">
        <Link to="/">
          <FaArrowLeft className="mr-1 " />
        </Link>
      </div>
      <div className="p-4 md:p-10 flex justify-center items-center">
        <div className="pt-8 bg-white mt-5">
          <div className="grid grid-cols-1 md:grid-cols-3">
            <div className="md:grid md:grid-cols-4 flex justify-around text-center order-last md:order-first mt-20 md:mt-0">
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {filteredUser?.followersCount}
                </p>
                <p className="text-gray-400">Follower</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {filteredUser?.postCounts}
                </p>
                <p className="text-gray-400">Post</p>
              </div>
              <div>
                <p className="font-bold text-gray-700 text-xl">
                  {filteredUser?.comments?.length}
                </p>
                <p className="text-gray-400">Comments</p>
              </div>
            </div>
            <div className="relative">
              <div className="w-48 h-48 bg-indigo-100 mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-indigo-500">
                <img
                  src={filteredUser?.data?.profilePhoto}
                  alt=""
                  className="rounded-full"
                />
              </div>
            </div>
            <div className="space-x-2 md:space-x-4  flex justify-between mt-32 md:mt-0 md:justify-center ">
              {user?.id !== filteredUser?.id && (
                <>
                  <button className="profilButton bg-gray-700 hover:bg-gray-800 ">
                    <UserBlockUnblockButton filteredUserId={filteredUser?.id} />
                  </button>  
                  <button className="profilButton bg-blue-400 hover:bg-blue-500 ">
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
            <div className="m-2 md:grid md:grid-cols-4">
              {filteredUserPost?.map((userCard) => (
                <ProfilePostCard userCard={userCard} key={userCard?._id} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
