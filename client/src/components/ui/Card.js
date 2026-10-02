import React from 'react';

export function Button({ children, variant = 'primary', type = 'button', ...props }) {
  return (
    <button type={type} className={`btn ${variant}`} {...props}>
      {children}
    </button>
  );
}

export function Input({ label, ...props }) {
  return (
    <div className="form-group">
      {label && <label>{label}</label>}
      <input {...props} />
    </div>
  );
}

export function Card({ title, children }) {
  return (
    <div className="card">
      {title && <h3>{title}</h3>}
      {children}
    </div>
  );
}
