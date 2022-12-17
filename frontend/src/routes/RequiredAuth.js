import { useLocation, Navigate, Outlet } from "react-router-dom";
import constant from "../constant";
import useAuth from "../hooks/useAuth";

const RequireAuth = ({ allowedRoles }) => {
  const { auth } = useAuth();
  const location = useLocation();

  if(!auth?.user || !auth.accessToken) return (
    <Navigate
      to={constant.ROUTES.LOGIN.path}
      state={{ from: location }}
      replace
    />
  );

  if (!allowedRoles || allowedRoles?.includes(auth?.user?.type)) return <Outlet />;

  return (
    <Navigate
      to={constant.ROUTES.UNAUTHORIZED.path}
      state={{ from: location }}
      replace
    />
  );
};

export default RequireAuth;
