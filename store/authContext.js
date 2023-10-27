import { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

  const login = async (token) => {
    setToken(token);
    await AsyncStorage.setItem("token", token);
  };

  const logout = async () => {
    setToken(null);
    await AsyncStorage.removeItem("token");
  };

  const values = {
    token,
    isAuthenticated: !!token,
    logout,
    login,
  };
  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
}

export const AuthStore = () => {
  return useContext(AuthContext);
};

export default AuthContextProvider;
