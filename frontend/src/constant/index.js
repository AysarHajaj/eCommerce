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
      dynamicPath: (id) => `/category/edit/${id}`,
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
      dynamicPath: (id) => `/sub_category/edit/${id}`,
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
      dynamicPath: (id) => `/child_category/edit/${id}`,
    },
    UNAUTHORIZED: {
      path: "/unauthorized",
      label: "Unauthorized",
    },
    PRODUCTS: {
      path: "/products",
      label: "Products",
    },
    VENDOR_PRODUCTS: {
      path: "/vendor/products/:id",
      dynamicPath: (id) => `/vendor/products/${id}`,
      label: "Products",
    },
    CREATE_PRODUCT: {
      path: "/create_product",
      label: "Create Product",
    },
  },
};
