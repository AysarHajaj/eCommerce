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
  PRODUCT_CATEGORY: {
    path: routesPath.PRODUCT_CATEGORY.path,
    label: 'Product Categories',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductCategory')),
  },
  PRODUCT_CREATE_CATEGORY: {
    path: routesPath.CREATE_PRODUCT_CATEGORY.path,
    label: 'Create Product Category',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductCategory/components/Form')),
  },
  PRODUCT_EDIT_CATEGORY: {
    path: routesPath.EDIT_PRODUCT_CATEGORY.path,
    label: 'Edit Product Category',
    allowedRoles: [USER_ROLES.VENDOR],
    dynamicPath: routesPath.EDIT_PRODUCT_CATEGORY.dynamicPath,
    Element: React.lazy(() => import('../features/ProductCategory/components/Form')),
  },
  PRODUCT_SUB_CATEGORY: {
    path: routesPath.PRODUCT_SUB_CATEGORY.path,
    label: 'Product Sub Categories',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory')),
  },
  CREATE_PRODUCT_SUB_CATEGORY: {
    path: routesPath.CREATE_PRODUCT_SUB_CATEGORY.path,
    label: 'Create Product Sub Category',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory/components/Form')),
  },
  EDIT_PRODUCT_SUB_CATEGORY: {
    path: routesPath.EDIT_PRODUCT_SUB_CATEGORY.path,
    label: 'Edit Product Sub Category',
    dynamicPath: routesPath.EDIT_PRODUCT_SUB_CATEGORY.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory/components/Form')),
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
  PRODUCTS: {
    path: routesPath.PRODUCTS.path,
    label: 'Products',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products')),
  },
  CREATE_PRODUCT: {
    path: routesPath.CREATE_PRODUCT.path,
    label: 'Create Product',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products/components/Form')),
  },
  EDIT_PRODUCT: {
    path: routesPath.EDIT_PRODUCT.path,
    label: 'Edit Product',
    dynamicPath: routesPath.EDIT_PRODUCT.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
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
  CITIES: {
    path: routesPath.CITIES.path,
    label: 'Cities',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities')),
  },
  CREATE_CITY: {
    path: routesPath.CREATE_CITY.path,
    label: 'Create City',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities/components/Form')),
  },
  EDIT_CITY: {
    path: routesPath.EDIT_CITY.path,
    label: 'Edit City',
    dynamicPath: routesPath.EDIT_CITY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities/components/Form')),
  },
  DISTRICTS: {
    path: routesPath.DISTRICTS.path,
    label: 'Districts',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts')),
  },
  CREATE_DISTRICT: {
    path: routesPath.CREATE_DISTRICT.path,
    label: 'Create District',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts/components/Form')),
  },
  EDIT_DISTRICT: {
    path: routesPath.EDIT_DISTRICT.path,
    label: 'Edit District',
    dynamicPath: routesPath.EDIT_DISTRICT.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts/components/Form')),
  },
  UNAUTHORIZED: {
    path: routesPath.UNAUTHORIZED.path,
    label: 'Unauthorized',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../components/UnAuthorized')),
  },
  NotFound: {
    path: '/*',
    label: 'Not Found',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../components/PageNotFound')),
  },
};

export default config;
