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
      image: null // No image provided in the folder for Botox
    },
    {
      title: "Dermal Fillers",
      description: "Restores volume loss and smooths static wrinkles. Used for nasolabial folds, cheeks, tear troughs, and lips. Provides a plump appearance lasting 6–12 months.",
      duration: "30 Minutes",
      faqs: [
        { q: "Will I look older once it wears off?", a: "No. Filler stimulates collagen laydown, so you will often look better than before the injection even after it wears off." }
      ],
      beforeAfterLabel: "Volume restoration & contouring",
      image: "filler injection.jpg"
    },
    {
      title: "Lip Fillers",
      description: "Precisely sculpted lip augmentation using hyaluronic acid fillers to add volume, define the cupid's bow, and enhance natural lip shape. Results are immediate and fully reversible.",
      duration: "30 Minutes",
      faqs: [
        { q: "Will my lips look natural?", a: "In expert hands, lip fillers create a balanced, proportionate result rather than an overfilled look. We always aim for subtle enhancement first." }
      ],
      beforeAfterLabel: "Lip volume & definition",
      image: "lip fillers.jpg"
    },
    {
      title: "Cheek & Chin Contouring",
      description: "Targeted dermal filler injections to define the jawline, augment the chin, and restore youthful volume to the cheeks for a perfectly balanced facial profile.",
      duration: "45 Minutes",
      faqs: [],
      beforeAfterLabel: "Facial profiling & definition",
      image: "cheek chin filler.jpg"
    },
    {
      title: "Sfera Injection",
      description: "Advanced bio-remodeling injections designed to target skin laxity, deeply hydrate, and improve overall tissue quality from within.",
      duration: "20 Minutes",
      faqs: [],
      beforeAfterLabel: "Skin laxity & hydration",
      image: "sfera injection.jpg"
    }
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
      image: null // No image provided
    },
    {
      title: "Tattoo Removal",
      description: "Utilising advanced Q-switched laser technology to achieve high-clearance tattoo removal in progressive stages.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Progressive ink clearance",
      image: "tattoo removal.jpg"
    },
    {
      title: "Q-Switched Laser for Pigmentation",
      description: "Specialised high-intensity laser treatment for effectively clearing stubborn birthmarks, deep freckles, age spots, and complex pigmentations.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Pigment clearance",
      image: "q switched laser.jpg"
    },
    {
      title: "Scar Treatment with Laser",
      description: "Fractional laser resurfacing targets acne scars and traumatic scars by stimulating deep collagen remodelling. Achieves smooth, even skin texture over a course of sessions.",
      duration: "Variable",
      faqs: [
        { q: "How many sessions are needed?", a: "Most scar patients see significant improvement in 4–6 sessions." }
      ],
      beforeAfterLabel: "Scar texture & tone improvement",
      image: "scar laser.jpg"
    },
    {
      title: "Advanced Scar Revision",
      description: "Intensive laser protocols specifically designed for severe, stubborn, or hypertrophic scarring, utilizing deeper penetrative wavelengths.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Deep scar tissue remodeling",
      image: "scar laser 2.jpg"
    }
  ],
  "Clinical & Surgical": [
    {
      title: "CO2 Laser Resurfacing",
      description: "Gold-standard skin peeling and resurfacing. Removes outer layers to dramatically improve skin texture, fine lines, and wide pores.",
      duration: "Variable",
      faqs: [
        { q: "Is there downtime?", a: "Yes, patients typically experience 3-5 days of redness and peeling." }
      ],
      beforeAfterLabel: "Skin texture & clarity",
      image: "co2 laser.jpg"
    },
    {
      title: "Alopecia Treatment",
      description: "Tailored treatment programmes for various forms of hair loss, including androgenic alopecia and alopecia areata to stimulate follicles and new hair growth.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Hair density & regrowth",
      image: "alopecia.jpg"
    },
    {
      title: "Hair Restoration Therapy",
      description: "Comprehensive medical and topical treatments aimed at stopping hair thinning and restoring optimal scalp health.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Follicle stimulation",
      image: "hair treatment.jpg"
    },
    {
      title: "Mesotherapy",
      description: "Micro-injections of potent vitamins, enzymes, and plant extracts tailored to rejuvenate skin, tighten laxity, or target localized areas.",
      duration: "30 Minutes",
      faqs: [],
      beforeAfterLabel: "Skin rejuvenation",
      image: "mesotherapy.jpg"
    },
    {
      title: "Burn Scar Treatment",
      description: "A comprehensive multi-modal protocol combining fractional laser, microneedling, and injectable treatments to improve the appearance, texture, and suppleness of burn scars.",
      duration: "Variable",
      faqs: [
        { q: "Can old burn scars be treated?", a: "Yes. Even mature burn scars respond well to combined protocols, showing significant softening." }
      ],
      beforeAfterLabel: "Scar softening & colour normalisation",
      image: "burn scar.jpg"
    },
    {
      title: "Skin Tags Removal",
      description: "Safe, rapid, and virtually painless removal of skin tags, moles, and benign skin lesions using precision electrocautery or cryotherapy.",
      duration: "15 Minutes",
      faqs: [],
      beforeAfterLabel: "Lesion removal & healing",
      image: "skin tags removal.jpg"
    },
    {
      title: "Minigrafting for Vitiligo",
      description: "A surgical treatment for resistant yet stable Vitiligo cases. Achieves a 75% success rate for re-pigmentation.",
      duration: "Surgical",
      faqs: [],
      beforeAfterLabel: "Re-pigmentation progress",
      image: null
    },
    {
      title: "General Dermatology Services",
      description: "Treatment of warts (laser/cryotherapy), Dermaroller, and Dermoscopy for comprehensive skin lesion analysis.",
      duration: "Variable",
      faqs: [],
      beforeAfterLabel: "Skin health outcomes",
      image: null
    }
  ]
};

// ── Updated Single-Image Before / After panel ─────────────────
function BeforeAfterPanel({ label, image }) {
  if (!image) return null; // Failsafe

  return (
    <div style={{ marginTop: 28 }}>
      {/* Section label */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
        <div style={{ height: 1, flex: 1, background: 'var(--border-lt)' }} />
        <span style={{
          fontSize: '0.68rem', fontWeight: 700, textTransform: 'uppercase',
          letterSpacing: '0.12em', color: 'var(--text-muted)'
        }}>
          Before &amp; After — {label}
        </span>
        <div style={{ height: 1, flex: 1, background: 'var(--border-lt)' }} />
      </div>

      {/* Single Image Frame */}
      <div style={{ 
        borderRadius: 14, 
        overflow: 'hidden', 
        border: '1px solid var(--border-lt)', 
        background: '#f8fafc',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Assumes images will be placed in the public/images/ directory */}
        <img 
          src={`/images/${image}`} 
          alt={`Before and After ${label}`} 
          style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
        />
      </div>

      {/* Caption */}
      <p style={{
        fontSize: '0.75rem', color: 'var(--text-muted)', textAlign: 'center',
        marginTop: 10, fontStyle: 'italic',
      }}>
        Representative results may vary.
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

      {/* Before / After toggle - ONLY shows if an image exists */}
      {service.image && (
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
            maxHeight: open ? '800px' : '0', // Increased max-height to accommodate tall images
            transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
          }}>
            <BeforeAfterPanel label={service.beforeAfterLabel} image={service.image} />
          </div>
        </div>
      )}
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