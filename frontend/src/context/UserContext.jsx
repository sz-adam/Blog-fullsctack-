import { createContext, useEffect, useState } from "react";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
export const UserContext = createContext({});

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const access_token = getAccessToken();
  const [messageNumber, setMessageNumber] = useState();


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (access_token) {
          const userData = await UserService.userProfile(access_token);
          setUser(userData);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchData();
  }, [access_token]);

  useEffect(() => {
    const blockMessageNumber = async () => {
      try {
        if (access_token) {
          const allUser = await UserService.allUser(access_token);
          const combinedMessages = allUser.reduce((accumulator, user) => {
            if (user.message && Array.isArray(user.message)) {
              accumulator = accumulator.concat(user.message);
            }
            return accumulator;
          }, []);
          setMessageNumber(combinedMessages.length);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    blockMessageNumber()
  }, [access_token]);

  return (
    <UserContext.Provider value={{ user, setUser,messageNumber ,setMessageNumber}}>
      {children}
    </UserContext.Provider>
  );
}
