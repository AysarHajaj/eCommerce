import React, { useMemo } from "react";
import { styled } from "@mui/material/styles";
import { useLocation, useNavigate } from "react-router-dom";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import PersonIcon from '@mui/icons-material/Person';
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuItem from "@mui/material/MenuItem";
import constant from "../../constant";
import useAuth from "../../hooks/useAuth";
import Divider from "@mui/material/Divider";

const drawerWidth = 240;

const AppBarStyle = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const settings = {
  PROFILE: {
    label: "Profile",
    icon: <PersonIcon />,
    to: "/settings/profile",
  },
  LOGOUT: {
    label: "Logout",
    icon: <LogoutRoundedIcon />,
    to: "/logout",
  },
};

const AppBar = ({ open, handleDrawerOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const {
    auth: { user },
  } = useAuth();
  const pageName = useMemo(() => {
    return (
      Object.values(constant.ROUTES).find((route) => {
        return route.path === location.pathname;
      })?.label || "Not Found"
    );
  }, [location.pathname]);

  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBarStyle position="fixed" open={open}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mr: 2, ...(open && { display: "none" }) }}
        >
          <MenuIcon htmlColor="white" />
        </IconButton>
        <Typography
          color="white"
          variant="h6"
          noWrap
          component="div"
          sx={{ flexGrow: 1 }}
        >
          {pageName}
        </Typography>

        <Box display="flex" sx={{ flexGrow: 0 }}>
          <Tooltip title="Open settings">
            <IconButton
              disableRipple
              onClick={handleOpenUserMenu}
              sx={{ p: 0 }}
            >
              <Avatar alt={user?.name} src={user?.image} />
              <Typography
                color="white"
                variant="h6"
                noWrap
                component="div"
                sx={{ ml: "10px" }}
                textTransform="capitalize"
              >
                {user?.name}
              </Typography>
              {Boolean(anchorElUser) ? (
                <ArrowDropUpIcon htmlColor="white" />
              ) : (
                <ArrowDropDownIcon htmlColor="white" />
              )}
            </IconButton>
          </Tooltip>
          <Menu
            sx={{ mt: "45px" }}
            MenuListProps={{
              style: {
                width: "150px",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            <MenuItem onClick={() => {}}>
              {settings.PROFILE.icon}
              <Typography fontSize="14px" ml="10px" textAlign="center">
                {settings.PROFILE.label}
              </Typography>
            </MenuItem>
            <Divider />
            <MenuItem
              style={{ color: "red" }}
              onClick={() => {
                localStorage.clear();
                setAuth({});
                navigate("/login");
              }}
            >
              {settings.LOGOUT.icon}
              <Typography fontSize="14px" ml="10px" textAlign="center">
                {settings.LOGOUT.label}
              </Typography>
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBarStyle>
  );
};

export default AppBar;
