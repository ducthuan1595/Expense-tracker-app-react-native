import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [user, setUser] = useState({
    email: "",
    name: "",
    photo: "",
    token: "",
    id: "",
  });

  const login = async (infoUser) => {
    setUser(infoUser);
    await AsyncStorage.setItem("infoUser", JSON.stringify(infoUser));
  };

  const logout = async () => {
    setUser({
      email: "",
      name: "",
      photo: "",
      token: "",
      id: "",
    });
    await AsyncStorage.removeItem("infoUser");
  };
  // console.log(!!user.token);

  const values = {
    user,
    isAuthenticated: !!user.token,
    logout,
    login,
  };
  // console.log({ user });
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const AuthStore = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
