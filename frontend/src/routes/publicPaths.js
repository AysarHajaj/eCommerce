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
    path: '/public/vendors/:id',
    dynamicPath: (id) => `/public/vendors/${id}`,
  },
  PRODUCTS_PAGE: {
    path: '/public/:id/products',
    dynamicPath: (id) => `/public/${id}/products`,
  },
  PRODUCT_PAGE: {
    path: '/public/product/:id',
    dynamicPath: (id) => `/public/product/${id}`,
  },
  CART: {
    path: '/public/cart/:id',
    dynamicPath: (id) => `/public/cart/${id}`,
  },
};
