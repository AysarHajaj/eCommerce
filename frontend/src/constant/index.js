const USER_ROLES = {
  ADMIN: {
    NAME: "admin",
  },
  VENDOR: {
    NAME: "vendor",
  },
};

const constants = {
  USER_ROLES: {
    ADMIN: USER_ROLES.ADMIN.NAME,
    VENDOR: USER_ROLES.VENDOR.NAME,
  },
  DRAWER_WIDTH: 240 /* in px */,
  ACTION_TYPES: {
    product: {
      get: "GET/PRODUCT",
      get_vendor: "GET/VENDOR/PRODUCT",
      post: "POST/PRODUCT",
      put: "PUT/PRODUCT",
      delete: "DELETE/PRODUCT",
      change_status: "PUT/PRODUCT/STATUS",
      get_list: "GET/PRODUCT/LIST",
    },
    category: {
      get: "GET/CATEGORY",
      post: "POST/CATEGORY",
      put: "PUT/CATEGORY",
      delete: "DELETE/CATEGORY",
      change_status: "PUT/CATEGORY/STATUS",
      get_list: "GET/CATEGORY/LIST",
    },
    sub_category: {
      get: "GET/SUB_CATEGORY",
      post: "POST/SUB_CATEGORY",
      put: "PUT/SUB_CATEGORY",
      change_status: "PUT/SUB_CATEGORY/STATUS",
      delete: "DELETE/SUB_CATEGORY",
      get_list: "GET/SUB_CATEGORY/LIST",
    },
    child_category: {
      get: "GET/CHILD_CATEGORY",
      post: "POST/CHILD_CATEGORY",
      put: "PUT/CHILD_CATEGORY",
      delete: "DELETE/CHILD_CATEGORY",
      change_status: "PUT/CHILD_CATEGORY/STATUS",
      get_list: "GET/CHILD_CATEGORY/LIST",
    },
    vendor: {
      get: "GET/VENDOR",
      post: "POST/VENDOR",
      put: "PUT/VENDOR",
      change_status: "PUT/VENDOR/STATUS",
      delete: "DELETE/VENDOR",
      get_list: "GET/VENDOR/LIST",
    },
    shop: {
      put: "PUT/SHOP",
      get: "GET/SHOP",
    },
  },
};


export default constants;