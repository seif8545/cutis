// src/pages/LandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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

const INSURERS = [
  { name: "Care Plus",  color: "#c0392b" },
  { name: "AXA",        color: "#00008b" },
  { name: "Mednet",     color: "#1a6fa8" },
  { name: "MedRight",   color: "#1d4ed8" },
  { name: "EgyCare",    color: "#0d9488" },
  { name: "Enppi",      color: "#b45309" },
  { name: "NextCare",   color: "#0369a1" },
  { name: "MetLife",    color: "#15803d" },
  { name: "دلتا",       color: "#7c3aed" },
];

const TEAM = [
  { name: "Prof. Dr. Marwa Abdallah",    title: "Professor of Dermatology",              img: "/images/dr-marwa.png",    color: "#0d4f3c" },
  { name: "A. Prof. Dr. Mahmoud Abdallah", title: "Associate Professor of Dermatology",  img: "/images/dr-mahmoud.png",  color: "#0f172a" },
  { name: "Dr. Nehad Youssef",            title: "Specialist Dermatologist",              img: "/images/dr-nehad.png",    color: "#475569" },
  { name: "Dr. Azza El-Azhary",           title: "Dermatology & Andrology Specialist",   img: "/images/dr-azza.png",     color: "#64748b" },
];

const OFFERS = [
  {
    tag: "This Month",
    title: "Laser Hair Removal Bundle",
    desc: "Full-body laser hair removal course of 6 sessions — book all 6 at once and receive the 7th session complimentary.",
    badge: "Free 7th Session",
    color: "#21326c",
    light: "#eef2ff",
    accent: "#009cdb",
    expires: "30 Apr 2026",
    department: "Advanced Laser Center",
  },
  {
    tag: "Spring Special",
    title: "Glow & Go Peel",
    desc: "A signature chemical peel combined with a hydrating Mesotherapy shot for an instant radiance boost — perfect for the season.",
    badge: "20% Off",
    color: "#0d4f3c",
    light: "#e6f4ea",
    accent: "#4ade80",
    expires: "15 May 2026",
    department: "Clinical Dermatology",
  },
  {
    tag: "New Patients",
    title: "Botox Welcome Package",
    desc: "First-time Botox patients receive a complimentary skincare consultation and personalised treatment plan with their session.",
    badge: "Free Consultation",
    color: "#7a5c00",
    light: "#fffbe6",
    accent: "#c9a84c",
    expires: "Ongoing",
    department: "Cosmetic Dermatology",
  },
];

// --- Clinic photo placeholder (swappable when real photos are ready) ---
const CLINIC_SHOTS = [
  { label: "Reception — Heliopolis",     hint: "clinic-reception.jpg",  span: "span 2" },
  { label: "Treatment Suite",            hint: "clinic-suite.jpg",      span: "span 1" },
  { label: "Laser Center",               hint: "clinic-laser.jpg",      span: "span 1" },
  { label: "Waiting Lounge",             hint: "clinic-lounge.jpg",     span: "span 1" },
  { label: "Fifth Settlement Branch",    hint: "clinic-5th.jpg",        span: "span 1" },
];

// ── Insurance ticker ──────────────────────────────────────────
function InsuranceTicker() {
  // Duplicate the list so the loop is seamless
  const items = [...INSURERS, ...INSURERS, ...INSURERS];
  return (
    <div style={{
      background: '#fff',
      borderTop: '1px solid var(--border-lt)',
      borderBottom: '1px solid var(--border-lt)',
      padding: '0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Label strip */}
      <div style={{
        display: 'flex', alignItems: 'center',
        borderBottom: '1px solid var(--border-lt)',
        padding: '10px 32px',
        gap: 10,
      }}>
        <span style={{
          fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em',
          textTransform: 'uppercase', color: 'var(--brand-blue)',
          whiteSpace: 'nowrap',
        }}>Guaranteed Health Insurance</span>
        <div style={{ flex: 1, height: 1, background: 'var(--border-lt)' }} />
        <span style={{
          fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)',
          whiteSpace: 'nowrap',
        }}>We proudly accept all major providers</span>
      </div>

      {/* Scrolling track */}
      <div style={{ padding: '18px 0', overflow: 'hidden' }}>
        <div style={{
          display: 'flex',
          width: 'max-content',
          animation: 'ticker-scroll 28s linear infinite',
          gap: 0,
        }}>
          {items.map((ins, i) => (
            <div key={i} style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '0 36px',
              borderRight: '1px solid var(--border-lt)',
              flexShrink: 0,
            }}>
              {/* Coloured initial badge */}
              <div style={{
                width: 32, height: 32, borderRadius: 8,
                background: ins.color + '18',
                border: `1.5px solid ${ins.color}33`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ins.color }}>
                  {ins.name.charAt(0)}
                </span>
              </div>
              <span style={{
                fontSize: '0.9rem', fontWeight: 700,
                color: ins.color,
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}>{ins.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Offer card ────────────────────────────────────────────────
function OfferCard({ offer }) {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const claimOffer = () => {
    localStorage.setItem('cutis_pending_offer', JSON.stringify({
      department: offer.department,
      offerTitle: offer.title,
    }));
    navigate('/book');
  };

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 22,
        overflow: 'hidden',
        boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.14), 0 0 0 2px ${offer.accent}` : '0 4px 20px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
        background: '#fff',
        display: 'flex', flexDirection: 'column',
        flex: '1 1 280px',
      }}
    >
      {/* Top accent bar */}
      <div style={{
        background: hovered ? offer.color : offer.light,
        padding: '22px 24px 18px',
        borderBottom: `3px solid ${offer.accent}`,
        transition: 'background 0.3s',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
            textTransform: 'uppercase', padding: '3px 10px', borderRadius: 20,
            background: hovered ? 'rgba(255,255,255,0.18)' : offer.accent + '22',
            color: hovered ? '#fff' : offer.color,
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.3)' : offer.accent + '55'}`,
            transition: 'all 0.3s',
          }}>{offer.tag}</span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 800, padding: '4px 12px', borderRadius: 20,
            background: hovered ? offer.accent : offer.color,
            color: '#fff', letterSpacing: '0.04em',
            transition: 'all 0.3s',
          }}>{offer.badge}</span>
        </div>
        <h3 style={{
          fontFamily: 'var(--font-serif)', fontSize: '1.3rem', margin: 0,
          color: hovered ? '#fff' : offer.color,
          transition: 'color 0.3s', lineHeight: 1.2,
        }}>{offer.title}</h3>
      </div>

      {/* Body */}
      <div style={{ padding: '18px 24px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.65, margin: 0, flex: 1 }}>{offer.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Expires: {offer.expires}</span>
          <button
            onClick={claimOffer}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5,
              fontSize: '0.82rem', fontWeight: 700,
              background: 'none', border: 'none', padding: 0, cursor: 'pointer',
              color: offer.color, borderBottom: `2px solid ${offer.accent}`,
              paddingBottom: 1, transition: 'color 0.2s', fontFamily: 'inherit',
            }}
          >
            Claim Offer →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Doctor card (horizontal strip) ───────────────────────────
function DoctorCard({ doc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to="/doctors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 14, flex: '1 1 160px', maxWidth: 200,
        transition: 'transform 0.25s',
        transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      {/* Photo ring */}
      <div style={{
        width: 140, height: 140, borderRadius: '50%',
        border: `3px solid ${hovered ? 'var(--brand-green)' : 'var(--border-lt)'}`,
        overflow: 'hidden', flexShrink: 0,
        transition: 'border-color 0.25s',
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.08)',
        background: doc.color,
      }}>
        <img
          src={doc.img}
          alt={doc.name}
          style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          onError={e => { e.target.style.display = 'none'; }}
        />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontSize: '0.92rem', fontWeight: 700,
          color: hovered ? 'var(--brand-blue)' : 'var(--text-dark)',
          lineHeight: 1.25, marginBottom: 4, transition: 'color 0.2s',
        }}>{doc.name}</div>
        <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{doc.title}</div>
      </div>
    </Link>
  );
}

// ── Clinic photo placeholder tile ────────────────────────────
function ClinicTile({ shot }) {
  return (
    <div style={{
      gridColumn: shot.span,
      borderRadius: 16, overflow: 'hidden',
      border: '1.5px dashed var(--border-lt)',
      background: '#f1f5f9',
      aspectRatio: shot.span === 'span 2' ? '16/7' : '4/3',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center', gap: 10,
      position: 'relative',
    }}>
      <div style={{
        width: 48, height: 48, borderRadius: '50%',
        background: '#e2e8f0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
      </div>
      <span style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600 }}>{shot.label}</span>
      <div style={{
        position: 'absolute', bottom: 10, right: 12,
        fontSize: '0.6rem', color: '#cbd5e1', fontFamily: 'monospace',
      }}>{shot.hint}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function LandingPage() {

  const observerRef = useRef(null);
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));

    const show = el => {
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    };

    // Set initial hidden state
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
    });

    // Immediately reveal anything already visible in the viewport
    els.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight + 60) show(el);
    });

    // Observe the rest as they scroll into view
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) show(e.target); }),
      { threshold: 0.05 }
    );
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="landing-page">

      {/* ── 1. HERO ───────────────────────────────────────────── */}
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
            <em style={{ color: 'var(--brand-green)', fontStyle: 'normal' }}>&amp; Laser Excellence</em>
          </h1>
          <p className="reveal" style={{ fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 48px', color: 'rgba(255,255,255,0.9)' }}>
            Pioneering skin health and aesthetic medicine in Egypt. Experience world-class, evidence-based care across our four specialised branches.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary">Book Consultation</Link>
            <a href="#services" className="btn btn-outline">View Treatments</a>
          </div>
        </div>
      </section>

      {/* ── 1b. INSURANCE TICKER ──────────────────────────────── */}
      <InsuranceTicker />

      {/* ── 2. LEGACY BENTO ───────────────────────────────────── */}
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

            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-blue-lt)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                Our purpose is to provide our clients with the richest platform of Skin Care services. We devote ourselves to hiring the most qualified Doctors whom we continuously train to the latest trends in the field.
              </p>
            </div>

            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(189,224,56,0.3)', color: 'var(--brand-green-dk)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>👁️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                To be the largest and most reputable Skin Care Destination covering the entire Middle East Region, offering a wide range of services using the most advanced scientific medical approach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. MEET THE TEAM ──────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          {/* Header */}
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="eyebrow">The People Behind Your Care</span>
            <h2 className="heading-md" style={{ marginBottom: 14 }}>Meet Our Doctors</h2>
            <p style={{ color: 'var(--text-mid)', maxWidth: 520, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              A family of board-certified consultants and specialists who have dedicated their careers to your skin health.
            </p>
          </div>

          {/* Team photo banner */}
          <div className="reveal" style={{
            borderRadius: 24, overflow: 'hidden',
            marginBottom: 48, position: 'relative',
            boxShadow: '0 8px 40px rgba(0,0,0,0.12)',
          }}>
            <img
              src="/images/Team.png"
              alt="Cutis medical team"
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
            <div style={{
              position: 'absolute', inset: 0,
              background: 'linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 50%)',
              pointerEvents: 'none',
            }} />
            <div style={{
              position: 'absolute', bottom: 24, left: 32,
              color: '#fff',
            }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: 4 }}>Cutis Medical Team</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', lineHeight: 1.2 }}>Together, we care for every skin.</div>
            </div>
          </div>

          {/* Individual doctor circles */}
          <div className="reveal" style={{
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32,
          }}>
            {TEAM.map((doc, i) => <DoctorCard key={i} doc={doc} />)}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 40 }}>
            <Link to="/doctors" className="btn btn-outline" style={{ borderWidth: 2 }}>
              Full Team Profiles →
            </Link>
          </div>
        </div>
      </section>

      {/* ── 4. CLINIC PHOTOS ──────────────────────────────────── */}
      <section style={{ background: 'var(--bg-main)', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="eyebrow">Our Space</span>
            <h2 className="heading-md" style={{ marginBottom: 14 }}>Inside the Clinic</h2>
            <p style={{ color: 'var(--text-mid)', maxWidth: 480, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              Welcoming, clinical, and designed around your comfort — from the moment you walk in.
            </p>
          </div>

          <div className="reveal" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 14,
          }}>
            {CLINIC_SHOTS.map((shot, i) => <ClinicTile key={i} shot={shot} />)}
          </div>

          <p className="reveal" style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: 16, fontStyle: 'italic' }}>
            Clinic photos coming soon — replace the placeholder tiles with your own images.
          </p>
        </div>
      </section>

      {/* ── 5. SERVICES CARDS ─────────────────────────────────── */}
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
                <Link to="/services" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontWeight: '600', color: 'var(--brand-green-dk)' }}>
                  Explore Treatments <span style={{ fontSize: '1.2rem' }}>→</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. LATEST OFFERS ──────────────────────────────────── */}
      <section style={{ background: 'var(--text-dark)', paddingTop: '80px', paddingBottom: '90px' }} id="offers">
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 50 }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Exclusive Promotions</span>
            <h2 className="heading-md" style={{ color: '#fff', marginBottom: 14 }}>Latest Offers</h2>
            <p style={{ color: 'rgba(255,255,255,0.6)', maxWidth: 480, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              Carefully curated seasonal promotions — because great skin care should be accessible.
            </p>
          </div>

          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 22, justifyContent: 'center' }}>
            {OFFERS.map((offer, i) => <OfferCard key={i} offer={offer} />)}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 44 }}>
            <Link to="/book" className="btn btn-primary" style={{ padding: '14px 38px', fontSize: '0.95rem' }}>
              Book &amp; Claim an Offer
            </Link>
          </div>
        </div>
      </section>

      {/* ── 7. CTA BANNER ─────────────────────────────────────── */}
      <section className="section bg-white" style={{ paddingBottom: '100px' }}>
        <div className="container reveal">
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '32px', padding: '80px 60px',
            color: '#fff', position: 'relative', overflow: 'hidden',
            boxShadow: 'var(--shadow-md)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            <div style={{ position: 'absolute', top: '-50%', right: '-10%', width: '400px', height: '400px', background: 'var(--brand-blue)', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.4 }} />

            <div style={{ position: 'relative', zIndex: 2, maxWidth: '600px' }}>
              <h2 className="heading-lg" style={{ color: '#fff', marginBottom: '20px' }}>Begin your skin journey today.</h2>
              <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.7)', marginBottom: '40px' }}>Schedule a private consultation at any of our four premium branches across Greater Cairo.</p>
              <Link to="/book" className="btn btn-primary" style={{ padding: '16px 40px', fontSize: '1rem' }}>Book Your Visit</Link>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
      `}</style>
    </div>
  );
}
