import React from 'react';

function TeacherDashboard() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>لوحة المعلم</h1>
        </div>
        <div className="stats-grid">
          <div className="stat"><span>دوراتي</span><strong>12</strong></div>
          <div className="stat"><span>الطلاب</span><strong>340</strong></div>
          <div className="stat"><span>التقييم</span><strong>4.8</strong></div>
        </div>
      </div>
    </div>
  );
}

export default TeacherDashboard;
