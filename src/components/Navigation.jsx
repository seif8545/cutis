// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/global.css';

export default function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  const linkStyle = {
    fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-mid)', whiteSpace: 'nowrap',
  };

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '4px solid var(--brand-green)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>

          {/* Logo */}
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--brand-blue)', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>C</div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--brand-blue)', lineHeight: '1' }}>Cutis</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green)', marginTop: '2px' }}>The Skin Clinic</div>
            </div>
          </Link>

          {/* Desktop links */}
          <div className="nav-desktop">
            <Link to="/services" style={linkStyle}>Our Services</Link>
            <Link to="/doctors"  style={linkStyle}>Medical Team</Link>
            <Link to="/history"  style={linkStyle}>Our History</Link>
            <Link to="/values"   style={linkStyle}>Core Values</Link>
            {isHome && (
              <>
                <a href="#services"  style={linkStyle}>Treatments</a>
                <a href="#locations" style={linkStyle}>Branches</a>
              </>
            )}
            <Link to="/book"  className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Book Consultation</Link>
            <Link to="/admin" className="btn btn-outline"  style={{ padding: '8px 20px', fontSize: '0.85rem', borderWidth: '1px' }}>Staff Portal</Link>
          </div>

          {/* Hamburger — shown only on mobile via CSS */}
          <button
            className="nav-hamburger"
            onClick={() => setOpen(v => !v)}
            aria-label="Toggle menu"
          >
            <span className={`bar bar-1 ${open ? 'open' : ''}`} />
            <span className={`bar bar-2 ${open ? 'open' : ''}`} />
            <span className={`bar bar-3 ${open ? 'open' : ''}`} />
          </button>
        </div>

        {/* Mobile dropdown */}
        {open && (
          <div style={{
            position: 'absolute', top: '100%', left: 0, right: 0,
            background: '#fff',
            borderTop: '1px solid var(--border-lt)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.12)',
            padding: '12px 24px 24px',
            zIndex: 999,
          }}>
            {[
              { to: '/services', label: 'Our Services' },
              { to: '/doctors',  label: 'Medical Team' },
              { to: '/history',  label: 'Our History'  },
              { to: '/values',   label: 'Core Values'  },
            ].map(({ to, label }) => (
              <Link key={to} to={to} onClick={close} style={{
                display: 'block', padding: '13px 0',
                fontSize: '0.95rem', fontWeight: 600,
                color: 'var(--text-dark)',
                borderBottom: '1px solid var(--border-lt)',
              }}>
                {label}
              </Link>
            ))}
            {isHome && (
              <>
                <a href="#services"  onClick={close} style={{ display: 'block', padding: '13px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-dark)', borderBottom: '1px solid var(--border-lt)' }}>Treatments</a>
                <a href="#locations" onClick={close} style={{ display: 'block', padding: '13px 0', fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-dark)', borderBottom: '1px solid var(--border-lt)' }}>Branches</a>
              </>
            )}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <Link to="/book"  onClick={close} className="btn btn-primary" style={{ flex: 1, textAlign: 'center', padding: '12px 8px', fontSize: '0.88rem' }}>Book Consultation</Link>
              <Link to="/admin" onClick={close} className="btn btn-outline"  style={{ flex: 1, textAlign: 'center', padding: '12px 8px', fontSize: '0.88rem', borderWidth: '1px' }}>Staff Portal</Link>
            </div>
          </div>
        )}
      </nav>

      <style>{`
        /* Desktop: show links, hide burger */
        .nav-desktop {
          display: flex;
          align-items: center;
          gap: 20px;
        }
        .nav-hamburger {
          display: none;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 5px;
          width: 42px;
          height: 42px;
          border-radius: 8px;
          background: transparent;
          border: 1.5px solid var(--border-lt);
          cursor: pointer;
          flex-shrink: 0;
          padding: 0;
        }
        .bar {
          display: block;
          width: 18px;
          height: 2px;
          background: var(--text-dark);
          border-radius: 2px;
          transition: transform 0.22s ease, opacity 0.22s ease;
        }
        .bar-1.open { transform: translateY(7px) rotate(45deg); }
        .bar-2.open { opacity: 0; }
        .bar-3.open { transform: translateY(-7px) rotate(-45deg); }

        /* Mobile: hide links, show burger */
        @media (max-width: 768px) {
          .nav-desktop  { display: none; }
          .nav-hamburger { display: flex; }
        }
      `}</style>
    </>
  );
}
