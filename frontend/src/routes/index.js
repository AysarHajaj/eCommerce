import React from "react";
import { Route, Routes } from "react-router-dom";
import constant from "../constant";

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Category = React.lazy(() => import("../features/Category"));
const SubCategory = React.lazy(() => import("../features/SubCategory"));
const ChildCategory = React.lazy(() => import("../features/ChildCategory"));
const CategoryForm = React.lazy(() =>
  import("../features/Category/components/Form")
);

export default () => {
  return (
    <Routes>
      <Route element={<Dashboard />} path={constant.routes.DASHBOARD.path} />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <Category />
          </React.Suspense>
        }
        path={constant.routes.CATEGORY.path}
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <CategoryForm />
          </React.Suspense>
        }
        path="/category/create"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <CategoryForm />
          </React.Suspense>
        }
        path="/category/edit/:id"
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
