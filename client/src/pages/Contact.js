import React from 'react';

function Contact() {
  return (
    <div className="page">
      <div className="container">
        <div className="form-card">
          <h2 style={{ marginTop: 0 }}>تواصل معنا</h2>
          <div className="form-group"><label>البريد الإلكتروني</label><input value="support@platform.com" readOnly /></div>
          <div className="form-group"><label>الهاتف</label><input value="+966500000000" readOnly /></div>
          <div className="form-group"><label>العنوان</label><textarea rows="3" readOnly>مدينة الرياض، المملكة العربية السعودية</textarea></div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
