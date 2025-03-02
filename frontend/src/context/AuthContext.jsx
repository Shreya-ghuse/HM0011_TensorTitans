// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hostname = window.APP_CONFIG?.API_BASE_URL || "http://127.0.0.1:5000";
  console.log("API Base URL:", hostname);

  useEffect(() => {
    // Check if user is already logged in on app load
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      fetchUserProfile();
    } else {
      setLoading(false);
    }
  }, []);

  const fetchUserProfile = async () => {
    try {
      const res = await axios.get(`${hostname}/api/user/profile`);
      setCurrentUser(res.data.user);
    } catch (error) {
      // Token might be expired or invalid
      logout();
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${hostname}/api/login`, { email, password });
      
      localStorage.setItem('token', res.data.access_token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${res.data.access_token}`;
      
      setCurrentUser(res.data.user);
      setError(null);
      return res.data.user;
    } catch (error) {
      setError(error.response?.data?.message || 'Login failed');
      throw new Error(error.response?.data?.message || 'Login failed');
    }
  };

  const register = async (userData) => {
    try {
      const res = await axios.post(`${hostname}/api/register`, userData);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Registration failed');
      throw new Error(error.response?.data?.message || 'Registration failed');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
  };

  const updateProfile = async (userData) => {
    try {
      const res = await axios.put(`${hostname}/api/user/profile`, userData);
      setCurrentUser(res.data);
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Profile update failed');
      throw new Error(error.response?.data?.message || 'Profile update failed');
    }
  };
  
  const resetPassword = async (email) => {
    try {
      const res = await axios.post(`${hostname}/api/reset-password`, { email });
      return res.data;
    } catch (error) {
      setError(error.response?.data?.message || 'Password reset failed');
      throw new Error(error.response?.data?.message || 'Password reset failed');
    }
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    register,
    logout,
    updateProfile,
    resetPassword
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;