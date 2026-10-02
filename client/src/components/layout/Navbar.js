import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function Navbar() {
  const { isAuthenticated, currentUser, logout, isAdmin, isTeacher, isStudent } = useAuth();
  const navigate = useNavigate();

  const dashboardPath = isAdmin ? '/dashboard/admin' : isTeacher ? '/dashboard/teacher' : isStudent ? '/dashboard/student' : '/dashboard';

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div className="avatar">و</div>
          <strong>منصة المعلم</strong>
        </div>

        <nav className="nav-links">
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">الرئيسية</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/courses">الدورات</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/about">من نحن</NavLink>
          <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/contact">تواصل معنا</NavLink>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {isAuthenticated ? (
            <>
              <Link to={dashboardPath} className="btn secondary">لوحة التحكم</Link>
              <button className="btn primary" onClick={handleLogout}>تسجيل الخروج</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn secondary">تسجيل الدخول</Link>
              <Link to="/register/student" className="btn primary">التسجيل</Link>
            </>
          )}
          {currentUser && <div className="avatar" title={currentUser.name}>{currentUser.name?.charAt(0)}</div>}
        </div>
      </div>
    </header>
  );
}

export default Navbar;
