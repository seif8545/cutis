import React, { useState, useMemo } from 'react';
import '../styles/global.css';

const BRANCHES = ["Sheikh Zayed", "Fifth Settlement", "Heliopolis", "Mohandeseen"];

const CLINICS = [
  { id: "Cosmetic Dermatology",  title: "Cosmetic Dermatology",  desc: "For aesthetic refinement, Botox, dermal fillers, neuromodulators, and anti-aging treatments." },
  { id: "Advanced Laser Center", title: "Advanced Laser Center", desc: "For laser hair removal, tattoo removal, scar revision, and advanced skin resurfacing." },
  { id: "Clinical Dermatology",  title: "Clinical Dermatology",  desc: "For medical diagnosis and treatment of acne, eczema, vitiligo, psoriasis, and hair loss." },
];

// Prof. Abdel-Rahim is not listed — he no longer sees patients
const DOCTORS = [
  { id: "Any",                      name: "Any Available Specialist", desc: "Earliest available appointment" },
  { id: "Prof. Marwa Abdallah",     name: "Prof. Dr. Marwa Abdallah", desc: "Professor of Dermatology" },
  { id: "A. Prof. Mahmoud Abdallah",name: "A. Prof. Dr. Mahmoud",     desc: "Associate Professor" },
  { id: "Dr. Nehad Youssef",        name: "Dr. Nehad Youssef",        desc: "Specialist Dermatologist" },
  { id: "Dr. Azza El-Azhary",       name: "Dr. Azza El-Azhary",       desc: "Head of Dermatology" },
];

// Available time slots by day of week (index 0=Sun … 6=Sat). Friday=closed.
const SLOTS_BY_DAY = {
  0: ['09:00','09:30','10:00','10:30','11:00','14:00','14:30','15:00'],           // Sun
  1: ['09:00','09:30','10:00','10:30','11:00','11:30','14:00','14:30','15:00','15:30'], // Mon
  2: ['09:00','09:30','10:30','11:00','14:00','15:00','16:00','16:30'],           // Tue
  3: ['09:00','10:00','10:30','11:00','14:00','14:30','15:00'],                   // Wed
  4: ['09:00','09:30','10:00','11:00','11:30','14:30','15:00','16:00'],           // Thu
  5: [],                                                                           // Fri — closed
  6: ['10:00','10:30','11:00','11:30','14:00','14:30'],                           // Sat
};

const DAY_NAMES   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTH_NAMES = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// ~20% of slots appear "taken" — deterministic so UI is stable
const isTaken = (dateStr, slot) => {
  const n = (dateStr + slot).split('').reduce((a, c) => a + c.charCodeAt(0), 0);
  return n % 5 === 0;
};

const getAvailableDates = () => {
  const dates = [];
  const today = new Date();
  for (let i = 1; dates.length < 12; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    if (d.getDay() === 5) continue; // skip Friday
    dates.push({
      value:     d.toISOString().slice(0, 10),
      dayName:   DAY_NAMES[d.getDay()],
      dayNum:    d.getDate(),
      month:     MONTH_NAMES[d.getMonth()],
      dayOfWeek: d.getDay(),
    });
  }
  return dates;
};

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visitType: 'Clinics',
    branch: '',
    department: '',
    doctor: '',
    date: '',
    time: '',
    fullName: '',
    phone: '',
    email: '',
    chiefComplaint: '',
    allergies: '',
    medications: '',
  });

  const availableDates = useMemo(() => getAvailableDates(), []);

  const updateField = (name, value) => setFormData(prev => ({ ...prev, [name]: value }));

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitBooking = (e) => {
    e.preventDefault();
    setStep(5);
  };

  // Slots derived from selected date
  const selectedDateObj   = availableDates.find(d => d.value === formData.date);
  const allSlots          = selectedDateObj ? (SLOTS_BY_DAY[selectedDateObj.dayOfWeek] || []) : [];
  const morningSlots      = allSlots.filter(s => parseInt(s) < 12);
  const afternoonSlots    = allSlots.filter(s => parseInt(s) >= 12);

  const formatDate = (dateStr) => {
    const d = availableDates.find(x => x.value === dateStr);
    return d ? `${d.dayName}, ${d.dayNum} ${d.month}` : dateStr;
  };

  // ─── SLOT BUTTON ─────────────────────────────────────────────────────
  const SlotBtn = ({ slot }) => {
    const taken    = isTaken(formData.date, slot);
    const selected = formData.time === slot;
    return (
      <button
        onClick={() => !taken && updateField('time', slot)}
        disabled={taken}
        style={{
          padding: '9px 18px', borderRadius: '8px', fontSize: '0.88rem', fontWeight: 600,
          border: selected ? '2px solid var(--brand-blue)' : '1.5px solid var(--border-lt)',
          background: selected ? 'var(--brand-blue)' : taken ? '#f5f5f5' : '#fff',
          color: selected ? '#fff' : taken ? '#ccc' : 'var(--text-dark)',
          cursor: taken ? 'not-allowed' : 'pointer',
          textDecoration: taken ? 'line-through' : 'none',
          transition: 'all 0.15s ease',
          fontFamily: 'inherit',
        }}
      >
        {slot}
      </button>
    );
  };

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 70px)' }}>
      <div className="container" style={{ maxWidth: '800px' }}>

        {/* Step Indicator */}
        {step < 5 && (
          <div style={{ marginBottom: '40px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
              <span className="eyebrow" style={{ margin: 0 }}>Consultation Request</span>
              <span style={{ fontWeight: '700', fontSize: '0.8rem', color: 'var(--brand-blue)' }}>Step {step} of 4</span>
            </div>
            <div style={{ height: '6px', background: 'var(--border-lt)', borderRadius: '100px', overflow: 'hidden' }}>
              <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--brand-green)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            </div>
          </div>
        )}

        <div className="glass-panel" style={{ padding: '48px', border: 'none', boxShadow: 'var(--shadow-md)' }}>

          {/* ── STEP 1: CLINIC, DOCTOR & SCHEDULE ── */}
          {step === 1 && (
            <div className="reveal">
              <h2 className="heading-md" style={{ marginBottom: '32px' }}>Select Your Service</h2>

              {/* Clinic */}
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label className="custom-label">Which clinic do you need? *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {CLINICS.map(clinic => (
                    <button
                      key={clinic.id}
                      className={`selection-card ${formData.department === clinic.id ? 'active' : ''}`}
                      onClick={() => updateField('department', clinic.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div className="card-title">{clinic.title}</div>
                        {formData.department === clinic.id && <div className="check-icon">✓</div>}
                      </div>
                      <div className="card-desc">{clinic.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Branch */}
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label className="custom-label">Preferred Branch *</label>
                <div className="pill-grid">
                  {BRANCHES.map(b => (
                    <button
                      key={b}
                      className={`pill-btn ${formData.branch === b ? 'active' : ''}`}
                      onClick={() => updateField('branch', b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Doctor */}
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label className="custom-label">Preferred Doctor (Optional)</label>
                <div className="grid-2" style={{ gap: '12px' }}>
                  {DOCTORS.map(doc => {
                    const isActive = formData.doctor === doc.id || (doc.id === 'Any' && formData.doctor === '');
                    return (
                      <button
                        key={doc.id}
                        className={`selection-card compact ${isActive ? 'active' : ''}`}
                        onClick={() => updateField('doctor', doc.id === 'Any' ? '' : doc.id)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <div>
                            <div className="card-title" style={{ fontSize: '0.95rem' }}>{doc.name}</div>
                            <div className="card-desc" style={{ fontSize: '0.8rem', marginTop: '2px' }}>{doc.desc}</div>
                          </div>
                          {isActive && <div className="check-icon">✓</div>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Date Picker ── */}
              <div className="form-group" style={{ marginBottom: formData.date ? '20px' : '40px' }}>
                <label className="custom-label">Preferred Date *</label>
                <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '6px', scrollbarWidth: 'thin' }}>
                  {availableDates.map(d => {
                    const isSelected = formData.date === d.value;
                    return (
                      <button
                        key={d.value}
                        onClick={() => { updateField('date', d.value); updateField('time', ''); }}
                        style={{
                          flexShrink: 0,
                          display: 'flex', flexDirection: 'column', alignItems: 'center',
                          padding: '10px 14px', borderRadius: '10px', minWidth: '62px',
                          border: isSelected ? '2px solid var(--brand-blue)' : '2px solid var(--border-lt)',
                          background: isSelected ? 'var(--brand-blue)' : '#fff',
                          color: isSelected ? '#fff' : 'var(--text-dark)',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease',
                          fontFamily: 'inherit',
                        }}
                      >
                        <span style={{ fontSize: '0.68rem', fontWeight: 700, opacity: isSelected ? 0.8 : 0.5, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{d.dayName}</span>
                        <span style={{ fontSize: '1.4rem', fontWeight: 700, lineHeight: 1.2, margin: '3px 0' }}>{d.dayNum}</span>
                        <span style={{ fontSize: '0.68rem', fontWeight: 600, opacity: isSelected ? 0.8 : 0.5 }}>{d.month}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* ── Time Slots (revealed after date is picked) ── */}
              {formData.date && (
                <div className="form-group" style={{ marginBottom: '40px' }}>
                  <label className="custom-label">
                    Available Times *
                    <span style={{ fontWeight: 400, color: 'var(--text-muted)', fontSize: '0.8rem', marginLeft: '8px' }}>
                      {formatDate(formData.date)}
                    </span>
                  </label>

                  {allSlots.length === 0 ? (
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>The clinic is closed on this day. Please choose another date.</p>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {morningSlots.length > 0 && (
                        <div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                            Morning
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {morningSlots.map(slot => <SlotBtn key={slot} slot={slot} />)}
                          </div>
                        </div>
                      )}
                      {afternoonSlots.length > 0 && (
                        <div>
                          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '10px' }}>
                            Afternoon
                          </div>
                          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                            {afternoonSlots.map(slot => <SlotBtn key={slot} slot={slot} />)}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <button
                className="btn btn-primary"
                style={{ width: '100%' }}
                onClick={nextStep}
                disabled={!formData.branch || !formData.department || !formData.date || !formData.time}
              >
                Continue →
              </button>
            </div>
          )}

          {/* ── STEP 2: PERSONAL INFO ── */}
          {step === 2 && (
            <div className="reveal">
              <h2 className="heading-md">Patient Details</h2>
              <div className="form-group">
                <label className="custom-label">Full Name *</label>
                <input type="text" className="custom-input" placeholder="e.g. Sara Ahmed" value={formData.fullName} onChange={e => updateField('fullName', e.target.value)} />
              </div>
              <div className="grid-2" style={{ gap: '20px' }}>
                <div className="form-group">
                  <label className="custom-label">Email Address *</label>
                  <input type="email" className="custom-input" placeholder="sara@example.com" value={formData.email} onChange={e => updateField('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="custom-label">Phone Number *</label>
                  <input type="tel" className="custom-input" placeholder="01xx xxx xxxx" value={formData.phone} onChange={e => updateField('phone', e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.fullName || !formData.phone || !formData.email}>Next Step</button>
              </div>
            </div>
          )}

          {/* ── STEP 3: VISIT DETAILS (optional) ── */}
          {step === 3 && (
            <div className="reveal">
              <h2 className="heading-md">Visit Details <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: '400' }}>(Optional)</span></h2>
              <div className="form-group">
                <label className="custom-label">Is there anything specific the doctor should know beforehand?</label>
                <textarea
                  className="custom-input"
                  rows="6"
                  placeholder="Feel free to describe the skin issue, your desired treatment, or any specific symptoms you've been experiencing..."
                  value={formData.chiefComplaint}
                  onChange={e => updateField('chiefComplaint', e.target.value)}
                />
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep}>Medical History →</button>
              </div>
            </div>
          )}

          {/* ── STEP 4: HISTORY & SUBMIT ── */}
          {step === 4 && (
            <div className="reveal">
              <h2 className="heading-md">Final Review</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>This information is kept strictly confidential.</p>

              {/* Appointment summary card */}
              <div style={{ padding: '16px 20px', background: 'var(--brand-blue-lt, #eef2ff)', border: '1.5px solid var(--brand-blue)', borderRadius: '10px', marginBottom: '28px' }}>
                <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--brand-blue)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>Your Appointment</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 16px', fontSize: '0.88rem' }}>
                  {[
                    ['Clinic',  formData.department],
                    ['Branch',  formData.branch],
                    ['Date',    formatDate(formData.date)],
                    ['Time',    formData.time],
                    ...(formData.doctor ? [['Doctor', formData.doctor]] : []),
                  ].map(([k, v]) => (
                    <div key={k}>
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>{k}: </span>
                      <strong style={{ color: 'var(--text-dark)' }}>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="custom-label">Known Allergies</label>
                <input type="text" className="custom-input" placeholder="e.g. Penicillin, None" value={formData.allergies} onChange={e => updateField('allergies', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="custom-label">Current Medications</label>
                <input type="text" className="custom-input" placeholder="List any medications or supplements" value={formData.medications} onChange={e => updateField('medications', e.target.value)} />
              </div>

              <div style={{ padding: '16px', border: '1px solid var(--border-lt)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px', background: '#fcfcfc' }}>
                <input type="checkbox" style={{ width: '20px', height: '20px', cursor: 'pointer' }} required />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>I confirm the information provided is accurate.</span>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={submitBooking}>Book Appointment</button>
              </div>
            </div>
          )}

          {/* ── STEP 5: SUCCESS ── */}
          {step === 5 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.6s ease', padding: '40px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: '#0f172a' }}>✓</div>
              <h2 className="heading-md">Booking Confirmed!</h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '24px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                Thank you, <strong>{formData.fullName}</strong>. Your appointment has been received.
              </p>
              <div style={{ display: 'inline-block', textAlign: 'left', background: 'var(--brand-blue-lt, #eef2ff)', border: '1.5px solid var(--brand-blue)', borderRadius: '12px', padding: '20px 28px', marginBottom: '24px' }}>
                <div style={{ display: 'grid', gap: '9px', fontSize: '0.92rem' }}>
                  <div><span style={{ color: 'var(--text-muted)', marginRight: 6 }}>Clinic:</span><strong>{formData.department}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', marginRight: 6 }}>Branch:</span><strong>{formData.branch}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', marginRight: 6 }}>Date:</span><strong>{formatDate(formData.date)}</strong></div>
                  <div><span style={{ color: 'var(--text-muted)', marginRight: 6 }}>Time:</span><strong>{formData.time}</strong></div>
                  {formData.doctor && <div><span style={{ color: 'var(--text-muted)', marginRight: 6 }}>Doctor:</span><strong>{formData.doctor}</strong></div>}
                </div>
              </div>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.88rem', marginBottom: '32px' }}>
                Our coordinators at the <strong>{formData.branch}</strong> branch will call you to confirm the appointment.
              </p>
              <button className="btn btn-primary" onClick={() => window.location.href='/'}>Back to Home</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .form-group { margin-bottom: 24px; }
        .custom-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }

        .selection-card {
          width: 100%; text-align: left; padding: 20px 24px;
          border-radius: 12px; border: 2px solid var(--border-lt);
          background: #fff; cursor: pointer;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .selection-card.compact { padding: 16px; }
        .selection-card:hover { border-color: var(--brand-blue-lt); box-shadow: var(--shadow-sm); }
        .selection-card.active { background: var(--brand-blue-lt); border-color: var(--brand-blue); }

        .card-title { font-weight: 700; color: var(--text-dark); font-size: 1.05rem; }
        .selection-card.active .card-title { color: var(--brand-blue); }
        .card-desc { font-size: 0.85rem; color: var(--text-mid); line-height: 1.5; margin-top: 4px; }
        .check-icon { color: var(--brand-blue); font-size: 1.2rem; font-weight: bold; }

        .pill-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .pill-btn {
          padding: 12px 24px; border-radius: 8px; border: 1px solid var(--border-lt);
          background: #fff; font-size: 0.85rem; font-weight: 600; color: var(--text-mid);
          transition: all 0.2s ease; cursor: pointer; font-family: inherit;
        }
        .pill-btn:hover { border-color: var(--brand-blue); color: var(--brand-blue); }
        .pill-btn.active { background: var(--text-dark); border-color: var(--text-dark); color: #fff; }

        .custom-input {
          width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid var(--border-lt);
          font-family: var(--font-sans); font-size: 0.95rem; background: #f8fafc; color: var(--text-dark);
          transition: all 0.2s ease; resize: vertical; box-sizing: border-box;
        }
        .custom-input:focus { outline: none; border-color: var(--brand-blue); background: #fff; box-shadow: 0 0 0 4px var(--brand-blue-lt); }
      `}</style>
    </div>
  );
}
