import React, { useState, useMemo } from 'react';

// ── THEME ────────────────────────────────────────────────────
const C = {
  primary: '#21326c', accent: '#ff9044', light: '#f0f2fa', bg: '#f5f6fa',
  white: '#ffffff', muted: '#8892a4', border: '#e2e6f0',
  success: '#2d7a3a', successBg: '#e6f4ea',
  warn: '#b07d00',   warnBg: '#fff8e1',
  danger: '#c0392b', dangerBg: '#fdecea',
  info: '#1a56db',   infoBg: '#e8f0fe',
};

const TODAY = new Date().toISOString().slice(0, 10);

const BRANCHES = ['Sheikh Zayed', 'Fifth Settlement', 'Heliopolis', 'Mohandeseen'];

const DOCTORS = [
  { id: 2, name: 'Prof. Dr. Marwa Abdallah',      short: 'Prof. Marwa',      role: 'Professor of Dermatology',    initials: 'MW', color: '#2d7a3a' },
  { id: 3, name: 'A. Prof. Dr. Mahmoud Abdallah', short: 'A. Prof. Mahmoud', role: 'Associate Professor',         initials: 'MH', color: '#21326c' },
  { id: 4, name: 'Dr. Nehad Youssef',             short: 'Dr. Nehad',        role: 'Specialist Dermatologist',    initials: 'NY', color: '#475569' },
  { id: 5, name: 'Dr. Azza El-Azhary',            short: 'Dr. Azza',         role: 'Head of Dermatology',         initials: 'AZ', color: '#0891b2' },
];

const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
];

// Hourly rows for the schedule grid: 8 AM → 6 PM (30-min steps)
const SCHEDULE_SLOTS = Array.from({ length: 20 }, (_, i) => {
  const totalMins = 8 * 60 + i * 30;
  const h = String(Math.floor(totalMins / 60)).padStart(2, '0');
  const m = String(totalMins % 60).padStart(2, '0');
  return `${h}:${m}`;
}); // ['08:00','08:30','09:00',...,'17:30']

function slotHour(slot) { return parseInt(slot.split(':')[0], 10); }

const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

// ── APPOINTMENTS (includes today 2026-04-14 + future dates) ──
const INIT_APPOINTMENTS = [
  // Today: 2026-04-14
  { id:10, patientId:1, patientName:'Sara Ahmed',     doctorId:2, date:'2026-04-14', time:'09:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Pending',   notes:'Follow-up for melasma treatment' },
  { id:11, patientId:5, patientName:'Layla Mostafa',  doctorId:2, date:'2026-04-14', time:'10:30', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Confirmed', notes:'' },
  { id:12, patientId:2, patientName:'Karim Hassan',   doctorId:4, date:'2026-04-14', time:'10:00', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Confirmed', notes:'Tattoo removal — session 2' },
  { id:13, patientId:7, patientName:'Nadia Ibrahim',  doctorId:4, date:'2026-04-14', time:'11:30', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Pending',   notes:'' },
  { id:14, patientId:3, patientName:'Mona Samir',     doctorId:3, date:'2026-04-14', time:'09:30', department:'Clinical Dermatology',  branch:'Heliopolis',       status:'Pending',   notes:'Psoriasis follow-up' },
  { id:15, patientId:6, patientName:'Omar Khalil',    doctorId:3, date:'2026-04-14', time:'11:00', department:'Cosmetic Dermatology',  branch:'Heliopolis',       status:'Confirmed', notes:'' },
  { id:16, patientId:4, patientName:'Ahmed Fouad',    doctorId:5, date:'2026-04-14', time:'14:00', department:'Clinical Dermatology',  branch:'Sheikh Zayed',     status:'Pending',   notes:'' },
  { id:17, patientId:8, patientName:'Hassan Ramadan', doctorId:5, date:'2026-04-14', time:'15:30', department:'Advanced Laser Center', branch:'Sheikh Zayed',     status:'Confirmed', notes:'' },
  // Apr 15
  { id:18, patientId:1, patientName:'Sara Ahmed',     doctorId:2, date:'2026-04-15', time:'10:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Pending',   notes:'' },
  { id:19, patientId:6, patientName:'Omar Khalil',    doctorId:3, date:'2026-04-15', time:'09:00', department:'Cosmetic Dermatology',  branch:'Heliopolis',       status:'Confirmed', notes:'' },
  { id:20, patientId:7, patientName:'Nadia Ibrahim',  doctorId:4, date:'2026-04-15', time:'11:00', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Pending',   notes:'' },
  { id:21, patientId:8, patientName:'Hassan Ramadan', doctorId:5, date:'2026-04-15', time:'14:30', department:'Clinical Dermatology',  branch:'Sheikh Zayed',     status:'Confirmed', notes:'' },
  // Apr 16
  { id:22, patientId:3, patientName:'Mona Samir',     doctorId:2, date:'2026-04-16', time:'09:30', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Confirmed', notes:'' },
  { id:23, patientId:4, patientName:'Ahmed Fouad',    doctorId:3, date:'2026-04-16', time:'10:00', department:'Clinical Dermatology',  branch:'Heliopolis',       status:'Pending',   notes:'' },
  { id:24, patientId:2, patientName:'Karim Hassan',   doctorId:4, date:'2026-04-16', time:'14:00', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Confirmed', notes:'' },
  // Apr 17
  { id:25, patientId:5, patientName:'Layla Mostafa',  doctorId:2, date:'2026-04-17', time:'11:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Pending',   notes:'' },
  { id:26, patientId:1, patientName:'Sara Ahmed',     doctorId:5, date:'2026-04-17', time:'14:00', department:'Clinical Dermatology',  branch:'Sheikh Zayed',     status:'Confirmed', notes:'' },
  // Apr 20
  { id:27, patientId:2, patientName:'Karim Hassan',   doctorId:4, date:'2026-04-20', time:'10:00', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Pending',   notes:'' },
  { id:28, patientId:7, patientName:'Nadia Ibrahim',  doctorId:3, date:'2026-04-20', time:'11:30', department:'Cosmetic Dermatology',  branch:'Heliopolis',       status:'Confirmed', notes:'' },
];

const INIT_PATIENTS = [
  { id:1, name:'Sara Ahmed',     dob:'1990-03-15', phone:'+20 111 234 5678', email:'sara.ahmed@email.com',  bloodType:'A+',  allergies:'Penicillin',
    history:[{ date:'2026-02-10', doctor:'Prof. Dr. Marwa Abdallah', diagnosis:'Melasma', treatment:'Hydroquinone 4%, SPF 50' }] },
  { id:2, name:'Karim Hassan',   dob:'1985-07-22', phone:'+20 100 987 6543', email:'karim.h@email.com',     bloodType:'O+',  allergies:'None',
    history:[{ date:'2026-01-18', doctor:'Dr. Nehad Youssef', diagnosis:'Tattoo removal', treatment:'Q-switched Nd:YAG laser — 3 sessions' }] },
  { id:3, name:'Mona Samir',     dob:'1978-12-01', phone:'+20 122 555 9988', email:'mona.samir@email.com',  bloodType:'B-',  allergies:'Sulfa drugs',
    history:[{ date:'2026-03-02', doctor:'Prof. Dr. Abdel-Rahim Abdallah', diagnosis:'Psoriasis (plaque type)', treatment:'Topical corticosteroids, coal tar shampoo' }] },
  { id:4, name:'Ahmed Fouad',    dob:'1995-04-08', phone:'+20 105 443 2211', email:'ahmed.f@email.com',     bloodType:'AB+', allergies:'Latex',   history:[] },
  { id:5, name:'Layla Mostafa',  dob:'2000-08-19', phone:'+20 128 776 4433', email:'layla.m@email.com',     bloodType:'A-',  allergies:'None',
    history:[{ date:'2026-02-25', doctor:'Dr. Azza El-Azhary', diagnosis:'Laser hair removal — legs', treatment:'Diode laser 810nm — session 2/6' }] },
  { id:6, name:'Omar Khalil',    dob:'1982-06-30', phone:'+20 110 321 8765', email:'omar.k@email.com',      bloodType:'O-',  allergies:'Aspirin', history:[] },
  { id:7, name:'Nadia Ibrahim',  dob:'1993-01-25', phone:'+20 101 654 3210', email:'nadia.i@email.com',     bloodType:'B+',  allergies:'None',
    history:[{ date:'2026-03-15', doctor:'Dr. Nehad Youssef', diagnosis:'Acne scarring', treatment:'Fractional CO2 laser resurfacing' }] },
  { id:8, name:'Hassan Ramadan', dob:'1970-09-12', phone:'+20 115 999 1122', email:'hassan.r@email.com',    bloodType:'A+',  allergies:'None',   history:[] },
];

// ── HELPERS ──────────────────────────────────────────────────
function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_NAMES[d.getDay()]}, ${d.getDate()} ${MONTH_NAMES[d.getMonth()]}`;
}

function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

const STATUS_BADGE = {
  Confirmed: { bg: '#e6f4ea', color: '#2d7a3a' },
  Pending:   { bg: '#fff8e1', color: '#b07d00' },
  Cancelled: { bg: '#fdecea', color: '#c0392b' },
  Completed: { bg: '#e8f0fe', color: '#1a56db' },
};

// ── SMALL COMPONENTS ─────────────────────────────────────────
function Badge({ status }) {
  const s = STATUS_BADGE[status] || { bg: '#f0f0f0', color: '#666' };
  return (
    <span style={{ padding:'2px 10px', borderRadius:20, fontSize:'0.73rem', fontWeight:700, background:s.bg, color:s.color, whiteSpace:'nowrap' }}>
      {status}
    </span>
  );
}

function ActionBtn({ children, variant, onClick, disabled }) {
  const variants = {
    accept:     { bg:'#e6f4ea', color:'#2d7a3a' },
    reject:     { bg:'#fdecea', color:'#c0392b' },
    reschedule: { bg:'#fff8e1', color:'#b07d00' },
    ghost:      { bg:C.light,   color:C.primary  },
  };
  const v = variants[variant] || variants.ghost;
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: v.bg, color: v.color, border: 'none',
        borderRadius: 7, padding: '4px 11px', fontSize: '0.77rem',
        fontWeight: 700, cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1, fontFamily: 'inherit',
      }}
    >
      {children}
    </button>
  );
}

function Modal({ title, onClose, children, width = 600 }) {
  return (
    <div
      onClick={e => e.target === e.currentTarget && onClose()}
      style={{ position:'fixed', inset:0, background:'rgba(10,20,50,0.5)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
    >
      <div style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:width, maxHeight:'90vh', overflow:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.22)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1rem 1.4rem', borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, background:'#fff', zIndex:1 }}>
          <h3 style={{ margin:0, fontSize:'1rem', color:C.primary }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'1.5rem', cursor:'pointer', color:C.muted, lineHeight:1, padding:'0 4px' }}>×</button>
        </div>
        <div style={{ padding:'1.4rem' }}>{children}</div>
      </div>
    </div>
  );
}

// ── LOGIN GATE ───────────────────────────────────────────────
function LoginGate({ onLogin }) {
  const [name, setName] = useState('');
  const [pwd,  setPwd]  = useState('');
  const [error, setError] = useState('');

  const submit = e => {
    e.preventDefault();
    if (!name.trim())      { setError('Please enter your name.'); return; }
    if (pwd !== 'cutis2024') { setError('Incorrect password.'); return; }
    onLogin(name.trim());
  };

  return (
    <div style={{ minHeight:'calc(100vh - 70px)', display:'flex', alignItems:'center', justifyContent:'center', background:C.bg, padding:'2rem' }}>
      <div style={{ background:C.white, borderRadius:20, padding:'2.5rem 2rem', width:'100%', maxWidth:400, boxShadow:'0 8px 40px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign:'center', marginBottom:'2rem' }}>
          <div style={{ width:56, height:56, background:C.primary, borderRadius:14, display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 1rem', fontSize:'1.5rem', color:'#fff' }}>⚕</div>
          <h2 style={{ margin:0, color:C.primary, fontSize:'1.35rem' }}>Receptionist Portal</h2>
          <p style={{ color:C.muted, fontSize:'0.86rem', marginTop:6, marginBottom:0 }}>Cutis Clinic — Staff Access</p>
        </div>
        <form onSubmit={submit}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontWeight:600, fontSize:'0.83rem', color:C.primary, marginBottom:6 }}>Your Name</label>
            <input
              type="text" value={name} placeholder="e.g. Nour Mohamed"
              onChange={e => { setName(e.target.value); setError(''); }}
              style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.93rem', fontFamily:'inherit', boxSizing:'border-box' }}
            />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontWeight:600, fontSize:'0.83rem', color:C.primary, marginBottom:6 }}>Staff Password</label>
            <input
              type="password" value={pwd} placeholder="Enter staff password"
              onChange={e => { setPwd(e.target.value); setError(''); }}
              style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:`1.5px solid ${error ? C.danger : C.border}`, fontSize:'0.93rem', fontFamily:'inherit', boxSizing:'border-box' }}
            />
          </div>
          {error && <p style={{ color:C.danger, fontSize:'0.82rem', marginBottom:10, marginTop:0 }}>{error}</p>}
          <button type="submit" style={{ width:'100%', padding:'12px', background:C.primary, color:'#fff', border:'none', borderRadius:10, fontWeight:700, fontSize:'0.95rem', cursor:'pointer', fontFamily:'inherit' }}>
            Sign In →
          </button>
        </form>
        <p style={{ textAlign:'center', color:C.muted, fontSize:'0.78rem', marginTop:'1.4rem', marginBottom:0 }}>
          Demo password: <code style={{ background:C.light, padding:'2px 6px', borderRadius:4, fontSize:'0.82rem' }}>cutis2024</code>
        </p>
      </div>
    </div>
  );
}

// ── TOAST ────────────────────────────────────────────────────
function Toast({ message, type, onClose }) {
  const styles = {
    success: { bg:'#e6f4ea', color:'#2d7a3a', border:'#a3d9ac', icon:'✓' },
    danger:  { bg:'#fdecea', color:'#c0392b', border:'#f5b0a8', icon:'✕' },
    warn:    { bg:'#fff8e1', color:'#b07d00', border:'#f0d060', icon:'⟳' },
  };
  const s = styles[type] || styles.success;
  return (
    <div style={{ position:'fixed', bottom:32, right:32, zIndex:3000, background:s.bg, color:s.color, border:`1.5px solid ${s.border}`, borderRadius:12, padding:'14px 18px', maxWidth:400, boxShadow:'0 8px 32px rgba(0,0,0,0.13)', display:'flex', gap:10, alignItems:'flex-start', animation:'slideInRight 0.3s ease' }}>
      <span style={{ fontSize:'1.1rem', flexShrink:0 }}>{s.icon}</span>
      <div style={{ flex:1, fontSize:'0.85rem', lineHeight:1.55 }}>{message}</div>
      <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:s.color, fontSize:'1.1rem', lineHeight:1, flexShrink:0, padding:0 }}>×</button>
    </div>
  );
}

// ── PATIENT DETAIL MODAL ─────────────────────────────────────
function PatientModal({ appt, patients, onClose, onAccept, onReject, onReschedule }) {
  const patient = patients.find(p => p.id === appt.patientId);
  const doctor  = DOCTORS.find(d => d.id === appt.doctorId);
  return (
    <Modal title="Appointment Details" onClose={onClose} width={580}>
      {/* Patient card */}
      <div style={{ display:'flex', gap:12, alignItems:'center', padding:'13px 16px', background:C.light, borderRadius:10, marginBottom:18 }}>
        <div style={{ width:42, height:42, borderRadius:10, background:C.primary, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.05rem', flexShrink:0 }}>
          {patient?.name?.charAt(0) || '?'}
        </div>
        <div>
          <div style={{ fontWeight:700, color:C.primary, fontSize:'0.98rem' }}>{patient?.name}</div>
          <div style={{ fontSize:'0.8rem', color:C.muted, marginTop:2 }}>
            DOB: {patient?.dob} &nbsp;·&nbsp; Blood: {patient?.bloodType} &nbsp;·&nbsp; Allergies: <strong style={{ color: patient?.allergies !== 'None' ? C.danger : C.muted }}>{patient?.allergies}</strong>
          </div>
        </div>
      </div>

      {/* Contact info */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 20px', marginBottom:18, fontSize:'0.86rem' }}>
        <div><span style={{ color:C.muted }}>Phone: </span><strong>{patient?.phone}</strong></div>
        <div style={{ wordBreak:'break-all' }}><span style={{ color:C.muted }}>Email: </span><strong>{patient?.email}</strong></div>
      </div>

      {/* Appointment summary */}
      <div style={{ background:C.infoBg, border:`1px solid #b3c9f8`, borderRadius:10, padding:'13px 16px', marginBottom:18 }}>
        <div style={{ fontWeight:700, color:C.info, fontSize:'0.76rem', textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>Appointment</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'7px 20px', fontSize:'0.85rem' }}>
          <div><span style={{ color:C.muted }}>Date: </span><strong>{fmtDate(appt.date)}</strong></div>
          <div><span style={{ color:C.muted }}>Time: </span><strong style={{ color:C.accent }}>{appt.time}</strong></div>
          <div><span style={{ color:C.muted }}>Doctor: </span><strong>{doctor?.short}</strong></div>
          <div><span style={{ color:C.muted }}>Branch: </span><strong>{appt.branch}</strong></div>
          <div><span style={{ color:C.muted }}>Department: </span><strong>{appt.department}</strong></div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ color:C.muted }}>Status: </span><Badge status={appt.status} /></div>
        </div>
        {appt.notes && <div style={{ marginTop:10, fontSize:'0.82rem', color:C.muted, fontStyle:'italic' }}>"{appt.notes}"</div>}
      </div>

      {/* Medical history preview */}
      {patient?.history?.length > 0 && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontWeight:700, fontSize:'0.8rem', color:C.primary, textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:8 }}>Past Visits</div>
          {patient.history.map((h, i) => (
            <div key={i} style={{ padding:'9px 12px', borderRadius:8, background:'#fafbff', border:`1px solid ${C.border}`, marginBottom:6, fontSize:'0.83rem' }}>
              <div style={{ fontWeight:600, color:C.primary }}>{h.diagnosis}</div>
              <div style={{ color:C.muted, marginTop:2 }}>{h.date} · {h.doctor}</div>
              <div style={{ color:C.muted, marginTop:1 }}>{h.treatment}</div>
            </div>
          ))}
        </div>
      )}

      {/* Action buttons */}
      <div style={{ display:'flex', gap:8, flexWrap:'wrap', paddingTop:4 }}>
        {appt.status === 'Pending' && (
          <ActionBtn variant="accept" onClick={onAccept}>✓ Accept Booking</ActionBtn>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <ActionBtn variant="reschedule" onClick={onReschedule}>⟳ Reschedule</ActionBtn>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <ActionBtn variant="reject" onClick={onReject}>✕ Reject</ActionBtn>
        )}
        <ActionBtn variant="ghost" onClick={onClose}>Close</ActionBtn>
      </div>
    </Modal>
  );
}

// ── RESCHEDULE MODAL ─────────────────────────────────────────
function RescheduleModal({ appt, onClose, onConfirm }) {
  const [newDate, setNewDate] = useState(appt.date);
  const [newTime, setNewTime] = useState('');

  const dates = useMemo(() => {
    const result = [];
    const base = new Date(TODAY + 'T00:00:00');
    for (let i = 0; result.length < 14; i++) {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      if (d.getDay() === 5) continue;
      result.push(d.toISOString().slice(0, 10));
    }
    return result;
  }, []);

  return (
    <Modal title={`Reschedule — ${appt.patientName}`} onClose={onClose} width={520}>
      <p style={{ color:C.muted, fontSize:'0.86rem', marginTop:0, marginBottom:16 }}>
        Select a new date and time. The patient will receive a notification at <strong>{INIT_PATIENTS.find(p => p.id === appt.patientId)?.email}</strong>.
      </p>

      <div style={{ marginBottom:20 }}>
        <div style={{ fontWeight:600, fontSize:'0.83rem', color:C.primary, marginBottom:8 }}>New Date</div>
        <div style={{ display:'flex', gap:7, overflowX:'auto', paddingBottom:4 }}>
          {dates.map(d => {
            const dt = new Date(d + 'T00:00:00');
            const sel = d === newDate;
            return (
              <button
                key={d}
                onClick={() => { setNewDate(d); setNewTime(''); }}
                style={{
                  flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center',
                  padding:'8px 11px', borderRadius:10, minWidth:52, cursor:'pointer', fontFamily:'inherit',
                  border: `2px solid ${sel ? C.primary : C.border}`,
                  background: sel ? C.primary : '#fff',
                  color: sel ? '#fff' : C.primary,
                }}
              >
                <span style={{ fontSize:'0.62rem', fontWeight:700, opacity:0.75, textTransform:'uppercase' }}>{DAY_NAMES[dt.getDay()]}</span>
                <span style={{ fontSize:'1.25rem', fontWeight:700, lineHeight:1.3, margin:'2px 0' }}>{dt.getDate()}</span>
                <span style={{ fontSize:'0.62rem', fontWeight:600, opacity:0.75 }}>{MONTH_NAMES[dt.getMonth()]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {newDate && (
        <div style={{ marginBottom:22 }}>
          <div style={{ fontWeight:600, fontSize:'0.83rem', color:C.primary, marginBottom:8 }}>New Time</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:7 }}>
            {TIME_SLOTS.map(slot => (
              <button
                key={slot}
                onClick={() => setNewTime(slot)}
                style={{
                  padding:'7px 13px', borderRadius:7, fontSize:'0.82rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit',
                  border: `1.5px solid ${newTime === slot ? C.primary : C.border}`,
                  background: newTime === slot ? C.primary : '#fff',
                  color: newTime === slot ? '#fff' : C.primary,
                }}
              >
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:8 }}>
        <button
          onClick={() => newDate && newTime && onConfirm(newDate, newTime)}
          disabled={!newTime}
          style={{ padding:'9px 18px', background: !newTime ? '#ccc' : C.primary, color:'#fff', border:'none', borderRadius:9, fontWeight:700, fontSize:'0.88rem', cursor: !newTime ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}
        >
          Confirm Reschedule
        </button>
        <button onClick={onClose} style={{ padding:'9px 18px', background:C.light, color:C.primary, border:`1px solid ${C.border}`, borderRadius:9, fontWeight:600, fontSize:'0.88rem', cursor:'pointer', fontFamily:'inherit' }}>
          Cancel
        </button>
      </div>
    </Modal>
  );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────
export default function ReceptionistDashboard() {
  const [isLoggedIn, setIsLoggedIn]           = useState(false);
  const [receptName, setReceptName]           = useState('');
  const [branch, setBranch]                   = useState('Fifth Settlement');
  const [selectedDate, setSelectedDate]       = useState(TODAY);
  const [view, setView]                       = useState('day');
  const [doctorFilter, setDoctorFilter]       = useState('all');
  const [appointments, setAppointments]       = useState(INIT_APPOINTMENTS);
  const [patientModal, setPatientModal]       = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [toast, setToast]                     = useState(null);

  const showToast = (msg, type = 'success') => {
    setToast({ message: msg, type });
    setTimeout(() => setToast(null), 6000);
  };

  const getAppt = id => appointments.find(a => a.id === id);

  const handleAccept = appt => {
    setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'Confirmed' } : a));
    setPatientModal(null);
    const p = INIT_PATIENTS.find(p => p.id === appt.patientId);
    showToast(`Notification sent to ${p?.name} (${p?.email}): Your appointment on ${fmtDate(appt.date)} at ${appt.time} has been confirmed.`, 'success');
  };

  const handleReject = appt => {
    setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, status: 'Cancelled' } : a));
    setPatientModal(null);
    const p = INIT_PATIENTS.find(p => p.id === appt.patientId);
    showToast(`Notification sent to ${p?.name} (${p?.email}): Your appointment on ${fmtDate(appt.date)} at ${appt.time} has been cancelled.`, 'danger');
  };

  const handleReschedule = (appt, newDate, newTime) => {
    setAppointments(prev => prev.map(a => a.id === appt.id ? { ...a, date: newDate, time: newTime, status: 'Confirmed' } : a));
    setRescheduleModal(null);
    setPatientModal(null);
    const p = INIT_PATIENTS.find(p => p.id === appt.patientId);
    showToast(`Notification sent to ${p?.name} (${p?.email}): Your appointment has been rescheduled to ${fmtDate(newDate)} at ${newTime}.`, 'warn');
  };

  // Filtered day appointments
  const dayAppts = useMemo(() =>
    appointments
      .filter(a =>
        a.branch === branch &&
        a.date === selectedDate &&
        (doctorFilter === 'all' || a.doctorId === parseInt(doctorFilter))
      )
      .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, branch, selectedDate, doctorFilter]
  );

  const activeDoctors = DOCTORS.filter(d =>
    (doctorFilter === 'all' || d.id === parseInt(doctorFilter)) &&
    dayAppts.some(a => a.doctorId === d.id)
  );

  const stats = {
    total:     dayAppts.length,
    pending:   dayAppts.filter(a => a.status === 'Pending').length,
    confirmed: dayAppts.filter(a => a.status === 'Confirmed').length,
    cancelled: dayAppts.filter(a => a.status === 'Cancelled').length,
  };

  // Week dates (7-day window starting from Sunday of the selected week)
  const weekDates = useMemo(() => {
    const base = new Date(selectedDate + 'T00:00:00');
    base.setDate(base.getDate() - base.getDay()); // rewind to Sunday
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(base);
      d.setDate(base.getDate() + i);
      return d.toISOString().slice(0, 10);
    });
  }, [selectedDate]);

  if (!isLoggedIn) {
    return <LoginGate onLogin={name => { setIsLoggedIn(true); setReceptName(name); }} />;
  }

  return (
    <div style={{ background: C.bg, minHeight: '100vh' }}>

      {/* ── TOP BAR ───────────────────────────────────────── */}
      <div style={{ background: C.primary, color: '#fff' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 20px', display: 'flex', alignItems: 'center', gap: 16, height: 54, flexWrap: 'wrap' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', whiteSpace: 'nowrap' }}>
            Receptionist Portal
            <span style={{ fontWeight: 400, fontSize: '0.8rem', opacity: 0.7, marginLeft: 10 }}>Welcome, {receptName}</span>
          </div>

          {/* Branch selector */}
          <div style={{ display: 'flex', gap: 6, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {BRANCHES.map(b => (
              <button
                key={b}
                onClick={() => setBranch(b)}
                style={{
                  padding: '4px 13px', borderRadius: 20, fontSize: '0.78rem', fontWeight: 600,
                  cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                  background: branch === b ? '#fff' : 'transparent',
                  color: branch === b ? C.primary : 'rgba(255,255,255,0.75)',
                  border: `1.5px solid ${branch === b ? '#fff' : 'rgba(255,255,255,0.3)'}`,
                }}
              >
                {b}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsLoggedIn(false)}
            style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.4)', color: 'rgba(255,255,255,0.8)', borderRadius: 8, padding: '4px 12px', fontSize: '0.77rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
          >
            Sign Out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '20px' }}>

        {/* ── TOOLBAR ───────────────────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, alignItems: 'center', marginBottom: 18 }}>

          {/* Date navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 6, background: C.white, border: `1px solid ${C.border}`, borderRadius: 10, padding: '5px 10px' }}>
            <button onClick={() => setSelectedDate(addDays(selectedDate, -1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontSize: '1.2rem', lineHeight: 1, padding: '0 3px' }}>‹</button>
            <span style={{ fontWeight: 700, color: C.primary, fontSize: '0.91rem', minWidth: 172, textAlign: 'center' }}>
              {selectedDate === TODAY ? '📅 Today — ' : ''}{fmtDate(selectedDate)}
            </span>
            <button onClick={() => setSelectedDate(addDays(selectedDate, 1))} style={{ background: 'none', border: 'none', cursor: 'pointer', color: C.primary, fontSize: '1.2rem', lineHeight: 1, padding: '0 3px' }}>›</button>
          </div>

          {selectedDate !== TODAY && (
            <button
              onClick={() => setSelectedDate(TODAY)}
              style={{ background: C.light, border: `1px solid ${C.border}`, borderRadius: 8, padding: '7px 13px', fontSize: '0.81rem', fontWeight: 600, cursor: 'pointer', color: C.primary, fontFamily: 'inherit' }}
            >
              ↩ Today
            </button>
          )}

          {/* Doctor filter */}
          <select
            value={doctorFilter}
            onChange={e => setDoctorFilter(e.target.value)}
            style={{ padding: '7px 12px', border: `1px solid ${C.border}`, borderRadius: 9, fontSize: '0.83rem', fontFamily: 'inherit', color: C.primary, background: C.white, cursor: 'pointer' }}
          >
            <option value="all">All Doctors</option>
            {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.short}</option>)}
          </select>

          {/* View toggle */}
          <div style={{ marginLeft: 'auto', display: 'flex', background: C.white, border: `1px solid ${C.border}`, borderRadius: 9, overflow: 'hidden' }}>
            {[['day', 'Day Schedule'], ['week', 'Week View']].map(([v, label]) => (
              <button
                key={v}
                onClick={() => setView(v)}
                style={{ padding: '7px 16px', fontWeight: 600, fontSize: '0.82rem', cursor: 'pointer', fontFamily: 'inherit', border: 'none', background: view === v ? C.primary : 'transparent', color: view === v ? '#fff' : C.muted, transition: 'all 0.15s' }}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── STATS ─────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginBottom: 20 }}>
          {[
            { label: 'Scheduled', value: stats.total,     color: C.primary },
            { label: 'Pending',   value: stats.pending,   color: C.warn    },
            { label: 'Confirmed', value: stats.confirmed, color: C.success  },
            { label: 'Cancelled', value: stats.cancelled, color: C.danger   },
          ].map(s => (
            <div key={s.label} style={{ background: C.white, borderRadius: 10, padding: '13px 16px', borderTop: `3px solid ${s.color}`, boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '1.85rem', fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ fontSize: '0.77rem', color: C.muted, marginTop: 2 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── DAY SCHEDULE GRID ─────────────────────────────── */}
        {view === 'day' && (() => {
          // Doctors shown as columns (filtered)
          const gridDoctors = DOCTORS.filter(d =>
            doctorFilter === 'all' || d.id === parseInt(doctorFilter)
          );

          return (
            <div style={{ background: C.white, borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>

                {/* ── Column header: Time + one column per doctor ── */}
                <colgroup>
                  <col style={{ width: 72 }} />
                  {gridDoctors.map(d => <col key={d.id} />)}
                </colgroup>
                <thead>
                  <tr style={{ background: C.primary }}>
                    <th style={{ padding: '12px 10px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', borderRight: `1px solid rgba(255,255,255,0.1)` }}>
                      Time
                    </th>
                    {gridDoctors.map(doc => {
                      const cnt = dayAppts.filter(a => a.doctorId === doc.id).length;
                      return (
                        <th key={doc.id} style={{ padding: '10px 12px', textAlign: 'left', borderRight: `1px solid rgba(255,255,255,0.1)` }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ width: 30, height: 30, borderRadius: 8, background: doc.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.72rem', flexShrink: 0 }}>{doc.initials}</div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#fff', fontSize: '0.84rem', whiteSpace: 'nowrap' }}>{doc.short}</div>
                              <div style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.55)' }}>{cnt} appt{cnt !== 1 ? 's' : ''} today</div>
                            </div>
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>

                {/* ── Time slot rows ── */}
                <tbody>
                  {SCHEDULE_SLOTS.map((slot, idx) => {
                    const hour       = slotHour(slot);
                    const isHalfHour = slot.endsWith(':30');
                    // Alternate shading by hour block
                    const hourIndex  = hour - 8;
                    const rowBg      = isHalfHour
                      ? (hourIndex % 2 === 0 ? '#fafbff' : C.white)
                      : (hourIndex % 2 === 0 ? '#f4f6fb' : '#fafbff');

                    // Hour label shown only on the :00 row
                    const timeLabel = isHalfHour
                      ? <span style={{ color: C.border, fontSize: '0.72rem' }}>:30</span>
                      : <span style={{ fontWeight: 700, fontSize: '0.8rem', color: C.primary }}>{hour > 12 ? `${hour - 12} PM` : hour === 12 ? '12 PM' : `${hour} AM`}</span>;

                    return (
                      <tr key={slot} style={{ background: rowBg }}>
                        {/* Time column */}
                        <td style={{
                          padding: '0 8px', height: 52, textAlign: 'right',
                          borderRight: `1px solid ${C.border}`,
                          borderBottom: isHalfHour ? `1px solid ${C.border}` : `1px dashed ${C.border}`,
                          verticalAlign: 'middle', whiteSpace: 'nowrap',
                        }}>
                          {timeLabel}
                        </td>

                        {/* Doctor cells */}
                        {gridDoctors.map(doc => {
                          const appt = appointments.find(a =>
                            a.doctorId === doc.id &&
                            a.date === selectedDate &&
                            a.branch === branch &&
                            a.time === slot
                          );
                          const s = appt ? (STATUS_BADGE[appt.status] || {}) : null;

                          return (
                            <td
                              key={doc.id}
                              style={{
                                padding: appt ? '5px 7px' : '0',
                                verticalAlign: 'top',
                                borderRight: `1px solid ${C.border}`,
                                borderBottom: isHalfHour ? `1px solid ${C.border}` : `1px dashed ${C.border}`,
                                height: 52,
                              }}
                            >
                              {appt && (
                                <div
                                  onClick={() => setPatientModal(appt)}
                                  style={{
                                    background: s.bg,
                                    borderLeft: `3px solid ${s.color}`,
                                    borderRadius: 6,
                                    padding: '5px 8px',
                                    cursor: 'pointer',
                                    height: '100%',
                                    boxSizing: 'border-box',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'space-between',
                                    gap: 3,
                                  }}
                                >
                                  <div>
                                    <div style={{ fontWeight: 700, fontSize: '0.8rem', color: C.primary, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.patientName}</div>
                                    <div style={{ fontSize: '0.7rem', color: C.muted, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{appt.department.replace('Advanced Laser Center','Laser').replace('Cosmetic Dermatology','Cosmetic').replace('Clinical Dermatology','Clinical')}</div>
                                  </div>
                                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }} onClick={e => e.stopPropagation()}>
                                    <span style={{ padding: '1px 6px', borderRadius: 10, fontSize: '0.65rem', fontWeight: 700, background: s.bg, color: s.color, border: `1px solid ${s.color}33`, whiteSpace: 'nowrap' }}>{appt.status}</span>
                                    {appt.status === 'Pending' && (
                                      <button onClick={() => handleAccept(appt)} title="Accept" style={{ background: '#e6f4ea', border: 'none', borderRadius: 4, padding: '1px 5px', fontSize: '0.68rem', fontWeight: 700, color: '#2d7a3a', cursor: 'pointer', fontFamily: 'inherit' }}>✓</button>
                                    )}
                                    {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
                                      <button onClick={() => setRescheduleModal(appt)} title="Reschedule" style={{ background: '#fff8e1', border: 'none', borderRadius: 4, padding: '1px 5px', fontSize: '0.68rem', fontWeight: 700, color: '#b07d00', cursor: 'pointer', fontFamily: 'inherit' }}>⟳</button>
                                    )}
                                    {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
                                      <button onClick={() => handleReject(appt)} title="Reject" style={{ background: '#fdecea', border: 'none', borderRadius: 4, padding: '1px 5px', fontSize: '0.68rem', fontWeight: 700, color: '#c0392b', cursor: 'pointer', fontFamily: 'inherit' }}>✕</button>
                                    )}
                                  </div>
                                </div>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })()}

        {/* ── WEEK VIEW ─────────────────────────────────────── */}
        {view === 'week' && (
          <div style={{ background: C.white, borderRadius: 14, boxShadow: '0 1px 6px rgba(0,0,0,0.07)', overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr>
                  <th style={{ padding: '13px 16px', textAlign: 'left', fontWeight: 600, fontSize: '0.82rem', color: C.muted, borderBottom: `1px solid ${C.border}`, minWidth: 140 }}>Doctor</th>
                  {weekDates.map(d => {
                    const dt = new Date(d + 'T00:00:00');
                    const isToday    = d === TODAY;
                    const isSelected = d === selectedDate;
                    return (
                      <th
                        key={d}
                        onClick={() => { setSelectedDate(d); setView('day'); }}
                        style={{
                          padding: '11px 8px', textAlign: 'center', cursor: 'pointer',
                          borderBottom: `1px solid ${C.border}`, minWidth: 78,
                          background: isSelected ? C.light : 'transparent',
                          fontWeight: 700,
                        }}
                      >
                        <div style={{ fontSize: '0.67rem', textTransform: 'uppercase', letterSpacing: '0.06em', color: C.muted }}>{DAY_NAMES[dt.getDay()]}</div>
                        <div style={{ fontSize: '1.15rem', lineHeight: 1.4, color: isToday ? C.accent : C.primary }}>{dt.getDate()}</div>
                        <div style={{ fontSize: '0.67rem', color: C.muted }}>{MONTH_NAMES[dt.getMonth()]}</div>
                        {isToday && <div style={{ width: 5, height: 5, background: C.accent, borderRadius: '50%', margin: '3px auto 0' }} />}
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {DOCTORS
                  .filter(d => doctorFilter === 'all' || d.id === parseInt(doctorFilter))
                  .map((doc, di) => (
                    <tr key={doc.id} style={{ background: di % 2 === 0 ? C.white : '#fafbff' }}>
                      <td style={{ padding: '11px 16px', borderBottom: `1px solid ${C.border}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <div style={{ width: 26, height: 26, borderRadius: 7, background: doc.color, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.7rem', flexShrink: 0 }}>{doc.initials}</div>
                          <span style={{ fontWeight: 600, color: C.primary, fontSize: '0.83rem' }}>{doc.short}</span>
                        </div>
                      </td>
                      {weekDates.map(d => {
                        const cells = appointments.filter(a => a.date === d && a.doctorId === doc.id && a.branch === branch);
                        const confirmed = cells.filter(a => a.status === 'Confirmed').length;
                        const pending   = cells.filter(a => a.status === 'Pending').length;
                        return (
                          <td
                            key={d}
                            onClick={() => { if (cells.length) { setSelectedDate(d); setDoctorFilter(String(doc.id)); setView('day'); } }}
                            style={{ padding: '10px 8px', borderBottom: `1px solid ${C.border}`, textAlign: 'center', cursor: cells.length ? 'pointer' : 'default', verticalAlign: 'middle' }}
                          >
                            {cells.length > 0 ? (
                              <div style={{ display: 'inline-flex', flexDirection: 'column', gap: 3 }}>
                                {confirmed > 0 && <span style={{ padding: '2px 8px', borderRadius: 20, background: '#e6f4ea', color: '#2d7a3a', fontSize: '0.71rem', fontWeight: 700 }}>{confirmed} ✓</span>}
                                {pending   > 0 && <span style={{ padding: '2px 8px', borderRadius: 20, background: '#fff8e1', color: '#b07d00', fontSize: '0.71rem', fontWeight: 700 }}>{pending} ⏳</span>}
                              </div>
                            ) : (
                              <span style={{ color: C.border }}>—</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
              </tbody>
            </table>
            <div style={{ padding: '10px 16px', fontSize: '0.78rem', color: C.muted, borderTop: `1px solid ${C.border}` }}>
              Click any cell to jump to that day's schedule for the selected doctor.
            </div>
          </div>
        )}
      </div>

      {/* ── MODALS ───────────────────────────────────────────── */}
      {patientModal && (
        <PatientModal
          appt={getAppt(patientModal.id) || patientModal}
          patients={INIT_PATIENTS}
          onClose={() => setPatientModal(null)}
          onAccept={() => handleAccept(getAppt(patientModal.id) || patientModal)}
          onReject={() => handleReject(getAppt(patientModal.id) || patientModal)}
          onReschedule={() => {
            setRescheduleModal(getAppt(patientModal.id) || patientModal);
            setPatientModal(null);
          }}
        />
      )}

      {rescheduleModal && (
        <RescheduleModal
          appt={rescheduleModal}
          onClose={() => setRescheduleModal(null)}
          onConfirm={(d, t) => handleReschedule(rescheduleModal, d, t)}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(60px); opacity: 0; }
          to   { transform: translateX(0);    opacity: 1; }
        }
      `}</style>
    </div>
  );
}
