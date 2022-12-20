import React from 'react';
import constants from '../constant';
import routesPath from './routesPath';

const { USER_ROLES } = constants;

const config = {
  DASHBOARD: {
    path: routesPath.DASHBOARD.path,
    label: 'Dashboard',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Dashboard')),
  },
  CATEGORY: {
    path: routesPath.CATEGORY.path,
    label: 'Categories',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Category')),
  },
  CREATE_CATEGORY: {
    path: routesPath.CREATE_CATEGORY.path,
    label: 'Create Category',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Category/components/Form')),
  },
  EDIT_CATEGORY: {
    path: routesPath.EDIT_CATEGORY.path,
    label: 'Edit Category',
    allowedRoles: [USER_ROLES.ADMIN],
    dynamicPath: routesPath.EDIT_CATEGORY.dynamicPath,
    Element: React.lazy(() => import('../features/Category/components/Form')),
  },
  SUB_CATEGORY: {
    path: routesPath.SUB_CATEGORY.path,
    label: 'Sub Categories',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/SubCategory')),
  },
  CREATE_SUB_CATEGORY: {
    path: routesPath.CREATE_SUB_CATEGORY.path,
    label: 'Create Sub Category',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/SubCategory/components/Form')),
  },
  EDIT_SUB_CATEGORY: {
    path: routesPath.EDIT_SUB_CATEGORY.path,
    label: 'Edit Sub Category',
    dynamicPath: routesPath.EDIT_SUB_CATEGORY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/SubCategory/components/Form')),
  },
  CHILD_CATEGORY: {
    path: routesPath.CHILD_CATEGORY.path,
    label: 'Child Categories',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ChildCategory')),
  },
  CREATE_CHILD_CATEGORY: {
    path: routesPath.CREATE_CHILD_CATEGORY.path,
    label: 'Create Child Category',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ChildCategory/components/Form')),
  },
  EDIT_CHILD_CATEGORY: {
    path: routesPath.EDIT_CHILD_CATEGORY.path,
    label: 'Edit Child Category',
    dynamicPath: routesPath.EDIT_CHILD_CATEGORY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ChildCategory/components/Form')),
  },
  UNAUTHORIZED: {
    path: routesPath.UNAUTHORIZED.path,
    label: 'Unauthorized',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../components/UnAuthorized')),
  },
  PRODUCTS: {
    path: routesPath.PRODUCTS.path,
    label: 'Products',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products')),
  },
  CREATE_PRODUCT: {
    path: routesPath.CREATE_PRODUCT.path,
    label: 'Create Product',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products/components/Form')),
  },
  EDIT_PRODUCT: {
    path: routesPath.EDIT_PRODUCT.path,
    label: 'Edit Product',
    dynamicPath: routesPath.EDIT_PRODUCT.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products/components/Form')),
  },
  VENDORS: {
    path: routesPath.VENDORS.path,
    label: 'Vendors',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor')),
  },
  CREATE_VENDOR: {
    path: routesPath.CREATE_VENDOR.path,
    label: 'Create Vendor',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor/components/Form')),
  },
  EDIT_VENDOR: {
    path: routesPath.EDIT_VENDOR.path,
    label: 'Edit Vendor',
    dynamicPath: routesPath.EDIT_VENDOR.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor/components/Form')),
  },
  EDIT_SHOP_SETTINGS: {
    path: routesPath.EDIT_SHOP_SETTINGS.path,
    label: 'Edit Shop Settings',
    dynamicPath: routesPath.EDIT_SHOP_SETTINGS.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Shops/components/Form')),
  },
};

export default config;
