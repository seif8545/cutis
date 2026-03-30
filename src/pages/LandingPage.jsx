// src/pages/LandingPage.jsx
import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

// --- DATA MODULES ---
const SERVICES = [
  {
    colSpan: "span 4",
    category: "Cosmetic",
    icon: "✨",
    title: "Aesthetic Refinement",
    desc: "Neuromodulators, Dermal Fillers, and Bio-Remodeling injected with precision by consultant dermatologists."
  },
  {
    colSpan: "span 4",
    category: "Laser",
    icon: "⚡",
    title: "Advanced Laser Center",
    desc: "FDA-approved CO₂ Fractional, Nd:YAG, and Alexandrite platforms for resurfacing and hair removal."
  },
  {
    colSpan: "span 4",
    category: "Clinical",
    icon: "🩺",
    title: "Medical Dermatology",
    desc: "Evidence-based protocols for Acne, Vitiligo, Eczema, and Alopecia management."
  }
];

export default function LandingPage() {
  
  const observerRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = 1;
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.reveal').forEach(el => {
      el.style.opacity = 0;
      el.style.transform = 'translateY(40px)';
      el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
      observer.observe(el);
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">
      
      {/* 1. HERO SECTION */}
      <section style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', paddingTop: '140px', paddingBottom: '160px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '10%', left: '-5%', fontSize: '15vw', fontFamily: 'var(--font-serif)', color: 'rgba(255,255,255,0.04)', whiteSpace: 'nowrap', pointerEvents: 'none', userSelect: 'none' }}>
          Since 1964
        </div>
        
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <div className="floating-badges">
            <div className="glass-panel floating" style={{ position: 'absolute', top: '10%', left: '0', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)' }}>
              <span style={{ background: 'var(--brand-blue)', color: '#fff', borderRadius: '50%', width: '24px', height: '24px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.8rem' }}>✓</span>
              <span style={{ fontWeight: '600', fontSize: '0.85rem' }}>Board Certified</span>
            </div>
            <div className="glass-panel floating-delayed" style={{ position: 'absolute', bottom: '15%', right: '5%', padding: '12px 20px', display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-dark)' }}>
              <span style={{ fontSize: '1.2rem' }}>⭐</span>
              <div>
                <div style={{ fontWeight: '700', fontSize: '0.9rem', lineHeight: '1' }}>4.9/5</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>1,200+ Reviews</div>
              </div>
            </div>
          </div>

          <span className="eyebrow reveal" style={{ color: 'var(--brand-green)' }}>Established 1964</span>
          <h1 className="heading-xl reveal" style={{ color: '#fff', marginBottom: '24px' }}>
            Advanced Dermatology <br />
            <em style={{ color: 'var(--brand-green)', fontStyle: 'normal' }}>& Laser Excellence</em>
          </h1>
          <p className="reveal" style={{ fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 48px', color: 'rgba(255,255,255,0.9)' }}>
            Pioneering skin health and aesthetic medicine in Egypt. Experience world-class, evidence-based care across our four specialized branches.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary">Book Consultation</Link>
            <a href="#services" className="btn btn-outline">View Treatments</a>
          </div>
        </div>
      </section>

      {/* 2. THE BENTO BOX LEGACY SECTION */}
      <section className="section bg-white" id="about">
        <div className="container">
          <div className="bento-grid">
            <div className="bento-item reveal" style={{ gridColumn: 'span 8', background: 'var(--bg-main)', border: 'none' }}>
              <span className="eyebrow">Our Legacy</span>
              <h2 className="heading-lg" style={{ marginBottom: '20px' }}>Rooted in Academic<br/><em style={{ color: 'var(--brand-blue)', fontStyle: 'italic' }}>Excellence</em></h2>
              <p className="text-mid" style={{ fontSize: '1.1rem', maxWidth: '500px' }}>
                Founded in 1964 by <strong>Prof. Dr. Abdel-Rahim Abdallah</strong>, former Head of Dermatology at Ain Shams University, Cutis has evolved into Egypt's foremost authority in skin health.
              </p>
            </div>

            <div className="bento-item reveal" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--brand-blue)', color: '#fff', border: 'none' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--brand-green)', lineHeight: '1', marginBottom: '10px' }}>50K+</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Patients safely treated with evidence-based protocols.</div>
            </div>

            {/* Mission Bento - Updated with official text */}
            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-blue-lt)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                Our purpose is to provide our clients with the richest platform of Skin Care services. In order to achieve this goal, we devote ourselves to hiring the most qualified Doctors whom we continuously train to the latest trends in the field. We aim at having the biggest number of customers with branches across the Middle East to put our brand on top of the Dermatology field in the region.
              </p>
            </div>

            {/* Vision Bento - Updated with official text */}
            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(189, 224, 56, 0.3)', color: 'var(--brand-green-dk)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>👁️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                To be the largest and most reputable Skin Care Destination covering the entire Middle East Region and offering a wide range of services from critically challenging dermatological treatments to the softer cosmetic procedures & skin treatment using the most advanced scientific medical approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. MODERN SERVICES CARDS */}
      <section className="section" id="services" style={{ overflow: 'hidden' }}>
        <div className="blob-bg" style={{ top: '20%', right: '-10%' }}></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div className="reveal" style={{ textAlign: 'center', marginBottom: '60px' }}>
            <span className="eyebrow">Departments</span>
            <h2 className="heading-md">Comprehensive Care</h2>
          </div>
          
          <div className="bento-grid">
            {SERVICES.map((dept, idx) => (
              <div key={idx} className="bento-item reveal" style={{ gridColumn: dept.colSpan, background: 'rgba(255,255,255,0.6)', backdropFilter: 'blur(20px)' }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '24px' }}>{dept.icon}</div>
                <div style={{ fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-blue)', marginBottom: '8px' }}>{dept.category}</div>
                <h3 style={{ fontSize: '1.6rem', marginBottom: '16px' }}>{dept.title}</h3>
                <p style={{ color: 'var(--text-mid)', marginBottom: '32px' }}>{dept.desc}</p>
                <Link to="/book" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--brand-green-dk)' }}>
                  Explore Treatments <span style={{ fontSize: '1.2rem' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ENCLOSED CTA BANNER */}
      <section className="section bg-white" style={{ paddingBottom: '100px' }}>
        <div className="container reveal">
          <div style={{ 
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', 
            borderRadius: '32px', 
            padding: '80px 60px', 
            color: '#fff', 
            position: 'relative', 
            overflow: 'hidden', 
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'var(--brand-blue)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }}></div>
            
            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
              <h2 className="heading-lg" style={{ color: '#fff', marginBottom: '20px' }}>Begin your skin journey today.</h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>Schedule a private consultation at any of our four premium branches across Greater Cairo.</p>
              <Link to="/book" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>Book Your Visit</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
