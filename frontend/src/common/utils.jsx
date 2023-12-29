import { useContext } from "react";
import { AuthUserContext } from "../context/AuthUserContext";

const getAccessToken = () => {
  const { authUser, setAuthUser } = useContext(AuthUserContext);
  return authUser?.data?.token || null;
};

export { getAccessToken };
