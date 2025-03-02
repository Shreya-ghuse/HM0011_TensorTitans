import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiMail, FiLock, FiShield, FiCheckCircle } from 'react-icons/fi';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    role: 'patient',
    licenseNumber: '',
    credentials: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const submitData = {
        email: formData.email,
        password: formData.password,
        fullName: formData.fullName,
        role: formData.role
      };
      
      if (formData.role === 'professional') {
        submitData.licenseNumber = formData.licenseNumber;
        submitData.credentials = formData.credentials;
      }
      
      await axios.post(`/api/register`, submitData);
      navigate('/login', { state: { message: 'Registration successful!' }});
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[40rem] flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FiCheckCircle className="text-green-500" /> Create Account
        </h2>
        
        {error && <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">{error}</div>}
        
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="relative">
            <FiUser className="absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={onChange}
              placeholder="Full Name"
              required
              className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div className="relative">
            <FiMail className="absolute left-3 top-3 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={onChange}
              placeholder="Email"
              required
              className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={onChange}
              placeholder="Password (Min 8 characters)"
              minLength="8"
              required
              className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div className="relative">
            <FiLock className="absolute left-3 top-3 text-gray-400" />
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={onChange}
              placeholder="Confirm Password"
              minLength="8"
              required
              className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
            />
          </div>
          
          <div className="relative">
            <label className="block font-medium">I am a:</label>
            <select
              name="role"
              value={formData.role}
              onChange={onChange}
              className="w-full py-2 px-2 border rounded-md focus:ring focus:ring-blue-300"
            >
              <option value="patient">Patient</option>
              <option value="professional">Mental Health Professional</option>
            </select>
          </div>
          
          {formData.role === 'professional' && (
            <>
              <div className="relative">
                <FiShield className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={onChange}
                  placeholder="License Number"
                  required
                  className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <div className="relative">
                <textarea
                  name="credentials"
                  value={formData.credentials}
                  onChange={onChange}
                  placeholder="Your qualifications and experience"
                  required
                  className="w-full py-2 px-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>
        
        <p className="text-center text-gray-600 mt-4">
          Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
