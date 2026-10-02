import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['x-auth-token'] = token;
    } else {
      delete axios.defaults.headers.common['x-auth-token'];
    }
  }, [token]);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setToken(res.data.token);
      setCurrentUser(res.data.user);
      return res.data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء تسجيل الدخول');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerStudent = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/register/student', formData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const registerTeacher = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axios.post('/api/auth/register/teacher', formData);
      return res.data;
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ أثناء التسجيل');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setCurrentUser(null);
  };

  const value = {
    currentUser,
    token,
    loading,
    error,
    login,
    registerStudent,
    registerTeacher,
    logout,
    isAuthenticated: !!token,
    isAdmin: currentUser?.role === 'admin',
    isTeacher: currentUser?.role === 'teacher',
    isStudent: currentUser?.role === 'student'
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
