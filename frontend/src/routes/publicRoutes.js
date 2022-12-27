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
};

export default config;
