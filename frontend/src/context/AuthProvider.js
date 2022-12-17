import { createContext, useState } from "react";

const AuthContext = createContext({});

const getUserData = () => {
  const token = localStorage.getItem("token");
  const user = localStorage.getItem("user");

  if (token && user) {
    return { accessToken: token, user: JSON.parse(user) };
  }
  return { accessToken: undefined, user: undefined };
};

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(getUserData);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
