export default {
  DASHBOARD: {
    path: '/',
  },
  PRODUCT_CATEGORY: {
    path: '/product_category',
  },
  CREATE_PRODUCT_CATEGORY: {
    path: '/product_category/create',
  },
  EDIT_PRODUCT_CATEGORY: {
    path: '/product_category/edit/:id',
    dynamicPath: (id) => `/product_category/edit/${id}`,
  },
  PRODUCT_SUB_CATEGORY: {
    path: '/product_sub_category',
  },
  CREATE_PRODUCT_SUB_CATEGORY: {
    path: '/product_sub_category/create',
  },
  EDIT_PRODUCT_SUB_CATEGORY: {
    path: '/product_sub_category/edit/:id',
    dynamicPath: (id) => `/product_sub_category/edit/${id}`,
  },
  UNAUTHORIZED: {
    path: '/unauthorized',
  },
  PRODUCTS: {
    path: '/products',
  },
  CREATE_PRODUCT: {
    path: '/create_product',
  },
  EDIT_PRODUCT: {
    path: '/product/edit/:id',
    dynamicPath: (id) => `/product/edit/${id}`,
  },
  VENDORS: {
    path: '/vendors',
  },
  CREATE_VENDOR: {
    path: '/vendor/create',
  },
  EDIT_VENDOR: {
    path: '/vendor/edit/:id',
    dynamicPath: (id) => `/vendor/edit/${id}`,
  },
  EDIT_SHOP_SETTINGS: {
    path: '/shop/edit/:id',
    dynamicPath: (id) => `/shop/edit/${id}`,
  },
  CITIES: {
    path: '/cities',
  },
  CREATE_CITY: {
    path: '/city/create',
  },
  EDIT_CITY: {
    path: '/city/edit/:id',
    dynamicPath: (id) => `/city/edit/${id}`,
  },
  DISTRICTS: {
    path: '/districts',
  },
  CREATE_DISTRICT: {
    path: '/district/create',
  },
  EDIT_DISTRICT: {
    path: '/district/edit/:id',
    dynamicPath: (id) => `/district/edit/${id}`,
  },
  CURRENCIES: {
    path: '/currencies',
  },
  CREATE_CURRENCY: {
    path: '/currency/create',
  },
  EDIT_CURRENCY: {
    path: '/currency/edit/:id',
    dynamicPath: (id) => `/currency/edit/${id}`,
  },
  SHOP_CATEGORY: {
    path: '/shop/category',
  },
  CREATE_SHOP_CATEGORY: {
    path: '/shop/category/create',
  },
  EDIT_SHOP_CATEGORY: {
    path: '/shop/category/edit/:id',
    dynamicPath: (id) => `/shop/category/edit/${id}`,
  },
};