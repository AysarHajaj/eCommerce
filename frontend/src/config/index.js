import HomeIcon from "@mui/icons-material/Home";
import WindowIcon from "@mui/icons-material/Window";
import Constant from "../constant";
const { USER_ROLES, ROUTES } = Constant;

const config = {
  nav_items: [
    {
      id: 1,
      label: ROUTES.DASHBOARD.label,
      to: ROUTES.DASHBOARD.path,
      icon: <HomeIcon />,
      roles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
    },
    {
      id: 2,
      label: "Manage Categories",
      to: "",
      icon: <WindowIcon />,
      roles: [USER_ROLES.ADMIN],
      sub_items: [
        {
          id: 3,
          label: ROUTES.CATEGORY.label,
          to: ROUTES.CATEGORY.path,
          roles: [USER_ROLES.ADMIN],
        },
        {
          id: 4,
          label: ROUTES.SUB_CATEGORY.label,
          to: ROUTES.SUB_CATEGORY.path,
          roles: [USER_ROLES.ADMIN],
        },
        {
          id: 5,
          label: ROUTES.CHILD_CATEGORY.label,
          to: ROUTES.CHILD_CATEGORY.path,
          roles: [USER_ROLES.ADMIN],
        },
      ],
    },
    {
      id: 6,
      label: "Manage Products",
      to: "",
      icon: <WindowIcon />,
      roles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
      sub_items: [
        {
          id: 7,
          label: ROUTES.CREATE_PRODUCT.label,
          to: ROUTES.CREATE_PRODUCT.path,
          roles: [USER_ROLES.ADMIN, USER_ROLES.VENDOR],
        },
        {
          id: 8,
          label: ROUTES.PRODUCTS.label,
          to: ROUTES.PRODUCTS.path,
          roles: [USER_ROLES.ADMIN],
        },
        {
          id: 8,
          label: ROUTES.VENDOR_PRODUCTS.label,
          to: ROUTES.VENDOR_PRODUCTS.path,
          roles: [USER_ROLES.VENDOR],
        },
      ],
    },
  ],
};

export default config;