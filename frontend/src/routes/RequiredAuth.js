import { useLocation, Navigate, Outlet } from "react-router-dom";
import constant from "../constant";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  return allowedRoles?.includes(auth?.user?.type) || !allowedRoles ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate
      to={constant.ROUTES.UNAUTHORIZED.path}
      state={{ from: location }}
      replace
    />
  ) : (
    <Navigate
      to={constant.ROUTES.LOGIN.path}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
