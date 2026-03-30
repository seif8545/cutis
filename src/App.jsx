// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import LandingPage from './pages/LandingPage';
import BookingPage from './pages/BookingPage';
import AdminDashboard from './pages/AdminDashboard'; // <-- Import the new component

export default function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navigation />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/admin" element={<AdminDashboard />} /> {/* <-- Activate the route */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}
