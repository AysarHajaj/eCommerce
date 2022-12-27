import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const Main = styled('main')(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
}));

function AppMain(props) {
  return <Main>{props.children}</Main>;
}

AppMain.propTypes = {
  children: PropTypes.any,
};

export default AppMain;
