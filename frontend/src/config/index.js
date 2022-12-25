import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from '@mui/icons-material/Window';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import CategoryIcon from '@mui/icons-material/Category';
import StoreIcon from '@mui/icons-material/Store';
import PaidIcon from '@mui/icons-material/Paid';
import ROUTES from '../routes/adminDashboardRoutes';

const config = {
  nav_items: [
    {
      id: 1,
      label: ROUTES.DASHBOARD.label,
      to: ROUTES.DASHBOARD.path,
      icon: <HomeIcon />,
      allowedRoles: ROUTES.DASHBOARD.allowedRoles,
    },
    {
      id: 2,
      label: 'Manage Categories',
      to: '',
      icon: <CategoryIcon />,
      allowedRoles: ROUTES.PRODUCT_CATEGORY.allowedRoles,
      sub_items: [
        {
          id: 3,
          label: ROUTES.PRODUCT_CATEGORY.label,
          to: ROUTES.PRODUCT_CATEGORY.path,
          allowedRoles: ROUTES.PRODUCT_CATEGORY.allowedRoles,
        },
        {
          id: 4,
          label: ROUTES.PRODUCT_SUB_CATEGORY.label,
          to: ROUTES.PRODUCT_SUB_CATEGORY.path,
          allowedRoles: ROUTES.PRODUCT_SUB_CATEGORY.allowedRoles,
        },
      ],
    },
    {
      id: 6,
      label: 'Manage Products',
      to: '',
      icon: <WindowIcon />,
      allowedRoles: ROUTES.PRODUCTS.allowedRoles,
      sub_items: [
        {
          id: 7,
          label: ROUTES.CREATE_PRODUCT.label,
          to: ROUTES.CREATE_PRODUCT.path,
          allowedRoles: ROUTES.CREATE_PRODUCT.allowedRoles,
        },
        {
          id: 8,
          label: ROUTES.PRODUCTS.label,
          to: ROUTES.PRODUCTS.path,
          allowedRoles: ROUTES.PRODUCTS.allowedRoles,
        },
      ],
    },
    {
      id: 9,
      label: ROUTES.VENDORS.label,
      to: ROUTES.VENDORS.path,
      icon: <StoreIcon />,
      allowedRoles: ROUTES.VENDORS.allowedRoles,
    },
    {
      id: 10,
      label: 'Location',
      to: '',
      icon: <WindowIcon />,
      allowedRoles: ROUTES.CITIES.allowedRoles,
      sub_items: [
        {
          id: 11,
          label: ROUTES.CITIES.label,
          to: ROUTES.CITIES.path,
          allowedRoles: ROUTES.CITIES.allowedRoles,
        },
        {
          id: 12,
          label: ROUTES.DISTRICTS.label,
          to: ROUTES.DISTRICTS.path,
          allowedRoles: ROUTES.DISTRICTS.allowedRoles,
        },
      ],
    },
    {
      id: 13,
      label: ROUTES.CURRENCIES.label,
      to: ROUTES.CURRENCIES.path,
      icon: <PaidIcon />,
      allowedRoles: ROUTES.CURRENCIES.allowedRoles,
    },
    {
      id: 14,
      label: ROUTES.SHOP_CATEGORY.label,
      to: ROUTES.SHOP_CATEGORY.path,
      icon: <ShoppingBasketIcon />,
      allowedRoles: ROUTES.SHOP_CATEGORY.allowedRoles,
    },
  ],
};

export default config;
