import React from "react";
import { Route, Routes } from "react-router-dom";
import constant from "../constant";
import RequiredAuth from "./RequiredAuth";
import Layout from "../root/layout/Layout";
import Unauthorized from "../components/UnAuthorized";
import PageNotFound from "../components/PageNotFound";
import Login from "../features/Login";
import Loader from "../components/Loader";

const Dashboard = React.lazy(() => import("../features/Dashboard"));
const Category = React.lazy(() => import("../features/Category"));
const SubCategory = React.lazy(() => import("../features/SubCategory"));
const ChildCategory = React.lazy(() => import("../features/ChildCategory"));
const CategoryForm = React.lazy(() =>
  import("../features/Category/components/Form")
);
const ChildCategoryForm = React.lazy(() =>
  import("../features/ChildCategory/components/Form")
);

const { ROUTES, USER_ROLES } = constant;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} path={ROUTES.LOGIN.path} />

      <Route path="/" element={<Layout />}>
        <Route element={<RequiredAuth />}>
          <Route path="unauthorized" element={<Unauthorized />} />
        </Route>

        <Route
          element={
            <RequiredAuth
              allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.VENDOR]}
            />
          }
        >
          <Route
            element={
              <React.Suspense fallback={<Loader />}>
                <Dashboard />
              </React.Suspense>
            }
            path={ROUTES.DASHBOARD.path}
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <Category />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CREATE_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <CategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.EDIT_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <CategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.SUB_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <SubCategory />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CHILD_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <ChildCategory />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CREATE_CHILD_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <ChildCategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.EDIT_CHILD_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <ChildCategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<PageNotFound />} path="*" />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
