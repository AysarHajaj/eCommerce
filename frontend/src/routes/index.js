import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RequiredAuth from './RequiredAuth';
import Layout from '../root/layout/Layout';
import Loader from '../components/Loader';
import useAuth from '../hooks/useAuth';
import ADMIN_VENDOR_ROUTES from './adminDashboardRoutes';
import PublicLayout from '../root/PublicLayout/Layout';
import PUBLIC_ROUTES from './publicRoutes';

function AppRoutes() {
  const { auth } = useAuth();
  return (
    <Routes>
      {/* admin routes */}
      {!!auth?.user && !!auth.accessToken && (
        <Route element={<Layout />} path="/">
          {Object.values(ADMIN_VENDOR_ROUTES).map(({ path, allowedRoles, Element, label }) => (
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
      )}
      {/* publich rutes */}
      <Route path="/" element={<PublicLayout />}>
        {Object.values(PUBLIC_ROUTES).map(({ path, Element, label }) => (
          <Route
            key={label}
            path={path}
            element={
              <React.Suspense fallback={<Loader />}>
                <Element />
              </React.Suspense>
            }
          />
        ))}
      </Route>
    </Routes>
  );
}

export default AppRoutes;
