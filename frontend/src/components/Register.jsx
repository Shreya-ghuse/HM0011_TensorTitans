import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
      
      await axios.post('http://localhost:5000/api/register', submitData);
      navigate('/login', { state: { message: 'Registration successful!' }});
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Create Account</h2>
      {error && <div className="error-message">{error}</div>}
      
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={onChange}
            required
          />
        </div>
        
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={onChange}
            minLength="8"
            required
          />
        </div>
        
        <div className="form-group">
          <label>Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={onChange}
            minLength="8"
            required
          />
        </div>
        
        <div className="form-group">
          <label>I am a:</label>
          <select name="role" value={formData.role} onChange={onChange}>
            <option value="patient">Patient</option>
            <option value="professional">Mental Health Professional</option>
          </select>
        </div>
        
        {formData.role === 'professional' && (
          <>
            <div className="form-group">
              <label>License Number</label>
              <input
                type="text"
                name="licenseNumber"
                value={formData.licenseNumber}
                onChange={onChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Professional Credentials</label>
              <textarea
                name="credentials"
                value={formData.credentials}
                onChange={onChange}
                placeholder="Your qualifications and experience"
                required
              />
            </div>
          </>
        )}
        
        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? 'Creating Account...' : 'Register'}
        </button>
      </form>
    </div>
  );
};
export default Register;