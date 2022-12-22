const USER_ROLES = {
  ADMIN: {
    NAME: 'admin',
  },
  VENDOR: {
    NAME: 'vendor',
  },
};

const constants = {
  USER_ROLES: {
    ADMIN: USER_ROLES.ADMIN.NAME,
    VENDOR: USER_ROLES.VENDOR.NAME,
  },
  DRAWER_WIDTH: 300 /* in px */,
  ACTION_TYPES: {
    product: {
      get: 'GET/PRODUCT',
      get_vendor: 'GET/VENDOR/PRODUCT',
      post: 'POST/PRODUCT',
      put: 'PUT/PRODUCT',
      delete: 'DELETE/PRODUCT',
      change_status: 'PUT/PRODUCT/STATUS',
      get_list: 'GET/PRODUCT/LIST',
    },
    product_category: {
      get: 'GET/PRODUCT/CATEGORY',
      post: 'POST/PRODUCT/CATEGORY',
      put: 'PUT/PRODUCT/CATEGORY',
      delete: 'DELETE/PRODUCT/CATEGORY',
      change_status: 'PUT/PRODUCT/CATEGORY/STATUS',
      get_list: 'GET/PRODUCT/CATEGORY/LIST',
    },
    product_sub_category: {
      get: 'GET/PRODUCT/SUB_CATEGORY',
      post: 'POST/PRODUCT/SUB_CATEGORY',
      put: 'PUT/PRODUCT/SUB_CATEGORY',
      change_status: 'PUT/PRODUCT/SUB_CATEGORY/STATUS',
      delete: 'DELETE/PRODUCT/SUB_CATEGORY',
      get_list: 'GET/PRODUCT/SUB_CATEGORY/LIST',
    },
    child_category: {
      get: 'GET/CHILD_CATEGORY',
      post: 'POST/CHILD_CATEGORY',
      put: 'PUT/CHILD_CATEGORY',
      delete: 'DELETE/CHILD_CATEGORY',
      change_status: 'PUT/CHILD_CATEGORY/STATUS',
      get_list: 'GET/CHILD_CATEGORY/LIST',
    },
    vendor: {
      get: 'GET/VENDOR',
      post: 'POST/VENDOR',
      put: 'PUT/VENDOR',
      change_status: 'PUT/VENDOR/STATUS',
      delete: 'DELETE/VENDOR',
      get_list: 'GET/VENDOR/LIST',
    },
    shop: {
      put: 'PUT/SHOP',
      get: 'GET/SHOP',
    },
    city: {
      get: 'GET/CITY',
      post: 'POST/CITY',
      put: 'PUT/CITY',
      change_status: 'PUT/CITY/STATUS',
      delete: 'DELETE/CITY',
      get_list: 'GET/CITY/LIST',
    },
    district: {
      get: 'GET/DISTRICT',
      post: 'POST/DISTRICT',
      put: 'PUT/DISTRICT',
      change_status: 'PUT/DISTRICT/STATUS',
      delete: 'DELETE/DISTRICT',
      get_list: 'GET/DISTRICT/LIST',
    },
  },
};

export default constants;
