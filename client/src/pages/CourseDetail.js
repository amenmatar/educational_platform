import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CourseDetail() {
  const { id } = useParams();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    axios.get(`/api/courses/${id}`).then((res) => setCourse(res.data)).catch(() => setCourse(null));
  }, [id]);

  if (!course) {
    return <div className="container page"><div className="form-card">جاري تحميل التفاصيل...</div></div>;
  }

  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <p><strong>التصنيف:</strong> {course.category}</p>
          <p><strong>المستوى:</strong> {course.level}</p>
          <p><strong>الأهداف:</strong> {course.objectives?.join(', ') || 'لا توجد أهداف'}</p>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;
