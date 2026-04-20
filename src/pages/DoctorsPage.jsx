import React, { useState, useEffect } from 'react';
import '../styles/global.css';

const DOCTORS = [
  {
    id: 'dr-abdelrahim',
    name: "Prof. Dr. Abdel-Rahim Abdallah",
    title: "Founder & The Guru of Dermatology",
    specialty: "Clinical Dermatology & Research",
    legacy: true,
    bio: "Born in 1938, Prof. Dr. Abdel-Rahim Abdallah was graduated in 1959 as second in his class from Faculty of Medicine, Ain Shams University.\n\nIn 1964 he established his clinic in Heliopolis, which quickly became the most professional Dermatology & Venereology clinic in Heliopolis and subsequently in Egypt. In 1966 he received his PhD (Doctorate degree) and became a lecturer at Ain Shams University, after which he became the Chairman of the department in 1990.\n\nProf. Abdel-Rahim Abdallah is regarded as the Guru of Dermatology in Egypt and the Middle East. He lectures in several top Medical Schools & Universities in Europe, USA and the Far East in addition to chairing several International Congresses.\n\nProf. Abdel-Rahim Abdallah is the holder of the prominent Gustav Riehl Prize of Germany, which he was rewarded in recognition of his advanced research in Medicine.\n\nHe is the author of the first Atlas of Dermatology in the Middle East & the Co-author of \"Dermatology\", Bolongia, Jorizzo, Rapini et al. Mosby, 2003, 2007 & 2012.",
    imageColor: "#7a5c1e",
    image: "/images/dr-abdel-rahim.png"
  },
  {
    id: 'dr-marwa',
    name: "Prof. Dr. Marwa Abdallah",
    title: "Professor of Dermatology, Ain Shams University",
    specialty: "Board Member",
    bio: "Marwa Abdallah, studied medicine against the will of her parents, who were both doctors, because she loved biology and chemistry. In Ain Shams University, Faculty of Medicine, she graduated by excellence with honors, and was the first in her class over more than 800 graduates. She chose Dermatology (skin diseases) as it was a branch that suits women doctors, besides having a great mentor, Prof Abdel-Rahim Abdallah, who was there whenever she needed help.\n\nMarwa has been holding workshops training dermatologists in Egypt and other Arab countries in the last 10 years. On the academic level, Marwa Abdallah has more than 30 national and international publications. She supervised and discussed over 50 masters and PhD thesis in Ain Shams as well as other different universities and lectured several times in the European Academy of Dermatology congresses.",
    imageColor: "var(--brand-green-dk)",
    image: "/images/dr-marwa.png"
  },
  {
    id: 'dr-mahmoud',
    name: "A. Prof. Dr. Mahmoud Abdallah",
    title: "Associate Professor of Dermatology, Ain Shams University",
    specialty: "Board Member",
    bio: "Dr Mahmoud Abdallah graduated from Ain Shams University in 1995. He was trained in Ain Shams University and spent at least 4 years attending the clinic with Prof Abdel-Rahim Abdallah, where he learned a lot from his wide experience in the field of dermatology.\n\nAfterwards Dr. Mahmoud travelled to the USA and worked there for some time. During that period Dr. Mahmoud won the best research award in biggest Dermatopathology conference in America. Getting back to Egypt, he had a nice mix of local and international experience. Dr Mahmoud lectured in many international conferences overseas and published many articles in world renown dermatology journals. He wrote a chapter in the most popular textbook in Dermatology in collaboration with Dr Marwa and Dr Abdel-Rahim Abdallah.",
    email: "mahmoud.abdallah@cutis-clinic.com",
    imageColor: "#0f172a",
    image: "/images/dr-mahmoud.png"
  },
  {
    id: 'dr-nehad',
    name: "Dr. Nehad Youssef",
    title: "Specialist Dermatologist",
    specialty: "Dermatology Specialist",
    bio: "Dr. Nehad graduated from Ain Shams University in June 2006. She served as a resident dermatologist at Kobry Elkobba Military Complex from 2007 to 2009 and passed the first part of her masters degree at Ain Shams University in 2010.\n\nDespite her success in the business field from 2011 to 2013, she returned to medical practice in 2014 to pursue her true passion. Currently, besides her work at Cutis Clinic, she works at Hadayek Elkobba MOH Medical Center and is preparing for the second part of her masters degree. Her colleagues see her as a very helpful, honest, and hardworking person who is always smiling and eager to learn.",
    imageColor: "#475569",
    image: "/images/dr-nehad.png"
  },
  {
    id: 'dr-azza',
    name: "Dr. Azza El-Azhary",
    title: "Head of Dermatology Department, Badr Hospital",
    specialty: "Dermatology & Andrology Specialist",
    bio: "Dr. Azza received her Bachelor of Medicine & Surgery in December 2003 and her Master degree in Dermatology and Andrology in April 2012, both from Ain Shams University (ASU). She currently serves as the Head of the Dermatology department at Badr Hospital.\n\nAzza believes that success comes when working among a scientific, cooperative, and coordinated team, which led her to join Cutis. She is a practical, logical, and adaptive person who enjoys reading, countryside walking, and playing the violin.",
    imageColor: "#94a3b8",
    image: "/images/dr-azza.png"
  }
];

export default function DoctorsPage() {
  const activeDoctors = DOCTORS.filter(d => !d.legacy);
  const legacyDoctors = DOCTORS.filter(d =>  d.legacy);

  const [activeDoctor, setActiveDoctor] = useState(activeDoctors[0]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const DoctorBtn = ({ doc }) => {
    const isActive  = activeDoctor.id === doc.id;
    const isLegacy  = doc.legacy;
    return (
      <button
        onClick={() => setActiveDoctor(doc)}
        style={{
          textAlign: 'left', padding: '16px', borderRadius: '16px',
          background: isActive ? (isLegacy ? '#fef9e7' : 'var(--brand-blue-lt)') : 'transparent',
          border: isActive ? `1px solid ${isLegacy ? '#c9a84c' : 'var(--brand-blue)'}` : '1px solid transparent',
          color: isActive ? (isLegacy ? '#7a5c00' : 'var(--brand-blue)') : 'var(--text-mid)',
          transition: 'all 0.2s ease',
          fontWeight: isActive ? '600' : '400',
          width: '100%',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
          <span style={{ fontSize: '1.05rem' }}>{doc.name}</span>
          {isLegacy && <span style={{ fontSize: '0.68rem', fontWeight: 700, background: '#f5e6b0', color: '#7a5c00', padding: '1px 7px', borderRadius: 10, border: '1px solid #c9a84c', whiteSpace: 'nowrap' }}>Remembering</span>}
        </div>
        <div style={{ fontSize: '0.8rem', opacity: 0.8 }}>{doc.specialty}</div>
      </button>
    );
  };

  return (
    <div className="page-wrapper" style={{ background: 'var(--bg-main)', minHeight: '100vh', paddingBottom: '100px' }}>

      <section style={{ position: 'relative', color: '#fff', textAlign: 'center', overflow: 'hidden' }}>
        {/* Full photo — no cropping */}
        <img
          src="/images/Team.png"
          alt="Cutis medical team"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        {/* Dark overlay so text stays legible */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(10,30,60,0.65) 0%, rgba(10,30,60,0.50) 100%)',
        }} />
        {/* Text centred over the photo */}
        <div style={{
          position: 'absolute', inset: 0,
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          padding: '40px 20px',
        }}>
          <span className="eyebrow" style={{ color: 'var(--brand-green)' }}>Our Experts</span>
          <h1 className="heading-lg" style={{ color: '#fff', marginBottom: '16px' }}>The Medical Team</h1>
          <p style={{ fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto', opacity: 0.9 }}>
            Meet the board-certified consultants and specialists dedicated to your skin health and aesthetic refinement.
          </p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', alignItems: 'flex-start' }}>

          {/* Sidebar */}
          <aside style={{ flex: '1 1 300px', background: '#fff', padding: '24px', borderRadius: '24px', border: '1px solid var(--border-lt)', boxShadow: 'var(--shadow-sm)' }}>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', color: 'var(--text-dark)', paddingLeft: '12px' }}>Select a Doctor</h3>

            {/* Active doctors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
              {activeDoctors.map(doc => <DoctorBtn key={doc.id} doc={doc} />)}
            </div>

            {/* Legacy divider */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: '0 4px 16px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e8d988' }} />
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#7a5c00', textTransform: 'uppercase', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>Founding Legacy</span>
              <div style={{ flex: 1, height: '1px', background: '#e8d988' }} />
            </div>

            {/* Legacy doctors */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {legacyDoctors.map(doc => <DoctorBtn key={doc.id} doc={doc} />)}
            </div>
          </aside>

          {/* Main panel */}
          <main style={{ flex: '2 1 600px' }}>
            {/* Memorial banner for legacy */}
            {activeDoctor.legacy && (
              <div style={{
                display: 'flex', alignItems: 'center', gap: '16px',
                background: 'linear-gradient(135deg,#fffbe6,#fef3c7)',
                border: '1px solid #c9a84c', borderRadius: '16px',
                padding: '18px 24px', marginBottom: '20px',
              }}>
                <div>
                  <div style={{ fontWeight: 700, color: '#7a5c00', fontSize: '0.95rem' }}>Remembering</div>
                  <div style={{ color: '#92700a', fontSize: '0.84rem', marginTop: 3, lineHeight: 1.5 }}>
                    Prof. Dr. Abdel-Rahim Abdallah, the founder of Cutis, passed away leaving behind a legacy that continues to guide every patient we serve. His life's work is preserved here as a permanent tribute.
                  </div>
                </div>
              </div>
            )}

            <div
              key={activeDoctor.id}
              style={{
                background: activeDoctor.legacy ? '#fffdf5' : '#fff',
                padding: '40px',
                borderRadius: '24px',
                border: `1px solid ${activeDoctor.legacy ? '#e8d988' : 'var(--border-lt)'}`,
                boxShadow: 'var(--shadow-md)',
                animation: 'fadeIn 0.4s ease',
              }}
            >
              <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', marginBottom: '32px' }}>
                <div style={{
                  width: '160px', borderRadius: '20px',
                  background: activeDoctor.imageColor,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: '#fff', fontSize: '2.5rem', fontWeight: 'bold',
                  border: activeDoctor.legacy ? '3px solid #c9a84c' : 'none',
                  flexShrink: 0,
                  overflow: 'hidden',
                  minHeight: '160px',
                }}>
                  {activeDoctor.image ? (
                    <img
                      src={activeDoctor.image}
                      alt={activeDoctor.name}
                      style={{ width: '100%', height: 'auto', display: 'block' }}
                      onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                    />
                  ) : null}
                  <span style={{ display: activeDoctor.image ? 'none' : 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%' }}>
                    {activeDoctor.name.charAt(0)}
                  </span>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <div style={{ fontWeight: '700', fontSize: '0.9rem', letterSpacing: '0.05em', textTransform: 'uppercase', marginBottom: '8px', color: activeDoctor.legacy ? '#c9a84c' : 'var(--brand-green-dk)' }}>
                    {activeDoctor.specialty}
                  </div>
                  <h2 style={{ fontSize: '2.2rem', fontFamily: 'var(--font-serif)', color: activeDoctor.legacy ? '#5a4a1a' : 'var(--text-dark)', lineHeight: '1.1', marginBottom: '8px' }}>
                    {activeDoctor.name}
                  </h2>
                  <div style={{ fontSize: '1.1rem', color: 'var(--text-mid)' }}>{activeDoctor.title}</div>
                  {activeDoctor.email && <div style={{ marginTop: '8px', fontSize: '0.9rem', color: 'var(--brand-green-dk)', fontWeight: '600' }}>{activeDoctor.email}</div>}
                </div>
              </div>

              <div style={{ borderTop: `1px solid ${activeDoctor.legacy ? '#e8d988' : 'var(--border-lt)'}`, paddingTop: '32px' }}>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: activeDoctor.legacy ? '#7a5c00' : 'var(--text-dark)' }}>Biography</h3>
                <div style={{ color: 'var(--text-mid)', fontSize: '1.1rem', lineHeight: '1.8' }}>
                  {activeDoctor.bio.split('\n\n').map((paragraph, index) => (
                    <p key={index} style={{ marginBottom: '16px' }}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </div>
          </main>
        </div>
      </section>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
