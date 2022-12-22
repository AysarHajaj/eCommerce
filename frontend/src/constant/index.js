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
    shop_category: {
      get: 'GET/SHOP_CATEGORY',
      post: 'POST/SHOP_CATEGORY',
      put: 'PUT/SHOP_CATEGORY',
      delete: 'DELETE/SHOP_CATEGORY',
      change_status: 'PUT/SHOP_CATEGORY/STATUS',
      get_list: 'GET/SHOP_CATEGORY/LIST',
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
  },
};

export default constants;
