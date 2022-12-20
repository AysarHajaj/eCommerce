import React, { createContext, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

const getUserData = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (token && user) {
    return { accessToken: token, user: JSON.parse(user) };
  }
  return { accessToken: undefined, user: undefined };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getUserData);

  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthContext;
