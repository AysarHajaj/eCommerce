import React from 'react';
import constants from '../constant';
import _paths from './_paths';

const { USER_ROLES } = constants;

const config = {
  DASHBOARD: {
    path: _paths.DASHBOARD.path,
    label: 'Dashboard',
    allowedRoles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Dashboard')),
  },
  PRODUCT_CATEGORY: {
    path: _paths.PRODUCT_CATEGORY.path,
    label: 'Product Categories',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductCategory')),
  },
  PRODUCT_CREATE_CATEGORY: {
    path: _paths.CREATE_PRODUCT_CATEGORY.path,
    label: 'Create Product Category',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductCategory/components/Form')),
  },
  PRODUCT_EDIT_CATEGORY: {
    path: _paths.EDIT_PRODUCT_CATEGORY.path,
    label: 'Edit Product Category',
    allowedRoles: [USER_ROLES.VENDOR],
    dynamicPath: _paths.EDIT_PRODUCT_CATEGORY.dynamicPath,
    Element: React.lazy(() => import('../features/ProductCategory/components/Form')),
  },
  PRODUCT_SUB_CATEGORY: {
    path: _paths.PRODUCT_SUB_CATEGORY.path,
    label: 'Product Sub Categories',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory')),
  },
  CREATE_PRODUCT_SUB_CATEGORY: {
    path: _paths.CREATE_PRODUCT_SUB_CATEGORY.path,
    label: 'Create Product Sub Category',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory/components/Form')),
  },
  EDIT_PRODUCT_SUB_CATEGORY: {
    path: _paths.EDIT_PRODUCT_SUB_CATEGORY.path,
    label: 'Edit Product Sub Category',
    dynamicPath: _paths.EDIT_PRODUCT_SUB_CATEGORY.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/ProductSubCategory/components/Form')),
  },
  PRODUCTS: {
    path: _paths.PRODUCTS.path,
    label: 'Products',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products')),
  },
  CREATE_PRODUCT: {
    path: _paths.CREATE_PRODUCT.path,
    label: 'Create Product',
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products/components/Form')),
  },
  EDIT_PRODUCT: {
    path: _paths.EDIT_PRODUCT.path,
    label: 'Edit Product',
    dynamicPath: _paths.EDIT_PRODUCT.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Products/components/Form')),
  },
  VENDORS: {
    path: _paths.VENDORS.path,
    label: 'Vendors',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor')),
  },
  CREATE_VENDOR: {
    path: _paths.CREATE_VENDOR.path,
    label: 'Create Vendor',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor/components/Form')),
  },
  EDIT_VENDOR: {
    path: _paths.EDIT_VENDOR.path,
    label: 'Edit Vendor',
    dynamicPath: _paths.EDIT_VENDOR.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Vendor/components/Form')),
  },

  SHOP_CATEGORY: {
    path: _paths.SHOP_CATEGORY.path,
    label: 'Shop Category',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ShopCategory')),
  },
  CREATE_SHOP_CATEGORY: {
    path: _paths.CREATE_SHOP_CATEGORY.path,
    label: 'Create Shop Category',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ShopCategory/components/Form')),
  },
  EDIT_SHOP_CATEGORY: {
    path: _paths.EDIT_SHOP_CATEGORY.path,
    label: 'Edit Shop Category',
    dynamicPath: _paths.EDIT_SHOP_CATEGORY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/ShopCategory/components/Form')),
  },

  EDIT_SHOP_SETTINGS: {
    path: _paths.EDIT_SHOP_SETTINGS.path,
    label: 'Edit Shop Settings',
    dynamicPath: _paths.EDIT_SHOP_SETTINGS.dynamicPath,
    allowedRoles: [USER_ROLES.VENDOR],
    Element: React.lazy(() => import('../features/Shops/components/Form')),
  },
  CITIES: {
    path: _paths.CITIES.path,
    label: 'Cities',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities')),
  },
  CREATE_CITY: {
    path: _paths.CREATE_CITY.path,
    label: 'Create City',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities/components/Form')),
  },
  EDIT_CITY: {
    path: _paths.EDIT_CITY.path,
    label: 'Edit City',
    dynamicPath: _paths.EDIT_CITY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Cities/components/Form')),
  },
  DISTRICTS: {
    path: _paths.DISTRICTS.path,
    label: 'Districts',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts')),
  },
  CREATE_DISTRICT: {
    path: _paths.CREATE_DISTRICT.path,
    label: 'Create District',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts/components/Form')),
  },
  EDIT_DISTRICT: {
    path: _paths.EDIT_DISTRICT.path,
    label: 'Edit District',
    dynamicPath: _paths.EDIT_DISTRICT.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Districts/components/Form')),
  },
  CURRENCIES: {
    path: _paths.CURRENCIES.path,
    label: 'Currencies',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Currencies')),
  },
  CREATE_CURRENCY: {
    path: _paths.CREATE_CURRENCY.path,
    label: 'Create Currency',
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Currencies/components/Form')),
  },
  EDIT_CURRENCY: {
    path: _paths.EDIT_CURRENCY.path,
    label: 'Edit Currency',
    dynamicPath: _paths.EDIT_CURRENCY.dynamicPath,
    allowedRoles: [USER_ROLES.ADMIN],
    Element: React.lazy(() => import('../features/Currencies/components/Form')),
  },
  UNAUTHORIZED: {
    path: _paths.UNAUTHORIZED.path,
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
