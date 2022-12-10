import HomeIcon from "@mui/icons-material/Home";
import Constant from "../constant";

export default {
  nav_items: [
    {
      id: 1,
      label: "Dashboard",
      to: "/",
      icon: <HomeIcon />,
      roles: [Constant.user_roles.admin, Constant.user_roles.vendor],
    },
    {
      id: 2,
      label: "Manage Categories",
      to: "",
      icon: <HomeIcon />,
      roles: [Constant.user_roles.admin],
      sub_items: [
        {
          id: 3,
          label: "Categories",
          to: "/category",
          roles: [Constant.user_roles.admin],
        },
        {
          id: 4,
          label: "Sub Categories",
          to: "/sub_category",
          roles: [Constant.user_roles.admin],
        },
        {
          id: 5,
          label: "Child Categories",
          to: "/child_category",
          roles: [Constant.user_roles.admin],
        },
      ],
    },
  ],
};
