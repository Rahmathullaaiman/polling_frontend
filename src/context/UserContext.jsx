import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('existuser');
    const storedToken = sessionStorage.getItem('token');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (storedToken && !parsedUser.token) {
        parsedUser.token = storedToken;
      }
      setUser(parsedUser);
    }
  }, []);

  const updateUser = (userData) => {
    setUser(userData);
    if (userData) {
      sessionStorage.setItem('existuser', JSON.stringify(userData));
      if (userData.token) {
        sessionStorage.setItem('token', userData.token);
      }
    } else {
      sessionStorage.removeItem('existuser');
      sessionStorage.removeItem('token');
    }
  };

  return (
    <UserContext.Provider value={{ user, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
