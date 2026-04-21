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
    discount: "30%",
    unit: "OFF",
    title: "Laser Hair Removal",
    detail: "Full body · 6-session course",
    desc: "Book your full-body laser course now and get the 7th session on us. All skin types, FDA-approved platforms.",
    cta: "Claim Deal",
    bg: "#0082bb",
    accent: "#b2d234",
    expires: "30 Apr 2026",
    department: "Advanced Laser Center",
  },
  {
    tag: "Spring Glow",
    discount: "20%",
    unit: "OFF",
    title: "All Aesthetic Services",
    detail: "Botox · Fillers · Mesotherapy",
    desc: "Spring into your best skin. Save 20% on any injectable or aesthetic treatment booked this month.",
    cta: "Book Now",
    bg: "#1a6e3c",
    accent: "#b2d234",
    expires: "15 May 2026",
    department: "Cosmetic Dermatology",
  },
  {
    tag: "New Patients",
    discount: "FREE",
    unit: "CONSULT",
    title: "Botox First Visit",
    detail: "Includes personalised treatment plan",
    desc: "First time at Cutis? Your Botox session comes with a complimentary dermatologist consultation — no strings.",
    cta: "Get Started",
    bg: "#7a3e00",
    accent: "#f5c842",
    expires: "Ongoing",
    department: "Cosmetic Dermatology",
  },
  {
    tag: "Hair Clinic",
    discount: "15%",
    unit: "OFF",
    title: "Hair Loss Treatment",
    detail: "PRP · Mesotherapy · Diagnosis",
    desc: "Struggling with hair thinning or loss? Get 15% off your first PRP or Mesotherapy hair session.",
    cta: "Book Session",
    bg: "#4a1a7a",
    accent: "#b2d234",
    expires: "31 May 2026",
    department: "Clinical Dermatology",
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
      onClick={claimOffer}
      style={{
        borderRadius: 20, overflow: 'hidden', cursor: 'pointer',
        background: offer.bg,
        boxShadow: hovered
          ? `0 24px 56px rgba(0,0,0,0.35), 0 0 0 3px ${offer.accent}`
          : '0 8px 28px rgba(0,0,0,0.22)',
        transform: hovered ? 'translateY(-6px) scale(1.01)' : 'none',
        transition: 'all 0.28s cubic-bezier(0.25,0.8,0.25,1)',
        flex: '1 1 240px', maxWidth: 300,
        display: 'flex', flexDirection: 'column',
        position: 'relative',
      }}
    >
      {/* Big discount number — the hero of the card */}
      <div style={{ padding: '28px 26px 0', position: 'relative' }}>
        {/* Tag pill */}
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6, marginBottom: 16,
          background: 'rgba(255,255,255,0.15)', borderRadius: 20, padding: '4px 12px',
        }}>
          <span style={{ fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.9)' }}>{offer.tag}</span>
        </div>

        {/* Discount */}
        <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6, marginBottom: 4 }}>
          <span style={{
            fontFamily: 'var(--font-sans)', fontSize: '4.5rem', fontWeight: 900,
            color: offer.accent, lineHeight: 0.9, letterSpacing: '-0.04em',
          }}>{offer.discount}</span>
          <span style={{
            fontSize: '1rem', fontWeight: 800, color: 'rgba(255,255,255,0.7)',
            paddingBottom: 10, letterSpacing: '0.06em',
          }}>{offer.unit}</span>
        </div>

        {/* Treatment name */}
        <div style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', color: '#fff', lineHeight: 1.2, marginBottom: 4 }}>{offer.title}</div>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: offer.accent, letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 18 }}>{offer.detail}</div>
      </div>

      {/* Divider */}
      <div style={{ margin: '0 26px', height: 1, background: 'rgba(255,255,255,0.15)' }} />

      {/* Body */}
      <div style={{ padding: '16px 26px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 16 }}>
        <p style={{ fontSize: '0.84rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.65, margin: 0, flex: 1 }}>{offer.desc}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)', fontWeight: 600 }}>Until {offer.expires}</span>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            background: offer.accent, color: '#0f172a',
            fontSize: '0.78rem', fontWeight: 800,
            padding: '8px 16px', borderRadius: 100,
            transition: 'transform 0.15s',
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
          }}>
            {offer.cta} →
          </div>
        </div>
      </div>

      {/* Subtle corner glow */}
      <div style={{
        position: 'absolute', top: -40, right: -40, width: 140, height: 140, borderRadius: '50%',
        background: `radial-gradient(circle, ${offer.accent}30 0%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
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
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const onScroll = () => setShowFloat(window.scrollY > 480);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
      <section style={{
        background: 'linear-gradient(160deg, #0099d6 0%, #007ab5 60%, #005f8e 100%)',
        color: '#fff', position: 'relative', overflow: 'hidden',
      }}>
        {/* Decorative blobs */}
        <div style={{ position: 'absolute', top: '-18%', right: '-8%', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(178,210,52,0.22) 0%, transparent 65%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-6%', width: 500, height: 500, borderRadius: '50%', background: 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 65%)', pointerEvents: 'none' }} />

        {/* ── Top bar: big logo + clinic name ── */}
        <div className="container" style={{ paddingTop: 52, paddingBottom: 36, borderBottom: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', gap: 24 }}>
          <div style={{
            width: 110, height: 110, borderRadius: 24, overflow: 'hidden', flexShrink: 0,
            background: '#fff', padding: 6,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
          }}>
            <img
              src="/images/logo.jpg"
              alt="Cutis logo"
              style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: 18 }}
              onError={e => {
                e.target.style.display = 'none';
                e.target.parentNode.style.background = '#0099d6';
                e.target.parentNode.innerHTML = '<div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:3rem;font-weight:900;color:#fff;font-family:serif">C</div>';
              }}
            />
          </div>
          <div>
            <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 600, color: '#fff', lineHeight: 1, letterSpacing: '-0.01em' }}>Cutis</div>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--brand-green)', marginTop: 6 }}>The Skin Clinic</div>
            <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.55)', marginTop: 3, letterSpacing: '0.06em' }}>Est. 1964 · Cairo, Egypt</div>
          </div>
        </div>

        {/* ── Main hero body ── */}
        <div className="container" style={{ paddingTop: 52, paddingBottom: 60 }}>
          <div className="hero-body" style={{ display: 'flex', gap: 56, alignItems: 'flex-start', flexWrap: 'wrap' }}>

            {/* Left: headline + treatments + CTAs */}
            <div style={{ flex: '1 1 400px' }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 22,
                background: 'rgba(178,210,52,0.18)', border: '1px solid rgba(178,210,52,0.35)',
                borderRadius: 20, padding: '5px 14px',
              }}>
                <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--brand-green)', display: 'inline-block' }} />
                <span style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-green)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Dermatology &amp; Aesthetic Medicine</span>
              </div>

              <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', color: '#fff', lineHeight: 1.1, marginBottom: 20, letterSpacing: '-0.01em' }}>
                Skin that glows.<br />
                <em style={{ color: 'var(--brand-green)', fontStyle: 'normal' }}>Science that shows.</em>
              </h1>

              <p style={{ fontSize: '1.05rem', color: 'rgba(255,255,255,0.78)', lineHeight: 1.8, marginBottom: 30, maxWidth: 440 }}>
                Come for the glow, stay for the care. Our doctors treat skin medically and aesthetically — acne, aging, hair loss, pigmentation and more — with over 60 years of expertise behind every consultation.
              </p>

              {/* Treatment chips */}
              <div className="hero-chips" style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 36 }}>
                {['Acne','Botox','Laser Hair Removal','Vitiligo','Hair Loss','Fillers','Skin Peeling','Anti-Aging','Tattoo Removal'].map(chip => (
                  <Link to="/services" key={chip} style={{
                    fontSize: '0.75rem', fontWeight: 600, padding: '6px 14px', borderRadius: 20, textDecoration: 'none',
                    background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)',
                    color: '#fff', letterSpacing: '0.02em', transition: 'background 0.2s',
                  }}>{chip}</Link>
                ))}
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 44 }}>
                <Link to="/book" className="btn btn-primary" style={{ padding: '15px 36px', fontSize: '1rem', fontWeight: 700 }}>
                  Book a Consultation
                </Link>
                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6, padding: '15px 28px', borderRadius: 100,
                  border: '2px solid rgba(255,255,255,0.35)', color: '#fff',
                  fontSize: '0.95rem', fontWeight: 600, textDecoration: 'none',
                }}>
                  All Treatments →
                </Link>
              </div>

              {/* Stats */}
              <div style={{ display: 'flex', gap: 28, flexWrap: 'wrap', paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.15)' }}>
                {[['60+','Years'],['50K+','Patients'],['4','Branches'],['∞','Board Certified']].map(([v, l]) => (
                  <div key={l} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: '1.6rem', fontWeight: 800, color: 'var(--brand-green)', lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: '0.68rem', color: 'rgba(255,255,255,0.5)', marginTop: 3, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: team photo + doctor faces */}
            <div className="hero-right" style={{ flex: '1 1 340px' }}>
              {/* Team photo */}
              <div style={{
                borderRadius: 24, overflow: 'hidden',
                boxShadow: '0 24px 64px rgba(0,0,0,0.25)',
                border: '3px solid rgba(255,255,255,0.18)',
                marginBottom: 20,
              }}>
                <img
                  src="/images/Team.png"
                  alt="Cutis medical team"
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                />
              </div>

              {/* Doctor faces strip */}
              <div style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 18, padding: '14px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                {/* Overlapping circles */}
                <div style={{ display: 'flex', flexShrink: 0 }}>
                  {TEAM.map((doc, i) => (
                    <div key={i} style={{
                      width: 42, height: 42, borderRadius: '50%',
                      border: '2px solid rgba(255,255,255,0.6)',
                      overflow: 'hidden', marginLeft: i === 0 ? 0 : -12,
                      background: doc.color, flexShrink: 0,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                    }}>
                      <img src={doc.img} alt={doc.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }} onError={e => { e.target.style.display = 'none'; }} />
                    </div>
                  ))}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#fff', lineHeight: 1.3 }}>Meet our doctors</div>
                  <div style={{ fontSize: '0.72rem', color: 'rgba(255,255,255,0.65)', marginTop: 2 }}>Board-certified specialists, ready for you</div>
                </div>
                <Link to="/doctors" style={{
                  flexShrink: 0, fontSize: '0.75rem', fontWeight: 700, color: 'var(--brand-green)',
                  textDecoration: 'none', whiteSpace: 'nowrap',
                }}>View All →</Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── 2. INSURANCE TICKER ───────────────────────────────── */}
      <InsuranceTicker />

      {/* ── 3. LATEST OFFERS ──────────────────────────────────── */}
      <section style={{ background: '#0a0f1a', paddingTop: '72px', paddingBottom: '80px', position: 'relative', overflow: 'hidden' }}>
        {/* bg texture dots */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(rgba(255,255,255,0.03) 1px, transparent 1px)', backgroundSize: '28px 28px', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Header row */}
          <div className="reveal" style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16, marginBottom: 40 }}>
            <div>
              <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Limited Time</span>
              <h2 className="heading-md" style={{ color: '#fff', marginBottom: 0 }}>This Month's Offers</h2>
            </div>
            <Link to="/book" style={{
              display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: '0.85rem', fontWeight: 700,
              color: 'var(--brand-green)', textDecoration: 'none', borderBottom: '2px solid var(--brand-green)', paddingBottom: 2,
            }}>Book &amp; Claim Any Offer →</Link>
          </div>

          {/* Cards */}
          <div className="reveal offers-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: 18 }}>
            {OFFERS.map((offer, i) => <OfferCard key={i} offer={offer} />)}
          </div>
        </div>
      </section>

      {/* ── 4. LEGACY + MISSION + VISION ─────────────────────── */}
      <section style={{ background: 'var(--bg-main)', padding: '80px 0 60px' }}>
        <div className="container">

          {/* Top row: legacy text + 50K stat */}
          <div className="reveal" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 24 }}>
            <div style={{
              flex: '2 1 340px', background: '#fff',
              borderRadius: 24, padding: '40px', border: '1px solid var(--border-lt)',
            }}>
              <span className="eyebrow">Est. 1964</span>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.8rem,3.5vw,2.6rem)', color: 'var(--text-dark)', lineHeight: 1.15, marginBottom: 16 }}>
                Rooted in six decades<br />of <em style={{ color: 'var(--brand-blue)' }}>clinical excellence.</em>
              </h2>
              <p style={{ color: 'var(--text-mid)', lineHeight: 1.75, fontSize: '0.97rem', maxWidth: 440, marginBottom: 24 }}>
                Founded by Prof. Dr. Abdel-Rahim Abdallah, former Head of Dermatology at Ain Shams University — Cutis grew from a single clinic in Heliopolis into Egypt's most comprehensive skin care institution.
              </p>
              <Link to="/history" style={{ fontWeight: 700, fontSize: '0.88rem', color: 'var(--brand-blue)', display: 'inline-flex', alignItems: 'center', gap: 5, textDecoration: 'none' }}>
                Our full story →
              </Link>
            </div>
            <div style={{
              flex: '1 1 180px', background: 'var(--brand-blue)',
              borderRadius: 24, padding: '40px', display: 'flex', flexDirection: 'column', justifyContent: 'center',
            }}>
              <div style={{ fontSize: 'clamp(3rem,6vw,4rem)', fontWeight: 900, color: 'var(--brand-green)', lineHeight: 1 }}>50K+</div>
              <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', marginTop: 10, lineHeight: 1.5 }}>Patients safely treated.</div>
              <div style={{ fontSize: '0.78rem', color: 'rgba(255,255,255,0.5)', marginTop: 6 }}>Across 4 Cairo branches.</div>
            </div>
          </div>

          {/* Mission + Vision side by side */}
          <div className="reveal" style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginBottom: 40 }}>
            {[
              { icon: '🎯', label: 'Our Mission', color: 'var(--brand-blue-lt)', text: 'To give every patient access to the highest standard of skin care — medically rigorous, aesthetically excellent, and deeply personal.' },
              { icon: '👁️', label: 'Our Vision',  color: 'rgba(189,224,56,0.2)', text: 'To be the most trusted skin destination in the Middle East, treating every condition and every concern under one roof.' },
            ].map(({ icon, label, color, text }) => (
              <div key={label} style={{ flex: '1 1 260px', background: '#fff', borderRadius: 20, padding: '28px 32px', border: '1px solid var(--border-lt)', display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-dark)', marginBottom: 8 }}>{label}</div>
                  <p style={{ color: 'var(--text-mid)', fontSize: '0.9rem', lineHeight: 1.7, margin: 0 }}>{text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Inline booking nudge */}
          <div className="reveal" style={{
            background: 'linear-gradient(120deg, #0099d6 0%, #006fa8 100%)',
            borderRadius: 20, padding: '32px 40px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 20,
          }}>
            <div>
              <div style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(1.3rem,2.5vw,1.9rem)', color: '#fff', lineHeight: 1.2, marginBottom: 6 }}>Ready to start? Your skin won't wait.</div>
              <div style={{ fontSize: '0.88rem', color: 'rgba(255,255,255,0.7)' }}>Walk in or book online — all four branches, no waiting lists.</div>
            </div>
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <Link to="/book" className="btn btn-primary" style={{ fontSize: '0.95rem', padding: '13px 30px', fontWeight: 700 }}>Book a Consultation</Link>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', padding: '13px 24px', borderRadius: 100,
                border: '2px solid rgba(255,255,255,0.35)', color: '#fff',
                fontSize: '0.9rem', fontWeight: 600, textDecoration: 'none',
              }}>See Treatments →</Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── FLOATING BOOK BUTTON (appears after hero scroll) ─── */}
      <div className="float-book" style={{
        position: 'fixed', bottom: 24, right: 24, zIndex: 900,
        opacity: showFloat ? 1 : 0,
        transform: showFloat ? 'translateY(0) scale(1)' : 'translateY(16px) scale(0.95)',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        pointerEvents: showFloat ? 'auto' : 'none',
      }}>
        <Link to="/book" style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'var(--brand-blue)', color: '#fff',
          padding: '14px 22px', borderRadius: 100,
          fontWeight: 700, fontSize: '0.9rem', textDecoration: 'none',
          boxShadow: '0 8px 28px rgba(0,156,219,0.45)',
          border: '2px solid rgba(255,255,255,0.2)',
        }}>
          <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--brand-green)', display: 'inline-block', flexShrink: 0 }} />
          Book Now
        </Link>
      </div>

      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }

        /* ── Mobile hero layout ── */
        @media (max-width: 700px) {
          .hero-body { flex-direction: column !important; }
          .hero-right { display: none !important; }
          .hero-stats { gap: 16px !important; }
          .hero-chips { gap: 6px !important; }
        }

        /* ── Mobile offers grid ── */
        @media (max-width: 600px) {
          .offers-grid { grid-template-columns: 1fr !important; }
        }

        /* ── Mobile floating button ── */
        @media (max-width: 480px) {
          .float-book {
            left: 16px !important; right: 16px !important;
            bottom: 16px !important;
            border-radius: 14px !important;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
