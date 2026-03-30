// src/components/Footer.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/global.css';

const BRANCHES = [
  { name: "Heliopolis", address: "14 Ibrahim Al-Laqqani St., Korba", phone: "0100 90 70 000" },
  { name: "Mohandeseen", address: "Moustafa Mahmoud Sq., Watany Bank Bldg.", phone: "0100 90 70 000" },
  { name: "Sheikh Zayed", address: "Beverly Hills, Building 9", phone: "0100 90 70 000" },
  { name: "New Cairo", address: "5th Settlement, South Teseen Rd.", phone: "0100 90 70 000" }
];

export default function Footer() {
  return (
<footer style={{ background: '#0a0f1a', color: '#f8fafc', paddingTop: '80px', paddingBottom: '30px' }}>    
  <div className="container">
        
        <div className="grid-4" style={{ marginBottom: '60px', gap: '40px' }}>
          
          {/* Brand Column */}
          <div style={{ gridColumn: 'span 1' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <div style={{ width: '36px', height: '36px', background: 'var(--brand-green)', borderRadius: '8px', color: '#0f172a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.4rem', fontWeight: 'bold' }}>C</div>
              <div>
                <div style={{ fontSize: '1.3rem', fontWeight: 'bold', color: '#fff', lineHeight: '1' }}>Cutis</div>
                <div style={{ fontSize: '0.6rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--brand-green)', marginTop: '2px' }}>The Skin Clinic</div>
              </div>
            </div>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8', lineHeight: '1.7', marginBottom: '20px' }}>
              Founded in 1964 by Prof. Dr. Abdel-Rahim Abdallah. Where academic dermatological excellence meets compassionate, world-class skin care.
            </p>
          </div>

     {/* Quick Links */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>About Cutis</h4>
            <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <li><Link to="/history" style={{ fontSize: '0.85rem', color: '#cbd5e1', transition: 'color 0.2s' }}>Our History</Link></li>
              <li><Link to="/values" style={{ fontSize: '0.85rem', color: '#cbd5e1', transition: 'color 0.2s' }}>Core Values</Link></li>
              <li><a href="/#services" style={{ fontSize: '0.85rem', color: '#cbd5e1', transition: 'color 0.2s' }}>Clinical Departments</a></li>
              <li><Link to="/book" style={{ fontSize: '0.85rem', color: 'var(--brand-green)', fontWeight: '600' }}>Book Consultation →</Link></li>
            </ul>
          </div>

          {/* Locations List 1 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Primary Clinics</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {BRANCHES.slice(0, 2).map(b => (
                <div key={b.name}>
                  <div style={{ color: 'var(--brand-blue)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>{b.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{b.address}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Locations List 2 */}
          <div>
            <h4 style={{ fontSize: '1.1rem', color: '#fff', marginBottom: '20px', fontFamily: 'var(--font-serif)' }}>Expansion Clinics</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {BRANCHES.slice(2, 4).map(b => (
                <div key={b.name}>
                  <div style={{ color: 'var(--brand-blue)', fontWeight: '600', fontSize: '0.9rem', marginBottom: '4px' }}>{b.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{b.address}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div style={{ borderTop: '1px solid #334155', paddingTop: '30px', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '20px' }}>
          <p style={{ fontSize: '0.75rem', color: '#64748b' }}>
            © {new Date().getFullYear()} Cutis Dermatology & Laser Clinic. All rights reserved. Registered with the Egyptian Medical Syndicate.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Link to="/admin" style={{ fontSize: '0.75rem', color: '#64748b' }}>Staff Portal</Link>
            <span style={{ color: '#334155' }}>|</span>
            <a href="#" style={{ fontSize: '0.75rem', color: '#64748b' }}>Privacy Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
