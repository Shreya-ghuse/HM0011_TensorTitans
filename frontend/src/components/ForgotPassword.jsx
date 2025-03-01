import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMail, FiSend, FiCheckCircle } from 'react-icons/fi';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  // const { resetPassword } = useAuth();

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
      // await resetPassword(email);
      setMessage('If an account with this email exists, password reset instructions have been sent.');
      setSubmitted(true);
    } catch (err) {
      setError('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-800 flex items-center gap-2 mb-6">
          <FiSend className="text-blue-500" /> Reset Your Password
        </h2>

        {!submitted ? (
          <>
            <p className="text-gray-600 mb-4">
              Enter your email address below, and we'll send you instructions to reset your password.
            </p>

            {error && <div className="bg-red-100 text-red-600 px-4 py-2 rounded-md mb-4">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="relative">
                <FiMail className="absolute left-3 top-3 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your registered email"
                  required
                  className="w-full pl-10 py-2 border rounded-md focus:ring focus:ring-blue-300"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300 disabled:opacity-50"
              >
                {loading ? 'Processing...' : 'Send Reset Instructions'}
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <FiCheckCircle className="text-green-500 text-4xl mx-auto mb-4" />
            <div className="bg-green-100 text-green-600 px-4 py-2 rounded-md mb-4">
              {message}
            </div>
            <p className="text-gray-600">Check your email inbox and spam folder for the reset link.</p>
          </div>
        )}

        <div className="text-center text-gray-600 mt-4">
          <p>
            Remembered your password?{' '}
            <Link to="/login" className="text-blue-600 hover:underline">Back to Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
