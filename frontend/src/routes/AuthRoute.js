import React from "react";
import { useSelector } from "react-redux";
import { Route, Navigate } from "react-router-dom";
import Login from "../features/Login";
import { selectLogin } from "../features/Login/loginSlice";

const AuthRoute = ({ children }) => {
  const { data } = useSelector(selectLogin);
  const isAuthenticated = !!data;

  if (isAuthenticated) {
    return children;
  }
  return <Navigate to="/login"></Navigate>;
};

export default AuthRoute;
