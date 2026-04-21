import React, { useEffect } from 'react';
import '../styles/global.css';

// ── Timeline data ─────────────────────────────────────────────
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

      {/* ── Founder in memoriam ───────────────────────────── */}
      <section style={{ background: '#0f172a', padding: '80px 0' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(201,168,76,0.25)',
            borderRadius: 28, padding: '48px 52px',
          }}>
            {/* Photo */}
            <div style={{ flexShrink: 0 }}>
              <div style={{
                width: 210, height: 210, borderRadius: '50%',
                overflow: 'hidden',
                border: '4px solid #c9a84c',
                boxShadow: '0 0 0 8px rgba(201,168,76,0.12), 0 20px 60px rgba(0,0,0,0.4)',
              }}>
                <img
                  src="/images/dr-abdel-rehim.png"
                  alt="Prof. Dr. Abdel-Rahim Abdallah"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
                />
              </div>
              {/* Years badge */}
              <div style={{ textAlign: 'center', marginTop: 18 }}>
                <div style={{
                  display: 'inline-block',
                  fontFamily: 'var(--font-serif)', fontSize: '1rem',
                  color: '#c9a84c', letterSpacing: '0.12em',
                  padding: '6px 18px', borderRadius: 20,
                  border: '1px solid rgba(201,168,76,0.4)',
                  background: 'rgba(201,168,76,0.08)',
                }}>
                  1938 – 2020
                </div>
              </div>
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 260 }}>
              <div style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#c9a84c', marginBottom: 14,
              }}>
                In Loving Memory
              </div>
              <h2 style={{
                fontFamily: 'var(--font-serif)', fontSize: '2rem', color: '#fff',
                lineHeight: 1.15, marginBottom: 8,
              }}>
                Prof. Dr. Abdel-Rahim Abdallah
              </h2>
              <div style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', marginBottom: 24, letterSpacing: '0.04em' }}>
                Founder of Cutis · Guru of Dermatology in Egypt &amp; the Middle East
              </div>
              <div style={{ width: 40, height: 2, background: '#c9a84c', marginBottom: 24, borderRadius: 2 }} />
              <p style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.97rem', lineHeight: 1.85, margin: 0 }}>
                A visionary physician, a dedicated educator, and the founding spirit of Cutis. Prof. Abdel-Rahim Abdallah transformed the landscape of dermatology in Egypt and across the Middle East, leaving behind a legacy that lives on in every patient we serve, every doctor we train, and every branch we open.
              </p>
              <p style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.85rem', lineHeight: 1.7, marginTop: 20, fontStyle: 'italic' }}>
                "His life's work continues to guide us."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────── */}
      <section className="section" style={{ paddingBottom: 60 }}>
        <div className="container" style={{ maxWidth: 820 }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="eyebrow">A Journey Through Time</span>
            <h2 className="heading-md" style={{ marginBottom: 0 }}>Milestones</h2>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Vertical gradient line */}
            <div style={{
              position: 'absolute', left: 28, top: 0, bottom: 0,
              width: 2, background: 'linear-gradient(to bottom, var(--brand-blue), var(--brand-green))',
              borderRadius: 2,
            }} />

            <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
              {TIMELINE.map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
                  {/* Node */}
                  <div style={{ width: 58, flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: 6 }}>
                    <div style={{
                      width: 16, height: 16, borderRadius: '50%',
                      background: 'var(--brand-blue)', border: '3px solid #fff',
                      boxShadow: '0 0 0 3px var(--brand-blue)', zIndex: 1,
                    }} />
                  </div>

                  {/* Card */}
                  <div style={{
                    flex: 1, background: '#fff', padding: '28px 32px',
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
                    <h3 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', color: 'var(--text-dark)', marginBottom: 10 }}>
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

    </div>
  );
}
