// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const CATEGORIES = ["Injectables", "Laser Center", "Clinical & Surgical"];

const SERVICES_DATA = {
  "Injectables": [
    {
      title: "Botox",
      description: "Get rid of expression wrinkles (forehead, eyes, and eyebrows) for a smooth facial appearance. Results start in 2 days and last 4–6 months. Also highly effective for treating excessive sweating (hands, feet, and underarms).",
      duration: "15 Minutes",
      faqs: [
        { q: "Is Botox toxic?", a: "Botox was first used on humans in 1980. The dose injected for cosmetic purposes is 1/100 of a harmful dose." },
        { q: "What is the best age to start?", a: "Recent studies suggest starting in the late 20s can help develop fewer wrinkles than aging naturally." }
      ],
      beforeAfterLabel: "Forehead lines & crow's feet",
    },
    {
      title: "Dermal Fillers",
      description: "Restores volume loss and smooths static wrinkles. Used for nasolabial folds, cheeks, tear troughs, and lips. Provides a plump appearance lasting 6–12 months.",
      duration: "30 Minutes",
      faqs: [
        { q: "Will I look older once it wears off?", a: "No. Filler stimulates collagen laydown, so you will often look better than before the injection even after it wears off." }
      ],
      beforeAfterLabel: "Volume restoration & contouring",
    },
    {
      title: "Lip Fillers",
      description: "Precisely sculpted lip augmentation using hyaluronic acid fillers to add volume, define the cupid's bow, and enhance natural lip shape. Results are immediate and fully reversible. Ideal for subtle enhancement or more dramatic fullness.",
      duration: "30 Minutes",
      faqs: [
        { q: "Will my lips look natural?", a: "In expert hands, lip fillers create a balanced, proportionate result rather than an overfilled look. We always aim for subtle enhancement first." },
        { q: "Is the procedure painful?", a: "Topical anaesthetic is applied beforehand and most fillers contain lidocaine, making the procedure very comfortable." }
      ],
      beforeAfterLabel: "Lip volume & definition",
    },
  ],
  "Laser Center": [
    {
      title: "Laser Hair Removal",
      description: "Effective and safe permanent hair reduction. Cutis utilises multiple laser technologies suitable for all skin types. Most patients expect 80–90% hair reduction.",
      duration: "Variable",
      faqs: [
        { q: "Can laser cause skin cancer?", a: "No. Laser is non-ionizing light; it cannot induce skin cancer." },
        { q: "How many sessions are needed?", a: "Typically 6 to 8 sessions spaced 4–6 weeks apart." }
      ],
      beforeAfterLabel: "Hair reduction over multiple sessions",
    },
    {
      title: "Tattoo Removal",
      description: "Utilising advanced Q-switched laser technology to achieve high-clearance tattoo removal in progressive stages.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Progressive ink clearance",
    },
    {
      title: "Vascular & Pigment Lasers",
      description: "Specialised treatment for Varicosities (veins), Birthmarks, Freckles, and Age Spots using Alexandrite and Nd:YAG platforms.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Pigment & vascular clearance",
    },
    {
      title: "Scar Treatment with Laser",
      description: "Fractional laser resurfacing targets acne scars, surgical scars, and traumatic scars by stimulating deep collagen remodelling. Multiple energy levels and wavelengths are combined to achieve a smooth, even skin texture over a course of sessions.",
      duration: "Variable",
      faqs: [
        { q: "How many sessions are needed?", a: "Most scar patients see significant improvement in 4–6 sessions, though deeper scars may require additional treatments." },
        { q: "Is there downtime?", a: "Mild redness and peeling for 3–5 days is typical. Fractional treatments allow faster recovery than fully ablative approaches." }
      ],
      beforeAfterLabel: "Scar texture & tone improvement",
    },
  ],
  "Clinical & Surgical": [
    {
      title: "Skin Peeling & Resurfacing",
      description: "Removes outer layers to improve skin texture. Includes Chemical Resurfacing, Microlaser Peels (1-day downtime), and Fractional Laser Resurfacing for acne scars and wide pores.",
      duration: "Variable",
      faqs: [
        { q: "How many sessions for acne scars?", a: "Around 4 to 5 sessions, spaced 4 to 6 weeks apart." }
      ],
      beforeAfterLabel: "Skin texture & clarity",
    },
    {
      title: "Minigrafting for Vitiligo",
      description: "A surgical treatment for resistant yet stable Vitiligo cases. Achieves a 75% success rate for re-pigmentation, often combined with UV phototherapy.",
      duration: "Surgical",
      faqs: [],
      beforeAfterLabel: "Re-pigmentation progress",
    },
    {
      title: "Burn Scar Treatment",
      description: "A comprehensive multi-modal protocol combining fractional laser, microneedling, and injectable treatments to improve the appearance, texture, and suppleness of burn scars. Each treatment plan is fully customised to the scar's age, depth, and location.",
      duration: "Variable",
      faqs: [
        { q: "Can old burn scars be treated?", a: "Yes. Even mature burn scars respond well to combined laser and injectable protocols, showing significant softening and colour improvement." },
        { q: "How long until I see results?", a: "Gradual improvement is seen after each session. Maximum results are typically visible 3–6 months after completing the treatment course." }
      ],
      beforeAfterLabel: "Scar softening & colour normalisation",
    },
    {
      title: "Alopecia Treatment",
      description: "Tailored treatment programmes for various forms of hair loss, including androgenic alopecia, alopecia areata, and telogen effluvium. Treatments include PRP (Platelet-Rich Plasma) therapy, Mesotherapy, topical prescriptions, and low-level laser therapy, often used in combination for optimal regrowth.",
      duration: "Variable",
      faqs: [
        { q: "What is PRP for hair loss?", a: "PRP involves drawing a small amount of the patient's blood, concentrating the growth factors, and injecting them into the scalp to stimulate follicle activity and new hair growth." },
        { q: "Is treatment permanent?", a: "Results vary by cause. Maintenance sessions are often recommended for androgenic alopecia, while areata cases may resolve fully." }
      ],
      beforeAfterLabel: "Hair density & regrowth",
    },
    {
      title: "General Dermatology Services",
      description: "Treatment of warts (laser/cryotherapy), removal of skin tags, Mesotherapy, Dermaroller, and Dermoscopy for skin lesion analysis.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Skin health outcomes",
    },
  ]
};

// ── Before / After placeholder panel ─────────────────────────
function BeforeAfterPanel({ label }) {
  return (
    <div style={{ marginTop: 28 }}>
      {/* Section label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14,
      }}>
        <div style={{ height: 1, flex: 1, background: 'var(--border-lt)' }} />
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'var(--text-muted)',
        }}>
          Before &amp; After — {label}
        </span>
        <div style={{ height: 1, flex: 1, background: 'var(--border-lt)' }} />
      </div>

      {/* Two frames */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {['Before', 'After'].map(side => (
          <div key={side} style={{
            borderRadius: 14,
            overflow: 'hidden',
            border: '1.5px dashed var(--border-lt)',
            background: '#f8fafc',
            aspectRatio: '1 / 1',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 10,
            position: 'relative',
          }}>
            {/* Placeholder graphic */}
            <div style={{
              width: 52, height: 52, borderRadius: '50%',
              background: side === 'Before' ? '#e2e8f0' : 'var(--brand-blue-lt)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={side === 'Before' ? '#94a3b8' : 'var(--brand-blue)'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                <circle cx="8.5" cy="8.5" r="1.5"/>
                <polyline points="21 15 16 10 5 21"/>
              </svg>
            </div>
            <span style={{
              fontSize: '0.78rem', fontWeight: 700,
              color: side === 'Before' ? '#94a3b8' : 'var(--brand-blue)',
              letterSpacing: '0.05em',
            }}>{side}</span>

            {/* Corner badge */}
            <div style={{
              position: 'absolute', top: 10, left: 10,
              background: side === 'Before' ? '#e2e8f0' : 'var(--brand-blue)',
              color: side === 'Before' ? '#64748b' : '#fff',
              fontSize: '0.62rem', fontWeight: 800, letterSpacing: '0.08em',
              padding: '3px 8px', borderRadius: 6,
              textTransform: 'uppercase',
            }}>{side}</div>
          </div>
        ))}
      </div>

      {/* Caption */}
      <p style={{
        fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center',
        marginTop: 10, fontStyle: 'italic',
      }}>
        Representative results may vary. Photos to be added by the clinic team.
      </p>
    </div>
  );
}

// ── Service card ──────────────────────────────────────────────
function ServiceCard({ service }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bento-item" style={{ gridColumn: 'span 6', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-blue)', marginBottom: '12px' }}>{service.title}</h3>
      <div style={{ background: 'var(--brand-blue-lt)', display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '20px', color: 'var(--brand-blue-dk)', alignSelf: 'flex-start' }}>
        ⏱ Session: {service.duration}
      </div>
      <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', marginBottom: '24px' }}>{service.description}</p>

      {service.faqs.length > 0 && (
        <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px', marginBottom: 0 }}>
          <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '12px', color: 'var(--text-dark)' }}>Common Questions</h4>
          {service.faqs.map((f, i) => (
            <div key={i} style={{ marginBottom: '12px' }}>
              <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--brand-blue-dk)' }}>Q: {f.q}</div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>A: {f.a}</div>
            </div>
          ))}
        </div>
      )}

      {/* Before / After toggle */}
      <div style={{ marginTop: 'auto', paddingTop: 20 }}>
        <button
          onClick={() => setOpen(v => !v)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'transparent', border: 'none', cursor: 'pointer',
            fontSize: '0.8rem', fontWeight: 700, color: 'var(--brand-blue)',
            padding: '6px 0', letterSpacing: '0.04em',
          }}
        >
          <span style={{
            width: 22, height: 22, borderRadius: '50%',
            background: 'var(--brand-blue-lt)', display: 'inline-flex',
            alignItems: 'center', justifyContent: 'center', fontSize: '0.7rem',
            transition: 'transform 0.25s',
            transform: open ? 'rotate(180deg)' : 'rotate(0deg)',
          }}>▼</span>
          {open ? 'Hide' : 'View'} Before &amp; After
        </button>

        <div style={{
          overflow: 'hidden',
          maxHeight: open ? '420px' : '0',
          transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
        }}>
          <BeforeAfterPanel label={service.beforeAfterLabel} />
        </div>
      </div>
    </div>
  );
}

// ── Page ──────────────────────────────────────────────────────
export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("Injectables");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>

      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--text-dark)', color: '#fff', paddingTop: '100px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our expertise</span>
          <h1 className="heading-lg" style={{ color: '#fff' }}>Medical &amp; Aesthetic Services</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '700px', margin: '0 auto', opacity: 0.8 }}>
            From critically challenging clinical treatments to the latest in cosmetic refinement using the most advanced scientific medical approach.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div className="container" style={{ marginTop: '40px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginBottom: '40px', flexWrap: 'wrap' }}>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className="btn"
              style={{
                background: activeTab === cat ? 'var(--brand-blue)' : '#fff',
                color: activeTab === cat ? '#fff' : 'var(--text-dark)',
                border: '1px solid var(--border-lt)',
                boxShadow: activeTab === cat ? 'var(--shadow-md)' : 'none'
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Content Grid */}
        <div className="bento-grid" style={{ animation: 'fadeIn 0.5s ease' }}>
          {SERVICES_DATA[activeTab].map((service, index) => (
            <ServiceCard key={`${activeTab}-${index}`} service={service} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
