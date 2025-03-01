import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiMenu, HiX } from 'react-icons/hi'; // React Icons for menu
import { FiUser } from 'react-icons/fi'; // React Icon for profile
import { useAuth } from '../hooks/useAuth';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setMobileMenuOpen(false);
  };

  return (
    <nav className="bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="text-white text-xl font-bold flex items-center space-x-2">
            <span>MindfulConnect</span>
            <span className="text-2xl">🧠</span>
          </Link>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white focus:outline-none">
              {mobileMenuOpen ? <HiX className="text-3xl" /> : <HiMenu className="text-3xl" />}
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center justify-center space-x-6">
            <Link to="/" className="text-gray-300 hover:text-white transition">Home</Link>
            <Link to="/resources" className="text-gray-300 hover:text-white transition">Resources</Link>

            {!currentUser ? (
              <>
                <Link to="/about" className="text-gray-300 hover:text-white transition">About</Link>
                <Link to="/login" className="text-gray-300 hover:text-white transition">Login</Link>
                <Link to="/register" className="bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition">
                  Sign Up
                </Link>
              </>
            ) : (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition">Dashboard</Link>

                {currentUser.role === 'professional' && (
                  <Link to="/clients" className="text-gray-300 hover:text-white transition">My Clients</Link>
                )}

                {currentUser.role === 'patient' && (
                  <Link to="/appointments" className="text-gray-300 hover:text-white transition">My Sessions</Link>
                )}

                <Link to="/messages" className="text-gray-300 hover:text-white transition">Messages</Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    className="flex items-center space-x-2 text-gray-300 hover:text-white focus:outline-none"
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                  >
                    {currentUser.profileImage ? (
                      <img src={currentUser.profileImage} alt="Profile" className="w-8 h-8 rounded-full" />
                    ) : (
                      <FiUser className="w-8 h-8" />
                    )}
                    <span>{currentUser.fullName.split(' ')[0]}</span>
                  </button>

                  {/* Dropdown Menu */}
                  {dropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-gray-700 rounded-lg shadow-lg overflow-hidden z-50">
                      <Link to="/profile" className="block px-4 py-2 text-gray-300 hover:bg-gray-600 transition">My Profile</Link>
                      <Link to="/settings" className="block px-4 py-2 text-gray-300 hover:bg-gray-600 transition">Settings</Link>
                      <div className="border-t border-gray-600"></div>
                      <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-red-400 hover:bg-gray-600 transition">
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-gray-800 py-4 space-y-4">
          <Link to="/" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <Link to="/resources" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Resources</Link>

          {!currentUser ? (
            <>
              <Link to="/about" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>About</Link>
              <Link to="/login" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Login</Link>
              <Link to="/register" className="block text-center bg-gray-700 text-white mx-6 py-2 rounded-lg hover:bg-gray-600 transition">
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Dashboard</Link>
              {currentUser.role === 'professional' && (
                <Link to="/clients" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>My Clients</Link>
              )}
              {currentUser.role === 'patient' && (
                <Link to="/appointments" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>My Sessions</Link>
              )}
              <Link to="/messages" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Messages</Link>
              <Link to="/profile" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>My Profile</Link>
              <Link to="/settings" className="block text-gray-300 text-center" onClick={() => setMobileMenuOpen(false)}>Settings</Link>
              <button onClick={handleLogout} className="block w-full text-center text-red-400 py-2">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
