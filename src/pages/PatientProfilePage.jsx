import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import * as PatientStore from '../utils/patientStore';
import '../styles/global.css';

const TODAY      = new Date().toISOString().slice(0, 10);
const MONTH_ABBR = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_ABBR   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];

const STATUS_STYLE = {
  Pending:   { bg: '#fff8e1', color: '#b07d00' },
  Confirmed: { bg: '#e6f4ea', color: '#2d7a3a' },
  Cancelled: { bg: '#fdecea', color: '#c0392b' },
  Completed: { bg: '#e8f0fe', color: '#1a56db' },
};

function fmtDate(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${DAY_ABBR[d.getDay()]}, ${d.getDate()} ${MONTH_ABBR[d.getMonth()]} ${d.getFullYear()}`;
}

// ── Small reusable pieces ────────────────────────────────────
function FieldRow({ label, value }) {
  return (
    <div>
      <div style={{ fontSize: '0.73rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--text-muted)', marginBottom: 4 }}>{label}</div>
      <div style={{ fontSize: '0.95rem', color: value ? 'var(--text-dark)' : 'var(--text-muted)', fontWeight: value ? 500 : 400 }}>{value || '—'}</div>
    </div>
  );
}

function InputField({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div style={{ marginBottom: 18 }}>
      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-dark)', marginBottom: 6 }}>{label}</label>
      <input
        type={type}
        value={value || ''}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        style={{
          width: '100%', padding: '11px 14px', borderRadius: 9,
          border: '1.5px solid var(--border-lt)', fontSize: '0.93rem',
          fontFamily: 'var(--font-sans)', background: '#fafcff',
          color: 'var(--text-dark)', boxSizing: 'border-box',
          transition: 'border-color 0.15s',
        }}
        onFocus={e => e.target.style.borderColor = 'var(--brand-blue)'}
        onBlur={e => e.target.style.borderColor = 'var(--border-lt)'}
      />
    </div>
  );
}

// ── Appointment card ─────────────────────────────────────────
function ApptCard({ appt, upcoming }) {
  const s   = STATUS_STYLE[appt.status] || { bg: '#f0f0f0', color: '#666' };
  const dt  = new Date(appt.date + 'T00:00:00');
  return (
    <div style={{
      background: '#fff', borderRadius: 14,
      border: upcoming ? '1.5px solid var(--brand-blue)' : '1px solid var(--border-lt)',
      padding: '18px 22px', boxShadow: 'var(--shadow-sm)',
      display: 'flex', gap: 20, alignItems: 'flex-start', flexWrap: 'wrap',
    }}>
      {/* Date block */}
      <div style={{
        textAlign: 'center', minWidth: 52, flexShrink: 0,
        background: upcoming ? 'var(--brand-blue)' : 'var(--bg-main)',
        borderRadius: 10, padding: '8px 6px',
      }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: upcoming ? 'rgba(255,255,255,0.75)' : 'var(--text-muted)' }}>
          {MONTH_ABBR[dt.getMonth()]}
        </div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, lineHeight: 1.1, color: upcoming ? '#fff' : 'var(--text-dark)', margin: '2px 0' }}>
          {dt.getDate()}
        </div>
        <div style={{ fontSize: '0.65rem', color: upcoming ? 'rgba(255,255,255,0.65)' : 'var(--text-muted)' }}>
          {dt.getFullYear()}
        </div>
      </div>

      {/* Details */}
      <div style={{ flex: 1, minWidth: 180 }}>
        <div style={{ fontWeight: 700, color: 'var(--text-dark)', fontSize: '0.97rem' }}>
          {appt.time} &nbsp;·&nbsp; {appt.doctor || 'Doctor to be assigned'}
        </div>
        <div style={{ color: 'var(--text-mid)', fontSize: '0.84rem', marginTop: 4 }}>
          {appt.department}
        </div>
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 2 }}>
          {appt.branch}
        </div>
        {appt.chiefComplaint && (
          <div style={{ marginTop: 8, fontSize: '0.82rem', color: 'var(--text-mid)', fontStyle: 'italic', lineHeight: 1.5 }}>
            "{appt.chiefComplaint}"
          </div>
        )}
      </div>

      {/* Status + ref */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 6, flexShrink: 0 }}>
        <span style={{ padding: '3px 12px', borderRadius: 20, fontSize: '0.73rem', fontWeight: 700, background: s.bg, color: s.color }}>
          {appt.status}
        </span>
        {appt.bookingRef && (
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'monospace' }}>{appt.bookingRef}</span>
        )}
      </div>
    </div>
  );
}

// ── Login screen ─────────────────────────────────────────────
function LoginScreen({ prefillEmail, onLogin }) {
  const [email, setEmail] = useState(prefillEmail || '');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Auto-submit if email comes from URL (just-booked flow)
  useEffect(() => {
    if (prefillEmail) {
      const p = PatientStore.getByEmail(prefillEmail);
      if (p) { onLogin(p); PatientStore.setSession(prefillEmail); }
    }
  }, [prefillEmail]); // eslint-disable-line

  const submit = e => {
    e.preventDefault();
    setLoading(true);
    const p = PatientStore.getByEmail(email);
    if (p) {
      PatientStore.setSession(email);
      onLogin(p);
    } else {
      setError('No profile found for this email. Please book an appointment first — your profile will be created automatically.');
    }
    setLoading(false);
  };

  return (
    <div className="section" style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 70px)' }}>
      <div className="container" style={{ maxWidth: 460 }}>

        <div style={{ textAlign: 'center', marginBottom: 32 }}>
          <div style={{ width: 62, height: 62, background: 'var(--brand-blue)', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 18px', fontSize: '1.7rem', color: '#fff' }}>
            👤
          </div>
          <h2 className="heading-md" style={{ marginBottom: 10 }}>My Patient Profile</h2>
          <p style={{ color: 'var(--text-mid)', fontSize: '0.95rem' }}>
            Enter the email you used when booking to access your profile and appointment history.
          </p>
        </div>

        <div className="glass-panel" style={{ padding: '2rem', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          <form onSubmit={submit}>
            <div style={{ marginBottom: 16 }}>
              <label style={{ display: 'block', fontWeight: 700, fontSize: '0.85rem', color: 'var(--text-dark)', marginBottom: 8 }}>
                Email Address
              </label>
              <input
                type="email" value={email} required
                onChange={e => { setEmail(e.target.value); setError(''); }}
                placeholder="your@email.com"
                style={{ width: '100%', padding: '13px 16px', borderRadius: 9, border: `1.5px solid ${error ? '#c0392b' : 'var(--border-lt)'}`, fontSize: '0.95rem', fontFamily: 'var(--font-sans)', boxSizing: 'border-box', background: '#fafcff' }}
              />
            </div>

            {error && (
              <div style={{ background: '#fdecea', color: '#c0392b', padding: '10px 14px', borderRadius: 8, fontSize: '0.84rem', marginBottom: 14, lineHeight: 1.5 }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !email}
              className="btn btn-primary"
              style={{ width: '100%', opacity: (!email || loading) ? 0.6 : 1 }}
            >
              View My Profile →
            </button>
          </form>

          <div style={{ marginTop: 24, paddingTop: 20, borderTop: '1px solid var(--border-lt)', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-mid)', fontSize: '0.87rem', marginBottom: 14 }}>
              First time here? Book an appointment — your profile will be created automatically.
            </p>
            <Link to="/book" className="btn btn-outline" style={{ fontSize: '0.87rem', padding: '10px 24px' }}>
              Book an Appointment
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}

// ── Main profile view ────────────────────────────────────────
function ProfileView({ initialProfile, onSignOut }) {
  const [profile, setProfile]   = useState(initialProfile);
  const [tab, setTab]           = useState('appointments');
  const [editMode, setEditMode] = useState(false);
  const [draft, setDraft]       = useState({});
  const [saved, setSaved]       = useState(false);

  // Keep profile in sync with store (e.g. after upsertAppointment elsewhere)
  useEffect(() => {
    const latest = PatientStore.getByEmail(profile.email);
    if (latest) setProfile(latest);
  }, []); // eslint-disable-line

  const upd = (field, val) => setDraft(prev => ({ ...prev, [field]: val }));

  const startEdit = () => {
    setDraft({ ...profile });
    setEditMode(true);
    setSaved(false);
  };

  const saveEdit = () => {
    const updated = PatientStore.save(draft);
    setProfile(updated);
    setEditMode(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 4000);
  };

  const upcoming = (profile.appointments || [])
    .filter(a => a.date >= TODAY && a.status !== 'Cancelled')
    .sort((a, b) => a.date.localeCompare(b.date) || a.time.localeCompare(b.time));

  const past = (profile.appointments || [])
    .filter(a => a.date < TODAY || a.status === 'Cancelled')
    .sort((a, b) => b.date.localeCompare(a.date) || b.time.localeCompare(a.time));

  const avatarColor = 'var(--brand-blue)';

  return (
    <div style={{ background: 'var(--bg-main)', minHeight: 'calc(100vh - 70px)', paddingBottom: 60 }}>

      {/* ── Profile hero ─────────────────────────────────── */}
      <div style={{ background: 'var(--brand-blue)', paddingTop: 48, paddingBottom: 0 }}>
        <div className="container" style={{ maxWidth: 900 }}>

          <div style={{ display: 'flex', alignItems: 'center', gap: 22, flexWrap: 'wrap', marginBottom: 28 }}>
            {/* Avatar */}
            <div style={{
              width: 72, height: 72, borderRadius: 18,
              background: 'var(--brand-green)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '2rem', fontWeight: 700, color: '#0f172a', flexShrink: 0,
            }}>
              {profile.name?.charAt(0)?.toUpperCase() || '?'}
            </div>

            <div style={{ flex: 1 }}>
              <h2 style={{ color: '#fff', margin: 0, fontSize: '1.7rem', fontFamily: 'var(--font-serif)', lineHeight: 1.1 }}>
                {profile.name}
              </h2>
              <div style={{ color: 'rgba(255,255,255,0.72)', fontSize: '0.88rem', marginTop: 5 }}>
                {profile.email}
                {profile.phone && <> &nbsp;·&nbsp; {profile.phone}</>}
              </div>
              <div style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.76rem', marginTop: 4 }}>
                Patient since {profile.createdAt}
              </div>
            </div>

            <button
              onClick={onSignOut}
              style={{ background: 'transparent', border: '1.5px solid rgba(255,255,255,0.35)', color: 'rgba(255,255,255,0.75)', borderRadius: 8, padding: '7px 14px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', fontFamily: 'inherit', whiteSpace: 'nowrap' }}
            >
              Sign Out
            </button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: 2 }}>
            {[
              ['appointments', 'My Appointments', (upcoming.length + past.length) || null],
              ['details',      'Personal Details', null],
            ].map(([t, label, count]) => (
              <button
                key={t}
                onClick={() => { setTab(t); setEditMode(false); }}
                style={{
                  padding: '10px 22px', border: 'none', cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: 600, fontSize: '0.88rem',
                  borderRadius: '10px 10px 0 0',
                  background: tab === t ? 'var(--bg-main)' : 'transparent',
                  color: tab === t ? 'var(--brand-blue)' : 'rgba(255,255,255,0.68)',
                  transition: 'all 0.15s',
                }}
              >
                {label}
                {count != null && count > 0 && (
                  <span style={{
                    marginLeft: 7,
                    background: tab === t ? 'var(--brand-blue)' : 'rgba(255,255,255,0.2)',
                    color: tab === t ? '#fff' : 'rgba(255,255,255,0.9)',
                    padding: '1px 7px', borderRadius: 10, fontSize: '0.72rem',
                  }}>
                    {count}
                  </span>
                )}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ── Tab content ──────────────────────────────────── */}
      <div className="container" style={{ maxWidth: 900, paddingTop: 28 }}>

        {/* APPOINTMENTS TAB */}
        {tab === 'appointments' && (
          <div>
            {upcoming.length > 0 && (
              <div style={{ marginBottom: 36 }}>
                <div style={{ fontSize: '0.73rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  Upcoming
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {upcoming.map(a => <ApptCard key={a.bookingRef} appt={a} upcoming />)}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <div style={{ fontSize: '0.73rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-muted)', marginBottom: 14 }}>
                  Past Visits
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {past.map(a => <ApptCard key={a.bookingRef} appt={a} />)}
                </div>
              </div>
            )}

            {upcoming.length === 0 && past.length === 0 && (
              <div style={{ background: '#fff', borderRadius: 14, padding: '3.5rem 2rem', textAlign: 'center', boxShadow: 'var(--shadow-sm)' }}>
                <div style={{ fontSize: '3rem', marginBottom: 14 }}>📅</div>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--text-dark)', marginBottom: 8 }}>No appointments yet</div>
                <p style={{ color: 'var(--text-mid)', marginBottom: 20 }}>Book your first appointment and it will appear here automatically.</p>
                <Link to="/book" className="btn btn-primary">Book an Appointment</Link>
              </div>
            )}
          </div>
        )}

        {/* PERSONAL DETAILS TAB */}
        {tab === 'details' && (
          <div style={{ background: '#fff', borderRadius: 16, padding: '2rem', boxShadow: 'var(--shadow-sm)' }}>

            {/* Tab header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h3 style={{ margin: 0, color: 'var(--text-dark)', fontSize: '1.05rem', fontFamily: 'var(--font-sans)', fontWeight: 700 }}>
                Personal Details
              </h3>
              {!editMode && (
                <button
                  onClick={startEdit}
                  style={{ background: 'var(--bg-main)', color: 'var(--brand-blue)', border: '1.5px solid var(--brand-blue)', borderRadius: 8, padding: '7px 16px', fontWeight: 600, fontSize: '0.84rem', cursor: 'pointer', fontFamily: 'inherit' }}
                >
                  Edit Details
                </button>
              )}
            </div>

            {saved && (
              <div style={{ background: '#e6f4ea', color: '#2d7a3a', padding: '10px 16px', borderRadius: 9, marginBottom: 20, fontSize: '0.88rem', fontWeight: 600 }}>
                ✓ Your details have been saved.
              </div>
            )}

            {/* EDIT MODE */}
            {editMode ? (
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0 24px' }}>
                  <InputField label="Full Name"          value={draft.name}        onChange={v => upd('name', v)}        placeholder="e.g. Sara Ahmed" />
                  <InputField label="Phone Number"       value={draft.phone}       onChange={v => upd('phone', v)}       placeholder="+20 111 234 5678" />
                  <InputField label="Date of Birth"      value={draft.dob}         onChange={v => upd('dob', v)}         type="date" />
                  <InputField label="Blood Type"         value={draft.bloodType}   onChange={v => upd('bloodType', v)}   placeholder="e.g. A+" />
                  <InputField label="Allergies"          value={draft.allergies}   onChange={v => upd('allergies', v)}   placeholder="e.g. Penicillin, None" />
                  <InputField label="Current Medications" value={draft.medications} onChange={v => upd('medications', v)} placeholder="e.g. None" />
                </div>
                <div style={{ marginBottom: 22 }}>
                  <label style={{ display: 'block', fontWeight: 700, fontSize: '0.83rem', color: 'var(--text-dark)', marginBottom: 6 }}>Notes for the doctor</label>
                  <textarea
                    value={draft.notes || ''}
                    onChange={e => upd('notes', e.target.value)}
                    placeholder="Any information you'd like the doctor to know..."
                    rows={3}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: 9, border: '1.5px solid var(--border-lt)', fontSize: '0.93rem', fontFamily: 'var(--font-sans)', background: '#fafcff', resize: 'vertical', boxSizing: 'border-box' }}
                  />
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <button onClick={saveEdit} className="btn btn-primary" style={{ padding: '10px 26px' }}>Save Changes</button>
                  <button onClick={() => setEditMode(false)} style={{ padding: '10px 20px', background: 'transparent', border: '1px solid var(--border-lt)', borderRadius: 100, fontWeight: 600, fontSize: '0.88rem', cursor: 'pointer', color: 'var(--text-mid)', fontFamily: 'inherit' }}>Cancel</button>
                </div>
              </div>
            ) : (
              /* VIEW MODE */
              <div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '22px 40px' }}>
                  <FieldRow label="Full Name"   value={profile.name} />
                  <FieldRow label="Email"       value={profile.email} />
                  <FieldRow label="Phone"       value={profile.phone} />
                  <FieldRow label="Date of Birth" value={profile.dob} />
                  <FieldRow label="Blood Type"  value={profile.bloodType} />
                  <FieldRow label="Allergies"   value={profile.allergies} />
                  <FieldRow label="Medications" value={profile.medications} />
                </div>

                {profile.notes && (
                  <div style={{ marginTop: 24, padding: '14px 18px', background: 'var(--bg-main)', borderRadius: 10, fontSize: '0.9rem', color: 'var(--text-mid)', fontStyle: 'italic', lineHeight: 1.6 }}>
                    "{profile.notes}"
                  </div>
                )}

                {!profile.dob && !profile.bloodType && (
                  <div style={{ marginTop: 22, padding: '14px 18px', background: '#fff8e1', border: '1px solid #f0d060', borderRadius: 10, fontSize: '0.85rem', color: '#b07d00' }}>
                    💡 Complete your profile so the doctor has your full medical details ready before your visit.
                    <button onClick={startEdit} style={{ marginLeft: 10, fontWeight: 700, color: '#b07d00', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', fontFamily: 'inherit', fontSize: 'inherit' }}>
                      Fill in details →
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}

// ── Page entry point ─────────────────────────────────────────
export default function PatientProfilePage() {
  const [searchParams]    = useSearchParams();
  const [profile, setProfile] = useState(null);

  // On mount: try session or URL email
  useEffect(() => {
    const urlEmail     = searchParams.get('email');
    const sessionEmail = PatientStore.getSession();
    const tryEmail     = urlEmail || sessionEmail;
    if (tryEmail) {
      const p = PatientStore.getByEmail(tryEmail);
      if (p) { setProfile(p); PatientStore.setSession(tryEmail); }
    }
  }, []); // eslint-disable-line

  const handleLogin   = p => setProfile(p);
  const handleSignOut = () => {
    PatientStore.clearSession();
    setProfile(null);
  };

  if (!profile) {
    return (
      <LoginScreen
        prefillEmail={searchParams.get('email') || ''}
        onLogin={handleLogin}
      />
    );
  }

  return <ProfileView initialProfile={profile} onSignOut={handleSignOut} />;
}
