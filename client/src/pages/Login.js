import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Login() {
  const [form, setForm] = useState({ email: 'admin@gmail.com', password: '12345678' });
  const { login, error, loading } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      if (user.role === 'admin') navigate('/dashboard/admin');
      else if (user.role === 'teacher') navigate('/dashboard/teacher');
      else navigate('/dashboard/student');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h2 style={{ marginTop: 0 }}>تسجيل الدخول</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>البريد الإلكتروني</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>كلمة المرور</label>
              <input name="password" type="password" value={form.password} onChange={handleChange} required />
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <div className="form-actions">
              <button className="btn primary" type="submit" disabled={loading}>{loading ? 'جاري الدخول...' : 'دخول'}</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
