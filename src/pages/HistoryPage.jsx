import React, { useState, useEffect } from 'react';
import '../styles/global.css';

// ── Timeline data (full authoritative text) ───────────────────
const TIMELINE = [
  {
    year: '1938 – 1959',
    heading: 'The Beginning of a Legacy',
    text: 'Born in 1938, Prof. Dr. Abdel-Rahim Abdallah graduated in 1959 as second in his class from the Faculty of Medicine, Ain Shams University — a distinction that foreshadowed a lifetime of academic excellence.',
  },
  {
    year: '1964',
    heading: 'The First Clinic',
    text: 'He established his clinic in Heliopolis, which quickly became the most professional Dermatology & Venereology clinic in Heliopolis and subsequently in all of Egypt — setting a standard that the specialty had not seen before.',
  },
  {
    year: '1966 – 1990',
    heading: 'Academic Leadership',
    text: 'In 1966 he received his PhD (Doctorate degree) and became a lecturer at Ain Shams University, after which he became the Chairman of the department in 1990. His academic contributions shaped generations of Egyptian dermatologists.',
  },
  {
    year: 'The Guru of Dermatology',
    heading: 'International Recognition',
    text: 'Prof. Dr. Abdel-Rahim Abdallah is regarded as the Guru of Dermatology in Egypt and the Middle East. He lectured in several top Medical Schools & Universities in Europe, USA and the Far East, in addition to chairing several International Congresses.\n\nHolder of the prominent Gustav Riehl Prize of Germany — awarded in recognition of his advanced research in Medicine — he is the author of the first Atlas of Dermatology in the Middle East and Co-author of "Dermatology", Bolongia, Jorizzo, Rapini et al., Mosby, 2003, 2007 & 2012.',
  },
  {
    year: '1999',
    heading: 'Cutis Is Born',
    text: 'With the help of Prof. Dr. Marwa Abdallah, Cutis "The Skin Clinic" was founded as a nucleus for establishing the first Medical Institution for Skin Diseases & Cosmetic Services in Egypt. As the practice grew, more branches opened across Heliopolis, where the best consultants and doctors practiced — all trained and educated to the highest standard for which Cutis stands.',
  },
  {
    year: '2006',
    heading: 'A New Era of Technology',
    text: 'A. Prof. Dr. Mahmoud Abdallah took Cutis to a whole new level of expansion in size, technology, and equipment. By that time, laser treatments were introduced to Egypt on a wide scale, and Cutis was at the forefront.',
  },
  {
    year: '2008',
    heading: 'Egypt\'s School of Dermatology',
    text: 'Cutis became the most comprehensive, wide-ranged Dermatology Clinic in Egypt, offering many services and treatments along with the most up-to-date techniques — which made it a true school for Dermatology in Egypt.',
  },
  {
    year: '2011 – 2012',
    heading: 'Mohandessin & A New Vision',
    text: 'Cutis added new consultants and doctors and opened its branch in Mohandessin in late 2012, led by Dr. Marwa Asaad. The clinic reshaped its strategy with a clear new Vision & Mission — bringing premium dermatological care to all of Greater Cairo.',
  },
  {
    year: '2019',
    heading: 'East Cairo: Fifth Settlement',
    text: 'Driven by a commitment to make premium dermatological care more accessible, Cutis expanded eastward and officially opened its state-of-the-art branch in the Fifth Settlement, New Cairo.',
  },
  {
    year: '2020',
    heading: 'West Cairo: Sheikh Zayed',
    text: 'Continuing its strategic expansion, Cutis brought its world-class laser platforms and renowned clinical expertise to the west of Cairo with the launch of the Sheikh Zayed branch at Capital Business Park.',
  },
];

// ── Branch location data ──────────────────────────────────────
const BRANCHES = [
  {
    name: 'Korba — Heliopolis',
    tagline: 'Where it all began',
    area: 'Heliopolis, Cairo',
    since: 'Est. 1964',
    description: 'The birthplace of Cutis. Over six decades of clinical excellence in the heart of Heliopolis.',
    color: '#7a5c00',
    light: '#fffbe6',
    accent: '#c9a84c',
    pin: '🏛',
    mapUrl: 'https://maps.app.goo.gl/b4n55hJeWLsdtq8i7',
  },
  {
    name: 'Mohandessin',
    tagline: 'The western landmark',
    area: 'Giza, Cairo',
    since: 'Est. 2012',
    description: 'Cutis\'s first major expansion, now one of Cairo\'s most visited dermatology destinations.',
    color: '#21326c',
    light: '#eef2ff',
    accent: '#009cdb',
    pin: '🏢',
    mapUrl: 'https://maps.app.goo.gl/5XY68gy9ygZ5PySNA',
  },
  {
    name: 'Fifth Settlement',
    tagline: 'East Cairo\'s gem',
    area: 'New Cairo',
    since: 'Est. 2019',
    description: 'A state-of-the-art facility bringing Cutis\'s full spectrum of treatments to New Cairo.',
    color: '#0891b2',
    light: '#e0f7ff',
    accent: '#0ea5c9',
    pin: '🌿',
    mapUrl: 'https://maps.app.goo.gl/sXhVLW3UJgTi1LtQ9',
  },
  {
    name: 'Sheikh Zayed',
    tagline: 'West Cairo\'s finest',
    area: 'Capital Business Park',
    since: 'Est. 2020',
    description: 'Our newest flagship, pairing world-class laser platforms with Cutis\'s unmatched clinical expertise.',
    color: '#2d7a3a',
    light: '#e6f4ea',
    accent: '#4ade80',
    pin: '⚕',
    mapUrl: 'https://maps.app.goo.gl/dLVMhXoaESLVyd2X7',
  },
];

// ── Branch card ───────────────────────────────────────────────
function BranchCard({ branch }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 24,
        overflow: 'hidden',
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.15), 0 0 0 2px ${branch.accent}`
          : '0 4px 20px rgba(0,0,0,0.08)',
        transform: hovered ? 'translateY(-6px)' : 'none',
        transition: 'all 0.3s cubic-bezier(0.25,0.8,0.25,1)',
        cursor: 'default',
        background: '#fff',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Coloured header */}
      <div style={{
        background: hovered
          ? branch.color
          : branch.light,
        padding: '28px 28px 22px',
        transition: 'background 0.3s ease',
        borderBottom: `3px solid ${branch.accent}`,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
          <span style={{
            fontSize: '2.2rem',
            filter: hovered ? 'brightness(1.2)' : 'none',
            transition: 'filter 0.3s',
          }}>{branch.pin}</span>
          <span style={{
            fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em',
            padding: '4px 10px', borderRadius: 20,
            background: hovered ? 'rgba(255,255,255,0.2)' : branch.accent + '22',
            color: hovered ? '#fff' : branch.color,
            border: `1px solid ${hovered ? 'rgba(255,255,255,0.3)' : branch.accent + '55'}`,
            transition: 'all 0.3s',
          }}>{branch.since}</span>
        </div>
        <h3 style={{
          margin: 0, fontFamily: 'var(--font-serif)', fontSize: '1.5rem',
          color: hovered ? '#fff' : branch.color,
          lineHeight: 1.15, transition: 'color 0.3s',
        }}>{branch.name}</h3>
        <div style={{
          fontSize: '0.78rem', fontWeight: 600, marginTop: 4,
          color: hovered ? 'rgba(255,255,255,0.7)' : branch.accent,
          transition: 'color 0.3s',
          textTransform: 'uppercase', letterSpacing: '0.07em',
        }}>{branch.tagline}</div>
      </div>

      {/* Body */}
      <div style={{ padding: '20px 28px 24px', flex: 1, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: 5 }}>
          <span>📍</span> {branch.area}
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-mid)', lineHeight: 1.65, margin: 0, flex: 1 }}>
          {branch.description}
        </p>
        <a
          href={branch.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            gap: 7, padding: '11px 20px', borderRadius: 100,
            background: hovered ? branch.color : 'transparent',
            color: hovered ? '#fff' : branch.color,
            border: `2px solid ${branch.color}`,
            fontWeight: 700, fontSize: '0.85rem', textDecoration: 'none',
            transition: 'all 0.25s ease',
            fontFamily: 'var(--font-sans)',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.background = branch.color;
            e.currentTarget.style.color = '#fff';
          }}
          onMouseLeave={e => {
            if (!hovered) {
              e.currentTarget.style.background = 'transparent';
              e.currentTarget.style.color = branch.color;
            }
          }}
        >
          Get Directions →
        </a>
      </div>
    </div>
  );
}

// ── Main page ─────────────────────────────────────────────────
export default function HistoryPage() {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section style={{ backgroundColor: 'var(--brand-blue)', color: '#fff', paddingTop: '100px', paddingBottom: '100px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our Roots</span>
          <h1 className="heading-lg" style={{ color: '#fff', marginBottom: '20px' }}>The History of Cutis</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '640px', margin: '0 auto', opacity: 0.88, lineHeight: 1.75 }}>
            A legacy of academic rigour, pioneering research, and clinical excellence — spanning over half a century and rooted in one extraordinary life.
          </p>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: 40 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ position: 'relative' }}>
            {/* Vertical line */}
            <div style={{
              position: 'absolute', left: 28, top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, var(--brand-blue), var(--brand-green))',
              borderRadius: 2,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                  {/* Timeline node */}
                  <div style={{
                    width: 58, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6,
                  }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'var(--brand-blue)', border: '3px solid #fff',
                      boxShadow: '0 0 0 3px var(--brand-blue)',
                      zIndex: 1,
                    }} />
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1,
                    background: '#fff', padding: '28px 32px',
                    borderRadius: 20, border: '1px solid var(--border-lt)',
                    boxShadow: 'var(--shadow-sm)',
                  }}>
                    <div style={{
                      display: 'inline-block', fontSize: '0.72rem', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: 'var(--brand-blue)', background: '#eef6ff',
                      padding: '3px 12px', borderRadius: 20, marginBottom: 10,
                    }}>
                      {item.year}
                    </div>
                    <h3 style={{
                      fontSize: '1.25rem', fontFamily: 'var(--font-serif)',
                      color: 'var(--text-dark)', marginBottom: 10,
                    }}>
                      {item.heading}
                    </h3>
                    {item.text.split('\n\n').map((para, pi) => (
                      <p key={pi} style={{ color: 'var(--text-mid)', fontSize: '0.97rem', lineHeight: 1.8, marginBottom: pi < item.text.split('\n\n').length - 1 ? 12 : 0 }}>
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Locations ─────────────────────────────────────── */}
      <section style={{ background: 'var(--text-dark)', padding: '80px 0' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Find Us</span>
            <h2 className="heading-md" style={{ color: '#fff', marginBottom: 16 }}>Our Branches</h2>
            <p style={{ color: 'rgba(255,255,255,0.65)', fontSize: '1rem', maxWidth: 500, margin: '0 auto', lineHeight: 1.7 }}>
              Four locations across Cairo — each one carrying the same commitment to clinical excellence that started in 1964.
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
            gap: 24,
          }}>
            {BRANCHES.map(branch => (
              <BranchCard key={branch.name} branch={branch} />
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}
