import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequiredAuth from './RequiredAuth';
import Layout from '../root/layout/Layout';
import Login from '../features/Login';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import ROUTES from './adminDashboardRoutes';

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {auth?.user && auth.accessToken ? (
        <Route element={<Layout />} path="/">
          {Object.values(ROUTES).map(({ path, allowedRoles, Element, label }) => (
            <Route key={label} element={<RequiredAuth allowedRoles={allowedRoles} />}>
              <Route
                element={
                  <React.Suspense fallback={<Loader />}>
                    <Element />
                  </React.Suspense>
                }
                path={path}
              />
            </Route>
          ))}
        </Route>
      ) : (
        <Route element={<Login />} path="/*" />
      )}
    </Routes>
  );
}

export default AppRoutes;
