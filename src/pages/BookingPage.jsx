import React, { useState } from 'react';
import '../styles/global.css';

const BRANCHES = ["Sheikh Zayed", "Fifth Settlement", "Heliopolis", "Mohandeseen"];
const DOCTORS = ["Prof. Abdel-Rahim Abdallah", "Prof. Marwa Abdallah", "A. Prof. Mahmoud Abdallah", "Dr. Nehad Youssef", "Dr. Azza El-Azhary"];

// We upgrade the Departments from a simple array to an array of objects with descriptions
const CLINICS = [
  {
    id: "Cosmetic Dermatology",
    title: "Cosmetic Dermatology",
    desc: "For aesthetic refinement, Botox, dermal fillers, neuromodulators, and anti-aging treatments."
  },
  {
    id: "Advanced Laser Center",
    title: "Advanced Laser Center",
    desc: "For laser hair removal, tattoo removal, scar revision, and advanced skin resurfacing."
  },
  {
    id: "Clinical Dermatology",
    title: "Clinical Dermatology",
    desc: "For medical diagnosis and treatment of acne, eczema, vitiligo, psoriasis, and hair loss."
  }
];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    visitType: 'Clinics',
    branch: '',
    department: '',
    doctor: '',
    fullName: '',
    phone: '',
    email: '',
    chiefComplaint: '',
    allergies: '',
    medications: '',
  });

  const updateField = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitBooking = (e) => {
    e.preventDefault();
    console.log("Final Data: ", formData);
    setStep(5);
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
              <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--brand-green)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
            </div>
          </div>
        )}

        <div className="glass-panel" style={{ padding: '48px', border: 'none', boxShadow: 'var(--shadow-md)' }}>
          
          {/* STEP 1: CLINIC & DOCTOR SELECTION */}
          {step === 1 && (
            <div className="reveal">
              <h2 className="heading-md" style={{ marginBottom: '32px' }}>Select Your Service</h2>

              {/* Descriptive Clinic Cards */}
              <div className="form-group" style={{ marginBottom: '32px' }}>
                <label className="custom-label">Which clinic do you need? *</label>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {CLINICS.map(clinic => (
                    <button 
                      key={clinic.id} 
                      className={`clinic-card ${formData.department === clinic.id ? 'active' : ''}`}
                      onClick={() => updateField('department', clinic.id)}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <div className="clinic-title">{clinic.title}</div>
                        {/* Checkmark appears when selected */}
                        {formData.department === clinic.id && (
                          <div style={{ color: 'var(--brand-blue)', fontSize: '1.2rem', fontWeight: 'bold' }}>✓</div>
                        )}
                      </div>
                      <div className="clinic-desc">{clinic.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Location Selection */}
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

              {/* Doctor Dropdown */}
              <div className="form-group" style={{ marginBottom: '40px' }}>
                <label className="custom-label">Specific Doctor (Optional)</label>
                <select className="custom-select" value={formData.doctor} onChange={(e) => updateField('doctor', e.target.value)}>
                  <option value="">Any Available Specialist</option>
                  {DOCTORS.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                </select>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Leave blank to be assigned the earliest available expert for your selected clinic.
                </p>
              </div>

              <button className="btn btn-primary" style={{ width: '100%' }} onClick={nextStep} disabled={!formData.branch || !formData.department}>Continue →</button>
            </div>
          )}

          {/* STEP 2: PERSONAL INFO */}
          {step === 2 && (
            <div className="reveal">
              <h2 className="heading-md">Patient Details</h2>
              <div className="form-group">
                <label className="custom-label">Full Name *</label>
                <input type="text" className="custom-input" placeholder="e.g. Sara Ahmed" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
              </div>
              <div className="grid-2" style={{ gap: '20px' }}>
                <div className="form-group">
                  <label className="custom-label">Email Address *</label>
                  <input type="email" className="custom-input" placeholder="sara@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="custom-label">Phone Number *</label>
                  <input type="tel" className="custom-input" placeholder="01xx xxx xxxx" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.fullName || !formData.phone || !formData.email}>Next Step</button>
              </div>
            </div>
          )}

          {/* STEP 3: MAIN CONCERN */}
          {step === 3 && (
            <div className="reveal">
              <h2 className="heading-md">Medical Concern</h2>
              <div className="form-group">
                <label className="custom-label">What is your main concern? *</label>
                <textarea 
                  className="custom-input" 
                  rows="6" 
                  placeholder="Please describe the skin issue or treatment you are interested in..." 
                  value={formData.chiefComplaint}
                  onChange={(e) => updateField('chiefComplaint', e.target.value)}
                ></textarea>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '32px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.chiefComplaint}>Medical History →</button>
              </div>
            </div>
          )}

          {/* STEP 4: HISTORY & SUBMIT */}
          {step === 4 && (
            <div className="reveal">
              <h2 className="heading-md">Final Review</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>This information is kept strictly confidential.</p>
              
              <div className="form-group">
                <label className="custom-label">Known Allergies</label>
                <input type="text" className="custom-input" placeholder="e.g. Penicillin, None" value={formData.allergies} onChange={(e) => updateField('allergies', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="custom-label">Current Medications</label>
                <input type="text" className="custom-input" placeholder="List any medications or supplements" value={formData.medications} onChange={(e) => updateField('medications', e.target.value)} />
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

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.6s ease', padding: '40px 0' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem', color: '#0f172a' }}>✓</div>
              <h2 className="heading-md">Request Sent!</h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '32px', fontSize: '1.1rem', lineHeight: '1.6' }}>
                Thank you, <strong>{formData.fullName}</strong>. Your request for the {formData.department} has been received.<br/><br/>
                Our medical coordinators at the <strong>{formData.branch}</strong> branch will call you shortly to confirm your exact time slot.
              </p>
              <button className="btn btn-primary" onClick={() => window.location.href="/"}>Back to Home</button>
            </div>
          )}
        </div>
      </div>

      {/* Embedded CSS for the new highly-polished UI elements */}
      <style>{`
        .form-group { margin-bottom: 24px; }
        .custom-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }
        
        /* New Clinic Selection Cards */
        .clinic-card {
          width: 100%;
          text-align: left;
          padding: 20px 24px;
          border-radius: 12px;
          border: 2px solid var(--border-lt);
          background: #fff;
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        .clinic-card:hover { border-color: var(--brand-blue-lt); box-shadow: var(--shadow-sm); }
        .clinic-card.active { 
          background: var(--brand-blue-lt); 
          border-color: var(--brand-blue); 
        }
        .clinic-title { font-weight: 700; color: var(--text-dark); font-size: 1.05rem; }
        .clinic-card.active .clinic-title { color: var(--brand-blue); }
        .clinic-desc { font-size: 0.85rem; color: var(--text-mid); line-height: 1.5; margin-top: 4px; }

        /* Pill Grid for Locations */
        .pill-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .pill-btn { 
          padding: 12px 24px; border-radius: 8px; border: 1px solid var(--border-lt); 
          background: #fff; font-size: 0.85rem; font-weight: 600; color: var(--text-mid);
          transition: all 0.2s ease; cursor: pointer;
        }
        .pill-btn:hover { border-color: var(--brand-blue); color: var(--brand-blue); }
        .pill-btn.active { background: var(--text-dark); border-color: var(--text-dark); color: #fff; }

        /* General Inputs */
        .custom-input, .custom-select { 
          width: 100%; padding: 14px 16px; border-radius: 8px; border: 1px solid var(--border-lt);
          font-family: var(--font-sans); font-size: 0.95rem; background: #f8fafc; color: var(--text-dark);
          transition: all 0.2s ease;
        }
        .custom-input:focus, .custom-select:focus { outline: none; border-color: var(--brand-blue); background: #fff; box-shadow: 0 0 0 4px var(--brand-blue-lt); }
      `}</style>
    </div>
  );
}
