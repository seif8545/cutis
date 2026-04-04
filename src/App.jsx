// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard';
import HistoryPage from './pages/HistoryPage'; // <-- Import new page
import ValuesPage from './pages/Values';   // <-- Import new page
import Footer from './components/Footer';
import DoctorsPage from './pages/DoctorsPage';
import ServicesPage from './pages/ServicesPage'; 
export default function App() {
  return (
    <Router>
      <div className="app-wrapper" style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <ScrollToTop />
        <Navigation />
        <main style={{ flex: '1' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/history" element={<HistoryPage />} /> {/* <-- Add Route */}
            <Route path="/values" element={<ValuesPage />} />   {/* <-- Add Route */}
            <Route path="/book" element={<BookingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/doctors" element={<DoctorsPage />} />
            <Route path="/services" element={<ServicesPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
