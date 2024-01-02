import { createContext, useEffect, useState  } from "react";
import UserService from "../services/UserServices";
import { getAccessToken } from "../common/utils";
export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] =useState(null)
  const access_token = getAccessToken();

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



return (<UserContext.Provider value={{user,setUser}}>
  {children}
</UserContext.Provider>)
}