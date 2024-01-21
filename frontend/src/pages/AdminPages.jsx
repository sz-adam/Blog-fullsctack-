import React, { useEffect, useState } from "react";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

function AdminPages() {
  const access_token = getAccessToken();
  const [fullUser, setFullUser] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          console.log(allUser);
          setFullUser(allUser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };
  return (
    <section className="container mx-auto p-6 font-mono">
      {fullUser?.map((user) => (
        <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
          <div className="w-full overflow-x-auto" key={user?.id}>
            <table className="w-full">
              <thead>
                <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                  <th className="px-4 py-3 w-64 md:w-52">Name</th>
                  <th className="px-4 py-3 w-52">Registration</th>
                  <th className="px-4 py-3 w-52">last login</th>
                  <th className="px-4 py-3 w-64">Email</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Post</th>
                  <th className="px-4 py-3">Blocked</th>
                  <th className="px-4 py-3">View</th>
                </tr>
              </thead>
              <tbody className="bg-white">
                <tr className="text-gray-700 ">
                  <td className="px-4 py-3 border ">
                    <div className="flex items-center text-sm">
                      <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={user?.profilePhoto}
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold text-black">
                          {user?.fullname}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {formatDate(user?.createdAt)}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {formatDate(user?.updatedAt)}
                  </td>
                  <td className="px-4 py-3 text-ms font-semibold border">
                    {user?.email}
                  </td>
                  <td className="px-4 py-3 text-xs border">
                    <span className="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-sm">
                      blokkolt
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm border">
                    {user?.postCounts}
                  </td>
                  <td className="px-4 py-3 text-sm border">Blocked</td>
                  <td className="px-4 py-3 text-sm border ">
                    <div className="flex items-center justify-center">
                      <Link to={`/profile/${user?.id}`}>
                        <IoEyeOutline className="text-2xl" />
                      </Link>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}

export default AdminPages;
