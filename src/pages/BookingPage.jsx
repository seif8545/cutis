// src/pages/BookingPage.jsx
import React, { useState } from 'react';
import '../styles/global.css';

const BRANCHES = ["Heliopolis", "Mohandeseen", "Sheikh Zayed", "New Cairo (Tagamoa)"];
const DEPTS = ["Cosmetic Dermatology", "Advanced Laser Center", "Clinical Dermatology"];
const SKIN_TYPES = ["I - Very Fair", "II - Fair", "III - Medium", "IV - Olive", "V - Brown", "VI - Dark"];

export default function BookingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    branch: '', department: '',
    firstName: '', lastName: '', phone: '', email: '', dob: '', gender: '', nationalId: '',
    chiefComplaint: '', skinType: '', duration: '',
    allergies: '', medications: '', previousTreatments: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const submitBooking = (e) => {
    e.preventDefault();
    // In a real app, this is where you send data to your backend (e.g., Firebase, Node.js)
    console.log("Booking Submitted: ", formData);
    setStep(5); // Move to success screen
  };

  return (
    <div className="section bg-white" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="container" style={{ maxWidth: '700px' }}>
        
        {/* Progress Indicator */}
        {step < 5 && (
          <div style={{ marginBottom: '40px', textAlign: 'center' }}>
            <span className="eyebrow">Step {step} of 4</span>
            <div style={{ height: '4px', background: 'var(--border-lt)', borderRadius: '100px', marginTop: '10px', overflow: 'hidden' }}>
              <div style={{ width: `${(step / 4) * 100}%`, height: '100%', background: 'var(--brand-green)', transition: 'width 0.3s ease' }}></div>
            </div>
          </div>
        )}

        {/* STEP 1: Branch & Service */}
        {step === 1 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h2 className="heading-md" style={{ textAlign: 'center' }}>Appointment Details</h2>
            <div style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-lt)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Preferred Branch *</label>
                  <select name="branch" value={formData.branch} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-lt)' }}>
                    <option value="">Select a branch</option>
                    {BRANCHES.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', marginBottom: '8px' }}>Clinical Department *</label>
                  <select name="department" value={formData.department} onChange={handleChange} style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border-lt)' }}>
                    <option value="">Select a department</option>
                    {DEPTS.map(d => <option key={d} value={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <button className="btn btn-primary" style={{ width: '100%', marginTop: '30px' }} onClick={nextStep} disabled={!formData.branch || !formData.department}>Continue to Details →</button>
            </div>
          </div>
        )}

        {/* STEP 2: Demographics */}
        {step === 2 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h2 className="heading-md" style={{ textAlign: 'center' }}>Patient Information</h2>
            <div style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-lt)' }}>
              <div className="grid-2" style={{ gap: '20px', marginBottom: '20px' }}>
                <div><label className="form-label">First Name *</label><input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="form-input" /></div>
                <div><label className="form-label">Last Name *</label><input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="form-input" /></div>
                <div><label className="form-label">Phone Number *</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="form-input" /></div>
                <div><label className="form-label">Email Address *</label><input type="email" name="email" value={formData.email} onChange={handleChange} className="form-input" /></div>
                <div><label className="form-label">Date of Birth *</label><input type="date" name="dob" value={formData.dob} onChange={handleChange} className="form-input" /></div>
                <div>
                  <label className="form-label">Gender</label>
                  <select name="gender" value={formData.gender} onChange={handleChange} className="form-input">
                    <option value="">Select</option><option value="Female">Female</option><option value="Male">Male</option>
                  </select>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>← Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.firstName || !formData.phone}>Next: Clinical Intake →</button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Clinical Intake */}
        {step === 3 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h2 className="heading-md" style={{ textAlign: 'center' }}>Reason for Visit</h2>
            <div style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-lt)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label">Chief Complaint / Main Concern *</label>
                  <textarea name="chiefComplaint" value={formData.chiefComplaint} onChange={handleChange} className="form-input" rows="3" placeholder="Please describe your primary skin concern..."></textarea>
                </div>
                <div className="grid-2" style={{ gap: '20px' }}>
                  <div>
                    <label className="form-label">Fitzpatrick Skin Type</label>
                    <select name="skinType" value={formData.skinType} onChange={handleChange} className="form-input">
                      <option value="">Select</option>
                      {SKIN_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Duration of Concern</label>
                    <select name="duration" value={formData.duration} onChange={handleChange} className="form-input">
                      <option value="">Select</option><option value="Days">Days</option><option value="Weeks">Weeks</option><option value="Months">Months</option><option value="Years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>← Back</button>
                <button className="btn btn-primary" style={{ flex: 2 }} onClick={nextStep} disabled={!formData.chiefComplaint}>Next: Medical History →</button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 4: Medical History */}
        {step === 4 && (
          <div style={{ animation: 'fadeIn 0.4s ease' }}>
            <h2 className="heading-md" style={{ textAlign: 'center' }}>Medical History</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '24px' }}>This information is kept strictly confidential.</p>
            <div style={{ background: 'var(--bg-main)', padding: '32px', borderRadius: '16px', border: '1px solid var(--border-lt)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div>
                  <label className="form-label" style={{ color: 'var(--brand-blue)' }}>Known Allergies ⚠</label>
                  <textarea name="allergies" value={formData.allergies} onChange={handleChange} className="form-input" rows="2" placeholder="List any drug, food, or topical allergies"></textarea>
                </div>
                <div>
                  <label className="form-label">Current Medications</label>
                  <textarea name="medications" value={formData.medications} onChange={handleChange} className="form-input" rows="2" placeholder="List all current medications and supplements"></textarea>
                </div>
                <div>
                  <label className="form-label">Previous Dermatological Treatments</label>
                  <textarea name="previousTreatments" value={formData.previousTreatments} onChange={handleChange} className="form-input" rows="2" placeholder="E.g., Accutane in 2021, Laser hair removal, etc."></textarea>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '16px', marginTop: '30px' }}>
                <button className="btn btn-outline" style={{ flex: 1 }} onClick={prevStep}>← Back</button>
                <button className="btn btn-primary" style={{ flex: 2, background: 'var(--brand-green)', color: '#1e293b' }} onClick={submitBooking}>Confirm & Submit Booking ✓</button>
              </div>
            </div>
          </div>
        )}

        {/* STEP 5: Success Screen */}
        {step === 5 && (
          <div style={{ textAlign: 'center', padding: '60px 20px', animation: 'fadeIn 0.5s ease' }}>
            <div style={{ fontSize: '4rem', color: 'var(--brand-green)', marginBottom: '20px' }}>✓</div>
            <h2 className="heading-md">Request Received</h2>
            <p style={{ color: 'var(--text-mid)', fontSize: '1.1rem', marginBottom: '30px' }}>
              Thank you, {formData.firstName}. Your consultation request for the <strong>{formData.branch}</strong> branch has been securely submitted. Our medical coordinators will contact you shortly to confirm your exact time slot.
            </p>
            <button className="btn btn-outline" onClick={() => window.location.href="/"}>Return to Homepage</button>
          </div>
        )}

      </div>

      {/* Inline styles for forms to keep it self-contained for now */}
      <style>{`
        .form-label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 8px; color: var(--text-dark); }
        .form-input { width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-lt); font-family: inherit; font-size: 0.95rem; }
        .form-input:focus { outline: none; border-color: var(--brand-blue); box-shadow: 0 0 0 3px rgba(0, 156, 219, 0.1); }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>
    </div>
  );
}
