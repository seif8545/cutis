// src/pages/ServicesPage.jsx
import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const CATEGORIES = ["Injectables", "Laser Center", "Clinical & Surgical"];

const SERVICES_DATA = {
  "Injectables": [
    {
      title: "Botox",
      description: "Get rid of expression wrinkles (forehead, eyes, and eyebrows) for a smooth facial appearance. Results start in 2 days and last 4-6 months. Also highly effective for treating excessive sweating (hands, feet, and under arms).",
      duration: "15 Minutes",
      faqs: [
        { q: "Is Botox toxic?", a: "Botox was first used on humans in 1980. The dose injected for cosmetic purposes is 1/100 of a harmful dose." },
        { q: "What is the best age to start?", a: "Recent studies suggest starting in the late 20s can help develop fewer wrinkles than aging naturally." }
      ]
    },
    {
      title: "Dermal Fillers",
      description: "Restores volume loss and smooths static wrinkles. Used for nasolabial folds, cheeks, tear troughs, and lips. Provides a plump appearance lasting 6-12 months.",
      duration: "30 Minutes",
      faqs: [
        { q: "Will I look older once it wears off?", a: "No. Filler stimulates collagen laydown, so you will often look better than before the injection even after it wears off." }
      ]
    }
  ],
  "Laser Center": [
    {
      title: "Laser Hair Removal",
      description: "Effective and safe permanent hair reduction. Cutis utilizes multiple laser technologies suitable for all skin types. Most patients expect 80-90% hair reduction.",
      duration: "Variable",
      faqs: [
        { q: "Can laser cause skin cancer?", a: "No. Laser is non-ionizing light; it cannot induce skin cancer." },
        { q: "How many sessions are needed?", a: "Typically 6 to 8 sessions spaced 4-6 weeks apart." }
      ]
    },
    {
      title: "Tattoo Removal",
      description: "Utilizing advanced Q-switched laser technology to achieve high-clearance tattoo removal in progressive stages.",
      duration: "Variable",
      faqs: []
    },
    {
      title: "Vascular & Pigment Lasers",
      description: "Specialized treatment for Varicosities (veins), Birthmarks, Freckles, and Age Spots using Alexandrite and Nd:YAG platforms.",
      duration: "Variable",
      faqs: []
    }
  ],
  "Clinical & Surgical": [
    {
      title: "Skin Peeling & Resurfacing",
      description: "Removes outer layers to improve skin texture. Includes Chemical Resurfacing, Microlaser Peels (1-day downtime), and Fractional Laser Resurfacing for acne scars and wide pores.",
      duration: "Variable",
      faqs: [
        { q: "How many sessions for acne scars?", a: "Around 4 to 5 sessions, spaced 4 to 6 weeks apart." }
      ]
    },
    {
      title: "Minigrafting for Vitiligo",
      description: "A surgical treatment for resistant yet stable Vitiligo cases. Achieves a 75% success rate for re-pigmentation, often combined with UV phototherapy.",
      duration: "Surgical",
      faqs: []
    },
    {
      title: "General Dermatology Services",
      description: "Treatment of warts (laser/cryotherapy), removal of skin tags, Mesotherapy, Dermaroller, and Dermoscopy for skin lesion analysis.",
      duration: "Variable",
      faqs: []
    }
  ]
};

export default function ServicesPage() {
  const [activeTab, setActiveTab] = useState("Injectables");

  useEffect(() => { window.scrollTo(0, 0); }, []);

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>
      
      {/* Hero Section */}
      <section style={{ backgroundColor: 'var(--text-dark)', color: '#fff', paddingTop: '100px', paddingBottom: '80px', textAlign: 'center' }}>
        <div className="container">
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our expertise</span>
          <h1 className="heading-lg" style={{ color: '#fff' }}>Medical & Aesthetic Services</h1>
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
            <div key={index} className="bento-item" style={{ gridColumn: 'span 6' }}>
              <h3 style={{ fontSize: '1.8rem', color: 'var(--brand-blue)', marginBottom: '12px' }}>{service.title}</h3>
              <div style={{ background: 'var(--brand-blue-lt)', display: 'inline-block', padding: '4px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700', marginBottom: '20px', color: 'var(--brand-blue-dk)' }}>
                ⏱ Session: {service.duration}
              </div>
              <p style={{ color: 'var(--text-mid)', lineHeight: '1.7', marginBottom: '24px' }}>{service.description}</p>
              
              {service.faqs.length > 0 && (
                <div style={{ background: 'var(--bg-main)', padding: '20px', borderRadius: '16px' }}>
                  <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', marginBottom: '12px', color: 'var(--text-dark)' }}>Common Questions</h4>
                  {service.faqs.map((f, i) => (
                    <div key={i} style={{ marginBottom: '12px' }}>
                      <div style={{ fontWeight: '600', fontSize: '0.9rem', color: 'var(--brand-blue-dk)' }}>Q: {f.q}</div>
                      <div style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>A: {f.a}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
