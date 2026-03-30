// src/pages/DoctorsPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/global.css';

// The data engine for your doctors
const DOCTORS = [
  {
    id: 'dr-abdelrahim',
    name: "Prof. Dr. Abdel-Rahim Abdallah",
    title: "Founder & The Guru of Dermatology",
    specialty: "Clinical Dermatology & Research",
    bio: "Graduating second in his class from Ain Shams University in 1959, Prof. Dr. Abdel-Rahim Abdallah is regarded as the absolute Guru of Dermatology in Egypt and the Middle East. He is the author of the first Atlas of Dermatology in the region, the holder of the Gustav Riehl Prize of Germany, and has chaired numerous international congresses across Europe, the USA, and the Far East.",
    imageColor: "var(--brand-blue)"
  },
  {
    id: 'dr-marwa',
    name: "Prof. Dr. Marwa Abdallah",
    title: "Co-Founder & Senior Consultant",
    specialty: "Cosmetic & Clinical Dermatology",
    bio: "Instrumental in the 1999 founding of Cutis as a comprehensive Medical Institution, Prof. Dr. Marwa Abdallah brings decades of elite academic and clinical experience. She specializes in advanced aesthetic refinement, ensuring that Cutis remains at the cutting edge of global dermatological standards.",
    imageColor: "var(--brand-green-dk)"
  },
  {
    id: 'dr-mahmoud',
    name: "A. Prof. Dr. Mahmoud Abdallah",
    title: "Senior Consultant & Expansion Lead",
    specialty: "Advanced Laser Systems",
    bio: "Taking Cutis to new heights in 2006, A. Prof. Dr. Mahmoud Abdallah spearheaded the introduction of wide-scale laser treatments in Egypt. His visionary approach to technology and equipment expansion transformed Cutis into the most comprehensive dermatology clinic in the country.",
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
  // Set the first doctor as the default selection when the page loads
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
            {/* The "key" prop forces React to re-animate this div every time the activeDoctor changes */}
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
                </div>

              </div>

              {/* Biography Text */}
              <div style={{ borderTop: '1px solid var(--border-lt)', paddingTop: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Biography</h3>
                <p style={{ color: 'var(--text-mid)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {activeDoctor.bio}
                </p>
              </div>

            </div>
          </main>

        </div>
      </section>

      {/* Add the simple fade-in animation specifically for the bio switching */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
