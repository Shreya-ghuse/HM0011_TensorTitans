// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

// Layout Components
import Navbar from './layout/Navbar';
import Footer from './layout/Footer';
import Alert from './layout/Alert';

// Auth Components
import Register from './components/Register';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
//import ResetPassword from './components/ResetPassword';
import Profile from './components/Profile';

// Protected Route Components
import PrivateRoute from './routing/PrivateRoute';

// Main App Pages
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Resources from './pages/Resources';
import Messages from './pages/Messages';
import Appointments from './pages/Appointments';
import ClientManagement from './pages/ClientManagement';
import Settings from './pages/Settings';
import NotFound from './pages/NotFound';

// CSS
//import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="app-container">
          <Navbar />
          <Alert />
          <main className="main-content">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/register" element={<Register />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              {/*<Route path="/reset-password/:token" element={<ResetPassword />} />*/}
              
              {/* Protected Routes - Require Authentication */}
              <Route 
                path="/dashboard" 
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/profile" 
                element={
                  <PrivateRoute>
                    <Profile />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/messages" 
                element={
                  <PrivateRoute>
                    <Messages />
                  </PrivateRoute>
                } 
              />
              <Route 
                path="/settings" 
                element={
                  <PrivateRoute>
                    <Settings />
                  </PrivateRoute>
                } 
              />
              
              {/* Patient Only Routes */}
              <Route 
                path="/appointments" 
                element={
                  <PrivateRoute allowedRoles={['patient']}>
                    <Appointments />
                  </PrivateRoute>
                } 
              />
              
              {/* Professional Only Routes */}
              <Route 
                path="/clients" 
                element={
                  <PrivateRoute allowedRoles={['professional']}>
                    <ClientManagement />
                  </PrivateRoute>
                } 
              />
              
              {/* Catch all for 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;