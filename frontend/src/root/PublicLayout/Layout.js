import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppMain from './AppMain';

function Layout() {
  return (
    <React.Fragment>
      <AppHeader />
      <CssBaseline />
      <AppMain>
        <Outlet />
      </AppMain>
    </React.Fragment>
  );
}

export default Layout;
