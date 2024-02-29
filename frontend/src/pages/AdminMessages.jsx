import React, { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";

function AdminMessages() {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [fullUser, setFullUser] = useState([]);
  const access_token = getAccessToken();
  console.log(fullUser);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          setFullUser(allUser);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, [access_token]);

  const handleToggleAccordion = (userId) => {
    setOpenAccordionId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <>
      <h1 className="text-center text-xl md:text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-5">
        Messages
      </h1>
      {fullUser
        .filter((user) => user?.isBlocked === true)
        .map((user) => (
          <div
            className="w-full flex justify-center items-center "
            key={user?.id}
          >
            <div className="py-5 w-3/4 border rounded-xl m-1 px-2">
              <button
                onClick={() => handleToggleAccordion(user?.id)}
                className="flex justify-between w-full"
              >
                <div className="flex items-center ">
                  <img
                    src={user?.profilePhoto}
                    alt={user?.fullname}
                    className="w-10 h-10 rounded-full mr-5"
                  />
                  <p>{user?.fullname}</p>
                </div>
                <div className=" text-2xl my-auto">
                  {openAccordionId === user?.id ? <LuMinus /> : <GoPlus />}
                </div>
              </button>

              <div
                className={`grid overflow-hidden transition-all duration-300 ease-in-out text-slate-600 text-sm ${
                  openAccordionId === user?.id
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">szöveg</div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}

export default AdminMessages;
