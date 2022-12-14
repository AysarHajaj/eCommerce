import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import DrawerApp from "./AppDrawer";
import AppMain from "./AppMain";
import { Outlet } from 'react-router-dom';

const Layout = () => {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box sx={{ display: "flex" }}>
        <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
        <DrawerApp open={open} handleDrawerClose={handleDrawerClose} />
      <CssBaseline />
      <AppMain open={open}>
        <Outlet />
      </AppMain>
    </Box>
  );
};

export default Layout;
