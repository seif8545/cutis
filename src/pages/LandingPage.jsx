// src/pages/LandingPage.jsx
import React from 'react';
import '../styles/global.css';

// --- DATA MODULES ---
const CLINIC_VALUES = [
  { title: "Academic Rigor", desc: "Every treatment protocol is peer-reviewed and rooted in the latest clinical dermatology literature.", icon: "📚" },
  { title: "Patient Safety", desc: "Uncompromising sterilization standards and FDA-approved laser technology.", icon: "🛡️" },
  { title: "Compassionate Care", desc: "We prioritize patient comfort, understanding, and ethical medical advice above all else.", icon: "💙" }
];

const SERVICES = [
  {
    category: "Cosmetic Dermatology",
    icon: "✨",
    treatments: [
      { name: "Neuromodulators (Botox)", desc: "Precision wrinkle relaxation and facial contouring." },
      { name: "Dermal Fillers", desc: "Hyaluronic acid treatments for volume restoration and lip augmentation." },
      { name: "Bio-Remodeling (Profhilo)", desc: "Injectable skin boosters for deep hydration and tissue tightening." },
      { name: "PRP & Mesotherapy", desc: "Cellular rejuvenation for face, neck, and hair restoration." }
    ]
  },
  {
    category: "Advanced Laser Center",
    icon: "⚡",
    treatments: [
      { name: "CO₂ Fractional Resurfacing", desc: "Gold-standard treatment for acne scars and skin texture refinement." },
      { name: "Laser Hair Removal", desc: "Painless, effective removal using Candela GentleMax Pro (Nd:YAG & Alexandrite)." },
      { name: "Q-Switched Laser", desc: "Targeted removal of pigmentation, melasma, and tattoos." },
      { name: "Vascular Laser", desc: "Treatment for rosacea, spider veins, and capillary damage." }
    ]
  },
  {
    category: "Clinical Dermatology",
    icon: "🩺",
    treatments: [
      { name: "Acne Management", desc: "Comprehensive medical and laser protocols for active acne and scarring." },
      { name: "Vitiligo & Phototherapy", desc: "Specialized excimer laser and NB-UVB treatments." },
      { name: "Alopecia Clinics", desc: "Diagnostic biopsies and medical treatment plans for hair loss." },
      { name: "Psoriasis & Eczema", desc: "Long-term biological and topical management for chronic skin conditions." }
    ]
  }
];

const BRANCHES = [
  { name: "Heliopolis", address: "14 Ibrahim Al-Laqqani St., Korba", phone: "0100 90 70 000" },
  { name: "Mohandeseen", address: "Moustafa Mahmoud Sq., Watany Bank Bldg.", phone: "0100 90 70 000" },
  { name: "Sheikh Zayed", address: "Beverly Hills, Building 9, Clinic Complex", phone: "0100 90 70 000" },
  { name: "New Cairo (Tagamoa)", address: "5th Settlement, South Teseen Rd.", phone: "0100 90 70 000" }
];

// --- COMPONENTS ---
export default function LandingPage() {
  return (
    <div className="landing-page">
      
      {/* HERO SECTION */}
      <section className="section" style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', padding: '120px 0' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '800px' }}>
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Established 1964</span>
          <h1 className="heading-lg" style={{ color: '#fff', marginBottom: '24px' }}>
            Advanced Dermatology <br />
            <span style={{ color: 'var(--brand-green)' }}>& Laser Excellence</span>
          </h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '40px', opacity: 0.9 }}>
            Pioneering skin health and aesthetic medicine in Egypt. Experience world-class, evidence-based care across our four specialized branches.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
            <button className="btn btn-primary" style={{ backgroundColor: 'var(--brand-green)', color: '#1e293b' }}>Book Consultation</button>
            <button className="btn btn-outline" style={{ borderColor: '#fff', color: '#fff' }}>View Treatments</button>
          </div>
        </div>
      </section>

      {/* ABOUT, MISSION & VISION */}
      <section className="section bg-white" id="about">
        <div className="container grid-2" style={{ alignItems: 'center' }}>
          <div>
            <span className="eyebrow">Our Legacy</span>
            <h2 className="heading-md">Rooted in Academic Excellence</h2>
            <p className="text-mid" style={{ marginBottom: '20px' }}>
              Founded in 1964 by <strong>Prof. Dr. Abdel-Rahim Abdallah</strong>, former Head of the Dermatology Department at Ain Shams University, Cutis has evolved into Egypt's foremost authority in skin health.
            </p>
            <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--brand-blue)', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Mission</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)' }}>To deliver world-class, evidence-based dermatological and aesthetic care, combining academic excellence with advanced technology to enhance patient well-being and confidence.</p>
            </div>
            <div style={{ background: 'var(--bg-main)', padding: '24px', borderRadius: '12px', borderLeft: '4px solid var(--brand-green)' }}>
              <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Our Vision</h3>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)' }}>To remain the gold standard for clinical and aesthetic patient outcomes in the Middle East, pioneering innovative treatments through continuous research.</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {CLINIC_VALUES.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '16px', padding: '20px', background: 'var(--bg-main)', borderRadius: '12px', border: '1px solid var(--border-lt)' }}>
                <div style={{ fontSize: '2rem' }}>{val.icon}</div>
                <div>
                  <h4 style={{ color: 'var(--brand-blue)', marginBottom: '4px' }}>{val.title}</h4>
                  <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)' }}>{val.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DETAILED SERVICES */}
      <section className="section" id="services">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Clinical Departments</span>
            <h2 className="heading-md">Comprehensive Dermatological Care</h2>
          </div>
          
          <div className="grid-3">
            {SERVICES.map((dept, idx) => (
              <div key={idx} style={{ background: '#fff', borderRadius: '16px', padding: '32px', boxShadow: 'var(--shadow-sm)', border: '1px solid var(--border-lt)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '12px', background: 'rgba(0, 156, 219, 0.1)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', marginBottom: '24px' }}>
                  {dept.icon}
                </div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>{dept.category}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  {dept.treatments.map((treatment, tIdx) => (
                    <div key={tIdx} style={{ paddingBottom: '16px', borderBottom: '1px solid var(--border-lt)' }}>
                      <h4 style={{ fontSize: '1rem', color: 'var(--text-dark)', marginBottom: '4px' }}>{treatment.name}</h4>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{treatment.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRANCHES */}
      <section className="section bg-white" id="locations">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <h2 className="heading-md">Our Locations</h2>
            <p className="text-mid">Four premium facilities serving Greater Cairo.</p>
          </div>
          <div className="grid-4">
            {BRANCHES.map((branch, idx) => (
              <div key={idx} style={{ padding: '24px', background: 'var(--bg-main)', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--border-lt)' }}>
                <h4 style={{ color: 'var(--brand-blue)', fontSize: '1.1rem', marginBottom: '8px' }}>📍 {branch.name}</h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', marginBottom: '12px' }}>{branch.address}</p>
                <p style={{ fontWeight: '600', color: 'var(--brand-green)' }}>📞 {branch.phone}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
