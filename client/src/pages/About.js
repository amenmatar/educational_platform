import React from 'react';

function About() {
  return (
    <div className="page">
      <div className="container">
        <div className="page-header">
          <h1>من نحن</h1>
          <p>نحن نعمل على بناء تجربة تعليمية عربية متكاملة تجمع بين التعليم والابتكار.</p>
        </div>
        <div className="grid-3">
          <div className="card"><h3>الرسالة</h3><p>تمكين المعلمين من تقديم أفضل المحتوى التعليمي للطلاب.</p></div>
          <div className="card"><h3>الرؤية</h3><p>تجعل التعلم أكثر سهولة، تفاعلية، وبأسلوب عربي عصري.</p></div>
          <div className="card"><h3>القيم</h3><p>الوضوح، الشمولية، والتطوير المستمر داخل المنصة.</p></div>
        </div>
      </div>
    </div>
  );
}

export default About;
