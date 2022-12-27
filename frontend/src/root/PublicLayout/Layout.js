import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import StickyFooter from './StickyFooter';
import Footer from './Footer';

function Layout() {
  return (
    <React.Fragment>
      <AppHeader />
      <CssBaseline />
      <AppMain>
        <Outlet />
        <Footer />
      </AppMain>
      <StickyFooter />
    </React.Fragment>
  );
}

export default Layout;
