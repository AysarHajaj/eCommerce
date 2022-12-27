const USER_ROLES = {
  ADMIN: {
    NAME: 'admin',
  },
  VENDOR: {
    NAME: 'vendor',
  },
  CUSTOMER: {
    NAME: 'customer',
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
    currency: {
      get: 'GET/CURRENCY',
      post: 'POST/CURRENCY',
      put: 'PUT/CURRENCY',
      change_status: 'PUT/CURRENCY/STATUS',
      delete: 'DELETE/CURRENCY',
      get_list: 'GET/CURRENCY/LIST',
    },
    vendors_page: {
      get: 'GET/VENDOR_BY_CATEGORY_ID',
    },
    products_page: {
      get_by_vendor_id: 'GET/PRODUCT_BY_VENDOR_ID',
      get_categories_by_vendor_id: 'GET/CATEGORIES_BY_VENDOR_ID',
    },
  },
};

export default constants;
