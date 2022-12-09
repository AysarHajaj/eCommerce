import React from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Category = React.lazy(() => import("../features/Category"));

export default () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path="/" />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <Category />
          </React.Suspense>
        }
        path="/category"
      />
    </Routes>
  );
};
