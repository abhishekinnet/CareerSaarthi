import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import Register from './pages/Register';
import VerifyOtp from './pages/VerifyOtp';
import Dashboard from './pages/Dashboard';
import CareerPredictor from './pages/CareerPredictor';
import CareerExplorer from './pages/CareerExplorer';
import CareerExplorerDetail from './pages/CareerExplorerDetail';
import ScholarshipPortal from './pages/ScholarshipPortal';
import MentorMarketplace from './pages/MentorMarketplace';
import ResumeAnalyzer from './pages/ResumeAnalyzer';
import AdminDashboard from './pages/AdminDashboard';

// Custom Protected Route Wrapper
function ProtectedRoute({ children, allowedRoles }) {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="h-8 w-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default function App() {
  const { user } = useContext(AuthContext);

  return (
    <div className="flex flex-col min-h-screen bg-background text-slate-100">
      {/* Dynamic Header */}
      <Navbar />

      {/* Main viewport */}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
          <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
          <Route path="/verify-otp" element={<VerifyOtp />} />
          
          <Route path="/explore" element={<CareerExplorer />} />
          <Route path="/explore/career/:group/:slug" element={<CareerExplorerDetail />} />
          <Route path="/explore/exam/:group/:slug" element={<CareerExplorerDetail />} />
          <Route path="/explore/interview/:slug" element={<CareerExplorerDetail />} />
          <Route path="/scholarships" element={<ScholarshipPortal />} />
          <Route path="/mentors" element={<MentorMarketplace />} />

          {/* Protected student paths */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/predict-career" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <CareerPredictor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/resume-analyzer" 
            element={
              <ProtectedRoute allowedRoles={['student']}>
                <ResumeAnalyzer />
              </ProtectedRoute>
            } 
          />

          {/* Protected admin & superadmin paths */}
          <Route 
            path="/admin/*" 
            element={
              <ProtectedRoute allowedRoles={['admin', 'superadmin']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
