// src/components/Navigation.jsx
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/global.css';

export default function Navigation() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <nav style={{ position: 'sticky', top: 0, zIndex: 1000, background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(10px)', borderBottom: '4px solid var(--brand-green)', boxShadow: 'var(--shadow-sm)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '70px' }}>
        
        {/* Logo */}
        <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: '36px', height: '36px', background: 'var(--brand-blue)', borderRadius: '8px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>C</div>
          <div>
            <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: 'var(--brand-blue)', lineHeight: '1' }}>Cutis</div>
            <div style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green)', marginTop: '2px' }}>The Skin Clinic</div>
          </div>
        </Link>

        {/* Links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <Link to="/history" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-mid)' }}>Our History</Link>
          <Link to="/values" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-mid)' }}>Core Values</Link>
          
          {isHome && (
            <>
              <a href="#services" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-mid)' }}>Treatments</a>
              <a href="#locations" style={{ fontSize: '0.85rem', fontWeight: '600', color: 'var(--text-mid)' }}>Branches</a>
            </>
          )}
          
          <Link to="/book" className="btn btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Book Consultation</Link>
          <Link to="/admin" className="btn btn-outline" style={{ padding: '8px 20px', fontSize: '0.85rem', borderWidth: '1px' }}>Staff Portal</Link>
        </div>

      </div>
    </nav>
  );
}
