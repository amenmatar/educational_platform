import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterStudent() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const { registerStudent, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerStudent(form);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h2 style={{ marginTop: 0 }}>تسجيل طالب</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>الاسم</label><input name="name" value={form.name} onChange={handleChange} required /></div>
            <div className="form-group"><label>البريد الإلكتروني</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
            <div className="form-group"><label>كلمة المرور</label><input name="password" type="password" value={form.password} onChange={handleChange} required /></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-actions"><button className="btn primary" type="submit" disabled={loading}>{loading ? 'جاري التسجيل...' : 'تسجيل'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterStudent;
