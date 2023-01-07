import React from 'react';
import publicPaths from './publicPaths';

const config = {
  LOGIN: {
    path: publicPaths.LOGIN.path,
    Element: React.lazy(() => import('../features/Login')),
  },
  HOME: {
    path: publicPaths.HOME.path,
    Element: React.lazy(() => import('../features/Home')),
  },
  VENDORS: {
    path: publicPaths.VENDORS_PAGE.path,
    Element: React.lazy(() => import('../features/VendorsPage')),
  },
  PRODUCTS: {
    path: publicPaths.PRODUCTS_PAGE.path,
    Element: React.lazy(() => import('../features/ProductsPage')),
  },
  PRODUCT: {
    path: publicPaths.PRODUCT_PAGE.path,
    Element: React.lazy(() => import('../features/ProductPage')),
  },
  CART: {
    path: publicPaths.CART.path,
    Element: React.lazy(() => import('../features/Cart')),
  },
};

export default config;
