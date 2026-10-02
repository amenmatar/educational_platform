import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function RegisterTeacher() {
  const [form, setForm] = useState({ name: '', email: '', password: '', specialization: '' });
  const { registerTeacher, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerTeacher(form);
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h2 style={{ marginTop: 0 }}>تسجيل معلم</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group"><label>الاسم</label><input name="name" value={form.name} onChange={handleChange} required /></div>
            <div className="form-group"><label>البريد الإلكتروني</label><input name="email" type="email" value={form.email} onChange={handleChange} required /></div>
            <div className="form-group"><label>التخصص</label><input name="specialization" value={form.specialization} onChange={handleChange} required /></div>
            <div className="form-group"><label>كلمة المرور</label><input name="password" type="password" value={form.password} onChange={handleChange} required /></div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-actions"><button className="btn primary" type="submit" disabled={loading}>{loading ? 'جاري التسجيل...' : 'تسجيل'}</button></div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegisterTeacher;
