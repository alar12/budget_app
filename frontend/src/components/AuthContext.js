import React, { createContext, useState, useEffect } from 'react';

// Create a context for authentication
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tokensMap, setTokensMap] = useState(new Map()); // Map to store tokens

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Assuming token structure has an expiration time or similar metadata
      const tokenData = JSON.parse(token);
      if (tokenData && tokenData.expiration > Date.now()) {
        setIsLoggedIn(true);
        tokensMap.set(tokenData.token, tokenData); // Store token in the Map
      } else {
        localStorage.removeItem('token');
      }
    }
  }, [tokensMap]);

  const login = (token, metadata) => {
    const expiration = Date.now() + 3600000; // Example expiration time (1 hour from now)
    const tokenData = { token, expiration, ...metadata };
    localStorage.setItem('token', JSON.stringify(tokenData));
    tokensMap.set(token, tokenData); // Store token in the Map
    setIsLoggedIn(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    tokensMap.clear(); // Clear the Map
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
