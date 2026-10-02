import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const StudentRoute = () => {
  const { isStudent, currentUser, loading } = useAuth();
  if (loading) return <div className="container page">جاري التحميل...</div>;
  if (isStudent && !currentUser?.isActive) {
    return <div className="container page"><div className="form-card">حسابك قيد التفعيل.</div></div>;
  }
  return isStudent ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default StudentRoute;
