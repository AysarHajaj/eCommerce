import React, { createContext, useState, useMemo, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';

const AuthContext = createContext({});

const getUserData = () => {
  const token = localStorage.getItem('token');
  const user = localStorage.getItem('user');

  if (!!token && !!user) {
    return { accessToken: token, user: JSON.parse(user) };
  }
  return { accessToken: undefined, user: undefined };
};

export function AuthProvider({ children }) {
  const [auth, setAuth] = useState(getUserData);
  const providerValue = useMemo(() => ({ auth, setAuth }), [auth, setAuth]);

  const focusEventListener = useCallback(() => {
    const storageUser = JSON.parse(localStorage.getItem('user'));
    if (auth?.user?.id !== storageUser?.id) {
      window.location.reload();
    }
  }, [auth?.user?.id]);

  useEffect(() => {
    window.addEventListener('focus', focusEventListener);

    return () => {
      window.removeEventListener('focus', focusEventListener);
    };
  }, [focusEventListener]);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.any,
};

export default AuthContext;
