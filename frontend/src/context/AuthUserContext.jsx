import { createContext } from "react";
export const AuthUserContext = createContext({
  authUser: null,

  setAuthUser: () => {},
});
