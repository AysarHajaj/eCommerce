import React from 'react';
import publicPaths from './publicPaths';

const config = {
  LOGIN: {
    path: publicPaths.LOGIN.path,
    Element: React.lazy(() => import('../features/Login')),
  },
  HOME: {
    path: publicPaths.HOME.path,
    Element: React.lazy(() => import('../features/Home')),
  },
};

export default config;
