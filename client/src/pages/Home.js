import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      <section className="hero">
        <div className="container hero-inner">
          <div>
            <div className="badge">المنصة التعليمية العربية</div>
            <h1>رحلة تعليمية ذكية لكل طالب ومعلم</h1>
            <p>منصة عربية متكاملة لإدارة الدورات، متابعة المتعلمين، وحفظ الوقت وتسهيل التعلم عبر واجهة مريحة وسهلة.</p>
            <div className="hero-actions">
              <Link to="/courses" className="btn primary">استعرض الدورات</Link>
              <Link to="/register/student" className="btn secondary">أنشئ حسابك</Link>
            </div>
          </div>

          <div className="hero-card">
            <h3>لماذا منصة المعلم؟</h3>
            <ul style={{ color: '#374151', lineHeight: '2' }}>
              <li>إدارة دورات ومعلمين وطلاب</li>
              <li>لوحات تحكم حسب الدور</li>
              <li>مصادقة آمنة باستخدام JWT</li>
              <li>واجهة تدعم العربية بالكامل</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="page">
        <div className="container">
          <div className="page-header">
            <h1>مميزات المنصة</h1>
          </div>
          <div className="grid-3">
            <div className="card">
              <h3>إدارة الدورات</h3>
              <p>إنشاء وإدارة المحتوى التعليمي بسهولة من حساب المعلم.</p>
            </div>
            <div className="card">
              <h3>تسجيل الطلاب</h3>
              <p>إمكانية تسجيل الطلاب في الدورات ومتابعة تقدمهم.</p>
            </div>
            <div className="card">
              <h3>لوحة التحكم</h3>
              <p>مواجهة مخصصة لكل دور: مدیر، معلم، طالب.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
