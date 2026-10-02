import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const TeacherRoute = () => {
  const { isTeacher, currentUser, loading } = useAuth();
  if (loading) return <div className="container page">جاري التحميل...</div>;
  if (isTeacher && !currentUser?.isActive) {
    return <div className="container page"><div className="form-card">حسابك قيد التفعيل.</div></div>;
  }
  return isTeacher ? <Outlet /> : <Navigate to="/dashboard" replace />;
};

export default TeacherRoute;
