import * as React from "react";
import { Navigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import DrawerApp from "./AppDrawer";
import AppMain from "./AppMain";
import AppRoutes from "../../routes";
import { selectLogin } from "../../features/Login/loginSlice";
import { useSelector } from "react-redux";
import constant from "../../constant";

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const { data } = useSelector(selectLogin);
  const isAuthenticated = !!data?.token;

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      {isAuthenticated && (
        <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      )}
      {isAuthenticated && (
        <DrawerApp open={open} handleDrawerClose={handleDrawerClose} />
      )}
      <AppMain open={open}>
        <AppRoutes />
      </AppMain>
    </Box>
  );
};

export default Layout;
