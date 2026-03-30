import React, { useEffect } from 'react';
import '../styles/global.css';

export default function HistoryPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const historyData = [
    { 
      year: "1938 & 1959", 
      text: "Born in 1938, Prof. Dr. Abdel-Rahim Abdallah graduated in 1959 as second in his class from the Faculty of Medicine, Ain Shams University." 
    },
    { 
      year: "1964", 
      text: "He established his clinic in Heliopolis, which quickly became the most professional Dermatology & Venereology clinic in Heliopolis and subsequently in Egypt." 
    },
    { 
      year: "1966 & 1990", 
      text: "He received his PhD and became a lecturer at Ain Shams University, later becoming the Chairman of the department in 1990." 
    },
    { 
      year: "The Guru of Dermatology", 
      text: "Regarded as the Guru of Dermatology in Egypt and the Middle East, he lectured in top Medical Schools in Europe, USA, and the Far East, and held the prominent Gustav Riehl Prize of Germany. He authored the first Atlas of Dermatology in the Middle East." 
    },
    { 
      year: "1999", 
      text: "With the help of Prof. Dr. Marwa Abdallah, Cutis 'The Skin Clinic' was founded as a nucleus for establishing the first Medical Institution for Skin Diseases & Cosmetic Services." 
    },
    { 
      year: "2006", 
      text: "A. Prof. Dr. Mahmoud Abdallah took Cutis to a whole new level of expansion in size, technology, and equipment. Laser treatments were introduced to Egypt on a wide scale." 
    },
    { 
      year: "2008 & 2011", 
      text: "Cutis became the most comprehensive Dermatology Clinic in Egypt. By 2011, Cutis added new consultants and doctors and opened its prominent branch in Mohandeseen." 
    },
    { 
      year: "2019", 
      text: "Driven by a commitment to make premium dermatological care more accessible across Greater Cairo, Cutis expanded eastward and officially opened its state-of-the-art branch in the Fifth Settlement, New Cairo." 
    },
    { 
      year: "2020", 
      text: "Continuing its strategic expansion, Cutis brought its world-class laser platforms and renowned clinical expertise to the west of Cairo with the launch of the Sheikh Zayed branch in Beverly Hills." 
    }
  ];

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our Roots</span>
          <h1 className="heading-lg" style={{ color: '#fff', marginBottom: '20px' }}>The History of Cutis</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            A legacy of academic rigor, pioneering research, and clinical excellence spanning over half a century.
          </p>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            {historyData.map((item, index) => (
              <div 
                key={index} 
                className="reveal"
                style={{ 
                  background: '#fff', 
                  padding: '40px', 
                  borderRadius: '24px', 
                  border: '1px solid var(--border-lt)', 
                  boxShadow: 'var(--shadow-sm)' 
                }}
              >
                <h3 style={{ 
                  color: 'var(--brand-blue)', 
                  fontSize: '1.8rem', 
                  marginBottom: '16px', 
                  fontFamily: 'var(--font-serif)' 
                }}>
                  {item.year}
                </h3>
                <p style={{ 
                  color: 'var(--text-mid)', 
                  fontSize: '1.05rem', 
                  lineHeight: '1.8' 
                }}>
                  {item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
