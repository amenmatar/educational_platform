import React from 'react';

function StudentDashboard() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>لوحة الطالب</h1>
        </div>
        <div className="stats-grid">
          <div className="stat"><span>الدورات المسجلة</span><strong>6</strong></div>
          <div className="stat"><span>التقدم</span><strong>78%</strong></div>
          <div className="stat"><span>الإنجازات</span><strong>14</strong></div>
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
