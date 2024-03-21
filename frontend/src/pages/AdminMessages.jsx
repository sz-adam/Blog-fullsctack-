import { useEffect, useState } from "react";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { getAccessToken } from "../common/utils";
import UserService from "../services/UserServices";
import MessageService from "../services/MessageServices";
import AdminBlockButton from "../components/AdminBlockButton";
import AnimatedMotion from "../common/AnimatedMotion";

function AdminMessages() {
  const [openAccordionId, setOpenAccordionId] = useState(null);
  const [fullUser, setFullUser] = useState([]);
  const [adminMessageId, setAdminMessageId] = useState("");
  const [messages, setMessages] = useState("");
  const access_token = getAccessToken();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          setFullUser(allUser);
        }
        if (access_token && adminMessageId) {
          const adminMessage = await MessageService.singleAdminMessage(
            access_token,
            adminMessageId
          );
          setMessages(adminMessage);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token, adminMessageId]);

  const handleToggleAccordion = (userId, userMessage) => {
    setMessages(userMessage);
    setAdminMessageId(userId);
    setOpenAccordionId((prevId) => (prevId === userId ? null : userId));
  };

  return (
    <>
      <h1 className="text-center text-xl md:text-3xl font-extrabold bg-gradient-to-r text-transparent from-green-500 to-blue-500 bg-clip-text my-5">
        Messages
      </h1>
      {/**ellenörzöm hogy van-e olyan blokkolt felhasználó aki üzenetet küldött  */}
      {fullUser.some(
        (user) => user?.isBlocked === true && user?.message?.length > 0
      ) ? (
        /**ha van akkor megjelenítem  */
        fullUser
          .filter(
            (user) => user?.isBlocked === true && user?.message?.length > 0
          )
          .map((user) => (
            <AnimatedMotion
              animationName="messageAnimation"
              className="w-full flex justify-center items-center"
              key={user?.id}
            >
              <div className="py-5 w-3/4 border rounded-xl m-1 px-2">
                <button
                  onClick={() => handleToggleAccordion(user?.id, user?.message)}
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
                  className={`grid overflow-hidden transition-all duration-300 ease-in-out text-sm ${
                    openAccordionId === user?.id
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0"
                  }`}
                >
                  <div className="overflow-hidden">
                    {messages &&
                      messages.length > 0 &&
                      messages.map((message) => (
                        <div key={message?._id}>
                          <div className="m-3 text-justify text-lg">
                            <p>{message?.message}</p>
                          </div>
                          <div className="flex justify-end">
                            <button className="m-3">
                              <AdminBlockButton
                                messageID={messages[0]?._id}
                                user={user}
                                setFullUser={setFullUser}
                                buttonStyle={"btn-dark px-6 py-2 mr-1 mb-1"}
                              />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </AnimatedMotion>
          ))
      ) : (
        /**ha nincs akkor szöveget helenítek meg */

        <AnimatedMotion
          animationName="messageAnimation"
          className="text-center text-xl md:text-3xl font-extrabold text-gray-500 my-5"
        >
          No blocked users with messages.
        </AnimatedMotion>
      )}
    </>
  );
}

export default AdminMessages;
