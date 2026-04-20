// ── Cutis Patient Profile Store ─────────────────────────────
// Persists patient profiles and appointments in localStorage.
// Key: 'cutis_patients'  (object keyed by lowercase email)
// Session: 'cutis_patient_session' (currently signed-in email)

const STORE_KEY   = 'cutis_patients';
const SESSION_KEY = 'cutis_patient_session';

// ── Raw read / write ──────────────────────────────────────────
function readAll() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || '{}'); }
  catch { return {}; }
}

function writeAll(data) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(data)); }
  catch (e) { console.warn('patientStore: could not write to localStorage', e); }
}

// ── Profile CRUD ──────────────────────────────────────────────
export function getByEmail(email) {
  if (!email) return null;
  return readAll()[email.toLowerCase().trim()] || null;
}

/** Creates or merges a profile. Returns the saved profile. */
export function save(profile) {
  if (!profile?.email) return null;
  const key  = profile.email.toLowerCase().trim();
  const all  = readAll();
  const today = new Date().toISOString().slice(0, 10);
  all[key] = {
    appointments: [],
    ...all[key],
    ...profile,
    email: key,
    updatedAt: today,
    createdAt: all[key]?.createdAt || today,
  };
  writeAll(all);
  return all[key];
}

/** Adds or updates a single appointment on a patient's profile. */
export function upsertAppointment(email, appt) {
  if (!email || !appt?.bookingRef) return;
  const key  = email.toLowerCase().trim();
  const all  = readAll();
  const today = new Date().toISOString().slice(0, 10);
  if (!all[key]) {
    all[key] = { email: key, appointments: [], createdAt: today, updatedAt: today };
  }
  const list = all[key].appointments || [];
  const idx  = list.findIndex(a => a.bookingRef === appt.bookingRef);
  if (idx >= 0) list[idx] = { ...list[idx], ...appt };
  else list.push(appt);
  all[key].appointments = list;
  all[key].updatedAt = today;
  writeAll(all);
}

// ── Session (which patient is currently "signed in") ──────────
export function getSession() {
  try { return sessionStorage.getItem(SESSION_KEY) || null; }
  catch { return null; }
}

export function setSession(email) {
  try { sessionStorage.setItem(SESSION_KEY, email.toLowerCase().trim()); }
  catch {}
}

export function clearSession() {
  try { sessionStorage.removeItem(SESSION_KEY); }
  catch {}
}

// ── Booking reference generator ───────────────────────────────
export function genRef() {
  return 'CUT-' + Date.now().toString(36).toUpperCase().slice(-5) +
    Math.random().toString(36).slice(2, 4).toUpperCase();
}
