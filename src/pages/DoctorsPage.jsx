import React, { useState, useEffect } from 'react';
import '../styles/global.css';

// The data engine for your doctors, now with accurate biographies
const DOCTORS = [
  {
    id: 'dr-abdelrahim',
    name: "Prof. Dr. Abdel-Rahim Abdallah",
    title: "Founder & The Guru of Dermatology",
    specialty: "Clinical Dermatology & Research",
    bio: "Born in 1938, Prof. Dr. Abdel-Rahim Abdallah was graduated in 1959 as second in his class from Faculty of Medicine, Ain Shams University.\n\nIn 1964 he established his clinic in Heliopolis, which quickly became the most professional Dermatology & Venereology clinic in Heliopolis and subsequently in Egypt. In 1966 he received his PhD (Doctorate degree) and became a lecturer at Ain Shams University, after which he became the Chairman of the department in 1990.\n\nProf. Abdel-Rahim Abdallah is regarded as the Guru of Dermatology in Egypt and the Middle East. He lectures in several top Medical Schools & Universities in Europe, USA and the Far East in addition to chairing several International Congresses.\n\nProf. Abdel-Rahim Abdallah is the holder of the prominent Gustav Riehl Prize of Germany, which he was rewarded in recognition of his advanced research in Medicine.\n\nHe is the author of the first Atlas of Dermatology in the Middle East & the Co-author of \"Dermatology\", Bolongia, Jorizzo, Rapini et al. Mosby, 2003, 2007 & 2012.",
    imageColor: "var(--brand-blue)"
  },
  {
    id: 'dr-marwa',
    name: "Prof. Dr. Marwa Abdallah",
    title: "Professor of Dermatology, Ain Shams University",
    specialty: "Board Member",
    bio: "Marwa Abdallah, studied medicine against the will of her parents, who were both doctors, because she loved biology and chemistry. In Ain Shams University, Faculty of Medicine, she graduated by excellence with honors, and was the first in her class over more than 800 graduates. She chose Dermatology (skin diseases) as it was a branch that suits women doctors, besides having a great mentor, Prof Abdel-Rahim Abdallah, who was there whenever she needed help.\n\nMarwa has been holding workshops training dermatologists in Egypt and other Arab countries in the last 10 years. On the academic level, Marwa Abdallah has more than 30 national and international publications. She supervised and discussed over 50 masters and PhD thesis in Ain Shams as well as other different universities and lectured several times in the European Academy of Dermatology congresses.\n\nMarwa loves helping people and making them happy. This was reflected on her relation with her patients, her students and her colleagues.",
    imageColor: "var(--brand-green-dk)"
  },
  {
    id: 'dr-mahmoud',
    name: "A. Prof. Dr. Mahmoud Abdallah",
    title: "Associate Professor of Dermatology, Ain Shams University",
    specialty: "Board Member",
    bio: "Dr Mahmoud Abdallah graduated from Ain Shams University in 1995. He was trained in Ain Shams University and spent at least 4 years attending the clinic with Prof Abdel-Rahim Abdallah, where he learned a lot from his wide experience in the field of dermatology. Afterwards Dr. Mahmoud travelled to the USA and worked there for some time. During that period Dr. Mahmoud won the best research award in biggest Dermatopathology conference in America.\n\nGetting back to Egypt, he had a nice mix of local and international experience. Dr Mahmoud lectured in many international conferences overseas and published many articles in world renown dermatology journals. He wrote a chapter in the most popular textbook in Dermatology in collaboration with Dr Marwa and Dr Abdel-Rahim Abdallah (the only Egyptian Doctors that gained this honor).\n\nHe is well experienced in laser and gave a lot of training courses in this field. On the personal level he is a caring, down to earth person with a good sense of humor.",
    email: "mahmoud.abdallah@cutis-clinic.com",
    imageColor: "#0f172a"
  },
  {
    id: 'dr-placeholder-1',
    name: "Dr. Laila Hassan",
    title: "Consultant Dermatologist",
    specialty: "Aesthetic Injectables",
    bio: "Dr. Laila specializes in non-invasive facial harmonisation, utilizing FDA-approved dermal fillers and neuromodulators. She combines a deep understanding of facial anatomy with a highly artistic eye to deliver natural, undetectable results.",
    imageColor: "#475569"
  },
  {
    id: 'dr-placeholder-2',
    name: "Dr. Omar Youssef",
    title: "Laser Specialist",
    specialty: "Laser Resurfacing & Scar Revision",
    bio: "Dr. Omar leads our fractional CO2 and Nd:YAG laser protocols. With over a decade of experience, he develops customized treatment plans for severe acne scarring, pigmentation, and overall skin rejuvenation.",
    imageColor: "#94a3b8"
  }
];

export default function DoctorsPage() {
  const [activeDoctor, setActiveDoctor] = useState(DOCTORS[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', paddingTop: '100px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our Experts</span>
          <h1 className="heading-lg" style={{ color: '#fff', marginBottom: '16px' }}>The Medical Team</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Meet the board-certified consultants and specialists dedicated to your skin health and aesthetic refinement.
          </p>
        </div>
      </section>

      {/* Main Split Interface */}
      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>
          
          {/* LEFT SIDEBAR: Doctor Selection List */}
          <aside style={{ flex: '1 1 300px', background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-dark)', paddingLeft: '12px' }}>Select a Doctor</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {DOCTORS.map((doc) => (
                <button 
                  key={doc.id}
                  onClick={() => setActiveDoctor(doc)}
                  style={{
                    textAlign: 'left',
                    padding: '16px',
                    borderRadius: '16px',
                    background: activeDoctor.id === doc.id ? 'var(--brand-blue-lt)' : 'transparent',
                    border: activeDoctor.id === doc.id ? '1px solid var(--brand-blue)' : '1px solid transparent',
                    color: activeDoctor.id === doc.id ? 'var(--brand-blue)' : 'var(--text-mid)',
                    transition: 'all 0.2s ease',
                    fontWeight: activeDoctor.id === doc.id ? '600' : '400',
                  }}
                  onMouseEnter={(e) => {
                    if (activeDoctor.id !== doc.id) e.target.style.background = '#f8fafc';
                  }}
                  onMouseLeave={(e) => {
                    if (activeDoctor.id !== doc.id) e.target.style.background = 'transparent';
                  }}
                >
                  <div style={{ fontSize: '1.05rem', marginBottom: '4px' }}>{doc.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{doc.specialty}</div>
                </button>
              ))}
            </div>
          </aside>

          {/* RIGHT AREA: Active Doctor Biography */}
          <main style={{ flex: '2 1 600px' }}>
            <div 
              key={activeDoctor.id} 
              style={{ 
                background: '#fff', 
                padding: '40px', 
                borderRadius: '24px', 
                border: '1px solid var(--border-lt)', 
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeIn 0.4s ease'
              }}
            >
              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '32px' }}>
                
                {/* Placeholder for Doctor's Photo */}
                <div style={{ 
                  width: '140px', 
                  height: '140px', 
                  borderRadius: '20px', 
                  background: activeDoctor.imageColor,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '2.5rem',
                  fontWeight: 'bold',
                  boxShadow: 'inset 0 -20px 40px rgba(0,0,0,0.2)'
                }}>
                  {activeDoctor.name.charAt(0)}
                </div>

                {/* Doctor's Header Info */}
                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ color: 'var(--brand-green-dk)', fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px' }}>
                    {activeDoctor.specialty}
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', lineHeight: '1.1', marginBottom: '8px' }}>
                    {activeDoctor.name}
                  </h2>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-mid)' }}>{activeDoctor.title}</div>
                  {activeDoctor.email && (
                    <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--brand-green-dk)', fontWeight: '600' }}>
                      {activeDoctor.email}
                    </div>
                  )}
                </div>

              </div>

              {/* Biography Text (Handles multiple paragraphs) */}
              <div style={{ borderTop: '1px solid var(--border-lt)', paddingTop: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Biography</h3>
                <div style={{ color: 'var(--text-mid)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {activeDoctor.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
                  ))}
                </div>
              </div>

            </div>
          </main>

        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
