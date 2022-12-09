import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "./AppBar";
import DrawerApp from "./AppDrawer";
import AppMain from "./AppMain";

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

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
      <AppBar open={open} handleDrawerOpen={handleDrawerOpen} />
      <DrawerApp open={open} handleDrawerClose={handleDrawerClose} />
      <AppMain open={open} />
    </Box>
  );
};

export default Layout;
