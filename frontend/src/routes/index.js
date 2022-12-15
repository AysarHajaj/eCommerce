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
const SubCategoryForm = React.lazy(() =>
  import("../features/SubCategory/components/Form")
);
const ChildCategoryForm = React.lazy(() =>
  import("../features/ChildCategory/components/Form")
);
const Products = React.lazy(() => import("../features/Products"));
const CreateProducts = React.lazy(() => import("../features/CreateProducts"));

const Vendor = React.lazy(() => import("../features/Vendor"));
const VendorForm = React.lazy(() =>
  import("../features/Vendor/components/Form")
);

const { ROUTES, USER_ROLES } = constant;

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Login />} path={ROUTES.LOGIN.path} />

      <Route path="/" element={<Layout />}>
        <Route element={<RequiredAuth />}>
          <Route path={ROUTES.UNAUTHORIZED.path} element={<Unauthorized />} />
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

        <Route
          element={
            <RequiredAuth
              allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.VENDOR]}
            />
          }
        >
          <Route
            path={ROUTES.PRODUCTS.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <Products />
              </React.Suspense>
            }
          />
        </Route>

        <Route
          element={
            <RequiredAuth
              allowedRoles={[USER_ROLES.ADMIN, USER_ROLES.VENDOR]}
            />
          }
        >
          <Route
            path={ROUTES.CREATE_PRODUCT.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <CreateProducts />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CREATE_SUB_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <SubCategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.EDIT_SUB_CATEGORY.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <SubCategoryForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.VENDORS.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <Vendor />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.CREATE_VENDOR.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <VendorForm />
              </React.Suspense>
            }
          />
        </Route>

        <Route element={<RequiredAuth allowedRoles={[USER_ROLES.ADMIN]} />}>
          <Route
            path={ROUTES.EDIT_VENDOR.path}
            element={
              <React.Suspense fallback={<Loader />}>
                <VendorForm />
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
