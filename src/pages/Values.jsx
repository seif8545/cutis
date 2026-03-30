// src/pages/ValuesPage.jsx
import React, { useEffect } from 'react';
import '../styles/global.css';

export default function ValuesPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const values = [
    { title: "Integrity", icon: "🛡️", desc: "We believe that honesty, transparency, and strong moral principles are the core of a long term relationship with our clients. We ensure that our actions conform to our words and promises." },
    { title: "Professionalism", icon: "⭐", desc: "We do honor our practice and aspire to perform up to the highest standards; it is either we master it or we don’t do it." },
    { title: "Responsibility", icon: "🤝", desc: "We hold ourselves responsible towards our clients. We are responsible for their wellbeing and committed to exceeding their expectations of us." },
    { title: "Knowledge & Science", icon: "🔬", desc: "Our appreciation of knowledge urges us to constantly devote ourselves to enriching it by performing continuous research and attending conferences to both acquire knowledge and share it." },
    { title: "Collaboration & Teamwork", icon: "👥", desc: "We believe we cannot create or expand our services based solely on our own efforts. We seek to hire and collaborate with the most qualified doctors to offer consistent quality across the region." }
  ];

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
      <section style={{ backgroundColor: 'var(--text-dark)', color: '#fff', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our Philosophy</span>
          <h1 className="heading-lg" style={{ color: '#fff' }}>Core Values & Ethics</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.8 }}>
            At Cutis, we are committed to values and work ethics that guide us into managing and maintaining a socially responsible practice.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="bento-grid">
            {values.map((val, idx) => (
              <div key={idx} className="bento-item" style={{ gridColumn: idx < 2 ? 'span 6' : (idx === 4 ? 'span 12' : 'span 6') }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '20px' }}>{val.icon}</div>
                <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-blue)', marginBottom: '16px' }}>{val.title}</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '1.05rem', lineHeight: '1.7' }}>{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
