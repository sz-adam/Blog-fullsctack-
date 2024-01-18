import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const UserProfileList = ({ fetchData }) => {
  const [userList, setUserList] = useState();

  useEffect(() => {
    const fetchDataAndSetUserList = async () => {
      try {
        const users = await fetchData();
        setUserList(users);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchDataAndSetUserList();
  }, [fetchData]);

  return (
    <>
      {userList?.length === 0 ? (
        <div className="place-items-center py-10 text-center w-full">
          <h1 className="text-2xl md:text-6xl font-extrabold text-transparent bg-clip-text log-reg-color">
            Sorry there are no users
          </h1>
        </div>
      ) : (
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 mt-10">
          {userList?.map((user) => (
            <div
              key={user?.id}
              className="w-72 bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg m-10"
            >
              <div className="flex items-center justify-between">
                <p className="text-emerald-400 font-semibold mt-2.5">Active:</p>
                <span className="text-gray-400 text-sm">
                  {user?.lastActive}
                </span>
              </div>
              <div className="mt-6 w-fit mx-auto">
                <img
                  src={user?.profilePhoto}
                  className="rounded-full w-28 h-28"
                  alt="profile picture"
                />
              </div>

              <div className="mt-8 text-center pb-2">
                <h2 className="text-white font-bold text-2xl tracking-wide">
                  {user?.fullname}
                </h2>
              </div>

              <p className="border-b-2 "></p>
              <div className="mt-3 text-white text-sm flex items-center justify-between">
                <div className="text-center">
                  <p className="text-gray-400 font-semibold">Posts</p>
                  <p>{user?.postCounts}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-semibold">Followers</p>
                  <p>{user?.followersCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-gray-400 font-semibold">Following</p>
                  <p>{user?.followingCount}</p>
                </div>
              </div>
              <div className="mt-5 text-center">
                <Link to={`/profile/${user.id}`} className="btn-dark">
                  View
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default UserProfileList;
