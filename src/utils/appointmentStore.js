// ── Cutis Appointment Store ───────────────────────────────────
// Shared localStorage layer for appointments across Receptionist,
// Admin, Booking, and Patient Profile views.
//
// Keys:
//   cutis_appts          – flat JSON array of all appointments
//   cutis_appts_patients – flat JSON array of staff-seeded patients
//   cutis_appts_seeded   – flag so we only seed once per browser

const APPTS_KEY          = 'cutis_appts';
const PATIENTS_KEY_STAFF = 'cutis_appts_patients';
const SEEDED_FLAG        = 'cutis_appts_seeded_v3';   // bump version to force re-seed
const WEB_PATIENTS_KEY   = 'cutis_patients';           // written by patientStore.js

// ── Date helpers ──────────────────────────────────────────────
function today() { return new Date().toISOString().slice(0, 10); }

/** Return a date string that is `offset` working days from today (skips Fridays). */
function workDay(offset) {
  const d = new Date();
  let added = 0;
  const direction = offset >= 0 ? 1 : -1;
  const steps = Math.abs(offset);
  while (added < steps) {
    d.setDate(d.getDate() + direction);
    if (d.getDay() !== 5) added++;
  }
  return d.toISOString().slice(0, 10);
}

// ── Seed data (dates are always relative to today) ────────────
function buildSeedAppointments() {
  const d0 = today();
  const d1 = workDay(1);
  const d2 = workDay(2);
  const d3 = workDay(3);
  const d4 = workDay(4);
  const d5 = workDay(5);
  const d6 = workDay(6);
  const d7 = workDay(7);

  // Helper to build a row concisely
  const A = (id, patientId, patientName, email, phone, doctorId, date, time, dept, branch, status, notes='') => ({
    id, patientId, patientName,
    patientEmail: email, patientPhone: phone,
    doctorId, date, time, department: dept, branch, status, notes, isWebBooking: false,
  });

  // Short aliases
  const CD  = 'Cosmetic Dermatology';
  const ALC = 'Advanced Laser Center';
  const CL  = 'Clinical Dermatology';
  const FS  = 'Fifth Settlement';
  const MH  = 'Mohandeseen';
  const HE  = 'Heliopolis';
  const SZ  = 'Sheikh Zayed';

  // Patient quick-ref: (id, name, email, phone)
  const P = {
    1:  [1,  'Sara Ahmed',       'sara.ahmed@email.com',    '+20 111 234 5678'],
    2:  [2,  'Karim Hassan',     'karim.h@email.com',       '+20 100 987 6543'],
    3:  [3,  'Mona Samir',       'mona.samir@email.com',    '+20 122 555 9988'],
    4:  [4,  'Ahmed Fouad',      'ahmed.f@email.com',       '+20 105 443 2211'],
    5:  [5,  'Layla Mostafa',    'layla.m@email.com',       '+20 128 776 4433'],
    6:  [6,  'Omar Khalil',      'omar.k@email.com',        '+20 110 321 8765'],
    7:  [7,  'Nadia Ibrahim',    'nadia.i@email.com',       '+20 101 654 3210'],
    8:  [8,  'Hassan Ramadan',   'hassan.r@email.com',      '+20 115 999 1122'],
    9:  [9,  'Rana Khalil',      'rana.k@email.com',        '+20 111 908 3344'],
    10: [10, 'Tarek Mansour',    'tarek.m@email.com',       '+20 100 776 5512'],
    11: [11, 'Dina Sayed',       'dina.s@email.com',        '+20 122 344 8899'],
    12: [12, 'Youssef El-Sharif','youssef.e@email.com',     '+20 110 654 2278'],
    13: [13, 'Mariam Atef',      'mariam.a@email.com',      '+20 101 882 6671'],
    14: [14, 'Khaled Nour',      'khaled.n@email.com',      '+20 128 541 3306'],
    15: [15, 'Salma Adel',       'salma.adel@email.com',    '+20 105 233 7741'],
    16: [16, 'Reem Hassan',      'reem.h@email.com',        '+20 115 990 4488'],
    17: [17, 'Adam El-Sayed',    'adam.es@email.com',       '+20 100 118 9932'],
    18: [18, 'Noura Farouk',     'noura.f@email.com',       '+20 122 667 1153'],
    19: [19, 'Sherif Gamal',     'sherif.g@email.com',      '+20 111 435 8820'],
    20: [20, 'Heba Mustafa',     'heba.m@email.com',        '+20 110 772 6634'],
  };
  const p = (id) => P[id];

  return [
    // ── TODAY ────────────────────────────────── Fifth Settlement (dr 2)
    A(10, ...p(1),  2, d0, '09:00', CD,  FS, 'Confirmed', 'Follow-up: melasma treatment plan'),
    A(11, ...p(9),  2, d0, '09:30', CD,  FS, 'Confirmed', 'First visit — hyperpigmentation concern'),
    A(12, ...p(10), 2, d0, '10:00', CL,  FS, 'Pending',   'Rosacea flare-up, on metronidazole'),
    A(13, ...p(5),  2, d0, '10:30', CD,  FS, 'Confirmed', 'Laser hair removal — session 3/6'),
    A(14, ...p(11), 2, d0, '11:00', CD,  FS, 'Pending',   'Botox consultation — forehead lines'),
    A(15, ...p(16), 2, d0, '11:30', CL,  FS, 'Confirmed', 'Acne — moderate, requesting Accutane review'),
    A(16, ...p(13), 2, d0, '14:00', CD,  FS, 'Pending',   'Dermal filler — nasolabial folds'),
    A(17, ...p(17), 2, d0, '14:30', CD,  FS, 'Confirmed', 'Skin brightening — vitamin C protocol'),
    A(18, ...p(18), 2, d0, '15:00', CL,  FS, 'Pending',   'Seborrheic dermatitis, scalp involvement'),
    A(19, ...p(1),  2, d0, '16:00', CD,  FS, 'Confirmed', 'Mole mapping annual check'),

    // ── TODAY ─────────────────────────────────── Mohandeseen (dr 4)
    A(20, ...p(14), 4, d0, '09:30', ALC, MH, 'Confirmed', 'Laser hair removal — upper lip, session 2'),
    A(21, ...p(2),  4, d0, '10:00', ALC, MH, 'Confirmed', 'Tattoo removal — Q-switched Nd:YAG, session 3'),
    A(22, ...p(15), 4, d0, '10:30', ALC, MH, 'Pending',   'Fractional CO2 — acne scarring consultation'),
    A(23, ...p(19), 4, d0, '11:00', ALC, MH, 'Confirmed', 'IPL photorejuvenation — sun damage'),
    A(24, ...p(7),  4, d0, '11:30', ALC, MH, 'Pending',   'CO2 laser resurfacing follow-up — week 3'),
    A(25, ...p(20), 4, d0, '14:00', ALC, MH, 'Confirmed', 'Laser pigmentation removal — session 1'),
    A(26, ...p(12), 4, d0, '14:30', CD,  MH, 'Pending',   'PRP hair treatment — session 2'),
    A(27, ...p(9),  4, d0, '15:30', ALC, MH, 'Confirmed', 'Stretch mark laser — abdomen'),
    A(28, ...p(2),  4, d0, '16:30', ALC, MH, 'Pending',   'Post-laser review — skin sensitivity check'),

    // ── TODAY ─────────────────────────────────── Heliopolis (dr 3)
    A(29, ...p(18), 3, d0, '09:00', CD,  HE, 'Confirmed', 'Chemical peel — glycolic acid 30%'),
    A(30, ...p(3),  3, d0, '09:30', CL,  HE, 'Pending',   'Psoriasis flare — plaque type, new lesions'),
    A(31, ...p(14), 3, d0, '10:00', CL,  HE, 'Confirmed', 'Eczema management — topical steroids review'),
    A(32, ...p(17), 3, d0, '10:30', CD,  HE, 'Pending',   'Lip filler consultation — 0.5ml HA'),
    A(33, ...p(6),  3, d0, '11:00', CD,  HE, 'Confirmed', 'Botox — crow\'s feet, first session'),
    A(34, ...p(10), 3, d0, '11:30', CD,  HE, 'Pending',   'Hydrafacial — deep cleanse + serum'),
    A(35, ...p(15), 3, d0, '14:00', CL,  HE, 'Confirmed', 'Vitiligo follow-up — NBUVB therapy'),
    A(36, ...p(13), 3, d0, '15:00', CL,  HE, 'Pending',   'Hair loss (alopecia areata) — treatment plan'),
    A(37, ...p(20), 3, d0, '16:00', CD,  HE, 'Confirmed', 'Skin tag removal — neck and eyelids'),

    // ── TODAY ─────────────────────────────────── Sheikh Zayed (dr 5)
    A(38, ...p(12), 5, d0, '09:00', CL,  SZ, 'Pending',   'Warts — plantar, cryotherapy session 1'),
    A(39, ...p(11), 5, d0, '09:30', ALC, SZ, 'Confirmed', 'Diode laser hair — legs, session 4/6'),
    A(40, ...p(16), 5, d0, '10:00', ALC, SZ, 'Pending',   'Scar revision — burn scar, laser assessment'),
    A(41, ...p(19), 5, d0, '11:00', CL,  SZ, 'Confirmed', 'Fungal infection — tinea versicolor'),
    A(42, ...p(18), 5, d0, '11:30', ALC, SZ, 'Pending',   'Full face fractional laser — resurfacing'),
    A(43, ...p(4),  5, d0, '14:00', CL,  SZ, 'Pending',   'Cystic acne — isotretinoin month 2 check'),
    A(44, ...p(17), 5, d0, '14:30', ALC, SZ, 'Confirmed', 'Tattoo removal — black ink, session 4'),
    A(45, ...p(15), 5, d0, '15:00', CL,  SZ, 'Pending',   'Keloid scarring — triamcinolone injection'),
    A(46, ...p(8),  5, d0, '15:30', ALC, SZ, 'Confirmed', 'Laser toning — melasma protocol, session 5'),
    A(47, ...p(9),  5, d0, '16:00', CL,  SZ, 'Confirmed', 'Rosacea — laser therapy consultation'),

    // ── TOMORROW ─────────────────────────────── (d1)
    A(50, ...p(1),  2, d1, '09:00', CD,  FS, 'Confirmed', ''),
    A(51, ...p(5),  2, d1, '10:00', CD,  FS, 'Pending',   ''),
    A(52, ...p(10), 2, d1, '11:00', CL,  FS, 'Confirmed', ''),
    A(53, ...p(16), 2, d1, '14:30', CD,  FS, 'Pending',   ''),
    A(54, ...p(6),  3, d1, '09:00', CD,  HE, 'Confirmed', ''),
    A(55, ...p(3),  3, d1, '10:30', CL,  HE, 'Pending',   ''),
    A(56, ...p(14), 3, d1, '14:00', CL,  HE, 'Confirmed', ''),
    A(57, ...p(7),  4, d1, '09:30', ALC, MH, 'Confirmed', ''),
    A(58, ...p(2),  4, d1, '11:00', ALC, MH, 'Pending',   ''),
    A(59, ...p(19), 4, d1, '14:00', ALC, MH, 'Confirmed', ''),
    A(60, ...p(8),  5, d1, '09:00', ALC, SZ, 'Confirmed', ''),
    A(61, ...p(4),  5, d1, '10:00', CL,  SZ, 'Pending',   ''),
    A(62, ...p(11), 5, d1, '14:30', ALC, SZ, 'Confirmed', ''),
    A(63, ...p(20), 5, d1, '16:00', CL,  SZ, 'Pending',   ''),

    // ── D+2 ──────────────────────────────────── (d2)
    A(70, ...p(3),  2, d2, '09:30', CD,  FS, 'Confirmed', ''),
    A(71, ...p(13), 2, d2, '11:00', CD,  FS, 'Pending',   ''),
    A(72, ...p(4),  3, d2, '10:00', CL,  HE, 'Pending',   ''),
    A(73, ...p(6),  3, d2, '14:00', CD,  HE, 'Confirmed', ''),
    A(74, ...p(2),  4, d2, '10:30', ALC, MH, 'Confirmed', ''),
    A(75, ...p(20), 4, d2, '14:30', ALC, MH, 'Pending',   ''),
    A(76, ...p(9),  5, d2, '09:00', CL,  SZ, 'Confirmed', ''),
    A(77, ...p(15), 5, d2, '11:30', ALC, SZ, 'Pending',   ''),

    // ── D+3 ──────────────────────────────────── (d3)
    A(80, ...p(5),  2, d3, '10:00', CD,  FS, 'Pending',   ''),
    A(81, ...p(1),  5, d3, '14:00', CL,  SZ, 'Confirmed', ''),
    A(82, ...p(7),  3, d3, '09:30', CD,  HE, 'Confirmed', ''),
    A(83, ...p(12), 4, d3, '11:00', ALC, MH, 'Pending',   ''),
    A(84, ...p(18), 4, d3, '14:30', ALC, MH, 'Confirmed', ''),

    // ── D+4 ──────────────────────────────────── (d4)
    A(90, ...p(19), 3, d4, '10:00', CL,  HE, 'Confirmed', ''),
    A(91, ...p(11), 2, d4, '09:30', CD,  FS, 'Pending',   ''),
    A(92, ...p(8),  5, d4, '14:00', ALC, SZ, 'Confirmed', ''),

    // ── D+5 ──────────────────────────────────── (d5)
    A(95, ...p(2),  4, d5, '10:00', ALC, MH, 'Pending',   ''),
    A(96, ...p(14), 3, d5, '11:30', CL,  HE, 'Confirmed', ''),
    A(97, ...p(16), 2, d5, '14:00', CD,  FS, 'Pending',   ''),

    // ── D+6 ──────────────────────────────────── (d6)
    A(100, ...p(1),  2, d6, '10:30', CD,  FS, 'Confirmed', ''),
    A(101, ...p(20), 5, d6, '09:00', CL,  SZ, 'Pending',   ''),

    // ── D+7 ──────────────────────────────────── (d7)
    A(105, ...p(7),  3, d7, '11:30', CD,  HE, 'Confirmed', ''),
    A(106, ...p(3),  2, d7, '10:00', CL,  FS, 'Pending',   ''),
    A(107, ...p(17), 4, d7, '14:00', ALC, MH, 'Confirmed', ''),
  ];
}

export const SEED_PATIENTS = [
  { id:1,  name:'Sara Ahmed',       dob:'1990-03-15', phone:'+20 111 234 5678', email:'sara.ahmed@email.com',    bloodType:'A+',  allergies:'Penicillin',
    history:[{ date:'2026-02-10', doctor:'Prof. Dr. Marwa Abdallah', diagnosis:'Melasma', treatment:'Hydroquinone 4%, SPF 50' }] },
  { id:2,  name:'Karim Hassan',     dob:'1985-07-22', phone:'+20 100 987 6543', email:'karim.h@email.com',       bloodType:'O+',  allergies:'None',
    history:[{ date:'2026-01-18', doctor:'Dr. Nehad Youssef', diagnosis:'Tattoo removal', treatment:'Q-switched Nd:YAG laser — 3 sessions' }] },
  { id:3,  name:'Mona Samir',       dob:'1978-12-01', phone:'+20 122 555 9988', email:'mona.samir@email.com',    bloodType:'B-',  allergies:'Sulfa drugs',
    history:[{ date:'2026-03-02', doctor:'Prof. Dr. Marwa Abdallah', diagnosis:'Psoriasis (plaque type)', treatment:'Topical corticosteroids, coal tar shampoo' }] },
  { id:4,  name:'Ahmed Fouad',      dob:'1995-04-08', phone:'+20 105 443 2211', email:'ahmed.f@email.com',       bloodType:'AB+', allergies:'Latex',   history:[] },
  { id:5,  name:'Layla Mostafa',    dob:'2000-08-19', phone:'+20 128 776 4433', email:'layla.m@email.com',       bloodType:'A-',  allergies:'None',
    history:[{ date:'2026-02-25', doctor:'Dr. Azza El-Azhary', diagnosis:'Laser hair removal — legs', treatment:'Diode laser 810nm — session 2/6' }] },
  { id:6,  name:'Omar Khalil',      dob:'1982-06-30', phone:'+20 110 321 8765', email:'omar.k@email.com',        bloodType:'O-',  allergies:'Aspirin', history:[] },
  { id:7,  name:'Nadia Ibrahim',    dob:'1993-01-25', phone:'+20 101 654 3210', email:'nadia.i@email.com',       bloodType:'B+',  allergies:'None',
    history:[{ date:'2026-03-15', doctor:'Dr. Nehad Youssef', diagnosis:'Acne scarring', treatment:'Fractional CO2 laser resurfacing' }] },
  { id:8,  name:'Hassan Ramadan',   dob:'1970-09-12', phone:'+20 115 999 1122', email:'hassan.r@email.com',      bloodType:'A+',  allergies:'None',   history:[] },
  { id:9,  name:'Rana Khalil',      dob:'1997-04-22', phone:'+20 111 908 3344', email:'rana.k@email.com',        bloodType:'O+',  allergies:'None',
    history:[{ date:'2026-03-20', doctor:'Prof. Dr. Marwa Abdallah', diagnosis:'Hyperpigmentation', treatment:'Kojic acid cream + sun block SPF 60' }] },
  { id:10, name:'Tarek Mansour',    dob:'1988-11-05', phone:'+20 100 776 5512', email:'tarek.m@email.com',       bloodType:'A+',  allergies:'None',   history:[] },
  { id:11, name:'Dina Sayed',       dob:'2001-02-14', phone:'+20 122 344 8899', email:'dina.s@email.com',        bloodType:'B+',  allergies:'Latex',
    history:[{ date:'2026-02-01', doctor:'Dr. Azza El-Azhary', diagnosis:'Botox — frown lines', treatment:'Botulinum toxin A, 20 units' }] },
  { id:12, name:'Youssef El-Sharif',dob:'1979-08-30', phone:'+20 110 654 2278', email:'youssef.e@email.com',     bloodType:'AB-', allergies:'Penicillin', history:[] },
  { id:13, name:'Mariam Atef',      dob:'1994-06-17', phone:'+20 101 882 6671', email:'mariam.a@email.com',      bloodType:'O-',  allergies:'None',
    history:[{ date:'2026-01-12', doctor:'Prof. Dr. Marwa Abdallah', diagnosis:'Nasolabial folds', treatment:'Hyaluronic acid filler 1ml' }] },
  { id:14, name:'Khaled Nour',      dob:'1983-03-09', phone:'+20 128 541 3306', email:'khaled.n@email.com',      bloodType:'A-',  allergies:'None',   history:[] },
  { id:15, name:'Salma Adel',       dob:'1999-12-28', phone:'+20 105 233 7741', email:'salma.adel@email.com',    bloodType:'O+',  allergies:'Aspirin',
    history:[{ date:'2026-03-08', doctor:'Dr. Nehad Youssef', diagnosis:'Acne scarring — ice-pick type', treatment:'Fractional CO2 laser, 2 sessions' }] },
  { id:16, name:'Reem Hassan',      dob:'2002-07-11', phone:'+20 115 990 4488', email:'reem.h@email.com',        bloodType:'B-',  allergies:'None',   history:[] },
  { id:17, name:'Adam El-Sayed',    dob:'1991-09-25', phone:'+20 100 118 9932', email:'adam.es@email.com',       bloodType:'A+',  allergies:'None',   history:[] },
  { id:18, name:'Noura Farouk',     dob:'1986-01-03', phone:'+20 122 667 1153', email:'noura.f@email.com',       bloodType:'AB+', allergies:'Sulfa drugs',
    history:[{ date:'2026-02-18', doctor:'A. Prof. Dr. Mahmoud Abdallah', diagnosis:'Chemical peel — melasma', treatment:'Glycolic acid 40%, 3 sessions' }] },
  { id:19, name:'Sherif Gamal',     dob:'1975-05-20', phone:'+20 111 435 8820', email:'sherif.g@email.com',      bloodType:'O+',  allergies:'None',
    history:[{ date:'2026-03-25', doctor:'Dr. Nehad Youssef', diagnosis:'Sun damage — photoaging', treatment:'IPL photorejuvenation, 4 sessions' }] },
  { id:20, name:'Heba Mustafa',     dob:'1989-10-16', phone:'+20 110 772 6634', email:'heba.m@email.com',        bloodType:'A-',  allergies:'None',   history:[] },
];

// ── Raw I/O ───────────────────────────────────────────────────
function readAppts() {
  try { return JSON.parse(localStorage.getItem(APPTS_KEY) || 'null'); }
  catch { return null; }
}
function writeAppts(list) {
  try { localStorage.setItem(APPTS_KEY, JSON.stringify(list)); }
  catch (e) { console.warn('appointmentStore write error', e); }
}

// ── Seed on first visit ───────────────────────────────────────
function ensureSeeded() {
  if (localStorage.getItem(SEEDED_FLAG)) return;
  writeAppts(buildSeedAppointments());
  localStorage.setItem(PATIENTS_KEY_STAFF, JSON.stringify(SEED_PATIENTS));
  localStorage.setItem(SEEDED_FLAG, '1');
}

// ── Merge web bookings from cutis_patients into view ──────────
function mergeWebBookings(staffAppts) {
  try {
    const raw = JSON.parse(localStorage.getItem(WEB_PATIENTS_KEY) || '{}');
    const existing = new Set(staffAppts.map(a => a.bookingRef).filter(Boolean));
    let nextId = 3000 + staffAppts.length;
    const extras = [];

    Object.values(raw).forEach(profile => {
      (profile.appointments || []).forEach(appt => {
        if (appt.bookingRef && existing.has(appt.bookingRef)) return;
        extras.push({
          id: nextId++,
          patientId: `web_${profile.email}`,
          patientName: profile.name || profile.email,
          patientEmail: profile.email,
          patientPhone: profile.phone || '—',
          doctorId: null,
          doctorName: appt.doctor || 'Any Available',
          date: appt.date,
          time: appt.time,
          department: appt.department,
          branch: appt.branch,
          status: appt.status || 'Pending',
          notes: appt.chiefComplaint || '',
          bookingRef: appt.bookingRef,
          isWebBooking: true,
        });
        if (appt.bookingRef) existing.add(appt.bookingRef);
      });
    });
    return [...staffAppts, ...extras];
  } catch { return staffAppts; }
}

// ── Public API ────────────────────────────────────────────────

/** Returns all appointments (seeded + web bookings). Initialises on first call. */
export function getAll() {
  ensureSeeded();
  const staff = readAppts() || [];
  return mergeWebBookings(staff);
}

/** Returns the staff-seeded patient list plus any web-booked patients. */
export function getAllPatients() {
  let seed = [];
  try { seed = JSON.parse(localStorage.getItem(PATIENTS_KEY_STAFF) || '[]'); }
  catch {}

  let web = [];
  try {
    const raw = JSON.parse(localStorage.getItem(WEB_PATIENTS_KEY) || '{}');
    web = Object.values(raw).map(p => ({
      id: `web_${p.email}`,
      name: p.name || p.email,
      email: p.email,
      phone: p.phone || '—',
      dob: p.dob || '—',
      bloodType: p.bloodType || '—',
      allergies: p.allergies || 'None',
      history: [],
      isWebPatient: true,
    }));
  } catch {}

  return [...seed, ...web];
}

/** Adds or updates an appointment (matched by id or bookingRef). */
export function upsert(appt) {
  ensureSeeded();
  const list = readAppts() || [];
  const idx = appt.bookingRef
    ? list.findIndex(a => a.bookingRef === appt.bookingRef)
    : list.findIndex(a => a.id === appt.id);

  if (idx >= 0) list[idx] = { ...list[idx], ...appt };
  else list.push({ id: Date.now(), ...appt });
  writeAppts(list);
}

/** Updates the status of an appointment and syncs back to cutis_patients for web bookings. */
export function updateStatus(apptId, newStatus, extraFields = {}) {
  ensureSeeded();
  const list = readAppts() || [];
  const idx = list.findIndex(a => a.id === apptId);
  if (idx >= 0) {
    list[idx] = { ...list[idx], ...extraFields, status: newStatus };
    writeAppts(list);
  }

  // Also sync to cutis_patients if it's a web booking
  const appt = list[idx];
  if (appt?.bookingRef) {
    try {
      const patients = JSON.parse(localStorage.getItem(WEB_PATIENTS_KEY) || '{}');
      Object.values(patients).forEach(profile => {
        const aList = profile.appointments || [];
        const ai = aList.findIndex(a => a.bookingRef === appt.bookingRef);
        if (ai >= 0) {
          aList[ai] = { ...aList[ai], ...extraFields, status: newStatus };
          profile.appointments = aList;
        }
      });
      localStorage.setItem(WEB_PATIENTS_KEY, JSON.stringify(patients));
    } catch {}
  }
}

/** Called by BookingPage to register a new web appointment into the staff view. */
export function registerWebBooking(profile, appt) {
  ensureSeeded();
  const list = readAppts() || [];
  const alreadyIn = list.some(a => a.bookingRef === appt.bookingRef);
  if (alreadyIn) return;
  list.push({
    id: Date.now(),
    patientId: `web_${profile.email}`,
    patientName: profile.name,
    patientEmail: profile.email,
    patientPhone: profile.phone || '—',
    doctorId: null,
    doctorName: appt.doctor || 'Any Available',
    date: appt.date,
    time: appt.time,
    department: appt.department,
    branch: appt.branch,
    status: appt.status || 'Pending',
    notes: appt.chiefComplaint || '',
    bookingRef: appt.bookingRef,
    isWebBooking: true,
  });
  writeAppts(list);
}
