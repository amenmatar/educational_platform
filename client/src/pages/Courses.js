import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Courses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get('/api/courses').then((res) => setCourses(res.data)).catch(() => setCourses([]));
  }, []);

  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>الدورات</h1>
          <p>اكتشف مجموعة من الدورات التعليمية المتنوعة.</p>
        </div>

        <div className="grid-3">
          {courses.length === 0 ? (
            <div className="card">لا توجد دورات حالياً.</div>
          ) : (
            courses.map((course) => (
              <div key={course.id} className="card">
                <h3>{course.title}</h3>
                <p>{course.description}</p>
                <p style={{ marginTop: 12, color: '#1d4ed8', fontWeight: 700 }}>{course.category}</p>
                <Link to={`/courses/${course.id}`} className="btn primary" style={{ marginTop: 16 }}>
                  تفاصيل الدورة
                </Link>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Courses;
