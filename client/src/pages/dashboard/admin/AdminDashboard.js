import React from 'react';

function AdminDashboard() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>لوحة مدير النظام</h1>
        </div>
        <div className="stats-grid">
          <div className="stat"><span>المستخدمون</span><strong>120</strong></div>
          <div className="stat"><span>الدورات</span><strong>42</strong></div>
          <div className="stat"><span>الطلاب الجدد</span><strong>18</strong></div>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
