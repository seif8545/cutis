// src/components/Navigation.jsx
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/global.css';

const NAV_LINKS = [
  { to: '/services', label: 'Services'  },
  { to: '/doctors',  label: 'Our Team'  },
  { to: '/history',  label: 'Our Story' },
  { to: '/values',   label: 'Values'    },
];

export default function Navigation() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  const linkStyle = {
    fontSize: '0.85rem', fontWeight: '600',
    color: 'var(--text-mid)', whiteSpace: 'nowrap',
  };

  const activeLinkStyle = (path) => ({
    ...linkStyle,
    color: location.pathname === path ? 'var(--brand-blue)' : 'var(--text-mid)',
    borderBottom: location.pathname === path ? '2px solid var(--brand-blue)' : '2px solid transparent',
    paddingBottom: '2px',
  });

  return (
    <>
      <nav style={{
        position: 'sticky', top: 0, zIndex: 1000,
        background: 'rgba(255,255,255,0.97)',
        backdropFilter: 'blur(10px)',
        borderBottom: '4px solid var(--brand-green)',
        boxShadow: 'var(--shadow-sm)',
      }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px', gap: 16 }}>

          {/* Logo */}
          <Link to="/" onClick={close} style={{ display: 'flex', alignItems: 'center', gap: '12px', flexShrink: 0 }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--brand-blue)', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>C</div>
            <div>
              <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--brand-blue)', lineHeight: '1' }}>Cutis</div>
              <div style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green)', marginTop: '2px' }}>The Skin Clinic</div>
            </div>
          </Link>

          {/* Desktop links — always the same set regardless of route */}
          <div className="nav-desktop" style={{ gap: 24 }}>
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} style={activeLinkStyle(to)}>{label}</Link>
            ))}
            <Link to="/profile" style={activeLinkStyle('/profile')}>My Profile</Link>
            <Link to="/book" className="btn btn-primary" style={{ padding: '8px 22px', fontSize: '0.85rem' }}>
              Book Now
            </Link>
          </div>

          {/* Hamburger */}
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
            {NAV_LINKS.map(({ to, label }) => (
              <Link key={to} to={to} onClick={close} style={{
                display: 'block', padding: '13px 0',
                fontSize: '0.95rem', fontWeight: 600,
                color: location.pathname === to ? 'var(--brand-blue)' : 'var(--text-dark)',
                borderBottom: '1px solid var(--border-lt)',
              }}>
                {label}
              </Link>
            ))}
            <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
              <Link to="/book"    onClick={close} className="btn btn-primary" style={{ flex: 1, textAlign: 'center', padding: '12px 8px', fontSize: '0.88rem' }}>Book Now</Link>
              <Link to="/profile" onClick={close} className="btn btn-outline"  style={{ flex: 1, textAlign: 'center', padding: '12px 8px', fontSize: '0.88rem', borderWidth: '1px' }}>My Profile</Link>
            </div>
          </div>
        )}
      </nav>
    </>
  );
}
