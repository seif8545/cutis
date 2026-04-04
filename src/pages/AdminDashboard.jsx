import React, { useState } from 'react';
import '../styles/global.css';

const MOCK_BOOKINGS = [
  { id: 1, name: "Sara Ahmed", branch: "Sheikh Zayed", department: "Cosmetic Dermatology", doctor: "Prof. Marwa Abdallah", date: "2026-04-10", time: "10:00 AM", status: "Confirmed" },
  { id: 2, name: "Karim Hassan", branch: "Fifth Settlement", department: "Advanced Laser Center", doctor: "Dr. Nehad Youssef", date: "2026-04-10", time: "11:30 AM", status: "Pending" },
  { id: 3, name: "Mona Samir", branch: "Heliopolis", department: "Clinical Dermatology", doctor: "Prof. Abdel-Rahim Abdallah", date: "2026-04-11", time: "09:00 AM", status: "Confirmed" },
  { id: 4, name: "Ahmed Fouad", branch: "Mohandeseen", department: "Cosmetic Dermatology", doctor: "A. Prof. Mahmoud Abdallah", date: "2026-04-11", time: "02:00 PM", status: "Cancelled" },
  { id: 5, name: "Layla Mostafa", branch: "Sheikh Zayed", department: "Advanced Laser Center", doctor: "Dr. Azza El-Azhary", date: "2026-04-12", time: "01:00 PM", status: "Confirmed" },
];

const STATUS_COLORS = {
  Confirmed: { bg: "#e6f4ea", color: "#2d7a3a" },
  Pending:   { bg: "#fff8e1", color: "#b07d00" },
  Cancelled: { bg: "#fdecea", color: "#c0392b" },
};

export default function AdminDashboard() {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterBranch, setFilterBranch] = useState('All');

  const branches = ['All', ...new Set(MOCK_BOOKINGS.map(b => b.branch))];
  const statuses = ['All', 'Confirmed', 'Pending', 'Cancelled'];

  const filtered = MOCK_BOOKINGS.filter(b => {
    const matchSearch = b.name.toLowerCase().includes(search.toLowerCase()) ||
      b.department.toLowerCase().includes(search.toLowerCase()) ||
      b.doctor.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchBranch = filterBranch === 'All' || b.branch === filterBranch;
    return matchSearch && matchStatus && matchBranch;
  });

  const total = MOCK_BOOKINGS.length;
  const confirmed = MOCK_BOOKINGS.filter(b => b.status === 'Confirmed').length;
  const pending = MOCK_BOOKINGS.filter(b => b.status === 'Pending').length;
  const cancelled = MOCK_BOOKINGS.filter(b => b.status === 'Cancelled').length;

  return (
    <div style={{ minHeight: '100vh', background: '#f7f8fc', fontFamily: "'DM Sans', sans-serif", color: '#21326c' }}>
      {/* Header */}
      <div style={{ background: '#21326c', padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <h1 style={{ margin: 0, color: '#fff', fontSize: '1.5rem', fontWeight: 700 }}>Cutis Admin Dashboard</h1>
        <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>Appointments Overview</span>
      </div>

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '2rem 1rem' }}>
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
          {[
            { label: 'Total Bookings', value: total, accent: '#21326c' },
            { label: 'Confirmed', value: confirmed, accent: '#2d7a3a' },
            { label: 'Pending', value: pending, accent: '#b07d00' },
            { label: 'Cancelled', value: cancelled, accent: '#c0392b' },
          ].map(stat => (
            <div key={stat.label} style={{ background: '#fff', borderRadius: 12, padding: '1.25rem 1.5rem', boxShadow: '0 2px 8px rgba(33,50,108,0.08)', borderTop: `4px solid ${stat.accent}` }}>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: stat.accent }}>{stat.value}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.7, marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          <input
            type="text"
            placeholder="Search by name, doctor, or department..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ flex: '1 1 260px', padding: '0.6rem 1rem', borderRadius: 8, border: '1.5px solid #d0d5e8', fontSize: '0.95rem', outline: 'none', color: '#21326c' }}
          />
          <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: 8, border: '1.5px solid #d0d5e8', fontSize: '0.95rem', color: '#21326c', background: '#fff' }}>
            {statuses.map(s => <option key={s}>{s}</option>)}
          </select>
          <select value={filterBranch} onChange={e => setFilterBranch(e.target.value)}
            style={{ padding: '0.6rem 1rem', borderRadius: 8, border: '1.5px solid #d0d5e8', fontSize: '0.95rem', color: '#21326c', background: '#fff' }}>
            {branches.map(b => <option key={b}>{b}</option>)}
          </select>
        </div>

        {/* Table */}
        <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px rgba(33,50,108,0.08)', overflow: 'hidden' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
            <thead>
              <tr style={{ background: '#f0f2fa' }}>
                {['Patient', 'Branch', 'Department', 'Doctor', 'Date', 'Time', 'Status'].map(h => (
                  <th key={h} style={{ padding: '0.85rem 1rem', textAlign: 'left', fontWeight: 600, color: '#21326c', borderBottom: '2px solid #d0d5e8' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: '2rem', textAlign: 'center', color: '#999' }}>No bookings found.</td>
                </tr>
              ) : filtered.map((b, i) => (
                <tr key={b.id} style={{ background: i % 2 === 0 ? '#fff' : '#f9fafd', borderBottom: '1px solid #eef0f7' }}>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 500 }}>{b.name}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{b.branch}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{b.department}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{b.doctor}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{b.date}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{b.time}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>
                    <span style={{
                      padding: '3px 10px', borderRadius: 20, fontSize: '0.82rem', fontWeight: 600,
                      background: STATUS_COLORS[b.status]?.bg,
                      color: STATUS_COLORS[b.status]?.color,
                    }}>{b.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={{ marginTop: '1rem', fontSize: '0.85rem', opacity: 0.6, textAlign: 'right' }}>
          Showing {filtered.length} of {total} bookings
        </div>
      </div>
    </div>
  );
}
