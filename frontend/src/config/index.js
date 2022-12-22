import React from 'react';
import HomeIcon from '@mui/icons-material/Home';
import WindowIcon from '@mui/icons-material/Window';
import StoreIcon from '@mui/icons-material/Store';
import ROUTES from '../routes/routesConfig';

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
      icon: <WindowIcon />,
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
        {
          id: 5,
          label: ROUTES.CHILD_CATEGORY.label,
          to: ROUTES.CHILD_CATEGORY.path,
          allowedRoles: ROUTES.CHILD_CATEGORY.allowedRoles,
        },
      ],
    },
    {
      id: 6,
      label: 'Manage Products',
      to: '',
      icon: <WindowIcon />,
      roles: ROUTES.PRODUCTS.allowedRoles,
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
  ],
};

export default config;
