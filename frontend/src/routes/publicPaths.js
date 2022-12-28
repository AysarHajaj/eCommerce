export default {
  HOME: {
    path: '/',
  },
  VENDOR_LIST: {
    path: '/public/vendor_list',
  },
  VENDOR: {
    path: '/public/vendor',
  },
  PRODUCT: {
    path: '/public/product',
  },
  LOGIN: {
    path: '/login',
  },
  VENDORS_PAGE: {
    path: '/public/vendors',
  },
  PRODUCTS_PAGE: {
    path: '/public/:id/products',
    dynamicPath: (id) => `/public/${id}/products`,
  },
};
