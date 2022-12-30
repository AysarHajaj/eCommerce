import * as React from 'react';
import { Outlet } from 'react-router-dom';
import AppHeader from './AppHeader';
import AppMain from './AppMain';
import StickyFooter from './StickyFooter';
import Footer from './Footer';

function Layout() {
  return (
    <React.Fragment>
      <AppMain>
        <AppHeader />
        <Outlet />
        <Footer />
      </AppMain>
      <StickyFooter />
    </React.Fragment>
  );
}

export default Layout;
