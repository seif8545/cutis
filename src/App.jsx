// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import ReceptionistDashboard from './pages/ReceptionistDashboard';
import PatientProfilePage from './pages/PatientProfilePage';
import HistoryPage from './pages/HistoryPage';
import ValuesPage from './pages/Values';
import Footer from './components/Footer';
import DoctorsPage from './pages/DoctorsPage';
import ServicesPage from './pages/ServicesPage';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

// Hides nav + footer for staff-only routes (receptionist portal)
function AppLayout() {
  const { pathname } = useLocation();
  const staffOnly = pathname === '/receptionist';

  return (
    <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />
      {!staffOnly && <Navigation />}
      <main style={{ flex: '1' }}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/values" element={<ValuesPage />} />
          <Route path="/book" element={<BookingPage />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/receptionist" element={<ReceptionistDashboard />} />
          <Route path="/profile" element={<PatientProfilePage />} />
          <Route path="/doctors" element={<DoctorsPage />} />
          <Route path="/services" element={<ServicesPage />} />
        </Routes>
      </main>
      {!staffOnly && <Footer />}
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}
