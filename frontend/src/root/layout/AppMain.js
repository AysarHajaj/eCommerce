import * as React from "react";
import { styled } from "@mui/material/styles";
import { DrawerHeader } from "./AppDrawer";
import constants from "../../constant";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${constants.DRAWER_WIDTH}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppMain = (props) => {
  return (
    <Main open={props.open}>
      <DrawerHeader />
      {props.children}
    </Main>
  );
};

export default AppMain;
