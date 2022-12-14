import HomeIcon from "@mui/icons-material/Home";
import WindowIcon from "@mui/icons-material/Window";
import Constant from "../constant";

const config = {
  nav_items: [
    {
      id: 1,
      label: "Dashboard",
      to: "/",
      icon: <HomeIcon />,
      roles: [Constant.USER_ROLES.ADMIN, Constant.USER_ROLES.VENDOR],
    },
    {
      id: 2,
      label: "Manage Categories",
      to: "",
      icon: <WindowIcon />,
      roles: [Constant.USER_ROLES.ADMIN],
      sub_items: [
        {
          id: 3,
          label: "Categories",
          to: "/category",
          roles: [Constant.USER_ROLES.ADMIN],
        },
        {
          id: 4,
          label: "Sub Categories",
          to: "/sub_category",
          roles: [Constant.USER_ROLES.ADMIN],
        },
        {
          id: 5,
          label: "Child Categories",
          to: "/child_category",
          roles: [Constant.USER_ROLES.ADMIN],
        },
      ],
    },
  ],
};

export default config;