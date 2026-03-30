// src/pages/AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
import '../styles/global.css';

// Mock Data to populate the dashboard since we don't have a real backend yet
const INITIAL_BOOKINGS = [
  { id: 'CUT-8832', name: 'Nourhan Ahmed', phone: '0101 234 5678', branch: 'Heliopolis', dept: 'Cosmetic Dermatology', status: 'Pending', date: '2026-04-02' },
  { id: 'CUT-1029', name: 'Omar Youssef', phone: '0129 876 5432', branch: 'Sheikh Zayed', dept: 'Clinical Dermatology', status: 'Confirmed', date: '2026-04-05' },
  { id: 'CUT-4511', name: 'Laila Mahmoud', phone: '0115 556 6677', branch: 'Mohandeseen', dept: 'Advanced Laser', status: 'Pending', date: '2026-04-06' }
];

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [credentials, setCredentials] = useState({ username: '', password: '' });

  // Check if admin is already logged in via session storage
  useEffect(() => {
    if (sessionStorage.getItem('admin_auth') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  // Login Handler
  const handleLogin = (e) => {
    e.preventDefault();
    if (credentials.username === 'admin' && credentials.password === 'admin123') {
      sessionStorage.setItem('admin_auth', 'true');
      setIsAuthenticated(true);
    } else {
      alert('Invalid credentials. Try admin / admin123');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
  };

  // Mock Action Handler
  const updateStatus = (id, newStatus) => {
    setBookings(bookings.map(b => b.id === id ? { ...b, status: newStatus } : b));
  };

  // --- LOGIN VIEW ---
  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: 'calc(100vh - 70px)', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-main)' }}>
        <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', width: '100%', maxWidth: '400px', boxShadow: 'var(--shadow-md)', border: '1px solid var(--border-lt)' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', background: 'var(--brand-blue)', borderRadius: '12px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: 'bold', margin: '0 auto 16px' }}>C</div>
            <h2 className="heading-md" style={{ marginBottom: '8px', fontSize: '1.8rem' }}>Staff Portal</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Secure access for clinic management</p>
          </div>
          
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Username</label>
              <input type="text" className="form-input" placeholder="admin" value={credentials.username} onChange={e => setCredentials({...credentials, username: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-lt)' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Password</label>
              <input type="password" className="form-input" placeholder="••••••••" value={credentials.password} onChange={e => setCredentials({...credentials, password: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-lt)' }} />
            </div>
            <button type="submit" className="btn btn-primary" style={{ background: 'var(--brand-green)', color: '#1e293b', width: '100%', marginTop: '10px' }}>Secure Sign In</button>
            <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '10px' }}>Demo: admin / admin123</p>
          </form>
        </div>
      </div>
    );
  }

  // --- DASHBOARD VIEW ---
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;

  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 70px)', background: 'var(--bg-main)' }}>
      
      {/* Sidebar */}
      <aside style={{ width: '260px', background: '#fff', borderRight: '1px solid var(--border-lt)', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '24px', borderBottom: '1px solid var(--border-lt)' }}>
          <div style={{ fontWeight: '600', color: 'var(--brand-blue)' }}>System Administrator</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Cutis Clinic Portal</div>
        </div>
        <nav style={{ padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <button onClick={() => setActiveTab('dashboard')} style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px', fontWeight: '600', background: activeTab === 'dashboard' ? 'var(--brand-blue)' : 'transparent', color: activeTab === 'dashboard' ? '#fff' : 'var(--text-mid)', transition: 'all 0.2s' }}>📊 Overview</button>
          <button onClick={() => setActiveTab('appointments')} style={{ padding: '12px 16px', textAlign: 'left', borderRadius: '8px', fontWeight: '600', background: activeTab === 'appointments' ? 'var(--brand-blue)' : 'transparent', color: activeTab === 'appointments' ? '#fff' : 'var(--text-mid)', transition: 'all 0.2s', display: 'flex', justifyContent: 'space-between' }}>
            <span>📅 Appointments</span>
            {pendingCount > 0 && <span style={{ background: 'var(--brand-green)', color: '#1e293b', padding: '2px 8px', borderRadius: '100px', fontSize: '0.75rem' }}>{pendingCount}</span>}
          </button>
        </nav>
        <div style={{ padding: '24px' }}>
          <button onClick={handleLogout} className="btn btn-outline" style={{ width: '100%', color: 'var(--red)', borderColor: 'var(--red)' }}>Sign Out</button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main style={{ flex: 1, padding: '40px' }}>
        
        {/* TAB: Overview */}
        {activeTab === 'dashboard' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 className="heading-md" style={{ color: 'var(--brand-blue)' }}>Clinic Overview</h2>
            <div className="grid-3" style={{ marginBottom: '40px' }}>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--brand-blue)', lineHeight: '1' }}>{bookings.length}</div>
                <div style={{ color: 'var(--text-mid)', fontWeight: '600', marginTop: '8px' }}>Total Bookings</div>
              </div>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: '#f59e0b', lineHeight: '1' }}>{pendingCount}</div>
                <div style={{ color: 'var(--text-mid)', fontWeight: '600', marginTop: '8px' }}>Pending Approvals</div>
              </div>
              <div style={{ background: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '2.5rem', fontWeight: '700', color: 'var(--brand-green)', lineHeight: '1' }}>4</div>
                <div style={{ color: 'var(--text-mid)', fontWeight: '600', marginTop: '8px' }}>Active Branches</div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: Appointments */}
        {activeTab === 'appointments' && (
          <div style={{ animation: 'fadeIn 0.3s ease' }}>
            <h2 className="heading-md" style={{ color: 'var(--brand-blue)' }}>Appointments Registry</h2>
            <div style={{ background: '#fff', borderRadius: '16px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: 'var(--bg-main)', borderBottom: '2px solid var(--border-lt)', color: 'var(--text-mid)', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    <th style={{ padding: '16px 24px' }}>Ref ID</th>
                    <th style={{ padding: '16px 24px' }}>Patient Details</th>
                    <th style={{ padding: '16px 24px' }}>Clinic & Dept</th>
                    <th style={{ padding: '16px 24px' }}>Status</th>
                    <th style={{ padding: '16px 24px', textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--border-lt)' }}>
                      <td style={{ padding: '16px 24px', fontWeight: '600', color: 'var(--brand-blue)' }}>{b.id}</td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '600', color: 'var(--text-dark)' }}>{b.name}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.phone}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <div style={{ fontWeight: '500', color: 'var(--text-dark)' }}>{b.branch}</div>
                        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{b.dept}</div>
                      </td>
                      <td style={{ padding: '16px 24px' }}>
                        <span style={{ 
                          padding: '6px 12px', borderRadius: '100px', fontSize: '0.75rem', fontWeight: '700',
                          background: b.status === 'Pending' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(178, 210, 52, 0.2)',
                          color: b.status === 'Pending' ? '#b45309' : '#3f6212'
                        }}>
                          {b.status}
                        </span>
                      </td>
                      <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                        {b.status === 'Pending' ? (
                          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                            <button onClick={() => updateStatus(b.id, 'Confirmed')} style={{ background: 'var(--brand-green)', color: '#1e293b', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Accept</button>
                            <button onClick={() => updateStatus(b.id, 'Rejected')} style={{ background: 'var(--bg-main)', color: 'var(--red)', border: '1px solid var(--red)', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Reject</button>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Processed</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
