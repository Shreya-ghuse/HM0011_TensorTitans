// src/components/auth/ForgotPassword.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  //const { resetPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }
    
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      //await resetPassword(email);
      setMessage('If an account with this email exists, password reset instructions have been sent.');
      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-form">
      <h2>Reset Your Password</h2>
      
      {!submitted ? (
        <>
          <p className="form-description">
            Enter your email address below and we'll send you instructions to reset your password.
          </p>
          
          {error && <div className="error-message">{error}</div>}
          
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your registered email"
                required
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary" 
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Send Reset Instructions'}
            </button>
          </form>
        </>
      ) : (
        <div className="success-container">
          <div className="success-message">{message}</div>
          <p>Check your email inbox and spam folder for the reset link.</p>
        </div>
      )}
      
      <div className="auth-links">
        <p>Remembered your password? <Link to="/login">Back to Login</Link></p>
      </div>
    </div>
  );
};

export default ForgotPassword;