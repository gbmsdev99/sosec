import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import SubmitPage from './pages/SubmitPage'
import SuccessPage from './pages/SuccessPage'
import TrackPage from './pages/TrackPage'
import StatusPage from './pages/StatusPage'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminViewSubmission from './pages/admin/AdminViewSubmission'
import AdminExport from './pages/admin/AdminExport'
import AdminAnalytics from './pages/admin/AdminAnalytics'
import ProtectedRoute from './components/ProtectedRoute'
import NotFound from './components/NotFound'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/submit" element={<SubmitPage />} />
          <Route path="/success/:trackingId" element={<SuccessPage />} />
          <Route path="/track" element={<TrackPage />} />
          <Route path="/track/:trackingId" element={<StatusPage />} />
          
          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/view/:trackingId" element={
            <ProtectedRoute>
              <AdminViewSubmission />
            </ProtectedRoute>
          } />
          <Route path="/admin/export" element={
            <ProtectedRoute>
              <AdminExport />
            </ProtectedRoute>
          } />
          <Route path="/admin/analytics" element={
            <ProtectedRoute>
              <AdminAnalytics />
            </ProtectedRoute>
          } />
          
          {/* Catch all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App