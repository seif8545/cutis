// src/pages/LandingPage.jsx
import React, { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/global.css';

// ── Data ──────────────────────────────────────────────────────
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
  { name: "Prof. Dr. Marwa Abdallah",      title: "Professor of Dermatology",             img: "/images/dr-marwa.png",    color: "#0d4f3c" },
  { name: "A. Prof. Dr. Mahmoud Abdallah", title: "Associate Professor of Dermatology",   img: "/images/dr-mahmoud.png",  color: "#0f172a" },
  { name: "Dr. Nehad Youssef",             title: "Specialist Dermatologist",              img: "/images/dr-nehad.png",    color: "#475569" },
  { name: "Dr. Azza El-Azhary",            title: "Dermatology & Andrology Specialist",   img: "/images/dr-azza.png",     color: "#64748b" },
];

const OFFERS = [
  {
    tag: "This Month",
    title: "Laser Hair Removal Bundle",
    desc: "Full-body course of 6 sessions — book all at once and receive the 7th complimentary.",
    badge: "Free 7th Session",
    color: "#21326c", light: "#eef2ff", accent: "#009cdb",
    expires: "30 Apr 2026",
    department: "Advanced Laser Center",
  },
  {
    tag: "Spring Special",
    title: "Glow & Go Peel",
    desc: "A signature chemical peel + hydrating Mesotherapy for an instant radiance boost.",
    badge: "20% Off",
    color: "#0d4f3c", light: "#e6f4ea", accent: "#4ade80",
    expires: "15 May 2026",
    department: "Clinical Dermatology",
  },
  {
    tag: "New Patients",
    title: "Botox Welcome Package",
    desc: "First-time patients receive a complimentary skincare consultation with their session.",
    badge: "Free Consultation",
    color: "#7a5c00", light: "#fffbe6", accent: "#c9a84c",
    expires: "Ongoing",
    department: "Cosmetic Dermatology",
  },
];

// ── Insurance ticker ──────────────────────────────────────────
function InsuranceTicker() {
  const items = [...INSURERS, ...INSURERS, ...INSURERS];
  return (
    <div style={{ background: '#fff', borderTop: '1px solid var(--border-lt)', borderBottom: '1px solid var(--border-lt)', overflow: 'hidden' }}>
      <div style={{ display: 'flex', alignItems: 'center', borderBottom: '1px solid var(--border-lt)', padding: '10px 32px', gap: 10 }}>
        <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--brand-blue)', whiteSpace: 'nowrap' }}>
          Guaranteed Health Insurance
        </span>
        <div style={{ flex: 1, height: 1, background: 'var(--border-lt)' }} />
        <span style={{ fontSize: '0.62rem', fontWeight: 600, color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>
          We proudly accept all major providers
        </span>
      </div>
      <div style={{ padding: '18px 0', overflow: 'hidden' }}>
        <div style={{ display: 'flex', width: 'max-content', animation: 'ticker-scroll 28s linear infinite', gap: 0 }}>
          {items.map((ins, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 36px', borderRight: '1px solid var(--border-lt)', flexShrink: 0 }}>
              <div style={{ width: 32, height: 32, borderRadius: 8, background: ins.color + '18', border: `1.5px solid ${ins.color}33`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 800, color: ins.color }}>{ins.name.charAt(0)}</span>
              </div>
              <span style={{ fontSize: '0.9rem', fontWeight: 700, color: ins.color, whiteSpace: 'nowrap' }}>{ins.name}</span>
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
        borderRadius: 22, overflow: 'hidden',
        boxShadow: hovered ? `0 20px 48px rgba(0,0,0,0.14), 0 0 0 2px ${offer.accent}` : '0 4px 20px rgba(0,0,0,0.07)',
        transform: hovered ? 'translateY(-5px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
        background: '#fff', display: 'flex', flexDirection: 'column',
        flex: '1 1 260px', maxWidth: 360,
      }}
    >
      <div style={{ background: hovered ? offer.color : offer.light, padding: '22px 24px 18px', borderBottom: `3px solid ${offer.accent}`, transition: 'background 0.3s' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
          <span style={{
            fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 20,
            background: hovered ? 'rgba(255,255,255,0.18)' : offer.accent + '22',
            color: hovered ? '#fff' : offer.color,
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.3)' : offer.accent + '55'}`,
            transition: 'all 0.3s',
          }}>{offer.tag}</span>
          <span style={{ fontSize: '0.7rem', fontWeight: 800, padding: '4px 12px', borderRadius: 20, background: hovered ? offer.accent : offer.color, color: '#fff', transition: 'all 0.3s' }}>{offer.badge}</span>
        </div>
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', margin: 0, color: hovered ? '#fff' : offer.color, transition: 'color 0.3s', lineHeight: 1.2 }}>{offer.title}</h3>
      </div>
      <div style={{ padding: '18px 24px 22px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <p style={{ fontSize: '0.88rem', color: 'var(--text-mid)', lineHeight: 1.65, margin: 0, flex: 1 }}>{offer.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontWeight: 600 }}>Expires: {offer.expires}</span>
          <button
            onClick={claimOffer}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 5, fontSize: '0.82rem', fontWeight: 700,
              background: 'none', border: 'none', padding: '0 0 1px', cursor: 'pointer',
              color: offer.color, borderBottom: `2px solid ${offer.accent}`, fontFamily: 'inherit',
            }}
          >
            Claim Offer →
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Doctor circle card ────────────────────────────────────────
function DoctorCard({ doc }) {
  const [hovered, setHovered] = useState(false);
  return (
    <Link
      to="/doctors"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center',
        gap: 14, flex: '1 1 150px', maxWidth: 190,
        transition: 'transform 0.25s', transform: hovered ? 'translateY(-4px)' : 'none',
      }}
    >
      <div style={{
        width: 130, height: 130, borderRadius: '50%',
        border: `3px solid ${hovered ? 'var(--brand-green)' : 'var(--border-lt)'}`,
        overflow: 'hidden', flexShrink: 0,
        transition: 'border-color 0.25s',
        boxShadow: hovered ? '0 8px 30px rgba(0,0,0,0.15)' : '0 2px 12px rgba(0,0,0,0.08)',
        background: doc.color,
      }}>
        <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.target.style.display = 'none'; }} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: hovered ? 'var(--brand-blue)' : 'var(--text-dark)', lineHeight: 1.25, marginBottom: 4, transition: 'color 0.2s' }}>{doc.name}</div>
        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', lineHeight: 1.4 }}>{doc.title}</div>
      </div>
    </Link>
  );
}

// ── Page ─────────────────────────────────────────────────────
export default function LandingPage() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('.reveal'));
    const show = el => { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; };
    els.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
    });
    els.forEach(el => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight + 60) show(el); });
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
            Advanced Dermatology<br />
            <em style={{ color: 'var(--brand-green)', fontStyle: 'normal' }}>&amp; Laser Excellence</em>
          </h1>
          <p className="reveal" style={{ fontSize: '1.15rem', maxWidth: '680px', margin: '0 auto 48px', color: 'rgba(255,255,255,0.9)' }}>
            Pioneering skin health and aesthetic medicine in Egypt since 1964 — across four specialised branches.
          </p>
          <div className="reveal" style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/book" className="btn btn-primary">Book Consultation</Link>
            <Link to="/services" className="btn btn-outline">View Treatments</Link>
          </div>
        </div>
      </section>

      {/* ── 2. INSURANCE TICKER ───────────────────────────────── */}
      <InsuranceTicker />

      {/* ── 3. LATEST OFFERS ──────────────────────────────────── */}
      <section style={{ background: 'var(--text-dark)', paddingTop: '70px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Exclusive Promotions</span>
            <h2 className="heading-md" style={{ color: '#fff', marginBottom: 12 }}>Latest Offers</h2>
            <p style={{ color: 'rgba(255,255,255,0.55)', maxWidth: 440, margin: '0 auto', fontSize: '0.95rem', lineHeight: 1.7 }}>
              Carefully curated seasonal promotions — great skin care should be accessible.
            </p>
          </div>
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center' }}>
            {OFFERS.map((offer, i) => <OfferCard key={i} offer={offer} />)}
          </div>
        </div>
      </section>

      {/* ── 5. MEET THE TEAM ──────────────────────────────────── */}
      <section style={{ background: '#fff', paddingTop: '80px', paddingBottom: '80px' }}>
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 44 }}>
            <span className="eyebrow">The People Behind Your Care</span>
            <h2 className="heading-md" style={{ marginBottom: 12 }}>Meet Our Doctors</h2>
            <p style={{ color: 'var(--text-mid)', maxWidth: 500, margin: '0 auto', fontSize: '1rem', lineHeight: 1.7 }}>
              A family of board-certified consultants dedicated to your skin health.
            </p>
          </div>

          {/* Team photo banner */}
          <div className="reveal" style={{ borderRadius: 24, overflow: 'hidden', marginBottom: 44, position: 'relative', boxShadow: '0 8px 40px rgba(0,0,0,0.12)' }}>
            <img src="/images/Team.png" alt="Cutis medical team" style={{ width: '100%', height: 'auto', display: 'block' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,30,60,0.55) 0%, transparent 50%)', pointerEvents: 'none' }} />
            <div style={{ position: 'absolute', bottom: 24, left: 32 }}>
              <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--brand-green)', marginBottom: 4 }}>Cutis Medical Team</div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#fff', lineHeight: 1.2 }}>Together, we care for every skin.</div>
            </div>
          </div>

          {/* Doctor circles */}
          <div className="reveal" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 28 }}>
            {TEAM.map((doc, i) => <DoctorCard key={i} doc={doc} />)}
          </div>

          <div className="reveal" style={{ textAlign: 'center', marginTop: 36 }}>
            <Link to="/doctors" className="btn btn-outline" style={{ borderWidth: 2 }}>Full Team Profiles →</Link>
          </div>
        </div>
      </section>

      {/* ── 6. LEGACY / ABOUT ─────────────────────────────────── */}
      <section className="section bg-white">
        <div className="container">
          <div className="bento-grid">
            <div className="bento-item reveal" style={{ gridColumn: 'span 8', background: 'var(--bg-main)', border: 'none' }}>
              <span className="eyebrow">Our Legacy</span>
              <h2 className="heading-lg" style={{ marginBottom: '20px' }}>Rooted in Academic<br /><em style={{ color: 'var(--brand-blue)', fontStyle: 'italic' }}>Excellence</em></h2>
              <p className="text-mid" style={{ fontSize: '1.05rem', maxWidth: '500px', color: 'var(--text-mid)' }}>
                Founded in 1964 by <strong>Prof. Dr. Abdel-Rahim Abdallah</strong>, former Head of Dermatology at Ain Shams University, Cutis has evolved into Egypt's foremost authority in skin health.
              </p>
              <Link to="/history" style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 24, fontWeight: 700, fontSize: '0.9rem', color: 'var(--brand-blue)' }}>
                Read Our Full Story →
              </Link>
            </div>

            <div className="bento-item reveal" style={{ gridColumn: 'span 4', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--brand-blue)', color: '#fff', border: 'none' }}>
              <div style={{ fontSize: '3.5rem', fontWeight: '700', color: 'var(--brand-green)', lineHeight: '1', marginBottom: '10px' }}>50K+</div>
              <div style={{ fontSize: '1.1rem', fontWeight: '500' }}>Patients safely treated with evidence-based protocols.</div>
            </div>

            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'var(--brand-blue-lt)', color: 'var(--brand-blue)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>🎯</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Mission</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                To provide our clients with the richest platform of skin care services, delivered by continuously trained, highly qualified doctors using the most advanced medical approach.
              </p>
            </div>

            <div className="bento-item reveal" style={{ gridColumn: 'span 6' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: 'rgba(189,224,56,0.3)', color: 'var(--brand-green-dk)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', marginBottom: '20px' }}>👁️</div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Our Vision</h3>
              <p style={{ color: 'var(--text-mid)' }}>
                To be the largest and most reputable skin care destination in the Middle East — from critically challenging dermatological treatments to the latest cosmetic refinements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. SERVICES TEASER ────────────────────────────────── */}
      <section style={{ background: 'var(--bg-main)', paddingTop: '60px', paddingBottom: '80px' }}>
        <div className="container reveal" style={{ textAlign: 'center' }}>
          <span className="eyebrow">What We Offer</span>
          <h2 className="heading-md" style={{ marginBottom: 16 }}>Comprehensive Dermatology &amp; Aesthetics</h2>
          <p style={{ color: 'var(--text-mid)', maxWidth: 560, margin: '0 auto 36px', fontSize: '1rem', lineHeight: 1.75 }}>
            From laser hair removal and Botox to clinical acne management and surgical scar revision — explore our full range of treatments.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/services" className="btn btn-primary" style={{ fontSize: '0.95rem' }}>Browse All Treatments →</Link>
            <Link to="/book"     className="btn btn-outline" style={{ fontSize: '0.95rem', borderColor: 'var(--brand-blue)', color: 'var(--brand-blue)' }}>Book a Consultation</Link>
          </div>
        </div>
      </section>

      {/* ── 8. CTA BANNER ─────────────────────────────────────── */}
      <section className="section bg-white" style={{ paddingBottom: '100px' }}>
        <div className="container reveal">
          <div style={{
            background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
            borderRadius: '32px', padding: '80px 60px', color: '#fff',
            position: 'relative', overflow: 'hidden',
            boxShadow: 'var(--shadow-md)', border: '1px solid rgba(255,255,255,0.05)',
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
