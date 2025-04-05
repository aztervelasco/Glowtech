import React, { createContext, useContext, useState, useEffect } from 'react';
import Auth from '../utils/Auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if the user is authenticated on app load
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      // Simulate fetching user data (replace with real API call in a real app)
      setUser({ username: localStorage.getItem('username') || 'Unknown User' });
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      const userData = await Auth.login(username, password);
      localStorage.setItem('token', userData.token);
      localStorage.setItem('username', userData.username);
      setUser({ username: userData.username });
      return userData;
    } catch (err) {
      throw err;
    }
  };

  const logout = async () => {
    await Auth.logout();
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setUser(null);
  };

  const register = async (username, email, password) => {
    try {
      const userData = await Auth.register(username, email, password);
      return userData;
    } catch (err) {
      throw err;
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}