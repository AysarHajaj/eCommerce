import React from 'react';
import PropTypes from 'prop-types';
import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import ROUTES from './adminDashboardRoutes';
import publicPaths from './publicPaths';

function RequireAuth({ allowedRoles }) {
  const { auth } = useAuth();
  const location = useLocation();

  if (!auth?.user || !auth.accessToken)
    return <Navigate to={publicPaths.HOME.path} state={{ from: location }} replace />;

  if (!allowedRoles || allowedRoles?.includes(auth?.user?.type)) return <Outlet />;

  return <Navigate to={ROUTES.UNAUTHORIZED.path} state={{ from: location }} replace />;
}

RequireAuth.propTypes = {
  allowedRoles: PropTypes.array,
};

export default RequireAuth;
