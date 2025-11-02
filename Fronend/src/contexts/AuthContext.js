import React, { createContext, useState, useContext, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check if user is logged in on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');

    if (token && userData) {
      setUser(JSON.parse(userData));
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await authAPI.signin({ email, password });
      
      if (response.payload && response.payload.token) {
        const userData = {
          email: response.payload.email,
          firstName: response.payload.firstName,
          lastName: response.payload.lastName,
          role: response.payload.role,
        };

        localStorage.setItem('token', response.payload.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, data: response.payload };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Login error:', error);
      return { success: false, error: error.message };
    }
  };

  const signup = async (signupData) => {
    try {
      const response = await authAPI.signup(signupData);
      
      if (response.payload && response.payload.token) {
        const userData = {
          email: response.payload.email,
          firstName: response.payload.firstName,
          lastName: response.payload.lastName,
          role: response.payload.role,
        };

        localStorage.setItem('token', response.payload.token);
        localStorage.setItem('user', JSON.stringify(userData));
        
        setUser(userData);
        setIsAuthenticated(true);
        return { success: true, data: response.payload };
      }
      
      throw new Error('Invalid response from server');
    } catch (error) {
      console.error('Signup error:', error);
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    signup,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

