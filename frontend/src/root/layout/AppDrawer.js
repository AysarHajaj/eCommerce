import React, { useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import Divider from "@mui/material/Divider";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Config from "../../config";
import { useNavigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import constant from "../../constant";

const drawerWidth = 240;

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const AppDrawer = ({ open, handleDrawerClose }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const {
    auth: { user },
  } = useAuth();
  const [activeLink, setActiveLink] = useState(location.pathname === constant.ROUTES.DASHBOARD.path ? 1 : 0);

  const theme = useTheme();
  const navItems = Config.nav_items;
  const [collapse, setCollapse] = React.useState(
    navItems
      .filter((item) => item.sub_items)
      .reduce((accr, currentItem) => {
        accr[currentItem.id] = false;
        return accr;
      }, {})
  );

  const handleClick = (id) => {
    const newData = { ...collapse };
    newData[id] = !newData[id];
    setCollapse(newData);
  };
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="persistent"
      anchor="left"
      open={open}
    >
      <DrawerHeader>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === "ltr" ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        {navItems
          .filter((item) => item.roles.includes(user?.type))
          .map((item) => {
            if (!item.sub_items) {
              return (
                <ListItemButton
                  className={activeLink === item.id ? "active" : ""}
                  onClick={() => {
                    setActiveLink(item.id)
                    navigate(item.to);
                  }}
                  key={item.id}
                >
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                </ListItemButton>
              );
            }
            return (
              <React.Fragment key={item.id}>
                <ListItemButton onClick={() => handleClick(item.id)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                  {collapse[item.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={collapse[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.sub_items
                      .filter((item) => item.roles.includes(user?.type))
                      .map((subItem) => {
                        return (
                          <ListItemButton
                            className={
                              activeLink === subItem.id ? "active" : ""
                            }
                            onClick={() => {
                              setActiveLink(subItem.id)
                              navigate(
                                `${subItem.to}${
                                  subItem.to?.includes("/:id")
                                    ? `/${user?.id}`
                                    : ""
                                }`
                                  .replace("/:id", "")
                                  .trim()
                              );
                            }}
                            key={subItem.id}
                            sx={{ pl: 4 }}
                          >
                            {subItem.icon && (
                              <ListItemIcon>{subItem.icon}</ListItemIcon>
                            )}
                            <ListItemText primary={subItem.label} />
                          </ListItemButton>
                        );
                      })}
                  </List>
                </Collapse>
              </React.Fragment>
            );
          })}
      </List>
    </Drawer>
  );
};

export default AppDrawer;
