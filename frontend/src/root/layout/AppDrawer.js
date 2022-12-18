import React, { useState, useEffect, useMemo } from "react";
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
import {  NavLink, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import constants from "../../constant";

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

const Link = React.forwardRef((itemProps, ref) => {
  return (
    <NavLink
      ref={ref}
      {...itemProps}
      role={undefined}
      className={({isActive}) => `${itemProps.className} ${isActive ? 'active' : ''}`.trim()}
    />
  );
});

const ListItemLink = (props) => {
  const { icon, primary, to, ...rest } = props;

  return (
    <ListItemButton {...rest} component={Link} to={to}>
      {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
      <ListItemText primary={primary} />
    </ListItemButton>
  );
};

const AppDrawer = ({ open, handleDrawerClose }) => {
  const location = useLocation();

  const {
    auth: { user },
  } = useAuth();

  const theme = useTheme();
  const navItems = Config.nav_items;
  const [collapse, setCollapse] = useState(
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

  const activeNavLink = useMemo(() => {
    return Config.nav_items.find((navLink) => {
      return navLink.to === location.pathname || navLink?.sub_items?.some((subItem) => subItem.to === location.pathname);
    }) || {};
  }, [location.pathname]);

  useEffect(() => { 
    if (activeNavLink.sub_items?.length && !collapse[activeNavLink.id]) setCollapse({ ...collapse, [activeNavLink.id]: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeNavLink]);

  return (
    <Drawer
      sx={{
        width: constants.DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: constants.DRAWER_WIDTH,
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
          .filter(
            (item) =>
              !item.allowedRoles || item.allowedRoles.includes(user?.type)
          )
          .map((item) => {
            if (!item.sub_items) {
              return (
                <ListItemLink
                  key={item.id}
                  primary={item.label}
                  to={item.to}
                  icon={item.icon}
                />
              );
            }
            return (
              <React.Fragment key={item.id}>
                <ListItemButton className={ activeNavLink?.id === item.id ? 'child-is-active' : '' } onClick={() => handleClick(item.id)}>
                  {item.icon && <ListItemIcon>{item.icon}</ListItemIcon>}
                  <ListItemText primary={item.label} />
                  {collapse[item.id] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
                <Collapse in={collapse[item.id]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.sub_items
                      .filter(
                        (item) =>
                          !item.allowedRoles ||
                          item.allowedRoles.includes(user?.type)
                      )
                      .map((subItem) => {
                        return (
                          <ListItemLink
                            key={subItem.id}
                            primary={subItem.label}
                            to={subItem.to}
                            icon={subItem.icon}
                            sx={{ pl: 6 }}
                          />
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
