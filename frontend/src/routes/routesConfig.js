import React from "react";
import constants from "../constant";

const { USER_ROLES } = constants;

const config = {
  DASHBOARD: {
    path: "/",
    label: "Dashboard",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../features/Dashboard")),
  },
  CATEGORY: {
    path: "/category",
    label: "Categories",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/Category")),
  },
  CREATE_CATEGORY: {
    path: "/category/create",
    label: "Create Category",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/Category/components/Form")),
  },
  EDIT_CATEGORY: {
    path: "/category/edit/:id",
    label: "Edit Category",
    allowedRoles: [USER_ROLES.ADMIN],
    dynamicPath: (id) => `/category/edit/${id}`,
    Element: React.lazy(() => import("../features/Category/components/Form")),
  },
  SUB_CATEGORY: {
    path: "/sub_category",
    label: "Sub Categories",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/SubCategory")),
  },
  CREATE_SUB_CATEGORY: {
    path: "/sub_category/create",
    label: "Create Sub Category",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() =>
      import("../features/SubCategory/components/Form")
    ),
  },
  EDIT_SUB_CATEGORY: {
    path: "/sub_category/edit/:id",
    label: "Edit Sub Category",
    dynamicPath: (id) => `/sub_category/edit/${id}`,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() =>
      import("../features/SubCategory/components/Form")
    ),
  },
  CHILD_CATEGORY: {
    path: "/child_category",
    label: "Child Categories",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/ChildCategory")),
  },
  CREATE_CHILD_CATEGORY: {
    path: "/child_category/create",
    label: "Create Child Category",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() =>
      import("../features/ChildCategory/components/Form")
    ),
  },
  EDIT_CHILD_CATEGORY: {
    path: "/child_category/edit/:id",
    label: "Edit Child Category",
    dynamicPath: (id) => `/child_category/edit/${id}`,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() =>
      import("../features/ChildCategory/components/Form")
    ),
  },
  UNAUTHORIZED: {
    path: "/unauthorized",
    label: "Unauthorized",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../components/UnAuthorized")),
  },
  PRODUCTS: {
    path: "/products",
    label: "Products",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../features/Products")),
  },
  CREATE_PRODUCT: {
    path: "/create_product",
    label: "Create Product",
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../features/Products/components/Form")),
  },
  EDIT_PRODUCT: {
    path: "/product/edit/:id",
    label: "Edit Product",
    dynamicPath: (id) => `/product/edit/${id}`,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../features/Products/components/Form")),
  },
  VENDORS: {
    path: "/vendors",
    label: "Vendors",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/Vendor")),
  },
  CREATE_VENDOR: {
    path: "/vendor/create",
    label: "Create Vendor",
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/Vendor/components/Form")),
  },
  EDIT_VENDOR: {
    path: "/vendor/edit/:id",
    label: "Edit Vendor",
    dynamicPath: (id) => `/vendor/edit/${id}`,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import("../features/Vendor/components/Form")),
  },
  EDIT_SHOP_SETTINGS: {
    path: "/shop/edit/:id",
    label: "Edit Shop Settings",
    dynamicPath: (id) => `/shop/edit/${id}`,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import("../features/Shops/components/Form")),
  },
};

export default config;