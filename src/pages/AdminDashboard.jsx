import React, { useState } from 'react';

// ─── THEME ────────────────────────────────────────────────────────────
const C = {
  primary: '#21326c', accent: '#ff9044', light: '#f0f2fa', bg: '#f5f6fa',
  white: '#ffffff', muted: '#8892a4', border: '#e2e6f0',
  success: '#2d7a3a', successBg: '#e6f4ea',
  warn: '#b07d00', warnBg: '#fff8e1',
  danger: '#c0392b', dangerBg: '#fdecea',
  info: '#1a56db', infoBg: '#e8f0fe',
};

// ─── STATIC DATA ─────────────────────────────────────────────────────
const DOCTORS = [
  { id: 1, name: 'Prof. Dr. Abdel-Rahim Abdallah', short: 'Prof. Abdel-Rahim', role: 'Founder & Chief of Dermatology', initials: 'AA', branch: 'Sheikh Zayed', legacy: true },
  { id: 2, name: 'Prof. Dr. Marwa Abdallah',       short: 'Prof. Marwa',       role: 'Professor of Dermatology',       initials: 'MW', branch: 'Fifth Settlement' },
  { id: 3, name: 'A. Prof. Dr. Mahmoud Abdallah',  short: 'A. Prof. Mahmoud',  role: 'Associate Professor',            initials: 'MH', branch: 'Heliopolis' },
  { id: 4, name: 'Dr. Nehad Youssef',              short: 'Dr. Nehad',         role: 'Specialist Dermatologist',       initials: 'NY', branch: 'Mohandeseen' },
  { id: 5, name: 'Dr. Azza El-Azhary',             short: 'Dr. Azza',          role: 'Head of Dermatology',            initials: 'AZ', branch: 'Sheikh Zayed' },
];

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'];
const TIME_SLOTS = ['09:00','09:30','10:00','10:30','11:00','11:30','12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00'];

const buildDefaultAvailability = () => {
  const OFF = { 1: ['Sun'], 2: ['Thu'], 3: ['Mon','Thu'], 4: ['Sun','Wed'], 5: ['Sun','Mon'] };
  const avail = {};
  DOCTORS.forEach(d => {
    avail[d.id] = {};
    DAYS.forEach(day => {
      avail[d.id][day] = OFF[d.id]?.includes(day) ? [] : TIME_SLOTS.filter((_, i) => i % 2 === 0 || i > 6);
    });
  });
  return avail;
};

const INIT_APPOINTMENTS = [
  { id:1,  patientId:1, patientName:'Sara Ahmed',     doctorId:2, date:'2026-04-07', time:'10:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Confirmed', notes:'' },
  { id:2,  patientId:2, patientName:'Karim Hassan',   doctorId:4, date:'2026-04-07', time:'11:30', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Pending',   notes:'' },
  { id:3,  patientId:4, patientName:'Ahmed Fouad',    doctorId:3, date:'2026-04-07', time:'14:00', department:'Cosmetic Dermatology',  branch:'Heliopolis',       status:'Confirmed', notes:'' },
  { id:4,  patientId:5, patientName:'Layla Mostafa',  doctorId:5, date:'2026-04-08', time:'13:00', department:'Advanced Laser Center', branch:'Sheikh Zayed',     status:'Confirmed', notes:'' },
  { id:5,  patientId:1, patientName:'Sara Ahmed',     doctorId:2, date:'2026-04-08', time:'15:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Pending',   notes:'' },
  { id:6,  patientId:7, patientName:'Nadia Ibrahim',  doctorId:4, date:'2026-04-09', time:'09:00', department:'Advanced Laser Center', branch:'Mohandeseen',      status:'Confirmed', notes:'' },
  { id:7,  patientId:6, patientName:'Omar Khalil',    doctorId:3, date:'2026-04-09', time:'10:30', department:'Clinical Dermatology',  branch:'Heliopolis',       status:'Confirmed', notes:'' },
  { id:8,  patientId:3, patientName:'Mona Samir',     doctorId:2, date:'2026-04-10', time:'11:00', department:'Cosmetic Dermatology',  branch:'Fifth Settlement', status:'Pending',   notes:'' },
  { id:9,  patientId:8, patientName:'Hassan Ramadan', doctorId:5, date:'2026-04-10', time:'14:30', department:'Clinical Dermatology',  branch:'Sheikh Zayed',     status:'Cancelled', notes:'' },
];

const INIT_PATIENTS = [
  { id:1, name:'Sara Ahmed',     dob:'1990-03-15', phone:'+20 111 234 5678', email:'sara.ahmed@email.com',  bloodType:'A+',  allergies:'Penicillin',
    history:[
      { date:'2026-02-10', doctor:'Prof. Dr. Marwa Abdallah', department:'Cosmetic Dermatology', diagnosis:'Melasma', treatment:'Hydroquinone 4%, SPF 50', notes:'Responds well. Follow-up in 6 weeks.' },
      { date:'2025-11-05', doctor:'Prof. Dr. Marwa Abdallah', department:'Cosmetic Dermatology', diagnosis:'Acne Vulgaris (mild)', treatment:'Topical retinoid, benzoyl peroxide', notes:'Cleared significantly, maintenance recommended.' },
    ]},
  { id:2, name:'Karim Hassan',   dob:'1985-07-22', phone:'+20 100 987 6543', email:'karim.h@email.com',     bloodType:'O+',  allergies:'None',
    history:[
      { date:'2026-01-18', doctor:'Dr. Nehad Youssef', department:'Advanced Laser Center', diagnosis:'Tattoo removal', treatment:'Q-switched Nd:YAG laser — 3 sessions', notes:'Session 1 complete. Mild erythema expected.' },
    ]},
  { id:3, name:'Mona Samir',     dob:'1978-12-01', phone:'+20 122 555 9988', email:'mona.samir@email.com',  bloodType:'B-',  allergies:'Sulfa drugs',
    history:[
      { date:'2026-03-02', doctor:'Prof. Dr. Abdel-Rahim Abdallah', department:'Clinical Dermatology', diagnosis:'Psoriasis (plaque type)', treatment:'Topical corticosteroids, coal tar shampoo', notes:'Considering biologics if no improvement in 3 months.' },
      { date:'2025-09-14', doctor:'Prof. Dr. Abdel-Rahim Abdallah', department:'Clinical Dermatology', diagnosis:'Eczema', treatment:'Emollients, mild steroid cream', notes:'Stress-triggered. Lifestyle advice given.' },
    ]},
  { id:4, name:'Ahmed Fouad',    dob:'1995-04-08', phone:'+20 105 443 2211', email:'ahmed.f@email.com',     bloodType:'AB+', allergies:'Latex',     history:[] },
  { id:5, name:'Layla Mostafa',  dob:'2000-08-19', phone:'+20 128 776 4433', email:'layla.m@email.com',     bloodType:'A-',  allergies:'None',
    history:[
      { date:'2026-02-25', doctor:'Dr. Azza El-Azhary', department:'Advanced Laser Center', diagnosis:'Laser hair removal — legs', treatment:'Diode laser 810nm — session 2/6', notes:'Good response, no adverse effects.' },
    ]},
  { id:6, name:'Omar Khalil',    dob:'1982-06-30', phone:'+20 110 321 8765', email:'omar.k@email.com',      bloodType:'O-',  allergies:'Aspirin',  history:[] },
  { id:7, name:'Nadia Ibrahim',  dob:'1993-01-25', phone:'+20 101 654 3210', email:'nadia.i@email.com',     bloodType:'B+',  allergies:'None',
    history:[
      { date:'2026-03-15', doctor:'Dr. Nehad Youssef', department:'Advanced Laser Center', diagnosis:'Acne scarring', treatment:'Fractional CO2 laser resurfacing', notes:'Pre-treatment photos taken. Downtime 5-7 days.' },
    ]},
  { id:8, name:'Hassan Ramadan', dob:'1970-09-12', phone:'+20 115 999 1122', email:'hassan.r@email.com',    bloodType:'A+',  allergies:'None',      history:[] },
];

const INIT_EMAILS = [
  { id:1, fromName:'Nile Pharma',      from:'pharmacy@nile-pharma.com',  subject:'New product line: Advanced Retinoid Formulations', date:'2026-04-04', read:false,
    body:`Dear Dr. Abdallah team,\n\nWe are excited to introduce our new advanced retinoid formulations:\n\n• Adapalene 0.3% Gel — for acne and photoaging\n• Tretinoin 0.05% Microsphere Cream — reduced-irritation formula\n• Tazarotene 0.1% Cream — for psoriasis and acne\n\nWe would love to schedule a product demonstration at your convenience.\n\nBest regards,\nDr. Khaled Mansour\nMedical Sales Director, Nile Pharma` },
  { id:2, fromName:'AAD Conference',   from:'conferences@aad.org',        subject:'Abstract Submission: AAD Annual Meeting 2026', date:'2026-04-03', read:false,
    body:`Dear Professor,\n\nThe American Academy of Dermatology invites you to submit abstracts for the AAD Annual Meeting 2026.\n\nDeadline: May 15, 2026\nTopics: Clinical research, Cosmetic procedures, Laser dermatology, Immunodermatology\n\nYour previous contributions have been invaluable to the field.\n\nPlease submit at: abstracts.aad.org\n\nWarm regards,\nAAD Scientific Committee` },
  { id:3, fromName:'Sara Ahmed',       from:'sara.ahmed@email.com',       subject:'Question about my upcoming appointment', date:'2026-04-03', read:true,
    body:`Dear Doctor,\n\nI hope this message finds you well. I have an appointment on April 7th at 10:00 AM.\n\nShould I stop using my retinol cream 3 days before as instructed, or continue?\n\nIs there any special preparation needed?\n\nThank you,\nSara Ahmed` },
  { id:4, fromName:'Clinic Admin',     from:'admin@cutis-clinic.com',     subject:'Monthly Report — March 2026', date:'2026-04-01', read:true,
    body:`Monthly Performance Summary — March 2026\n\nTotal Appointments: 312\nCompleted: 287 (92%)\nCancelled: 18 (5.8%)\nNo-shows: 7 (2.2%)\n\nTop Departments:\n1. Cosmetic Dermatology — 124\n2. Advanced Laser Center — 98\n3. Clinical Dermatology — 90\n\nPatient Satisfaction: 4.8 / 5.0\nNew Patients: 47 | Returning: 265` },
  { id:5, fromName:'Cutis Laboratory', from:'lab@cutis-lab.com',          subject:'Lab Results Ready: Mona Samir #1042', date:'2026-03-31', read:true,
    body:`Patient: Mona Samir | ID: #1042 | Sample date: 2026-03-29\n\nBiopsy — left forearm\n──────────────────────────────────\nGross: 0.5 cm punch biopsy, tan-pink tissue\nHistology: Mild acanthosis. Perivascular lymphocytic infiltrate consistent with psoriasiform dermatitis.\n\nDIAGNOSIS: Psoriasis, plaque type — CONFIRMED\nNo evidence of malignancy.\n\nPathologist: Dr. Hoda Fouad, Cutis Laboratory` },
];

// ─── SHARED COMPONENTS ────────────────────────────────────────────────
const STATUS_STYLE = {
  Confirmed: { bg: C.successBg, color: C.success },
  Pending:   { bg: C.warnBg,    color: C.warn    },
  Cancelled: { bg: C.dangerBg,  color: C.danger  },
  Completed: { bg: C.infoBg,    color: C.info    },
};

function Badge({ status }) {
  const s = STATUS_STYLE[status] || { bg: '#f0f0f0', color: '#666' };
  return (
    <span style={{ padding:'3px 10px', borderRadius:20, fontSize:'0.77rem', fontWeight:700, background:s.bg, color:s.color, whiteSpace:'nowrap' }}>
      {status}
    </span>
  );
}

function Modal({ title, onClose, children, width = 620 }) {
  return (
    <div style={{ position:'fixed', inset:0, background:'rgba(10,20,50,0.5)', zIndex:1000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}
      onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{ background:C.white, borderRadius:16, width:'100%', maxWidth:width, maxHeight:'90vh', overflow:'auto', boxShadow:'0 20px 60px rgba(0,0,0,0.22)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.1rem 1.5rem', borderBottom:`1px solid ${C.border}`, position:'sticky', top:0, background:C.white, zIndex:1 }}>
          <h3 style={{ margin:0, fontSize:'1rem', color:C.primary }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'1.4rem', cursor:'pointer', color:C.muted, lineHeight:1, padding:'0 4px' }}>×</button>
        </div>
        <div style={{ padding:'1.5rem' }}>{children}</div>
      </div>
    </div>
  );
}

function SectionTitle({ children }) {
  return <h2 style={{ margin:'0 0 1.5rem', fontSize:'1.15rem', fontWeight:700, color:C.primary }}>{children}</h2>;
}

function Card({ children, style }) {
  return <div style={{ background:C.white, borderRadius:12, boxShadow:'0 1px 6px rgba(0,0,0,0.07)', ...style }}>{children}</div>;
}

function Btn({ children, variant='primary', onClick, disabled, small }) {
  const styles = {
    primary:   { background:C.primary, color:C.white, border:'none' },
    accent:    { background:C.accent,  color:C.white, border:'none' },
    outline:   { background:'transparent', color:C.primary, border:`1.5px solid ${C.primary}` },
    ghost:     { background:'transparent', color:C.muted,   border:`1.5px solid ${C.border}` },
    danger:    { background:C.dangerBg,   color:C.danger,  border:'none' },
    success:   { background:C.successBg,  color:C.success, border:'none' },
    info:      { background:C.infoBg,     color:C.info,    border:'none' },
  };
  const v = styles[variant] || styles.primary;
  return (
    <button onClick={onClick} disabled={disabled} style={{ padding: small ? '4px 11px' : '8px 18px', borderRadius:8, cursor:disabled ? 'not-allowed' : 'pointer', fontWeight:600, fontSize: small ? '0.78rem' : '0.88rem', opacity: disabled ? 0.5 : 1, transition:'opacity 0.15s', fontFamily:'inherit', ...v }}>
      {children}
    </button>
  );
}

// ─── OVERVIEW ─────────────────────────────────────────────────────────
function OverviewSection({ appointments, patients }) {
  const TODAY = '2026-04-07';
  const todayAppts = appointments.filter(a => a.date === TODAY);
  const stats = [
    { label:"Today's Appointments", value:todayAppts.length,                                      color:C.primary },
    { label:'Confirmed Today',       value:todayAppts.filter(a=>a.status==='Confirmed').length,    color:C.success },
    { label:'Pending Review',        value:appointments.filter(a=>a.status==='Pending').length,    color:C.warn    },
    { label:'Total Patients',        value:patients.length,                                        color:C.info    },
    { label:'Active Doctors',        value:DOCTORS.length,                                         color:C.accent  },
  ];
  return (
    <div>
      <SectionTitle>Dashboard Overview</SectionTitle>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(170px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
        {stats.map(s => (
          <Card key={s.label} style={{ padding:'1.1rem 1.25rem', borderTop:`3px solid ${s.color}` }}>
            <div style={{ fontSize:'2rem', fontWeight:700, color:s.color }}>{s.value}</div>
            <div style={{ fontSize:'0.8rem', color:C.muted, marginTop:4 }}>{s.label}</div>
          </Card>
        ))}
      </div>
      <Card style={{ overflow:'hidden' }}>
        <div style={{ padding:'0.9rem 1.25rem', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <span style={{ fontWeight:600 }}>Today — {TODAY}</span>
          <span style={{ fontSize:'0.82rem', color:C.muted }}>{todayAppts.length} scheduled</span>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.87rem' }}>
          <thead>
            <tr style={{ background:C.light }}>
              {['Time','Patient','Doctor','Department','Status'].map(h => (
                <th key={h} style={{ padding:'0.65rem 1rem', textAlign:'left', fontWeight:600, borderBottom:`1px solid ${C.border}`, color:C.primary }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {todayAppts.length === 0 ? (
              <tr><td colSpan={5} style={{ padding:'1.5rem', textAlign:'center', color:C.muted }}>No appointments today.</td></tr>
            ) : todayAppts.map((a,i) => (
              <tr key={a.id} style={{ background: i%2===0 ? C.white : '#fafbff', borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:'0.6rem 1rem', fontWeight:700, color:C.accent }}>{a.time}</td>
                <td style={{ padding:'0.6rem 1rem' }}>{a.patientName}</td>
                <td style={{ padding:'0.6rem 1rem' }}>{DOCTORS.find(d=>d.id===a.doctorId)?.short}</td>
                <td style={{ padding:'0.6rem 1rem' }}>{a.department}</td>
                <td style={{ padding:'0.6rem 1rem' }}><Badge status={a.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── DOCTORS ──────────────────────────────────────────────────────────
function DoctorsSection({ appointments, setAppointments, availability, setAvailability }) {
  const [selectedDoc, setSelectedDoc] = useState(null);
  const [editMode, setEditMode]       = useState(false);
  const [clearOpen, setClearOpen]     = useState(false);
  const [clearDate, setClearDate]     = useState('2026-04-07');
  const [preview, setPreview]         = useState(null);

  const doc = DOCTORS.find(d => d.id === selectedDoc);
  const upcoming = appointments.filter(a => a.doctorId === selectedDoc && a.status !== 'Cancelled')
    .sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const toggleSlot = (day, slot) => setAvailability(prev => {
    const curr = prev[selectedDoc][day];
    const next = curr.includes(slot) ? curr.filter(s=>s!==slot) : [...curr, slot].sort();
    return { ...prev, [selectedDoc]: { ...prev[selectedDoc], [day]: next } };
  });

  const toggleDay = (day) => setAvailability(prev => {
    const curr = prev[selectedDoc][day];
    return { ...prev, [selectedDoc]: { ...prev[selectedDoc], [day]: curr.length ? [] : [...TIME_SLOTS] } };
  });

  const buildPreview = () => {
    const toClear = appointments.filter(a => a.doctorId===selectedDoc && a.date===clearDate && a.status!=='Cancelled');
    if (!toClear.length) { setPreview({ appts:[], empty:true }); return; }
    const booked = {};
    appointments.forEach(a => { if (a.doctorId===selectedDoc) booked[`${a.date}|${a.time}`] = true; });
    const futureDates = Array.from({ length:14 }, (_,i) => {
      const d = new Date('2026-04-07'); d.setDate(d.getDate() + i + 1);
      return { date: d.toISOString().slice(0,10), day: ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'][d.getDay()] };
    }).filter(x => x.date !== clearDate);

    const reassigned = toClear.map(appt => {
      for (const { date, day } of futureDates) {
        const slots = availability[selectedDoc]?.[day] || [];
        for (const slot of slots) {
          if (!booked[`${date}|${slot}`]) {
            booked[`${date}|${slot}`] = true;
            return { ...appt, newDate: date, newTime: slot };
          }
        }
      }
      return { ...appt, newDate: null, newTime: null };
    });
    setPreview({ appts: reassigned });
  };

  const confirmClear = () => {
    if (!preview) return;
    setAppointments(prev => prev.map(a => {
      const r = preview.appts.find(x => x.id === a.id);
      if (!r) return a;
      return r.newDate ? { ...a, date:r.newDate, time:r.newTime } : { ...a, status:'Cancelled' };
    }));
    setClearOpen(false); setPreview(null);
  };

  // ── Doctor list ──
  if (!selectedDoc) {
    const active  = DOCTORS.filter(d => !d.legacy);
    const legacy  = DOCTORS.filter(d =>  d.legacy);
    const DoctorCard = ({ d }) => {
      const count = appointments.filter(a => a.doctorId===d.id && a.status!=='Cancelled').length;
      return (
        <Card key={d.id} style={{ padding:'1.25rem', cursor:'pointer', border:`1px solid ${d.legacy ? '#c9a84c44' : C.border}`, transition:'transform 0.15s, box-shadow 0.15s', background: d.legacy ? '#fffdf5' : C.white }}
          onClick={() => { setSelectedDoc(d.id); setEditMode(false); }}
          onMouseEnter={e => { e.currentTarget.style.transform='translateY(-2px)'; e.currentTarget.style.boxShadow=`0 6px 18px ${d.legacy ? 'rgba(180,140,40,0.15)' : 'rgba(33,50,108,0.13)'}` ; }}
          onMouseLeave={e => { e.currentTarget.style.transform='translateY(0)';  e.currentTarget.style.boxShadow='0 1px 6px rgba(0,0,0,0.07)'; }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.85rem', marginBottom:'0.75rem' }}>
            <div style={{ width:50, height:50, borderRadius:'50%', background: d.legacy ? '#8b7332' : C.primary, color:C.white, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.1rem', flexShrink:0, border: d.legacy ? '2px solid #c9a84c' : 'none' }}>{d.initials}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontWeight:600, fontSize:'0.91rem', lineHeight:1.3, color: d.legacy ? '#5a4a1a' : C.primary }}>{d.name}</div>
              <div style={{ color:C.muted, fontSize:'0.79rem', marginTop:2 }}>{d.role}</div>
            </div>
            {d.legacy && <span style={{ fontSize:'0.7rem', fontWeight:700, background:'#f5e6b0', color:'#7a5c00', padding:'2px 8px', borderRadius:10, whiteSpace:'nowrap', border:'1px solid #c9a84c' }}>In Memoriam</span>}
          </div>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.81rem', color:C.muted, borderTop:`1px solid ${d.legacy ? '#e8d98888' : C.border}`, paddingTop:'0.6rem' }}>
            <span>{d.branch}</span>
            {d.legacy
              ? <span style={{ color:'#7a5c00', fontWeight:600, fontStyle:'italic' }}>Historical records</span>
              : <span style={{ color:C.primary, fontWeight:600 }}>{count} upcoming</span>}
          </div>
        </Card>
      );
    };
    return (
      <div>
        <SectionTitle>Doctors</SectionTitle>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(255px,1fr))', gap:'1rem', marginBottom:'2rem' }}>
          {active.map(d => <DoctorCard key={d.id} d={d} />)}
        </div>
        {legacy.length > 0 && (
          <>
            <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1rem' }}>
              <div style={{ flex:1, height:1, background:'#e8d988' }} />
              <span style={{ fontSize:'0.8rem', fontWeight:700, color:'#7a5c00', letterSpacing:'0.08em', textTransform:'uppercase' }}>Legacy & Founding Physicians</span>
              <div style={{ flex:1, height:1, background:'#e8d988' }} />
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(255px,1fr))', gap:'1rem' }}>
              {legacy.map(d => <DoctorCard key={d.id} d={d} />)}
            </div>
          </>
        )}
      </div>
    );
  }

  // ── Doctor detail ──
  return (
    <div>
      <button onClick={() => { setSelectedDoc(null); setEditMode(false); }} style={{ background:'none', border:'none', color:C.primary, cursor:'pointer', fontWeight:600, marginBottom:'1.25rem', fontSize:'0.88rem' }}>← Back to Doctors</button>

      {/* Legacy memorial banner */}
      {doc.legacy && (
        <div style={{ background:'linear-gradient(135deg,#fffbe6,#fef3c7)', border:'1px solid #c9a84c', borderRadius:12, padding:'1rem 1.5rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'1rem' }}>
          <span style={{ fontSize:'1.6rem' }}>🕯</span>
          <div>
            <div style={{ fontWeight:700, color:'#7a5c00', fontSize:'0.95rem' }}>In Memoriam — Prof. Dr. Abdel-Rahim Abdallah</div>
            <div style={{ color:'#92700a', fontSize:'0.83rem', marginTop:2 }}>Founder of Cutis Dermatology Clinics. His legacy lives on in every patient we serve. Records are preserved as a testament to his life's work.</div>
          </div>
        </div>
      )}

      {/* Header */}
      <Card style={{ padding:'1.25rem 1.5rem', marginBottom:'1.25rem', display:'flex', alignItems:'center', gap:'1.25rem', flexWrap:'wrap', background: doc.legacy ? '#fffdf5' : C.white }}>
        <div style={{ width:60, height:60, borderRadius:'50%', background: doc.legacy ? '#8b7332' : C.primary, color:C.white, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.3rem', flexShrink:0, border: doc.legacy ? '2px solid #c9a84c' : 'none' }}>{doc.initials}</div>
        <div style={{ flex:1 }}>
          <h2 style={{ margin:'0 0 3px', fontSize:'1.1rem', color: doc.legacy ? '#5a4a1a' : C.primary }}>{doc.name}</h2>
          <div style={{ color:C.muted, fontSize:'0.86rem' }}>{doc.role} &nbsp;·&nbsp; {doc.branch}</div>
        </div>
        {!doc.legacy && (
          <div style={{ display:'flex', gap:'0.6rem', flexWrap:'wrap' }}>
            <Btn variant={editMode ? 'primary' : 'outline'} onClick={() => setEditMode(v=>!v)}>
              {editMode ? 'Done Editing' : 'Edit Availability'}
            </Btn>
            <Btn variant="accent" onClick={() => { setClearOpen(true); setPreview(null); }}>Clear a Day</Btn>
          </div>
        )}
      </Card>

      {/* Availability grid */}
      <Card style={{ padding:'1.25rem', marginBottom:'1.25rem', overflowX:'auto', background: doc.legacy ? '#fffdf5' : C.white }}>
        <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.9rem' }}>
          <span style={{ fontWeight:600, fontSize:'0.93rem' }}>{doc.legacy ? 'Historical Schedule' : 'Weekly Availability'}</span>
          {doc.legacy && <span style={{ fontSize:'0.75rem', color:'#7a5c00', background:'#f5e6b0', padding:'2px 8px', borderRadius:8, border:'1px solid #c9a84c' }}>Read-only archive</span>}
        </div>
        <table style={{ borderCollapse:'collapse', fontSize:'0.81rem', minWidth:480 }}>
          <thead>
            <tr>
              <th style={{ padding:'0.4rem 0.7rem', textAlign:'left', color:C.muted, fontWeight:600, width:68 }}>Time</th>
              {DAYS.map(day => {
                const slots = availability[selectedDoc]?.[day] || [];
                return (
                  <th key={day} style={{ padding:'0.4rem 0.7rem', textAlign:'center', color:C.primary, minWidth:72 }}>
                    <div style={{ fontWeight:600 }}>{day}</div>
                    {editMode && (
                      <button onClick={() => toggleDay(day)} style={{ marginTop:3, fontSize:'0.68rem', padding:'2px 8px', borderRadius:4, border:`1px solid ${C.border}`, background: slots.length ? C.dangerBg : C.successBg, color: slots.length ? C.danger : C.success, cursor:'pointer', fontWeight:700 }}>
                        {slots.length ? 'Clear' : 'Fill'}
                      </button>
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {TIME_SLOTS.map(slot => (
              <tr key={slot}>
                <td style={{ padding:'0.3rem 0.7rem', fontWeight:600, color:C.muted }}>{slot}</td>
                {DAYS.map(day => {
                  const active = (availability[selectedDoc]?.[day] || []).includes(slot);
                  return (
                    <td key={day} style={{ padding:'0.3rem 0.7rem', textAlign:'center' }}>
                      {editMode ? (
                        <button onClick={() => toggleSlot(day, slot)} style={{ width:34, height:26, borderRadius:6, border:'none', background: active ? C.primary : C.light, color: active ? C.white : C.muted, cursor:'pointer', fontWeight:600, fontSize:'0.73rem' }}>
                          {active ? '✓' : '+'}
                        </button>
                      ) : (
                        <span style={{ display:'inline-block', width:30, height:18, borderRadius:4, background: active ? C.primary : C.light, opacity: active ? 1 : 0.35 }} />
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Upcoming appointments — hidden for legacy doctors */}
      {doc.legacy ? (
        <Card style={{ padding:'1.5rem', background:'#fffdf5', border:`1px solid #e8d988` }}>
          <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', color:'#7a5c00', fontSize:'0.9rem' }}>
            <span style={{ fontSize:'1.3rem' }}>🕯</span>
            <div>
              <div style={{ fontWeight:600, marginBottom:3 }}>No upcoming appointments</div>
              <div style={{ fontSize:'0.83rem', opacity:0.8 }}>Prof. Dr. Abdel-Rahim's historical patient records are preserved in the Patients section under each patient's clinical history.</div>
            </div>
          </div>
        </Card>
      ) : (
        <Card style={{ overflow:'hidden' }}>
          <div style={{ padding:'0.9rem 1.25rem', borderBottom:`1px solid ${C.border}`, fontWeight:600, fontSize:'0.93rem' }}>
            Upcoming Appointments <span style={{ color:C.muted, fontWeight:400, fontSize:'0.83rem' }}>({upcoming.length})</span>
          </div>
          {upcoming.length === 0 ? (
            <div style={{ padding:'2rem', textAlign:'center', color:C.muted }}>No upcoming appointments.</div>
          ) : (
            <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.87rem' }}>
              <thead>
                <tr style={{ background:C.light }}>
                  {['Date','Time','Patient','Department','Branch','Status'].map(h => (
                    <th key={h} style={{ padding:'0.65rem 1rem', textAlign:'left', fontWeight:600, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {upcoming.map((a,i) => (
                  <tr key={a.id} style={{ background: i%2===0 ? C.white : '#fafbff', borderBottom:`1px solid ${C.border}` }}>
                    <td style={{ padding:'0.6rem 1rem' }}>{a.date}</td>
                    <td style={{ padding:'0.6rem 1rem', fontWeight:700, color:C.accent }}>{a.time}</td>
                    <td style={{ padding:'0.6rem 1rem', fontWeight:500 }}>{a.patientName}</td>
                    <td style={{ padding:'0.6rem 1rem' }}>{a.department}</td>
                    <td style={{ padding:'0.6rem 1rem' }}>{a.branch}</td>
                    <td style={{ padding:'0.6rem 1rem' }}><Badge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </Card>
      )}

      {/* Clear Day modal */}
      {clearOpen && (
        <Modal title={`Clear Schedule — ${doc.short}`} onClose={() => { setClearOpen(false); setPreview(null); }} width={660}>
          <p style={{ margin:'0 0 1rem', color:C.muted, fontSize:'0.88rem' }}>
            Select a date to clear. All appointments will be moved to the next available slot in the doctor's schedule.
          </p>
          <div style={{ display:'flex', gap:'0.75rem', alignItems:'center', marginBottom:'1.25rem' }}>
            <input type="date" value={clearDate} onChange={e => { setClearDate(e.target.value); setPreview(null); }}
              style={{ padding:'0.5rem 0.75rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.9rem', color:C.primary }} />
            <Btn onClick={buildPreview}>Preview Changes</Btn>
          </div>
          {preview && (
            preview.empty ? (
              <p style={{ color:C.muted }}>No active appointments on this date for {doc.short}.</p>
            ) : (
              <>
                <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.85rem', marginBottom:'1.25rem' }}>
                  <thead>
                    <tr style={{ background:C.light }}>
                      {['Patient','Original Slot','Rescheduled To'].map(h => (
                        <th key={h} style={{ padding:'0.6rem 0.85rem', textAlign:'left', fontWeight:600, borderBottom:`1px solid ${C.border}` }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {preview.appts.map(a => (
                      <tr key={a.id} style={{ borderBottom:`1px solid ${C.border}` }}>
                        <td style={{ padding:'0.55rem 0.85rem' }}>{a.patientName}</td>
                        <td style={{ padding:'0.55rem 0.85rem', color:C.danger, fontWeight:600 }}>{a.date} · {a.time}</td>
                        <td style={{ padding:'0.55rem 0.85rem', color: a.newDate ? C.success : C.danger, fontWeight:600 }}>
                          {a.newDate ? `${a.newDate} · ${a.newTime}` : 'No slot found — will be cancelled'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Btn variant="accent" onClick={confirmClear}>Confirm Reschedule</Btn>
              </>
            )
          )}
        </Modal>
      )}
    </div>
  );
}

// ─── APPOINTMENTS ─────────────────────────────────────────────────────
function AppointmentsSection({ appointments, setAppointments }) {
  const [search,        setSearch]        = useState('');
  const [filterStatus,  setFilterStatus]  = useState('All');
  const [filterDoctor,  setFilterDoctor]  = useState('All');
  const [filterDate,    setFilterDate]    = useState('');
  const [logModal,      setLogModal]      = useState(null);
  const [logText,       setLogText]       = useState('');

  const filtered = appointments
    .filter(a => {
      const s = search.toLowerCase();
      return (!s || a.patientName.toLowerCase().includes(s) || a.department.toLowerCase().includes(s))
        && (filterStatus === 'All' || a.status === filterStatus)
        && (filterDoctor === 'All' || a.doctorId === parseInt(filterDoctor))
        && (!filterDate || a.date === filterDate);
    })
    .sort((a,b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const updateStatus = (id, status) => setAppointments(prev => prev.map(a => a.id===id ? {...a, status} : a));
  const saveLog = () => {
    setAppointments(prev => prev.map(a => a.id===logModal.id ? { ...a, notes:logText, status:'Completed' } : a));
    setLogModal(null); setLogText('');
  };

  const STATUS_PILLS = ['All','Confirmed','Pending','Completed','Cancelled'];
  const STATUS_PILL_COLOR = {
    All:       { active: { bg: C.primary,    color: C.white  }, idle: { bg: C.light, color: C.muted } },
    Confirmed: { active: { bg: C.successBg,  color: C.success}, idle: { bg: C.light, color: C.muted } },
    Pending:   { active: { bg: C.warnBg,     color: C.warn   }, idle: { bg: C.light, color: C.muted } },
    Completed: { active: { bg: C.infoBg,     color: C.info   }, idle: { bg: C.light, color: C.muted } },
    Cancelled: { active: { bg: C.dangerBg,   color: C.danger }, idle: { bg: C.light, color: C.muted } },
  };

  const activeFilterCount = [filterStatus !== 'All', filterDoctor !== 'All', !!filterDate, !!search].filter(Boolean).length;
  const clearAll = () => { setSearch(''); setFilterStatus('All'); setFilterDoctor('All'); setFilterDate(''); };

  const activeDoctors = DOCTORS.filter(d => !d.legacy);

  return (
    <div>
      <SectionTitle>Appointments</SectionTitle>

      {/* Filter panel */}
      <Card style={{ padding:'1.1rem 1.25rem', marginBottom:'1.25rem' }}>
        {/* Row 1: search + date + clear */}
        <div style={{ display:'flex', gap:'0.65rem', alignItems:'center', marginBottom:'0.85rem', flexWrap:'wrap' }}>
          <div style={{ position:'relative', flex:'1 1 220px' }}>
            <span style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:C.muted, fontSize:'0.9rem', pointerEvents:'none' }}>🔍</span>
            <input placeholder="Search patient or department…" value={search} onChange={e=>setSearch(e.target.value)}
              style={{ width:'100%', padding:'0.5rem 0.85rem 0.5rem 2rem', borderRadius:8, border:`1.5px solid ${search ? C.primary : C.border}`, fontSize:'0.88rem', outline:'none', boxSizing:'border-box', transition:'border-color 0.15s' }} />
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <label style={{ fontSize:'0.78rem', color:C.muted, whiteSpace:'nowrap' }}>Date</label>
            <input type="date" value={filterDate} onChange={e=>setFilterDate(e.target.value)}
              style={{ padding:'0.5rem 0.75rem', borderRadius:8, border:`1.5px solid ${filterDate ? C.primary : C.border}`, fontSize:'0.88rem', color:C.primary, outline:'none' }} />
            {filterDate && <button onClick={()=>setFilterDate('')} style={{ background:'none', border:'none', cursor:'pointer', color:C.muted, fontSize:'1rem', lineHeight:1, padding:'0 2px' }}>×</button>}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:'0.4rem' }}>
            <label style={{ fontSize:'0.78rem', color:C.muted, whiteSpace:'nowrap' }}>Doctor</label>
            <select value={filterDoctor} onChange={e=>setFilterDoctor(e.target.value)}
              style={{ padding:'0.5rem 0.75rem', borderRadius:8, border:`1.5px solid ${filterDoctor!=='All' ? C.primary : C.border}`, fontSize:'0.88rem', background:C.white, outline:'none', color:C.primary, minWidth:150 }}>
              <option value="All">All Doctors</option>
              {activeDoctors.map(d=><option key={d.id} value={d.id}>{d.short}</option>)}
            </select>
          </div>
          {activeFilterCount > 0 && (
            <button onClick={clearAll} style={{ padding:'0.45rem 0.9rem', borderRadius:8, border:`1.5px solid ${C.border}`, background:'transparent', color:C.muted, cursor:'pointer', fontSize:'0.82rem', fontWeight:600, whiteSpace:'nowrap' }}>
              Clear all ({activeFilterCount})
            </button>
          )}
        </div>

        {/* Row 2: status pills */}
        <div style={{ display:'flex', gap:'0.4rem', alignItems:'center', flexWrap:'wrap' }}>
          <span style={{ fontSize:'0.78rem', color:C.muted, marginRight:4 }}>Status:</span>
          {STATUS_PILLS.map(s => {
            const isActive = filterStatus === s;
            const col = STATUS_PILL_COLOR[s][isActive ? 'active' : 'idle'];
            return (
              <button key={s} onClick={()=>setFilterStatus(s)}
                style={{ padding:'4px 14px', borderRadius:20, border: isActive ? 'none' : `1.5px solid ${C.border}`, background:col.bg, color:col.color, cursor:'pointer', fontSize:'0.8rem', fontWeight: isActive ? 700 : 500, transition:'all 0.15s', fontFamily:'inherit' }}>
                {s}
                {s !== 'All' && <span style={{ marginLeft:5, fontWeight:400 }}>({appointments.filter(a=>a.status===s).length})</span>}
              </button>
            );
          })}
          <span style={{ marginLeft:'auto', fontSize:'0.82rem', color:C.muted }}>{filtered.length} result{filtered.length!==1?'s':''}</span>
        </div>
      </Card>

      <Card style={{ overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.86rem' }}>
          <thead>
            <tr style={{ background:C.light }}>
              {['Date','Time','Patient','Doctor','Department','Status','Actions'].map(h=>(
                <th key={h} style={{ padding:'0.65rem 0.9rem', textAlign:'left', fontWeight:600, borderBottom:`1px solid ${C.border}`, whiteSpace:'nowrap' }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length===0 ? (
              <tr><td colSpan={7} style={{ padding:'2rem', textAlign:'center', color:C.muted }}>No appointments found.</td></tr>
            ) : filtered.map((a,i) => (
              <tr key={a.id} style={{ background: i%2===0 ? C.white : '#fafbff', borderBottom:`1px solid ${C.border}` }}>
                <td style={{ padding:'0.58rem 0.9rem' }}>{a.date}</td>
                <td style={{ padding:'0.58rem 0.9rem', fontWeight:700, color:C.accent }}>{a.time}</td>
                <td style={{ padding:'0.58rem 0.9rem', fontWeight:500 }}>{a.patientName}</td>
                <td style={{ padding:'0.58rem 0.9rem', fontSize:'0.83rem' }}>
                  {(() => { const doc = DOCTORS.find(d=>d.id===a.doctorId); return doc ? <span style={{ color: doc.legacy ? '#7a5c00' : C.muted, fontStyle: doc.legacy ? 'italic' : 'normal' }}>{doc.short}</span> : '—'; })()}
                </td>
                <td style={{ padding:'0.58rem 0.9rem', fontSize:'0.83rem' }}>{a.department}</td>
                <td style={{ padding:'0.58rem 0.9rem' }}><Badge status={a.status} /></td>
                <td style={{ padding:'0.58rem 0.9rem' }}>
                  <div style={{ display:'flex', gap:5, flexWrap:'wrap' }}>
                    {a.status==='Pending'    && <Btn small variant="success" onClick={()=>updateStatus(a.id,'Confirmed')}>Confirm</Btn>}
                    {(a.status==='Confirmed'||a.status==='Pending') && <>
                      <Btn small variant="info"   onClick={()=>{ setLogModal(a); setLogText(a.notes||''); }}>Log</Btn>
                      <Btn small variant="danger"  onClick={()=>updateStatus(a.id,'Cancelled')}>Cancel</Btn>
                    </>}
                    {a.status==='Completed' && <span style={{ fontSize:'0.78rem', color:C.muted, fontStyle:'italic' }}>Logged</span>}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {logModal && (
        <Modal title={`Post-Appointment Log — ${logModal.patientName}`} onClose={()=>setLogModal(null)}>
          <div style={{ fontSize:'0.85rem', color:C.muted, marginBottom:'0.75rem' }}>
            {logModal.date} · {logModal.time} · {logModal.department} · {DOCTORS.find(d=>d.id===logModal.doctorId)?.short}
          </div>
          <textarea rows={6} value={logText} onChange={e=>setLogText(e.target.value)}
            placeholder="Enter diagnosis, treatment prescribed, follow-up notes…"
            style={{ width:'100%', padding:'0.75rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.9rem', resize:'vertical', fontFamily:'inherit', outline:'none', boxSizing:'border-box' }} />
          <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.65rem', marginTop:'1rem' }}>
            <Btn variant="ghost" onClick={()=>setLogModal(null)}>Cancel</Btn>
            <Btn variant="primary" onClick={saveLog} disabled={!logText.trim()}>Save &amp; Mark Completed</Btn>
          </div>
        </Modal>
      )}
    </div>
  );
}

// ─── PATIENTS ─────────────────────────────────────────────────────────
function PatientsSection({ appointments }) {
  const [patients,       setPatients]      = useState(INIT_PATIENTS);
  const [selectedId,     setSelectedId]    = useState(null);
  const [search,         setSearch]        = useState('');
  const [showLogForm,    setShowLogForm]   = useState(false);
  const [newVisit,       setNewVisit]      = useState({ date:'', doctor:'', department:'', diagnosis:'', treatment:'', notes:'' });

  const patient = patients.find(p => p.id === selectedId);
  const filtered = patients.filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.email.toLowerCase().includes(search.toLowerCase()));

  const saveVisit = () => {
    setPatients(prev => prev.map(p => p.id===selectedId ? { ...p, history:[newVisit, ...p.history] } : p));
    setShowLogForm(false);
    setNewVisit({ date:'', doctor:'', department:'', diagnosis:'', treatment:'', notes:'' });
  };

  // ── Patient detail ──
  if (patient) {
    const patAppts = appointments.filter(a => a.patientId===patient.id).sort((a,b)=>b.date.localeCompare(a.date));
    const nv = k => e => setNewVisit(v => ({ ...v, [k]: e.target.value }));

    return (
      <div>
        <button onClick={() => { setSelectedId(null); setShowLogForm(false); }} style={{ background:'none', border:'none', color:C.primary, cursor:'pointer', fontWeight:600, marginBottom:'1.1rem', fontSize:'0.88rem' }}>← Back to Patients</button>

        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem', marginBottom:'1.25rem' }}>
          {/* Info */}
          <Card style={{ padding:'1.25rem' }}>
            <div style={{ display:'flex', alignItems:'center', gap:'0.9rem', marginBottom:'1rem' }}>
              <div style={{ width:52, height:52, borderRadius:'50%', background:C.accent, color:C.white, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'1.15rem' }}>
                {patient.name.split(' ').map(n=>n[0]).join('').slice(0,2)}
              </div>
              <div>
                <h3 style={{ margin:'0 0 3px', fontSize:'1rem' }}>{patient.name}</h3>
                <div style={{ color:C.muted, fontSize:'0.81rem' }}>DOB: {patient.dob}</div>
              </div>
            </div>
            {[['Phone',patient.phone],['Email',patient.email],['Blood Type',patient.bloodType],['Allergies',patient.allergies||'None']].map(([k,v])=>(
              <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.38rem 0', borderBottom:`1px solid ${C.border}`, fontSize:'0.86rem' }}>
                <span style={{ color:C.muted }}>{k}</span>
                <span style={{ fontWeight:500, color: k==='Allergies' && v!=='None' ? C.danger : C.primary }}>{v}</span>
              </div>
            ))}
          </Card>

          {/* Scheduled appointments */}
          <Card style={{ padding:'1.25rem' }}>
            <div style={{ fontWeight:600, fontSize:'0.91rem', marginBottom:'0.75rem' }}>Scheduled Appointments</div>
            {patAppts.length===0 ? <p style={{ color:C.muted, fontSize:'0.86rem' }}>None on record.</p>
              : patAppts.slice(0,6).map(a=>(
              <div key={a.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'0.38rem 0', borderBottom:`1px solid ${C.border}`, fontSize:'0.84rem' }}>
                <div>
                  <span style={{ fontWeight:700, color:C.accent }}>{a.date}</span>
                  <span style={{ color:C.muted, marginLeft:8 }}>{a.time} · {DOCTORS.find(d=>d.id===a.doctorId)?.short}</span>
                </div>
                <Badge status={a.status} />
              </div>
            ))}
          </Card>
        </div>

        {/* Clinical history */}
        <Card style={{ overflow:'hidden' }}>
          <div style={{ padding:'0.9rem 1.25rem', borderBottom:`1px solid ${C.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <span style={{ fontWeight:600 }}>Clinical History ({patient.history.length} visits)</span>
            <Btn small variant={showLogForm ? 'ghost' : 'primary'} onClick={()=>setShowLogForm(v=>!v)}>
              {showLogForm ? 'Cancel' : '+ Log Visit'}
            </Btn>
          </div>

          {showLogForm && (
            <div style={{ padding:'1.1rem 1.25rem', borderBottom:`1px solid ${C.border}`, background:'#fafbff' }}>
              <div style={{ fontWeight:600, fontSize:'0.88rem', marginBottom:'0.75rem' }}>New Visit Entry</div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.65rem', marginBottom:'0.65rem' }}>
                {[['Date','date','date'],['Doctor','doctor','text'],['Department','department','text'],['Diagnosis','diagnosis','text']].map(([label,field,type])=>(
                  <div key={field}>
                    <label style={{ fontSize:'0.78rem', color:C.muted, display:'block', marginBottom:3 }}>{label}</label>
                    <input type={type} value={newVisit[field]} onChange={nv(field)}
                      style={{ width:'100%', padding:'0.45rem 0.7rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.86rem', boxSizing:'border-box', outline:'none' }} />
                  </div>
                ))}
              </div>
              {[['Treatment','treatment'],['Notes','notes']].map(([label,field])=>(
                <div key={field} style={{ marginBottom:'0.65rem' }}>
                  <label style={{ fontSize:'0.78rem', color:C.muted, display:'block', marginBottom:3 }}>{label}</label>
                  <textarea rows={2} value={newVisit[field]} onChange={nv(field)}
                    style={{ width:'100%', padding:'0.45rem 0.7rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.86rem', resize:'vertical', fontFamily:'inherit', boxSizing:'border-box', outline:'none' }} />
                </div>
              ))}
              <Btn variant="primary" onClick={saveVisit} disabled={!newVisit.date || !newVisit.diagnosis}>Save Visit</Btn>
            </div>
          )}

          {patient.history.length===0 && !showLogForm
            ? <div style={{ padding:'2rem', textAlign:'center', color:C.muted }}>No visit history yet.</div>
            : patient.history.map((v,i)=>(
            <div key={i} style={{ padding:'1rem 1.25rem', borderBottom:`1px solid ${C.border}`, fontSize:'0.87rem' }}>
              <div style={{ display:'flex', alignItems:'center', gap:'0.5rem', marginBottom:'0.5rem', flexWrap:'wrap' }}>
                <span style={{ fontWeight:700, color:C.primary }}>{v.date}</span>
                <span style={{ color:C.muted }}>{v.doctor}</span>
                <span style={{ background:C.light, color:C.primary, padding:'2px 9px', borderRadius:4, fontSize:'0.77rem', fontWeight:600 }}>{v.department}</span>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'0.4rem', marginBottom: v.notes ? '0.4rem' : 0 }}>
                <div><span style={{ color:C.muted }}>Dx: </span><strong>{v.diagnosis}</strong></div>
                <div><span style={{ color:C.muted }}>Rx: </span>{v.treatment}</div>
              </div>
              {v.notes && <div style={{ color:C.muted, fontStyle:'italic', borderLeft:`3px solid ${C.border}`, paddingLeft:10, marginTop:4 }}>{v.notes}</div>}
            </div>
          ))}
        </Card>
      </div>
    );
  }

  // ── Patient list ──
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:'1.1rem' }}>
        <SectionTitle>Patients</SectionTitle>
        <span style={{ fontSize:'0.83rem', color:C.muted, marginTop:'-1.5rem' }}>{patients.length} total</span>
      </div>
      <input placeholder="Search by name or email…" value={search} onChange={e=>setSearch(e.target.value)}
        style={{ width:'100%', padding:'0.55rem 0.9rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.88rem', marginBottom:'1rem', boxSizing:'border-box', outline:'none' }} />
      <Card style={{ overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse', fontSize:'0.87rem' }}>
          <thead>
            <tr style={{ background:C.light }}>
              {['Patient','DOB','Phone','Blood','Allergies','Visits'].map(h=>(
                <th key={h} style={{ padding:'0.65rem 1rem', textAlign:'left', fontWeight:600, borderBottom:`1px solid ${C.border}` }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((p,i)=>(
              <tr key={p.id} onClick={()=>setSelectedId(p.id)}
                style={{ background: i%2===0 ? C.white : '#fafbff', borderBottom:`1px solid ${C.border}`, cursor:'pointer' }}
                onMouseEnter={e=>e.currentTarget.style.background=C.light}
                onMouseLeave={e=>e.currentTarget.style.background= i%2===0 ? C.white : '#fafbff'}>
                <td style={{ padding:'0.62rem 1rem', fontWeight:600 }}>{p.name}</td>
                <td style={{ padding:'0.62rem 1rem', color:C.muted }}>{p.dob}</td>
                <td style={{ padding:'0.62rem 1rem' }}>{p.phone}</td>
                <td style={{ padding:'0.62rem 1rem' }}>{p.bloodType}</td>
                <td style={{ padding:'0.62rem 1rem', color: p.allergies && p.allergies!=='None' ? C.danger : C.muted, fontWeight: p.allergies && p.allergies!=='None' ? 600 : 400 }}>{p.allergies||'None'}</td>
                <td style={{ padding:'0.62rem 1rem' }}>{p.history.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}

// ─── INBOX ────────────────────────────────────────────────────────────
function InboxSection() {
  const [emails,      setEmails]      = useState(INIT_EMAILS);
  const [selectedId,  setSelectedId]  = useState(null);
  const [replyOpen,   setReplyOpen]   = useState(false);
  const [replyText,   setReplyText]   = useState('');

  const email   = emails.find(e => e.id === selectedId);
  const unread  = emails.filter(e => !e.read).length;

  const open = (id) => {
    setSelectedId(id); setReplyOpen(false);
    setEmails(prev => prev.map(e => e.id===id ? { ...e, read:true } : e));
  };

  const deleteEmail = (id) => {
    setEmails(prev => prev.filter(e => e.id !== id));
    if (selectedId === id) setSelectedId(null);
  };

  return (
    <div>
      <SectionTitle>Inbox</SectionTitle>
      <div style={{ display:'grid', gridTemplateColumns:'300px 1fr', gap:'1rem', minHeight:520 }}>
        {/* List */}
        <Card style={{ overflow:'hidden', display:'flex', flexDirection:'column' }}>
          <div style={{ padding:'0.85rem 1.1rem', borderBottom:`1px solid ${C.border}`, fontWeight:700, display:'flex', justifyContent:'space-between', alignItems:'center', fontSize:'0.92rem' }}>
            <span>Inbox</span>
            {unread>0 && <span style={{ background:C.accent, color:C.white, borderRadius:12, padding:'1px 9px', fontSize:'0.76rem', fontWeight:700 }}>{unread} new</span>}
          </div>
          <div style={{ overflowY:'auto', flex:1 }}>
            {emails.length === 0 && <div style={{ padding:'2rem', textAlign:'center', color:C.muted }}>Inbox is empty.</div>}
            {emails.map(e => (
              <div key={e.id} onClick={()=>open(e.id)}
                style={{ padding:'0.8rem 1rem', borderBottom:`1px solid ${C.border}`, cursor:'pointer', background: selectedId===e.id ? C.light : (e.read ? C.white : '#f5f7ff'), transition:'background 0.1s', position:'relative' }}>
                <div style={{ display:'flex', justifyContent:'space-between', marginBottom:2 }}>
                  <span style={{ fontWeight: e.read ? 500 : 700, fontSize:'0.87rem', color:C.primary }}>{e.fromName}</span>
                  <span style={{ fontSize:'0.74rem', color:C.muted }}>{e.date}</span>
                </div>
                <div style={{ fontSize:'0.81rem', fontWeight: e.read ? 400 : 600, color: e.read ? C.muted : C.primary, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis', paddingRight:20 }}>{e.subject}</div>
                {!e.read && <div style={{ position:'absolute', right:12, top:'50%', transform:'translateY(-50%)', width:7, height:7, borderRadius:'50%', background:C.accent }} />}
              </div>
            ))}
          </div>
        </Card>

        {/* Reader */}
        <Card style={{ padding:'1.5rem', overflowY:'auto', display:'flex', flexDirection:'column' }}>
          {!email ? (
            <div style={{ flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', color:C.muted, gap:'0.5rem' }}>
              <div style={{ fontSize:'2.5rem' }}>✉</div>
              <div>Select an email to read</div>
            </div>
          ) : (
            <>
              <h3 style={{ margin:'0 0 0.75rem', color:C.primary, fontSize:'1.03rem' }}>{email.subject}</h3>
              <div style={{ display:'flex', justifyContent:'space-between', padding:'0.7rem 1rem', background:C.light, borderRadius:8, fontSize:'0.84rem', marginBottom:'1.25rem' }}>
                <span><strong>From:</strong> {email.fromName} &lt;{email.from}&gt;</span>
                <span style={{ color:C.muted }}>{email.date}</span>
              </div>
              <div style={{ whiteSpace:'pre-wrap', lineHeight:1.85, fontSize:'0.9rem', color:'#333', flex:1 }}>{email.body}</div>

              {replyOpen ? (
                <div style={{ marginTop:'1.25rem' }}>
                  <div style={{ fontSize:'0.82rem', color:C.muted, marginBottom:6 }}>Reply to {email.fromName}</div>
                  <textarea rows={5} value={replyText} onChange={e=>setReplyText(e.target.value)} placeholder="Type your reply…"
                    style={{ width:'100%', padding:'0.7rem', borderRadius:8, border:`1.5px solid ${C.border}`, fontSize:'0.88rem', resize:'vertical', fontFamily:'inherit', boxSizing:'border-box', outline:'none' }} />
                  <div style={{ display:'flex', gap:'0.65rem', marginTop:'0.75rem' }}>
                    <Btn variant="primary" onClick={()=>{ setReplyOpen(false); setReplyText(''); }} disabled={!replyText.trim()}>Send Reply</Btn>
                    <Btn variant="ghost" onClick={()=>setReplyOpen(false)}>Cancel</Btn>
                  </div>
                </div>
              ) : (
                <div style={{ display:'flex', gap:'0.65rem', marginTop:'1.25rem' }}>
                  <Btn variant="outline" onClick={()=>setReplyOpen(true)}>Reply</Btn>
                  <Btn variant="ghost" onClick={()=>{}}>Forward</Btn>
                  <Btn variant="danger" onClick={()=>deleteEmail(email.id)}>Delete</Btn>
                </div>
              )}
            </>
          )}
        </Card>
      </div>
    </div>
  );
}

// ─── ANALYTICS ────────────────────────────────────────────────────────
function AnalyticsSection({ appointments }) {
  const byDept = appointments.reduce((acc, a) => {
    acc[a.department] = (acc[a.department]||0) + 1; return acc;
  }, {});
  const byDoctor = DOCTORS.map(d => ({ ...d, count: appointments.filter(a=>a.doctorId===d.id).length }));
  const byStatus = ['Confirmed','Pending','Completed','Cancelled'].map(s => ({ s, count: appointments.filter(a=>a.status===s).length }));
  const maxDept = Math.max(...Object.values(byDept), 1);
  const maxDoc  = Math.max(...byDoctor.map(d=>d.count), 1);

  return (
    <div>
      <SectionTitle>Analytics</SectionTitle>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1.25rem', marginBottom:'1.25rem' }}>
        {/* By status */}
        <Card style={{ padding:'1.25rem' }}>
          <div style={{ fontWeight:600, fontSize:'0.92rem', marginBottom:'1rem' }}>Appointments by Status</div>
          {byStatus.map(({ s, count }) => {
            const total = appointments.length || 1;
            const pct = Math.round((count/total)*100);
            const col = STATUS_STYLE[s]?.color || C.muted;
            return (
              <div key={s} style={{ marginBottom:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.84rem', marginBottom:4 }}>
                  <span>{s}</span><span style={{ fontWeight:600, color:col }}>{count} ({pct}%)</span>
                </div>
                <div style={{ background:C.light, borderRadius:4, height:8, overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:col, borderRadius:4, transition:'width 0.5s' }} />
                </div>
              </div>
            );
          })}
        </Card>

        {/* By department */}
        <Card style={{ padding:'1.25rem' }}>
          <div style={{ fontWeight:600, fontSize:'0.92rem', marginBottom:'1rem' }}>Appointments by Department</div>
          {Object.entries(byDept).map(([dept, count]) => {
            const pct = Math.round((count/maxDept)*100);
            return (
              <div key={dept} style={{ marginBottom:'0.75rem' }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.84rem', marginBottom:4 }}>
                  <span style={{ fontSize:'0.82rem' }}>{dept}</span><span style={{ fontWeight:600, color:C.primary }}>{count}</span>
                </div>
                <div style={{ background:C.light, borderRadius:4, height:8, overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:C.primary, borderRadius:4 }} />
                </div>
              </div>
            );
          })}
        </Card>
      </div>

      {/* By doctor */}
      <Card style={{ padding:'1.25rem' }}>
        <div style={{ fontWeight:600, fontSize:'0.92rem', marginBottom:'1rem' }}>Appointment Load by Doctor</div>
        {byDoctor.sort((a,b)=>b.count-a.count).map(d => {
          const pct = Math.round((d.count/maxDoc)*100);
          return (
            <div key={d.id} style={{ display:'flex', alignItems:'center', gap:'1rem', marginBottom:'0.7rem' }}>
              <div style={{ width:36, height:36, borderRadius:'50%', background:C.primary, color:C.white, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, fontSize:'0.78rem', flexShrink:0 }}>{d.initials}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:'flex', justifyContent:'space-between', fontSize:'0.84rem', marginBottom:3 }}>
                  <span>{d.short}</span><span style={{ fontWeight:700, color:C.accent }}>{d.count}</span>
                </div>
                <div style={{ background:C.light, borderRadius:4, height:8, overflow:'hidden' }}>
                  <div style={{ width:`${pct}%`, height:'100%', background:C.accent, borderRadius:4 }} />
                </div>
              </div>
            </div>
          );
        })}
      </Card>
    </div>
  );
}

// ─── ROOT COMPONENT ───────────────────────────────────────────────────
const NAV_ITEMS = [
  { id:'overview',     label:'Overview',     icon:'▦' },
  { id:'doctors',      label:'Doctors',      icon:'⚕' },
  { id:'appointments', label:'Appointments', icon:'◷' },
  { id:'patients',     label:'Patients',     icon:'♡' },
  { id:'analytics',    label:'Analytics',    icon:'↗' },
  { id:'inbox',        label:'Inbox',        icon:'✉' },
];

export default function AdminDashboard() {
  const [activeTab,    setActiveTab]    = useState('overview');
  const [collapsed,    setCollapsed]    = useState(false);
  const [appointments, setAppointments] = useState(INIT_APPOINTMENTS);
  const [availability, setAvailability] = useState(buildDefaultAvailability);

  const pendingCount = appointments.filter(a => a.status === 'Pending').length;
  const unreadCount  = INIT_EMAILS.filter(e => !e.read).length;
  const badge = { appointments: pendingCount, inbox: unreadCount };

  const SW = collapsed ? 60 : 210; // sidebar width

  return (
    // Outer wrapper — no fixed positioning, lives naturally inside App's <main>
    <div style={{ display:'flex', alignItems:'flex-start', background:C.bg, fontFamily:"'DM Sans', 'Segoe UI', sans-serif", color:C.primary, minHeight:'100%' }}>

      {/* Sidebar — sticky so it stays visible while scrolling, but doesn't overlap footer */}
      <aside style={{ width:SW, flexShrink:0, background:C.primary, display:'flex', flexDirection:'column', position:'sticky', top:0, height:'100vh', overflowX:'hidden', overflowY:'auto', transition:'width 0.2s ease', zIndex:10 }}>

        {/* Header: logo + collapse toggle */}
        <div style={{ padding: collapsed ? '1.1rem 0' : '1.1rem 1rem 0.85rem', borderBottom:'1px solid rgba(255,255,255,0.1)', display:'flex', alignItems:'center', justifyContent: collapsed ? 'center' : 'space-between', gap:'0.5rem', flexShrink:0 }}>
          {!collapsed && (
            <div>
              <div style={{ color:'#fff', fontWeight:700, fontSize:'1.1rem', letterSpacing:'-0.3px', whiteSpace:'nowrap' }}>Cutis</div>
              <div style={{ color:'rgba(255,255,255,0.4)', fontSize:'0.7rem', marginTop:1 }}>Admin Dashboard</div>
            </div>
          )}
          <button onClick={()=>setCollapsed(v=>!v)}
            style={{ background:'rgba(255,255,255,0.1)', border:'none', borderRadius:6, width:28, height:28, cursor:'pointer', color:'rgba(255,255,255,0.7)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.85rem', flexShrink:0, transition:'background 0.15s' }}
            title={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(255,255,255,0.18)'}
            onMouseLeave={e=>e.currentTarget.style.background='rgba(255,255,255,0.1)'}>
            {collapsed ? '»' : '«'}
          </button>
        </div>

        {/* Back to portal */}
        <a href="/" style={{ display:'flex', alignItems:'center', gap:'0.6rem', padding: collapsed ? '0.65rem 0' : '0.65rem 1rem', margin: collapsed ? '0.65rem 0.5rem 0' : '0.65rem 0.75rem 0', borderRadius:8, background:'rgba(255,144,68,0.15)', border:'1px solid rgba(255,144,68,0.3)', color:'#ffb87a', textDecoration:'none', fontSize:'0.82rem', fontWeight:600, justifyContent: collapsed ? 'center' : 'flex-start', transition:'background 0.15s', flexShrink:0 }}
          onMouseEnter={e=>e.currentTarget.style.background='rgba(255,144,68,0.25)'}
          onMouseLeave={e=>e.currentTarget.style.background='rgba(255,144,68,0.15)'}>
          <span style={{ fontSize:'0.9rem', flexShrink:0 }}>←</span>
          {!collapsed && <span style={{ whiteSpace:'nowrap' }}>Client Portal</span>}
        </a>

        {/* Nav items */}
        <nav style={{ flex:1, padding: collapsed ? '0.75rem 0.4rem' : '0.75rem 0.6rem', overflowY:'auto' }}>
          {NAV_ITEMS.map(item => {
            const b = badge[item.id] || 0;
            const active = activeTab === item.id;
            return (
              <button key={item.id} onClick={()=>setActiveTab(item.id)}
                title={collapsed ? item.label : undefined}
                style={{ width:'100%', display:'flex', alignItems:'center', gap: collapsed ? 0 : '0.65rem', justifyContent: collapsed ? 'center' : 'flex-start', padding: collapsed ? '0.65rem 0' : '0.58rem 0.8rem', borderRadius:8, border:'none', background: active ? 'rgba(255,255,255,0.13)' : 'transparent', color: active ? '#fff' : 'rgba(255,255,255,0.55)', cursor:'pointer', fontSize:'0.87rem', fontWeight: active ? 600 : 400, marginBottom:2, textAlign:'left', transition:'background 0.13s', fontFamily:'inherit', position:'relative' }}
                onMouseEnter={e=>{ if(!active) e.currentTarget.style.background='rgba(255,255,255,0.07)'; }}
                onMouseLeave={e=>{ if(!active) e.currentTarget.style.background='transparent'; }}>
                <span style={{ fontSize:'1rem', width:18, textAlign:'center', flexShrink:0 }}>{item.icon}</span>
                {!collapsed && <span style={{ whiteSpace:'nowrap' }}>{item.label}</span>}
                {b > 0 && !collapsed && <span style={{ marginLeft:'auto', background:C.accent, color:'#fff', borderRadius:12, padding:'1px 7px', fontSize:'0.7rem', fontWeight:700 }}>{b}</span>}
                {b > 0 && collapsed && <span style={{ position:'absolute', top:4, right:4, width:8, height:8, borderRadius:'50%', background:C.accent }} />}
              </button>
            );
          })}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div style={{ padding:'0.85rem 1rem', borderTop:'1px solid rgba(255,255,255,0.08)', color:'rgba(255,255,255,0.28)', fontSize:'0.7rem', flexShrink:0 }}>
            Cutis Dermatology Clinics
          </div>
        )}
      </aside>

      {/* Main content */}
      <main style={{ flex:1, padding:'1.75rem', minWidth:0, minHeight:'100vh' }}>
        {activeTab==='overview'     && <OverviewSection     appointments={appointments} patients={INIT_PATIENTS} />}
        {activeTab==='doctors'      && <DoctorsSection      appointments={appointments} setAppointments={setAppointments} availability={availability} setAvailability={setAvailability} />}
        {activeTab==='appointments' && <AppointmentsSection appointments={appointments} setAppointments={setAppointments} />}
        {activeTab==='patients'     && <PatientsSection     appointments={appointments} />}
        {activeTab==='analytics'    && <AnalyticsSection    appointments={appointments} />}
        {activeTab==='inbox'        && <InboxSection />}
      </main>
    </div>
  );
}
