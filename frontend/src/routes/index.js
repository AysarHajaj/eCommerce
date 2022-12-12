import React from "react";
import { Route, Routes } from "react-router-dom";
import constant from "../constant";
import AuthRoute from "./AuthRoute";

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Category = React.lazy(() => import("../features/Category"));
const SubCategory = React.lazy(() => import("../features/SubCategory"));
const ChildCategory = React.lazy(() => import("../features/ChildCategory"));
const CategoryForm = React.lazy(() =>
  import("../features/Category/components/Form")
);
const Login = React.lazy(() => import("../features/Login"));

export default () => {
  return (
    <Routes>
      <Route
        element={
          <AuthRoute>
            <Dashboard />
          </AuthRoute>
        }
        path={constant.routes.DASHBOARD.path}
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <AuthRoute>
              <Category />
            </AuthRoute>
          </React.Suspense>
        }
        path={constant.routes.CATEGORY.path}
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <AuthRoute>
              <CategoryForm />
            </AuthRoute>
          </React.Suspense>
        }
        path="/category/create"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <AuthRoute>
              <CategoryForm />
            </AuthRoute>
          </React.Suspense>
        }
        path="/category/edit/:id"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <AuthRoute>
              <SubCategory />
            </AuthRoute>
          </React.Suspense>
        }
        path="/sub_category/"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <AuthRoute>
              <ChildCategory />
            </AuthRoute>
          </React.Suspense>
        }
        path="/child_category/"
      />
      <Route
        element={
          <React.Suspense fallback="Loading...">
            <Login />
          </React.Suspense>
        }
        path={constant.routes.LOGIN.path}
      />
      <Route element={<b>404 not found</b>} path="*" />
    </Routes>
  );
};
