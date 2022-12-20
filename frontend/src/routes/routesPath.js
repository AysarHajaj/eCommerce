const paths = {
  DASHBOARD: {
    path: '/',
  },
  CATEGORY: {
    path: '/category',
  },
  CREATE_CATEGORY: {
    path: '/category/create',
  },
  EDIT_CATEGORY: {
    path: '/category/edit/:id',
    dynamicPath: (id) => `/category/edit/${id}`,
  },
  SUB_CATEGORY: {
    path: '/sub_category',
  },
  CREATE_SUB_CATEGORY: {
    path: '/sub_category/create',
  },
  EDIT_SUB_CATEGORY: {
    path: '/sub_category/edit/:id',
    dynamicPath: (id) => `/sub_category/edit/${id}`,
  },
  CHILD_CATEGORY: {
    path: '/child_category',
  },
  CREATE_CHILD_CATEGORY: {
    path: '/child_category/create',
  },
  EDIT_CHILD_CATEGORY: {
    path: '/child_category/edit/:id',
    dynamicPath: (id) => `/child_category/edit/${id}`,
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
};

export default paths;
