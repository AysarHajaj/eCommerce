import React from "react";
import { Route, Routes } from "react-router-dom";

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Category = React.lazy(() => import("../features/Category"));
const SubCategory = React.lazy(() => import("../features/SubCategory"));
const ChildCategory = React.lazy(() => import("../features/ChildCategory"));

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
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <SubCategory />
          </React.Suspense>
        }
        path="/sub_category/"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <ChildCategory />
          </React.Suspense>
        }
        path="/child_category/"
      />
      <Route element={<b>404 not found</b>} path="*" />
    </Routes>
  );
};
