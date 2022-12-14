/* eslint-disable import/no-anonymous-default-export */
export default {
  USER_ROLES: {
    ADMIN: "admin",
    VENDOR: "vendor",
  },
  ROUTES: {
    DASHBOARD: {
      path: "/",
      label: "Dashboard",
    },
    CATEGORY: {
      path: "/category",
      label: "Categories",
    },
    LOGIN: {
      path: "/login",
      label: "Login",
    },
    CREATE_CATEGORY: {
      path: "/category/create",
      label: "Create Category",
    },
    EDIT_CATEGORY: {
      path: "/category/edit/:id",
      label: "Edit Category",
    },
    SUB_CATEGORY: {
      path: "/sub_category",
      label: "Sub Categories",
    },
    CREATE_SUB_CATEGORY: {
      path: "/sub_category/create",
      label: "Create Sub Category",
    },
    EDIT_SUB_CATEGORY: {
      path: "/sub_category/edit/:id",
      label: "Edit Sub Category",
    },
    CHILD_CATEGORY: {
      path: "/child_category",
      label: "Child Categories",
    },
    CREATE_CHILD_CATEGORY: {
      path: "/child_category/create",
      label: "Create Child Category",
    },
    EDIT_CHILD_CATEGORY: {
      path: "/child_category/edit/:id",
      label: "Edit Child Category",
    },
    UNAUTHORIZED: {
      path: "/unauthorized",
      label: "Unauthorized",
    },
    PRODUCTS: {
      path: "/vendor/products",
      label: "Products",
    },
    CREATE_PRODUCT: {
      path: "/vendor/create_product",
      label: "Create Product",
    },
  },
};
