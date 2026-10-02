import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Contact from './pages/Contact';
import Login from './pages/Login';
import RegisterStudent from './pages/RegisterStudent';
import RegisterTeacher from './pages/RegisterTeacher';
import AdminDashboard from './pages/dashboard/admin/AdminDashboard';
import TeacherDashboard from './pages/dashboard/teacher/TeacherDashboard';
import StudentDashboard from './pages/dashboard/student/StudentDashboard';
import PrivateRoute from './routes/PrivateRoute';
import AdminRoute from './routes/AdminRoute';
import TeacherRoute from './routes/TeacherRoute';
import StudentRoute from './routes/StudentRoute';
import NotFound from './pages/NotFound';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="app-shell">
          <Navbar />
          <main className="main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/courses" element={<Courses />} />
              <Route path="/courses/:id" element={<CourseDetail />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register/student" element={<RegisterStudent />} />
              <Route path="/register/teacher" element={<RegisterTeacher />} />

              <Route path="/dashboard" element={<PrivateRoute />}>
                <Route path="admin/*" element={<AdminRoute />}>
                  <Route path="" element={<AdminDashboard />} />
                </Route>
                <Route path="teacher/*" element={<TeacherRoute />}>
                  <Route path="" element={<TeacherDashboard />} />
                </Route>
                <Route path="student/*" element={<StudentRoute />}>
                  <Route path="" element={<StudentDashboard />} />
                </Route>
              </Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
