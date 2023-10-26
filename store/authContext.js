import { createContext, useContext, useState } from "react";

const AuthContext = createContext({
  token: "",
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

function AuthContextProvider({ children }) {
  const [token, setToken] = useState();

  const login = (token) => {
    setToken(token);
  };

  const logout = () => {
    setToken(null);
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
