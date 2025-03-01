// src/components/layout/Footer.js with Tailwind CSS and react-icons
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaTwitter, 
  FaFacebookF, 
  FaInstagram, 
  FaLinkedinIn,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Brand Section */}
        <div>
          <h3 className="text-xl font-bold text-white mb-4">MindfulConnect</h3>
          <p className="mb-4 text-gray-400">
            A secure platform connecting individuals with mental health support and resources.
          </p>
          <div className="flex space-x-4">
            {/* Social Media Icons */}
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter" 
               className="text-gray-400 hover:text-blue-400 transition-colors">
              <FaTwitter className="w-5 h-5" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook" 
               className="text-gray-400 hover:text-blue-600 transition-colors">
              <FaFacebookF className="w-5 h-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram" 
               className="text-gray-400 hover:text-pink-500 transition-colors">
              <FaInstagram className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" 
               className="text-gray-400 hover:text-blue-500 transition-colors">
              <FaLinkedinIn className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/resources" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                Resources
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                Join Now
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-400 hover:text-white transition-colors inline-flex items-center">
                Sign In
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/resources/articles" className="text-gray-400 hover:text-white transition-colors">
                Articles
              </Link>
            </li>
            <li>
              <Link to="/resources/self-help" className="text-gray-400 hover:text-white transition-colors">
                Self-Help Tools
              </Link>
            </li>
            <li>
              <Link to="/resources/crisis" className="text-gray-400 hover:text-white transition-colors">
                Crisis Support
              </Link>
            </li>
            <li>
              <Link to="/resources/faq" className="text-gray-400 hover:text-white transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Contact</h4>
          <address className="not-italic space-y-3">
            <p className="flex items-center text-gray-400">
              <FaMapMarkerAlt className="w-5 h-5 mr-2 text-gray-500" />
              123 Wellness Street, Suite 100
            </p>
            <p className="flex items-center text-gray-400">
              <FaPhone className="w-4 h-4 mr-2 text-gray-500" />
              <a href="tel:+1-800-555-0123" className="hover:text-white transition-colors">
                1-800-555-0123
              </a>
            </p>
            <p className="flex items-center text-gray-400">
              <FaEnvelope className="w-4 h-4 mr-2 text-gray-500" />
              <a href="mailto:support@mindfulconnect.com" className="hover:text-white transition-colors">
                support@mindfulconnect.com
              </a>
            </p>
          </address>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; {currentYear} MindfulConnect. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-400 text-sm hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-400 text-sm hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/accessibility" className="text-gray-400 text-sm hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-gray-500 text-sm text-center">
            <span className="font-semibold">Important:</span> This platform is not intended to be a substitute for professional advice, diagnosis, or treatment. 
            If you are in crisis or you think you may have an emergency, call your doctor or 911 immediately. 
            If you're having suicidal thoughts, call 988 (Suicide & Crisis Lifeline) or text HOME to 741741 (Crisis Text Line).
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;