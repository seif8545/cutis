import React, { useState, useMemo, useEffect } from 'react';
import * as AppointmentStore from '../utils/appointmentStore';

// ── THEME ────────────────────────────────────────────────────
const C = {
  primary: '#21326c', accent: '#ff9044', light: '#f0f2fa', bg: '#f5f6fa',
  white: '#ffffff', muted: '#8892a4', border: '#e2e6f0',
  success: '#2d7a3a', warn: '#b07d00', danger: '#c0392b', info: '#1a56db',
  wa: '#25d366',
};

const TODAY = new Date().toISOString().slice(0, 10);

const BRANCHES = ['Fifth Settlement', 'Mohandeseen', 'Heliopolis', 'Sheikh Zayed'];

const DOCTORS = [
  { id: 2, short: 'Prof. Marwa',      color: '#2d7a3a', initials: 'مر' },
  { id: 3, short: 'A. Prof. Mahmoud', color: '#21326c', initials: 'مح' },
  { id: 4, short: 'Dr. Nehad',        color: '#475569', initials: 'نه' },
  { id: 5, short: 'Dr. Azza',         color: '#0891b2', initials: 'عز' },
];

const TIME_SLOTS = [
  '09:00','09:30','10:00','10:30','11:00','11:30',
  '12:00','14:00','14:30','15:00','15:30','16:00','16:30','17:00',
];

// Schedule grid rows: 8 AM – 6 PM in 30-min steps
const SCHEDULE_SLOTS = Array.from({ length: 20 }, (_, i) => {
  const m = 8 * 60 + i * 30;
  return `${String(Math.floor(m / 60)).padStart(2,'0')}:${String(m % 60).padStart(2,'0')}`;
});

const DAY_NAMES_EN   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat'];
const MONTH_NAMES_EN = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAY_NAMES_AR   = ['الأحد','الإثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const MONTH_NAMES_AR = ['يناير','فبراير','مارس','أبريل','مايو','يونيو','يوليو','أغسطس','سبتمبر','أكتوبر','نوفمبر','ديسمبر'];

const STATUS_BADGE = {
  Confirmed: { bg: '#e6f4ea', color: '#2d7a3a' },
  Pending:   { bg: '#fff8e1', color: '#b07d00' },
  Cancelled: { bg: '#fdecea', color: '#c0392b' },
  Completed: { bg: '#e8f0fe', color: '#1a56db' },
};

// ── WHATSAPP ──────────────────────────────────────────────────
function whatsappUrl(phone, msg) {
  const digits = (phone || '').replace(/[^0-9]/g, '');
  // Egyptian numbers starting with 0 → prefix with country code 20
  const intl = digits.startsWith('20') ? digits : digits.startsWith('0') ? '2' + digits : '20' + digits;
  return `https://wa.me/${intl}?text=${encodeURIComponent(msg)}`;
}

// ── TRANSLATIONS ─────────────────────────────────────────────
const TR = {
  ar: {
    loginTitle: 'بوابة الاستقبال', loginSubtitle: 'عيادة كوتيس — وصول الموظفين',
    yourName: 'اسمك', namePlaceholder: 'مثال: نور محمد',
    staffPassword: 'كلمة مرور الموظف', pwdPlaceholder: 'أدخل كلمة مرور الموظف',
    signIn: '← تسجيل الدخول', demoPassword: 'كلمة المرور التجريبية:',
    nameError: 'الرجاء إدخال اسمك.', passwordError: 'كلمة المرور غير صحيحة.',
    portalTitle: 'بوابة الاستقبال', welcome: 'مرحبًا،', signOut: 'خروج',
    todayBtn: '↩ اليوم', todayLabel: 'اليوم',
    allDoctors: 'جميع الأطباء', listView: 'قائمة اليوم', gridView: 'جدول زمني', upcomingView: 'المواعيد القادمة',
    scheduled: 'المجدول', pending: 'قيد الانتظار', confirmed: 'مؤكد', cancelled: 'ملغي',
    noAppts: 'لا توجد مواعيد في هذا اليوم.',
    appointmentDetails: 'تفاصيل الموعد',
    dob: 'تاريخ الميلاد', blood: 'فصيلة الدم', allergies: 'الحساسية',
    phone: 'الهاتف', email: 'البريد الإلكتروني', appointment: 'الموعد',
    dateLabel: 'التاريخ', timeLabel: 'الوقت', doctorLabel: 'الطبيب',
    branchLabel: 'الفرع', deptLabel: 'القسم', statusLabel: 'الحالة',
    pastVisits: 'الزيارات السابقة', notesLabel: 'ملاحظات',
    accept: '✓ قبول', reschedule: '⟳ إعادة', reject: '✕ رفض', close: 'إغلاق',
    whatsapp: 'واتساب',
    rescheduleFor: 'إعادة جدولة —', notifWillBeSent: 'سيتلقى المريض إشعارًا على:',
    newDate: 'تاريخ جديد', newTime: 'وقت جديد',
    confirmReschedule: 'تأكيد إعادة الجدولة', cancelBtn: 'إلغاء',
    statuses: { Confirmed:'مؤكد', Pending:'قيد الانتظار', Cancelled:'ملغي', Completed:'مكتمل' },
    clickToJump: 'انقر على أي خلية للانتقال إلى جدول ذلك اليوم.',
    apptCount: (n) => `${n} موعد`,
    upcomingTitle: 'المواعيد القادمة',
    deptShort: { 'Advanced Laser Center':'مركز الليزر', 'Cosmetic Dermatology':'تجميل', 'Clinical Dermatology':'طب الجلد' },
    branchNames: { 'Fifth Settlement':'التجمع الخامس', 'Mohandeseen':'المهندسين', 'Heliopolis':'مصر الجديدة', 'Sheikh Zayed':'الشيخ زايد' },
    toastConfirmed:   (n,e,d,t) => `تم الإرسال إلى ${n} (${e}): تم تأكيد موعدك بتاريخ ${d} الساعة ${t}.`,
    toastCancelled:   (n,e,d,t) => `تم الإرسال إلى ${n} (${e}): تم إلغاء موعدك بتاريخ ${d} الساعة ${t}.`,
    toastRescheduled: (n,e,d,t) => `تم الإرسال إلى ${n} (${e}): تمت إعادة جدولة موعدك إلى ${d} الساعة ${t}.`,
    waMsgConfirm:   (name, date, time, branch) => `مرحباً ${name}، نتواصل معك من عيادة كوتيس. تم تأكيد موعدك بتاريخ ${date} الساعة ${time} في فرع ${branch}. نتمنى لك يوماً سعيداً 🌿`,
    waMsgChange:    (name) => `مرحباً ${name}، نتواصل معك من عيادة كوتيس بخصوص موعدك القادم. `,
    days: DAY_NAMES_AR, months: MONTH_NAMES_AR,
  },
  en: {
    loginTitle: 'Receptionist Portal', loginSubtitle: 'Cutis Clinic — Staff Access',
    yourName: 'Your Name', namePlaceholder: 'e.g. Nour Mohamed',
    staffPassword: 'Staff Password', pwdPlaceholder: 'Enter staff password',
    signIn: 'Sign In →', demoPassword: 'Demo password:',
    nameError: 'Please enter your name.', passwordError: 'Incorrect password.',
    portalTitle: 'Receptionist Portal', welcome: 'Welcome,', signOut: 'Sign Out',
    todayBtn: '↩ Today', todayLabel: 'Today',
    allDoctors: 'All Doctors', listView: "Today's List", gridView: 'Time Grid', upcomingView: 'Upcoming',
    scheduled: 'Scheduled', pending: 'Pending', confirmed: 'Confirmed', cancelled: 'Cancelled',
    noAppts: 'No appointments for this day.',
    appointmentDetails: 'Appointment Details',
    dob: 'DOB', blood: 'Blood', allergies: 'Allergies',
    phone: 'Phone', email: 'Email', appointment: 'Appointment',
    dateLabel: 'Date', timeLabel: 'Time', doctorLabel: 'Doctor',
    branchLabel: 'Branch', deptLabel: 'Department', statusLabel: 'Status',
    pastVisits: 'Past Visits', notesLabel: 'Notes',
    accept: '✓ Accept', reschedule: '⟳ Reschedule', reject: '✕ Reject', close: 'Close',
    whatsapp: 'WhatsApp',
    rescheduleFor: 'Reschedule —', notifWillBeSent: 'Notification will be sent to:',
    newDate: 'New Date', newTime: 'New Time',
    confirmReschedule: 'Confirm Reschedule', cancelBtn: 'Cancel',
    statuses: { Confirmed:'Confirmed', Pending:'Pending', Cancelled:'Cancelled', Completed:'Completed' },
    clickToJump: "Click any cell to jump to that day's schedule.",
    apptCount: (n) => `${n} appt${n !== 1 ? 's' : ''}`,
    upcomingTitle: 'Upcoming Appointments',
    deptShort: { 'Advanced Laser Center':'Laser', 'Cosmetic Dermatology':'Cosmetic', 'Clinical Dermatology':'Clinical' },
    branchNames: { 'Fifth Settlement':'Fifth Settlement', 'Mohandeseen':'Mohandeseen', 'Heliopolis':'Heliopolis', 'Sheikh Zayed':'Sheikh Zayed' },
    toastConfirmed:   (n,e,d,t) => `Sent to ${n} (${e}): Appointment on ${d} at ${t} confirmed.`,
    toastCancelled:   (n,e,d,t) => `Sent to ${n} (${e}): Appointment on ${d} at ${t} cancelled.`,
    toastRescheduled: (n,e,d,t) => `Sent to ${n} (${e}): Appointment rescheduled to ${d} at ${t}.`,
    waMsgConfirm:   (name, date, time, branch) => `Hi ${name}, this is Cutis Clinic. Your appointment on ${date} at ${time} at ${branch} branch is confirmed. See you soon 🌿`,
    waMsgChange:    (name) => `Hi ${name}, this is Cutis Clinic regarding your upcoming appointment. `,
    days: DAY_NAMES_EN, months: MONTH_NAMES_EN,
  },
};

// ── HELPERS ──────────────────────────────────────────────────
function fmtDate(dateStr, T) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${T.days[d.getDay()]}, ${d.getDate()} ${T.months[d.getMonth()]}`;
}
function addDays(dateStr, n) {
  const d = new Date(dateStr + 'T00:00:00');
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}
function getNextWorkDays(fromDate, count) {
  const result = [];
  let cur = fromDate;
  while (result.length < count) {
    cur = addDays(cur, 1);
    if (new Date(cur + 'T00:00:00').getDay() !== 5) result.push(cur);
  }
  return result;
}

// ── SMALL UI ──────────────────────────────────────────────────
function Badge({ status, T }) {
  const s = STATUS_BADGE[status] || { bg: '#f0f0f0', color: '#666' };
  return (
    <span style={{ padding:'4px 12px', borderRadius:20, fontSize:'0.82rem', fontWeight:800, background:s.bg, color:s.color, whiteSpace:'nowrap', display:'inline-block' }}>
      {T.statuses[status] || status}
    </span>
  );
}

function Modal({ title, onClose, children, width = 600 }) {
  return (
    <div onClick={e => e.target === e.currentTarget && onClose()} style={{ position:'fixed', inset:0, background:'rgba(10,20,50,0.55)', zIndex:2000, display:'flex', alignItems:'center', justifyContent:'center', padding:'1rem' }}>
      <div style={{ background:'#fff', borderRadius:20, width:'100%', maxWidth:width, maxHeight:'92vh', overflow:'auto', boxShadow:'0 24px 64px rgba(0,0,0,0.25)' }}>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'1.2rem 1.6rem', borderBottom:`1px solid #e2e6f0`, position:'sticky', top:0, background:'#fff', zIndex:1 }}>
          <h3 style={{ margin:0, fontSize:'1.1rem', fontWeight:800, color:C.primary }}>{title}</h3>
          <button onClick={onClose} style={{ background:'none', border:'none', fontSize:'1.6rem', cursor:'pointer', color:C.muted, lineHeight:1, padding:'0 4px' }}>×</button>
        </div>
        <div style={{ padding:'1.6rem' }}>{children}</div>
      </div>
    </div>
  );
}

function Toast({ message, type, onClose }) {
  const s = { success:{bg:'#e6f4ea',color:'#2d7a3a',icon:'✓'}, danger:{bg:'#fdecea',color:'#c0392b',icon:'✕'}, warn:{bg:'#fff8e1',color:'#b07d00',icon:'⟳'} }[type] || { bg:'#e6f4ea',color:'#2d7a3a',icon:'✓' };
  return (
    <div style={{ position:'fixed', bottom:32, right:32, zIndex:3000, background:s.bg, color:s.color, border:`1.5px solid ${s.color}44`, borderRadius:14, padding:'16px 20px', maxWidth:440, boxShadow:'0 8px 32px rgba(0,0,0,0.13)', display:'flex', gap:12, alignItems:'flex-start', animation:'slideInRight 0.3s ease' }}>
      <span style={{ fontSize:'1.2rem', flexShrink:0 }}>{s.icon}</span>
      <div style={{ flex:1, fontSize:'0.9rem', lineHeight:1.5 }}>{message}</div>
      <button onClick={onClose} style={{ background:'none', border:'none', cursor:'pointer', color:s.color, fontSize:'1.2rem', lineHeight:1, flexShrink:0, padding:0 }}>×</button>
    </div>
  );
}

// ── LOGIN GATE ───────────────────────────────────────────────
function LoginGate({ onLogin, lang, onToggleLang }) {
  const T = TR[lang];
  const [name, setName] = useState('');
  const [pwd, setPwd]   = useState('');
  const [err, setErr]   = useState('');
  const isRTL = lang === 'ar';
  const font  = isRTL ? "'Cairo','Segoe UI',sans-serif" : 'inherit';
  const submit = e => { e.preventDefault(); if (!name.trim()) { setErr(T.nameError); return; } if (pwd !== 'cutis2024') { setErr(T.passwordError); return; } onLogin(name.trim()); };

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'#f5f6fa', fontFamily:font }}>
      <div style={{ background:'#fff', borderRadius:24, padding:'3rem 2.5rem', width:'100%', maxWidth:420, boxShadow:'0 8px 40px rgba(0,0,0,0.1)', position:'relative' }}>
        <button onClick={onToggleLang} style={{ position:'absolute', top:18, [isRTL ? 'left':'right']:18, background:C.light, border:`1px solid ${C.border}`, borderRadius:8, padding:'5px 13px', fontSize:'0.82rem', fontWeight:800, cursor:'pointer', color:C.primary, fontFamily:'inherit' }}>
          {lang === 'ar' ? 'EN' : 'عربي'}
        </button>

        {/* Cutis logo */}
        <div style={{ display:'flex', alignItems:'center', gap:12, marginBottom:28, justifyContent:'center' }}>
          <div style={{ width:44, height:44, background:'var(--brand-blue, #009cdb)', borderRadius:10, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.6rem', fontWeight:900 }}>C</div>
          <div>
            <div style={{ fontSize:'1.5rem', fontWeight:900, color:'#009cdb', lineHeight:1 }}>Cutis</div>
            <div style={{ fontSize:'0.6rem', fontWeight:700, textTransform:'uppercase', letterSpacing:'0.12em', color:'#b2d234', marginTop:2 }}>The Skin Clinic</div>
          </div>
        </div>

        <h2 style={{ margin:'0 0 6px', color:C.primary, fontSize:'1.4rem', fontWeight:800, textAlign:'center' }}>{T.loginTitle}</h2>
        <p style={{ color:C.muted, fontSize:'0.88rem', marginTop:0, marginBottom:24, textAlign:'center' }}>{T.loginSubtitle}</p>

        <form onSubmit={submit}>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontWeight:700, fontSize:'0.88rem', color:C.primary, marginBottom:7 }}>{T.yourName}</label>
            <input type="text" value={name} placeholder={T.namePlaceholder} onChange={e => { setName(e.target.value); setErr(''); }}
              style={{ width:'100%', padding:'13px 16px', borderRadius:10, border:`1.5px solid ${C.border}`, fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box' }} />
          </div>
          <div style={{ marginBottom:14 }}>
            <label style={{ display:'block', fontWeight:700, fontSize:'0.88rem', color:C.primary, marginBottom:7 }}>{T.staffPassword}</label>
            <input type="password" value={pwd} placeholder={T.pwdPlaceholder} onChange={e => { setPwd(e.target.value); setErr(''); }}
              style={{ width:'100%', padding:'13px 16px', borderRadius:10, border:`1.5px solid ${err ? C.danger : C.border}`, fontSize:'1rem', fontFamily:'inherit', boxSizing:'border-box' }} />
          </div>
          {err && <p style={{ color:C.danger, fontSize:'0.86rem', marginBottom:10, marginTop:0 }}>{err}</p>}
          <button type="submit" style={{ width:'100%', padding:'14px', background:C.primary, color:'#fff', border:'none', borderRadius:12, fontWeight:800, fontSize:'1rem', cursor:'pointer', fontFamily:'inherit', marginTop:6 }}>
            {T.signIn}
          </button>
        </form>
        <p style={{ textAlign:'center', color:C.muted, fontSize:'0.8rem', marginTop:'1.4rem', marginBottom:0 }}>
          {T.demoPassword} <code style={{ background:C.light, padding:'2px 7px', borderRadius:4, fontSize:'0.84rem' }}>cutis2024</code>
        </p>
      </div>
    </div>
  );
}

// ── PATIENT DETAIL MODAL ─────────────────────────────────────
function PatientModal({ appt, patients, T, lang, onClose, onAccept, onReject, onReschedule }) {
  const patient = patients.find(p => p.id === appt.patientId);
  const doctor  = DOCTORS.find(d => d.id === appt.doctorId);
  const phone   = appt.patientPhone || patient?.phone || '';
  const name    = appt.patientName || patient?.name || '—';
  const isRTL   = lang === 'ar';

  const waMsgDefault = isRTL
    ? T.waMsgChange(name)
    : T.waMsgChange(name);

  return (
    <Modal title={T.appointmentDetails} onClose={onClose} width={600}>
      {/* Patient header */}
      <div style={{ display:'flex', gap:14, alignItems:'center', padding:'16px 18px', background:C.light, borderRadius:12, marginBottom:20 }}>
        <div style={{ width:52, height:52, borderRadius:12, background:C.primary, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'1.25rem', flexShrink:0 }}>
          {name.charAt(0)}
        </div>
        <div style={{ flex:1 }}>
          <div style={{ fontWeight:800, color:C.primary, fontSize:'1.15rem' }}>{name}</div>
          <div style={{ fontSize:'0.88rem', color:C.muted, marginTop:3 }}>
            {T.dob}: {patient?.dob || '—'} &nbsp;·&nbsp; {T.blood}: {patient?.bloodType || '—'} &nbsp;·&nbsp;
            {T.allergies}: <strong style={{ color: patient?.allergies && patient.allergies !== 'None' ? C.danger : C.muted }}>{patient?.allergies || '—'}</strong>
          </div>
        </div>
        {/* WhatsApp quick-link */}
        {phone && (
          <a href={whatsappUrl(phone, waMsgDefault)} target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', gap:6, background:'#25d366', color:'#fff', borderRadius:10, padding:'8px 14px', fontWeight:700, fontSize:'0.85rem', textDecoration:'none', flexShrink:0 }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            {T.whatsapp}
          </a>
        )}
      </div>

      {/* Contact */}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'10px 24px', marginBottom:20, fontSize:'0.9rem' }}>
        <div><span style={{ color:C.muted }}>{T.phone}: </span><strong>{phone || '—'}</strong></div>
        <div style={{ wordBreak:'break-all' }}><span style={{ color:C.muted }}>{T.email}: </span><strong>{appt.patientEmail || patient?.email || '—'}</strong></div>
      </div>

      {/* Appointment info */}
      <div style={{ background:'#eef4ff', border:'1px solid #b3c9f8', borderRadius:12, padding:'14px 18px', marginBottom:18 }}>
        <div style={{ fontWeight:800, color:C.info, fontSize:'0.76rem', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:12 }}>{T.appointment}</div>
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'8px 24px', fontSize:'0.9rem' }}>
          <div><span style={{ color:C.muted }}>{T.dateLabel}: </span><strong>{fmtDate(appt.date, T)}</strong></div>
          <div><span style={{ color:C.muted }}>{T.timeLabel}: </span><strong style={{ color:C.accent, fontSize:'1rem' }}>{appt.time}</strong></div>
          <div><span style={{ color:C.muted }}>{T.doctorLabel}: </span><strong>{appt.doctorName || doctor?.short || '—'}</strong></div>
          <div><span style={{ color:C.muted }}>{T.branchLabel}: </span><strong>{T.branchNames[appt.branch] || appt.branch}</strong></div>
          <div><span style={{ color:C.muted }}>{T.deptLabel}: </span><strong>{appt.department}</strong></div>
          <div style={{ display:'flex', alignItems:'center', gap:6 }}><span style={{ color:C.muted }}>{T.statusLabel}: </span><Badge status={appt.status} T={T} /></div>
        </div>
        {appt.notes && <div style={{ marginTop:12, fontSize:'0.86rem', color:C.muted, fontStyle:'italic', borderTop:'1px solid #c8d8f8', paddingTop:10 }}>"{appt.notes}"</div>}
      </div>

      {/* Medical history */}
      {patient?.history?.length > 0 && (
        <div style={{ marginBottom:18 }}>
          <div style={{ fontWeight:800, fontSize:'0.82rem', color:C.primary, textTransform:'uppercase', letterSpacing:'0.07em', marginBottom:10 }}>{T.pastVisits}</div>
          {patient.history.map((h, i) => (
            <div key={i} style={{ padding:'10px 14px', borderRadius:10, background:'#fafbff', border:`1px solid ${C.border}`, marginBottom:8, fontSize:'0.86rem' }}>
              <div style={{ fontWeight:700, color:C.primary }}>{h.diagnosis}</div>
              <div style={{ color:C.muted, marginTop:3 }}>{h.date} · {h.doctor}</div>
              <div style={{ color:C.muted, marginTop:2 }}>{h.treatment}</div>
            </div>
          ))}
        </div>
      )}

      {/* Actions */}
      <div style={{ display:'flex', gap:10, flexWrap:'wrap', paddingTop:4 }}>
        {appt.status === 'Pending' && (
          <button onClick={onAccept} style={{ background:'#e6f4ea', color:'#2d7a3a', border:'none', borderRadius:8, padding:'9px 16px', fontSize:'0.9rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>{T.accept}</button>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <button onClick={onReschedule} style={{ background:'#fff8e1', color:'#b07d00', border:'none', borderRadius:8, padding:'9px 16px', fontSize:'0.9rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>{T.reschedule}</button>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <button onClick={onReject} style={{ background:'#fdecea', color:'#c0392b', border:'none', borderRadius:8, padding:'9px 16px', fontSize:'0.9rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>{T.reject}</button>
        )}
        {phone && (
          <a href={whatsappUrl(phone, waMsgDefault)} target="_blank" rel="noreferrer"
            style={{ display:'flex', alignItems:'center', gap:6, background:'#e8faf0', color:'#1a7a45', border:'none', borderRadius:8, padding:'9px 16px', fontSize:'0.9rem', fontWeight:800, textDecoration:'none' }}>
            📱 {T.whatsapp}
          </a>
        )}
        <button onClick={onClose} style={{ background:C.light, color:C.primary, border:`1px solid ${C.border}`, borderRadius:8, padding:'9px 16px', fontSize:'0.9rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit' }}>{T.close}</button>
      </div>
    </Modal>
  );
}

// ── RESCHEDULE MODAL ─────────────────────────────────────────
function RescheduleModal({ appt, patients, T, onClose, onConfirm }) {
  const [newDate, setNewDate] = useState(appt.date);
  const [newTime, setNewTime] = useState('');
  const patient = patients.find(p => p.id === appt.patientId);
  const email   = patient?.email || appt.patientEmail || '—';

  const dates = useMemo(() => {
    const res = []; const base = new Date(TODAY + 'T00:00:00');
    for (let i = 0; res.length < 14; i++) {
      const d = new Date(base); d.setDate(base.getDate() + i);
      if (d.getDay() !== 5) res.push(d.toISOString().slice(0, 10));
    }
    return res;
  }, []);

  return (
    <Modal title={`${T.rescheduleFor} ${appt.patientName}`} onClose={onClose} width={520}>
      <p style={{ color:C.muted, fontSize:'0.9rem', marginTop:0, marginBottom:18 }}>
        {T.notifWillBeSent} <strong>{email}</strong>
      </p>

      <div style={{ marginBottom:22 }}>
        <div style={{ fontWeight:700, fontSize:'0.9rem', color:C.primary, marginBottom:10 }}>{T.newDate}</div>
        <div style={{ display:'flex', gap:8, overflowX:'auto', paddingBottom:4 }}>
          {dates.map(d => {
            const dt = new Date(d + 'T00:00:00');
            const sel = d === newDate;
            return (
              <button key={d} onClick={() => { setNewDate(d); setNewTime(''); }}
                style={{ flexShrink:0, display:'flex', flexDirection:'column', alignItems:'center', padding:'10px 13px', borderRadius:12, minWidth:58, cursor:'pointer', fontFamily:'inherit', border:`2px solid ${sel ? C.primary : C.border}`, background:sel ? C.primary : '#fff', color:sel ? '#fff' : C.primary }}>
                <span style={{ fontSize:'0.65rem', fontWeight:700, opacity:0.75, textTransform:'uppercase' }}>{T.days[dt.getDay()]}</span>
                <span style={{ fontSize:'1.4rem', fontWeight:800, lineHeight:1.3, margin:'2px 0' }}>{dt.getDate()}</span>
                <span style={{ fontSize:'0.65rem', fontWeight:600, opacity:0.75 }}>{T.months[dt.getMonth()]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {newDate && (
        <div style={{ marginBottom:24 }}>
          <div style={{ fontWeight:700, fontSize:'0.9rem', color:C.primary, marginBottom:10 }}>{T.newTime}</div>
          <div style={{ display:'flex', flexWrap:'wrap', gap:8 }}>
            {TIME_SLOTS.map(slot => (
              <button key={slot} onClick={() => setNewTime(slot)}
                style={{ padding:'9px 16px', borderRadius:8, fontSize:'0.9rem', fontWeight:700, cursor:'pointer', fontFamily:'inherit', border:`1.5px solid ${newTime === slot ? C.primary : C.border}`, background:newTime === slot ? C.primary : '#fff', color:newTime === slot ? '#fff' : C.primary }}>
                {slot}
              </button>
            ))}
          </div>
        </div>
      )}

      <div style={{ display:'flex', gap:10 }}>
        <button onClick={() => newDate && newTime && onConfirm(newDate, newTime)} disabled={!newTime}
          style={{ padding:'11px 20px', background:!newTime ? '#ccc' : C.primary, color:'#fff', border:'none', borderRadius:10, fontWeight:800, fontSize:'0.95rem', cursor:!newTime ? 'not-allowed' : 'pointer', fontFamily:'inherit' }}>
          {T.confirmReschedule}
        </button>
        <button onClick={onClose} style={{ padding:'11px 20px', background:C.light, color:C.primary, border:`1px solid ${C.border}`, borderRadius:10, fontWeight:700, fontSize:'0.95rem', cursor:'pointer', fontFamily:'inherit' }}>
          {T.cancelBtn}
        </button>
      </div>
    </Modal>
  );
}

// ── APPOINTMENT ROW (used in list + upcoming views) ───────────
function ApptRow({ appt, T, lang, patients, onView, onAccept, onReject, onReschedule }) {
  const s      = STATUS_BADGE[appt.status] || { bg:'#f0f0f0', color:'#666' };
  const doctor = DOCTORS.find(d => d.id === appt.doctorId);
  const phone  = appt.patientPhone || patients.find(p => p.id === appt.patientId)?.phone || '';
  const name   = appt.patientName || '—';
  const isRTL  = lang === 'ar';

  const wMsg = isRTL
    ? T.waMsgConfirm(name, fmtDate(appt.date, T), appt.time, T.branchNames[appt.branch] || appt.branch)
    : T.waMsgConfirm(name, fmtDate(appt.date, T), appt.time, appt.branch);

  return (
    <div style={{ display:'flex', alignItems:'center', gap:16, padding:'16px 20px', background:'#fff', borderRadius:14, marginBottom:10, boxShadow:'0 2px 8px rgba(0,0,0,0.05)', border:`1.5px solid ${C.border}`, flexWrap:'wrap', cursor:'pointer' }}
      onClick={onView}>

      {/* Time */}
      <div style={{ minWidth:64, textAlign:'center', flexShrink:0 }}>
        <div style={{ fontSize:'1.35rem', fontWeight:900, color:C.primary, lineHeight:1 }}>{appt.time}</div>
      </div>

      {/* Patient info */}
      <div style={{ flex:1, minWidth:160 }}>
        <div style={{ fontWeight:800, fontSize:'1.05rem', color:C.primary }}>{name}</div>
        {phone && (
          <div style={{ fontSize:'0.9rem', color:C.muted, marginTop:3, fontWeight:600, direction:'ltr', textAlign: isRTL ? 'right' : 'left' }}>{phone}</div>
        )}
        <div style={{ fontSize:'0.82rem', color:C.muted, marginTop:2 }}>
          {doctor?.short || appt.doctorName || '—'} · {T.deptShort[appt.department] || appt.department}
        </div>
      </div>

      {/* Status */}
      <Badge status={appt.status} T={T} />

      {/* Actions */}
      <div style={{ display:'flex', gap:7, flexShrink:0, flexWrap:'wrap' }} onClick={e => e.stopPropagation()}>
        {appt.status === 'Pending' && (
          <button onClick={onAccept} style={{ background:'#e6f4ea', color:'#2d7a3a', border:'none', borderRadius:8, padding:'7px 13px', fontSize:'0.85rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>✓</button>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <button onClick={onReschedule} style={{ background:'#fff8e1', color:'#b07d00', border:'none', borderRadius:8, padding:'7px 13px', fontSize:'0.85rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>⟳</button>
        )}
        {(appt.status === 'Pending' || appt.status === 'Confirmed') && (
          <button onClick={onReject} style={{ background:'#fdecea', color:'#c0392b', border:'none', borderRadius:8, padding:'7px 13px', fontSize:'0.85rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit' }}>✕</button>
        )}
        {phone && (
          <a href={whatsappUrl(phone, wMsg)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()}
            style={{ display:'flex', alignItems:'center', gap:5, background:'#e6faf0', color:'#1a7a45', border:'none', borderRadius:8, padding:'7px 13px', fontSize:'0.85rem', fontWeight:800, textDecoration:'none' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#25d366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            {T.whatsapp}
          </a>
        )}
      </div>
    </div>
  );
}

// ── MAIN DASHBOARD ───────────────────────────────────────────
export default function ReceptionistDashboard() {
  const [isLoggedIn, setIsLoggedIn]           = useState(false);
  const [receptName, setReceptName]           = useState('');
  const [lang, setLang]                       = useState('ar');
  const [branch, setBranch]                   = useState('Fifth Settlement');
  const [selectedDate, setSelectedDate]       = useState(TODAY);
  const [view, setView]                       = useState('list');          // list | grid | upcoming
  const [doctorFilter, setDoctorFilter]       = useState('all');
  const [appointments, setAppointments]       = useState(() => AppointmentStore.getAll());
  const [patients, setPatients]               = useState(() => AppointmentStore.getAllPatients());
  const [patientModal, setPatientModal]       = useState(null);
  const [rescheduleModal, setRescheduleModal] = useState(null);
  const [toast, setToast]                     = useState(null);

  useEffect(() => {
    const onFocus = () => { setAppointments(AppointmentStore.getAll()); setPatients(AppointmentStore.getAllPatients()); };
    window.addEventListener('focus', onFocus);
    return () => window.removeEventListener('focus', onFocus);
  }, []);

  const T      = TR[lang];
  const isRTL  = lang === 'ar';
  const font   = isRTL ? "'Cairo','Segoe UI',sans-serif" : 'inherit';

  const showToast = (msg, type = 'success') => { setToast({ message:msg, type }); setTimeout(() => setToast(null), 6000); };
  const getAppt   = id => appointments.find(a => a.id === id);
  const refreshStore = () => { setAppointments(AppointmentStore.getAll()); };

  const handleAccept = appt => {
    AppointmentStore.updateStatus(appt.id, 'Confirmed');
    refreshStore(); setPatientModal(null);
    const p = patients.find(p => p.id === appt.patientId);
    showToast(T.toastConfirmed(p?.name || appt.patientName, p?.email || appt.patientEmail || '—', fmtDate(appt.date, T), appt.time), 'success');
  };
  const handleReject = appt => {
    AppointmentStore.updateStatus(appt.id, 'Cancelled');
    refreshStore(); setPatientModal(null);
    const p = patients.find(p => p.id === appt.patientId);
    showToast(T.toastCancelled(p?.name || appt.patientName, p?.email || appt.patientEmail || '—', fmtDate(appt.date, T), appt.time), 'danger');
  };
  const handleReschedule = (appt, newDate, newTime) => {
    AppointmentStore.updateStatus(appt.id, 'Confirmed', { date: newDate, time: newTime });
    refreshStore(); setRescheduleModal(null); setPatientModal(null);
    const p = patients.find(p => p.id === appt.patientId);
    showToast(T.toastRescheduled(p?.name || appt.patientName, p?.email || appt.patientEmail || '—', fmtDate(newDate, T), newTime), 'warn');
  };

  // Day appointments for the selected date + branch
  const dayAppts = useMemo(() =>
    appointments
      .filter(a => a.branch === branch && a.date === selectedDate && (doctorFilter === 'all' || a.doctorId === parseInt(doctorFilter)))
      .sort((a, b) => a.time.localeCompare(b.time)),
    [appointments, branch, selectedDate, doctorFilter]
  );

  // Upcoming: next 14 working days
  const upcomingDays = useMemo(() => {
    const futureDates = getNextWorkDays(TODAY, 14);
    return futureDates.map(d => ({
      date: d,
      appts: appointments
        .filter(a => a.branch === branch && a.date === d && (doctorFilter === 'all' || a.doctorId === parseInt(doctorFilter)))
        .sort((a, b) => a.time.localeCompare(b.time)),
    })).filter(g => g.appts.length > 0);
  }, [appointments, branch, doctorFilter]);

  const stats = { total: dayAppts.length, pending: dayAppts.filter(a => a.status === 'Pending').length, confirmed: dayAppts.filter(a => a.status === 'Confirmed').length };

  // Grid view week dates
  const weekDates = useMemo(() => {
    const base = new Date(selectedDate + 'T00:00:00');
    base.setDate(base.getDate() - base.getDay());
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(base); d.setDate(base.getDate() + i); return d.toISOString().slice(0, 10); });
  }, [selectedDate]);

  if (!isLoggedIn) return <LoginGate lang={lang} onToggleLang={() => setLang(l => l === 'ar' ? 'en' : 'ar')} onLogin={n => { setIsLoggedIn(true); setReceptName(n); }} />;

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} style={{ background: '#f5f6fa', minHeight: '100vh', fontFamily: font }}>

      {/* ── TOP BAR ───────────────────────────────────────── */}
      <div style={{ background: C.primary, color: '#fff' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', gap: 18, height: 68, flexWrap: 'wrap' }}>

          {/* Cutis logo */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0 }}>
            <div style={{ width: 36, height: 36, background: '#009cdb', borderRadius: 8, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 900 }}>C</div>
            <div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#fff', lineHeight: 1 }}>Cutis</div>
              <div style={{ fontSize: '0.58rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#b2d234', marginTop: 1 }}>The Skin Clinic</div>
            </div>
            <div style={{ width: 1, height: 32, background: 'rgba(255,255,255,0.25)', marginInline: 6 }} />
            <div style={{ fontWeight: 800, fontSize: '1rem', opacity: 0.9 }}>{T.portalTitle}</div>
          </div>

          {/* Branch pills */}
          <div style={{ display: 'flex', gap: 8, flex: 1, justifyContent: 'center', flexWrap: 'wrap' }}>
            {BRANCHES.map(b => (
              <button key={b} onClick={() => setBranch(b)} style={{
                padding: '7px 18px', borderRadius: 24, fontSize: '0.88rem', fontWeight: 700,
                cursor: 'pointer', fontFamily: 'inherit', transition: 'all 0.15s',
                background: branch === b ? '#fff' : 'transparent',
                color: branch === b ? C.primary : 'rgba(255,255,255,0.8)',
                border: `2px solid ${branch === b ? '#fff' : 'rgba(255,255,255,0.35)'}`,
              }}>
                {T.branchNames[b] || b}
              </button>
            ))}
          </div>

          <span style={{ fontSize: '0.88rem', opacity: 0.65 }}>{T.welcome} {receptName}</span>
          <button onClick={() => setLang(l => l === 'ar' ? 'en' : 'ar')} style={{ background:'rgba(255,255,255,0.15)', border:'2px solid rgba(255,255,255,0.4)', color:'#fff', borderRadius:8, padding:'6px 14px', fontSize:'0.86rem', fontWeight:800, cursor:'pointer', fontFamily:'inherit', letterSpacing:'0.05em' }}>
            {lang === 'ar' ? 'EN' : 'عربي'}
          </button>
          <button onClick={() => setIsLoggedIn(false)} style={{ background:'transparent', border:'2px solid rgba(255,255,255,0.4)', color:'rgba(255,255,255,0.85)', borderRadius:8, padding:'6px 14px', fontSize:'0.86rem', fontWeight:600, cursor:'pointer', fontFamily:'inherit' }}>
            {T.signOut}
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 1400, margin: '0 auto', padding: '22px 24px' }}>

        {/* ── TOOLBAR ─────────────────────────────────── */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, alignItems: 'center', marginBottom: 20 }}>
          {/* Date nav */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', border: `1.5px solid ${C.border}`, borderRadius: 12, padding: '8px 14px' }}>
            <button onClick={() => setSelectedDate(addDays(selectedDate, isRTL ? 1 : -1))} style={{ background:'none', border:'none', cursor:'pointer', color:C.primary, fontSize:'1.5rem', lineHeight:1, padding:'0 4px' }}>‹</button>
            <span style={{ fontWeight:800, color:C.primary, fontSize:'1.05rem', minWidth:200, textAlign:'center' }}>
              {selectedDate === TODAY ? `📅 ${T.todayLabel} — ` : ''}{fmtDate(selectedDate, T)}
            </span>
            <button onClick={() => setSelectedDate(addDays(selectedDate, isRTL ? -1 : 1))} style={{ background:'none', border:'none', cursor:'pointer', color:C.primary, fontSize:'1.5rem', lineHeight:1, padding:'0 4px' }}>›</button>
          </div>
          {selectedDate !== TODAY && <button onClick={() => setSelectedDate(TODAY)} style={{ background:C.light, border:`1.5px solid ${C.border}`, borderRadius:10, padding:'9px 18px', fontSize:'0.92rem', fontWeight:700, cursor:'pointer', color:C.primary, fontFamily:'inherit' }}>{T.todayBtn}</button>}

          <select value={doctorFilter} onChange={e => setDoctorFilter(e.target.value)} style={{ padding:'9px 14px', border:`1.5px solid ${C.border}`, borderRadius:10, fontSize:'0.92rem', fontFamily:'inherit', color:C.primary, background:'#fff', cursor:'pointer', fontWeight:600 }}>
            <option value="all">{T.allDoctors}</option>
            {DOCTORS.map(d => <option key={d.id} value={d.id}>{d.short}</option>)}
          </select>

          {/* View toggle */}
          <div style={{ marginInlineStart:'auto', display:'flex', background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:10, overflow:'hidden' }}>
            {[['list', T.listView], ['upcoming', T.upcomingView], ['grid', T.gridView]].map(([v, label]) => (
              <button key={v} onClick={() => setView(v)} style={{ padding:'9px 18px', fontWeight:700, fontSize:'0.9rem', cursor:'pointer', fontFamily:'inherit', border:'none', background:view === v ? C.primary : 'transparent', color:view === v ? '#fff' : C.muted, transition:'all 0.15s' }}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* ── STATS (list view only) ──────────────────── */}
        {view === 'list' && (
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:14, marginBottom:22 }}>
            {[
              { label: T.scheduled, value: stats.total,     color: C.primary },
              { label: T.pending,   value: stats.pending,   color: C.warn    },
              { label: T.confirmed, value: stats.confirmed, color: C.success  },
            ].map(s => (
              <div key={s.label} style={{ background:'#fff', borderRadius:14, padding:'20px 24px', borderTop:`4px solid ${s.color}`, boxShadow:'0 2px 8px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize:'3rem', fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
                <div style={{ fontSize:'0.95rem', fontWeight:700, color:C.muted, marginTop:6, textTransform:'uppercase', letterSpacing:'0.06em' }}>{s.label}</div>
              </div>
            ))}
          </div>
        )}

        {/* ── LIST VIEW ──────────────────────────────── */}
        {view === 'list' && (
          <div>
            {dayAppts.length === 0
              ? <div style={{ textAlign:'center', padding:'60px 20px', color:C.muted, fontSize:'1.1rem', fontWeight:600 }}>{T.noAppts}</div>
              : dayAppts.map(appt => (
                  <ApptRow
                    key={appt.id} appt={appt} T={T} lang={lang} patients={patients}
                    onView={() => setPatientModal(appt)}
                    onAccept={e => { e.stopPropagation(); handleAccept(appt); }}
                    onReject={e => { e.stopPropagation(); handleReject(appt); }}
                    onReschedule={e => { e.stopPropagation(); setRescheduleModal(appt); }}
                  />
                ))
            }
          </div>
        )}

        {/* ── UPCOMING VIEW ─────────────────────────── */}
        {view === 'upcoming' && (
          <div>
            <h2 style={{ fontWeight:800, color:C.primary, fontSize:'1.3rem', marginBottom:20 }}>{T.upcomingTitle} — {T.branchNames[branch] || branch}</h2>
            {upcomingDays.length === 0
              ? <div style={{ textAlign:'center', padding:'60px 20px', color:C.muted, fontSize:'1.1rem', fontWeight:600 }}>{T.noAppts}</div>
              : upcomingDays.map(group => (
                <div key={group.date} style={{ marginBottom:28 }}>
                  <div style={{ fontSize:'1rem', fontWeight:800, color:C.primary, background:'#fff', border:`1.5px solid ${C.border}`, borderRadius:10, padding:'10px 18px', marginBottom:10, display:'inline-block' }}>
                    📅 {fmtDate(group.date, T)}
                    <span style={{ marginInlineStart:12, fontSize:'0.82rem', fontWeight:600, color:C.muted }}>{T.apptCount(group.appts.length)}</span>
                  </div>
                  {group.appts.map(appt => (
                    <ApptRow
                      key={appt.id} appt={appt} T={T} lang={lang} patients={patients}
                      onView={() => setPatientModal(appt)}
                      onAccept={e => { e.stopPropagation(); handleAccept(appt); }}
                      onReject={e => { e.stopPropagation(); handleReject(appt); }}
                      onReschedule={e => { e.stopPropagation(); setRescheduleModal(appt); }}
                    />
                  ))}
                </div>
              ))
            }
          </div>
        )}

        {/* ── GRID VIEW ──────────────────────────────── */}
        {view === 'grid' && (
          <div style={{ background:'#fff', borderRadius:14, boxShadow:'0 1px 6px rgba(0,0,0,0.07)', overflow:'auto' }}>
            <table style={{ width:'100%', borderCollapse:'collapse', tableLayout:'fixed' }}>
              <colgroup>
                <col style={{ width:80 }} />
                {DOCTORS.filter(d => doctorFilter === 'all' || d.id === parseInt(doctorFilter)).map(d => <col key={d.id} />)}
              </colgroup>
              <thead>
                <tr style={{ background:C.primary }}>
                  <th style={{ padding:'14px 10px', textAlign:'center', color:'rgba(255,255,255,0.55)', fontSize:'0.78rem', fontWeight:700, letterSpacing:'0.08em', textTransform:'uppercase', borderInlineEnd:`1px solid rgba(255,255,255,0.1)` }}>{T.timeLabel}</th>
                  {DOCTORS.filter(d => doctorFilter === 'all' || d.id === parseInt(doctorFilter)).map(doc => {
                    const cnt = dayAppts.filter(a => a.doctorId === doc.id).length;
                    return (
                      <th key={doc.id} style={{ padding:'14px 16px', textAlign:'start', borderInlineEnd:`1px solid rgba(255,255,255,0.1)` }}>
                        <div style={{ display:'flex', alignItems:'center', gap:10 }}>
                          <div style={{ width:40, height:40, borderRadius:10, background:doc.color, color:'#fff', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:'0.9rem', flexShrink:0 }}>{doc.initials}</div>
                          <div>
                            <div style={{ fontWeight:800, color:'#fff', fontSize:'1rem', whiteSpace:'nowrap' }}>{doc.short}</div>
                            <div style={{ fontSize:'0.8rem', color:'rgba(255,255,255,0.6)', marginTop:2 }}>{T.apptCount(cnt)}</div>
                          </div>
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {SCHEDULE_SLOTS.map(slot => {
                  const hour       = parseInt(slot.split(':')[0], 10);
                  const isHalfHour = slot.endsWith(':30');
                  const rowBg      = (hour - 8) % 2 === 0 ? (isHalfHour ? '#fafbff' : '#f4f6fb') : (isHalfHour ? '#fff' : '#fafbff');
                  const hourIn12   = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
                  const ampm       = hour >= 12 ? (isRTL ? 'م' : 'PM') : (isRTL ? 'ص' : 'AM');
                  const gridDoctors = DOCTORS.filter(d => doctorFilter === 'all' || d.id === parseInt(doctorFilter));

                  return (
                    <tr key={slot} style={{ background:rowBg }}>
                      <td style={{ padding:'0 10px', height:80, textAlign:'end', borderInlineEnd:`1px solid ${C.border}`, borderBottom: isHalfHour ? `1px solid ${C.border}` : `1px dashed ${C.border}`, verticalAlign:'middle', whiteSpace:'nowrap' }}>
                        {isHalfHour
                          ? <span style={{ color:C.border, fontSize:'0.82rem', fontWeight:500 }}>:30</span>
                          : <span style={{ fontWeight:800, fontSize:'0.95rem', color:C.primary }}>{hourIn12} {ampm}</span>}
                      </td>
                      {gridDoctors.map(doc => {
                        const appt = appointments.find(a => a.doctorId === doc.id && a.date === selectedDate && a.branch === branch && a.time === slot);
                        const s    = appt ? (STATUS_BADGE[appt.status] || {}) : null;
                        const phone = appt ? (appt.patientPhone || patients.find(p => p.id === appt?.patientId)?.phone || '') : '';
                        const wMsg  = appt ? (isRTL ? T.waMsgChange(appt.patientName) : T.waMsgChange(appt.patientName)) : '';
                        return (
                          <td key={doc.id} style={{ padding:appt?'6px 8px':'0', verticalAlign:'top', borderInlineEnd:`1px solid ${C.border}`, borderBottom:isHalfHour?`1px solid ${C.border}`:`1px dashed ${C.border}`, height:80 }}>
                            {appt && (
                              <div onClick={() => setPatientModal(appt)} style={{ background:s.bg, borderInlineStart:`4px solid ${s.color}`, borderRadius:8, padding:'8px 10px', cursor:'pointer', height:'100%', boxSizing:'border-box', display:'flex', flexDirection:'column', justifyContent:'space-between', gap:3 }}>
                                <div>
                                  <div style={{ fontWeight:800, fontSize:'0.95rem', color:C.primary, whiteSpace:'nowrap', overflow:'hidden', textOverflow:'ellipsis' }}>{appt.patientName}</div>
                                  <div style={{ fontSize:'0.78rem', fontWeight:600, color:C.muted, direction:'ltr', textAlign:isRTL?'right':'left' }}>{phone}</div>
                                </div>
                                <div style={{ display:'flex', alignItems:'center', gap:5 }} onClick={e => e.stopPropagation()}>
                                  <span style={{ padding:'2px 7px', borderRadius:10, fontSize:'0.74rem', fontWeight:800, background:s.bg, color:s.color, border:`1.5px solid ${s.color}44`, whiteSpace:'nowrap' }}>{T.statuses[appt.status] || appt.status}</span>
                                  {appt.status === 'Pending' && <button onClick={() => handleAccept(appt)} style={{ background:'#e6f4ea', border:'none', borderRadius:5, padding:'2px 7px', fontSize:'0.78rem', fontWeight:800, color:'#2d7a3a', cursor:'pointer', fontFamily:'inherit' }}>✓</button>}
                                  {(appt.status === 'Pending' || appt.status === 'Confirmed') && <button onClick={() => setRescheduleModal(appt)} style={{ background:'#fff8e1', border:'none', borderRadius:5, padding:'2px 7px', fontSize:'0.78rem', fontWeight:800, color:'#b07d00', cursor:'pointer', fontFamily:'inherit' }}>⟳</button>}
                                  {phone && <a href={whatsappUrl(phone, wMsg)} target="_blank" rel="noreferrer" onClick={e => e.stopPropagation()} style={{ background:'#e6faf0', color:'#1a7a45', borderRadius:5, padding:'2px 7px', fontSize:'0.78rem', fontWeight:800, textDecoration:'none' }}>📱</a>}
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
        )}
      </div>

      {/* ── MODALS ── */}
      {patientModal && (
        <PatientModal appt={getAppt(patientModal.id) || patientModal} patients={patients} T={T} lang={lang}
          onClose={() => setPatientModal(null)}
          onAccept={() => handleAccept(getAppt(patientModal.id) || patientModal)}
          onReject={() => handleReject(getAppt(patientModal.id) || patientModal)}
          onReschedule={() => { setRescheduleModal(getAppt(patientModal.id) || patientModal); setPatientModal(null); }}
        />
      )}
      {rescheduleModal && (
        <RescheduleModal appt={rescheduleModal} patients={patients} T={T}
          onClose={() => setRescheduleModal(null)}
          onConfirm={(d, t) => handleReschedule(rescheduleModal, d, t)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;500;600;700;800;900&display=swap');
        @keyframes slideInRight { from { transform:translateX(60px); opacity:0; } to { transform:translateX(0); opacity:1; } }
      `}</style>
    </div>
  );
}
