// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import '../styles/global.css';

const VISIT_TYPES = ["Clinics", "Home Visit", "Online"];
const BRANCHES = ["Sheikh Zayed", "East Cairo", "North Coast", "Heliopolis", "Mohandeseen"];
const DEPTS = ["Cosmetic Dermatology", "Advanced Laser Center", "Clinical Dermatology"];
const DOCTORS = ["Prof. Abdel-Rahim Abdallah", "Prof. Marwa Abdallah", "A. Prof. Mahmoud Abdallah", "Dr. Nehad Youssef", "Dr. Azza El-Azhary"];

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
    source: ''
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
          
          {/* STEP 1: SERVICE SELECTION (Segmented Pills) */}
          {step === 1 && (
            <div className="reveal">
              <h2 className="heading-md">Select Your Visit</h2>
              
              <div className="form-group">
                <label className="custom-label">Visit Type</label>
                <div className="pill-grid">
                  {VISIT_TYPES.map(type => (
                    <button 
                      key={type} 
                      className={`pill-btn ${formData.visitType === type ? 'active' : ''}`}
                      onClick={() => updateField('visitType', type)}
                    >
                      {type}
                    </button>
                  ))}
                </div>
              </div>

              <div className="form-group">
                <label className="custom-label">Preferred Branch</label>
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

              <div className="grid-2" style={{ gap: '20px' }}>
                <div className="form-group">
                  <label className="custom-label">Department</label>
                  <select className="custom-select" value={formData.department} onChange={(e) => updateField('department', e.target.value)}>
                    <option value="">Choose Clinic</option>
                    {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="custom-label">Doctor (Optional)</label>
                  <select className="custom-select" value={formData.doctor} onChange={(e) => updateField('doctor', e.target.value)}>
                    <option value="">Any Available Specialist</option>
                    {DOCTORS.map(doc => <option key={doc} value={doc}>{doc}</option>)}
                  </select>
                </div>
              </div>

              <button className="btn btn-primary" style={{ width: '100%', marginTop: '20px' }} onClick={nextStep} disabled={!formData.branch || !formData.department}>Continue →</button>
            </div>
          )}

          {/* STEP 2: PERSONAL INFO */}
          {step === 2 && (
            <div className="reveal">
              <h2 className="heading-md">Patient Details</h2>
              <div className="form-group">
                <label className="custom-label">Full Name</label>
                <input type="text" className="custom-input" placeholder="John Doe" value={formData.fullName} onChange={(e) => updateField('fullName', e.target.value)} />
              </div>
              <div className="grid-2" style={{ gap: '20px' }}>
                <div className="form-group">
                  <label className="custom-label">Email Address</label>
                  <input type="email" className="custom-input" placeholder="john@example.com" value={formData.email} onChange={(e) => updateField('email', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="custom-label">Phone Number</label>
                  <input type="tel" className="custom-input" placeholder="01xx xxx xxxx" value={formData.phone} onChange={(e) => updateField('phone', e.target.value)} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.fullName || !formData.phone}>Next Step</button>
              </div>
            </div>
          )}

          {/* STEP 3: MAIN CONCERN (Simplified) */}
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
              <div style={{ display: 'flex', gap: '16px', marginTop: '24px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.chiefComplaint}>Medical History →</button>
              </div>
            </div>
          )}

          {/* STEP 4: HISTORY & SUBMIT */}
          {step === 4 && (
            <div className="reveal">
              <h2 className="heading-md">Final Review</h2>
              <div className="form-group">
                <label className="custom-label">Known Allergies</label>
                <input type="text" className="custom-input" placeholder="None" value={formData.allergies} onChange={(e) => updateField('allergies', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="custom-label">Current Medications</label>
                <input type="text" className="custom-input" placeholder="List any medications" value={formData.medications} onChange={(e) => updateField('medications', e.target.value)} />
              </div>
              
              {/* Reference Image ReCAPTCHA style element */}
              <div style={{ padding: '16px', border: '1px solid var(--border-lt)', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px', background: '#fcfcfc' }}>
                <input type="checkbox" style={{ width: '20px', height: '20px' }} required />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-mid)' }}>I'm not a robot</span>
              </div>

              <div style={{ display: 'flex', gap: '16px' }}>
                <button className="btn btn-outline" style={{ flex: 1, color: 'var(--text-dark)', borderColor: 'var(--border-lt)' }} onClick={prevStep}>Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={submitBooking}>Book Appointment</button>
              </div>
            </div>
          )}

          {/* STEP 5: SUCCESS */}
          {step === 5 && (
            <div style={{ textAlign: 'center', animation: 'fadeIn 0.6s ease' }}>
              <div style={{ width: '80px', height: '80px', background: 'var(--brand-green)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', fontSize: '2rem' }}>✓</div>
              <h2 className="heading-md">Request Sent!</h2>
              <p style={{ color: 'var(--text-mid)', marginBottom: '32px' }}>
                Thank you, <strong>{formData.fullName}</strong>. Our medical coordinators at the {formData.branch} branch will call you shortly to confirm your slot.
              </p>
              <button className="btn btn-primary" onClick={() => window.location.href="/"}>Back to Home</button>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .form-group { margin-bottom: 24px; }
        .custom-label { display: block; font-size: 0.85rem; font-weight: 700; color: var(--text-dark); margin-bottom: 12px; }
        
        .pill-grid { display: flex; flex-wrap: wrap; gap: 10px; }
        .pill-btn { 
          padding: 10px 20px; border-radius: 8px; border: 1px solid var(--border-lt); 
          background: #fff; font-size: 0.85rem; font-weight: 500; color: var(--text-mid);
          transition: all 0.2s ease;
        }
        .pill-btn:hover { border-color: var(--brand-blue); color: var(--brand-blue); }
        .pill-btn.active { background: var(--brand-blue-lt); border-color: var(--brand-blue); color: var(--brand-blue); font-weight: 700; }

        .custom-input, .custom-select { 
          width: 100%; padding: 14px; border-radius: 8px; border: 1px solid var(--border-lt);
          font-family: var(--font-sans); font-size: 0.95rem; background: #fff;
        }
        .custom-input:focus { outline: none; border-color: var(--brand-blue); box-shadow: 0 0 0 4px var(--brand-blue-lt); }
      `}</style>
    </div>
  );
}
