import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState(() => {
    const storedToken = localStorage.getItem('token');
    const storedIsAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    const storedUserData = JSON.parse(localStorage.getItem('userData')) || null;
    const storedTipoUsuario = localStorage.getItem('tipoUsuario');
    const storedExpirationDate = localStorage.getItem('expirationDate');

    return {
      isAuthenticated: storedIsAuthenticated,
      userData: storedUserData,
      tipoUsuario: storedTipoUsuario,
      token: storedToken,
      expirationDate: storedExpirationDate,
    };
  });

  const authLogin = (userData, tipoUsuario, token, expiresIn) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);

    setAuthState({
      isAuthenticated: true,
      userData,
      tipoUsuario,
      token,
      expirationDate,
    });

    localStorage.setItem('isAuthenticated', 'true');
    localStorage.setItem('userData', JSON.stringify(userData));
    localStorage.setItem('tipoUsuario', tipoUsuario);
    localStorage.setItem('token', token);
    localStorage.setItem('expirationDate', expirationDate.toISOString());
  };

  const authLogout = () => {
    setAuthState({
      isAuthenticated: false,
      userData: null,
      tipoUsuario: null,
      token: null,
      expirationDate: null,
    });

    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userData');
    localStorage.removeItem('tipoUsuario');
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
  };

  useEffect(() => {
    const checkTokenExpiration = () => {
      if (authState.isAuthenticated && isTokenExpired()) {
        alert("Su sesión ha expirado");
        authLogout();
      }
    };
    const intervalId = setInterval(checkTokenExpiration, 5 * 60 * 1000);

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [authState]);

  return (
    <AuthContext.Provider value={{ ...authState, authLogin, authLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

const isTokenExpired = () => {
  const expirationDate = new Date(localStorage.getItem('expirationDate'));
  return expirationDate <= new Date();
};

export { isTokenExpired };
