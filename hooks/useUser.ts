import { useContext } from "react";
import Cookies from "js-cookie";

import { AuthContext } from "@/context/AuthContext";
import { AuthUser } from "@/types/auth";

export const useUser = () => {
  const { user, setUser } = useContext(AuthContext);

  const addUser = (user: AuthUser) => {
    setUser(user);
    Cookies.set("user", JSON.stringify(user), { expires: 7 });
  };

  const removeUser = () => {
    setUser(null);
    Cookies.remove("user");
  };

  const checkUser = (): AuthUser | null => {
    const userCookie = Cookies.get("user");

    if (userCookie) {
      return JSON.parse(userCookie) as AuthUser;
    }

    return null;
  };

  return { user, addUser, removeUser, checkUser };
};
