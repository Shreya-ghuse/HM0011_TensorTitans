// src/components/auth/Profile.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const { currentUser, updateProfile, logout } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    bio: '',
    phone: '',
    preferences: {
      emailNotifications: true,
      privacyLevel: 'standard'
    }
  });
  
  const [professionalData, setProfessionalData] = useState({
    credentials: '',
    licenseNumber: '',
    specialties: '',
    yearsOfExperience: ''
  });
  
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  
  // Load user data when component mounts
  useEffect(() => {
    if (currentUser) {
      setFormData({
        fullName: currentUser.fullName || '',
        email: currentUser.email || '',
        bio: currentUser.bio || '',
        phone: currentUser.phone || '',
        preferences: {
          emailNotifications: currentUser.preferences?.emailNotifications ?? true,
          privacyLevel: currentUser.preferences?.privacyLevel || 'standard'
        }
      });
      
      if (currentUser.role === 'professional') {
        setProfessionalData({
          credentials: currentUser.credentials || '',
          licenseNumber: currentUser.licenseNumber || '',
          specialties: currentUser.specialties || '',
          yearsOfExperience: currentUser.yearsOfExperience || ''
        });
      }
    }
  }, [currentUser]);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [name]: type === 'checkbox' ? checked : value
      }
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      // Combine general and professional data if user is a professional
      const userData = {
        ...formData,
        ...(currentUser.role === 'professional' ? professionalData : {})
      };
      
      await updateProfile(userData);
      setSuccess('Profile updated successfully');
      setIsEditing(false);
    } catch (err) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  if (!currentUser) {
    return <div className="loading">Loading profile...</div>;
  }
  
  return (
    <div className="profile-container">
      <div className="profile-header">
        <h2>Your Profile</h2>
        {!isEditing ? (
          <button 
            className="btn-secondary" 
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        ) : (
          <button 
            className="btn-outline" 
            onClick={() => setIsEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <div className="profile-content">
        {!isEditing ? (
          // View mode
          <div className="profile-details">
            <div className="profile-section">
              <h3>Personal Information</h3>
              <div className="detail-item">
                <span className="detail-label">Name:</span>
                <span className="detail-value">{formData.fullName}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email:</span>
                <span className="detail-value">{formData.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone:</span>
                <span className="detail-value">{formData.phone || 'Not provided'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Role:</span>
                <span className="detail-value">{currentUser.role === 'professional' ? 'Mental Health Professional' : 'Patient'}</span>
              </div>
              {formData.bio && (
                <div className="detail-item bio">
                  <span className="detail-label">Bio:</span>
                  <p className="detail-value">{formData.bio}</p>
                </div>
              )}
            </div>
            
            {currentUser.role === 'professional' && (
              <div className="profile-section">
                <h3>Professional Information</h3>
                <div className="detail-item">
                  <span className="detail-label">License Number:</span>
                  <span className="detail-value">{professionalData.licenseNumber}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Specialties:</span>
                  <span className="detail-value">{professionalData.specialties || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Years of Experience:</span>
                  <span className="detail-value">{professionalData.yearsOfExperience || 'Not specified'}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Credentials:</span>
                  <p className="detail-value">{professionalData.credentials}</p>
                </div>
              </div>
            )}
            
            <div className="profile-section">
              <h3>Preferences</h3>
              <div className="detail-item">
                <span className="detail-label">Email Notifications:</span>
                <span className="detail-value">{formData.preferences.emailNotifications ? 'Enabled' : 'Disabled'}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Privacy Level:</span>
                <span className="detail-value">
                  {formData.preferences.privacyLevel === 'high' ? 'High' : 
                   formData.preferences.privacyLevel === 'standard' ? 'Standard' : 'Low'}
                </span>
              </div>
            </div>
            
            <button className="btn-danger" onClick={handleLogout}>
              Log Out
            </button>
          </div>
        ) : (
          // Edit mode
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-section">
              <h3>Personal Information</h3>
              
              <div className="form-group">
                <label htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled
                />
                <small className="form-text">Email cannot be changed</small>
              </div>
              
              <div className="form-group">
                <label htmlFor="phone">Phone Number</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="bio">Bio</label>
                <textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Tell us a bit about yourself"
                />
              </div>
            </div>
            
            {currentUser.role === 'professional' && (
              <div className="form-section">
                <h3>Professional Information</h3>
                
                <div className="form-group">
                  <label htmlFor="licenseNumber">License Number</label>
                  <input
                    type="text"
                    id="licenseNumber"
                    name="licenseNumber"
                    value={professionalData.licenseNumber}
                    onChange={handleProfessionalChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="specialties">Specialties</label>
                  <input
                    type="text"
                    id="specialties"
                    name="specialties"
                    value={professionalData.specialties}
                    onChange={handleProfessionalChange}
                    placeholder="E.g., Anxiety, Depression, PTSD"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="yearsOfExperience">Years of Experience</label>
                  <input
                    type="number"
                    id="yearsOfExperience"
                    name="yearsOfExperience"
                    value={professionalData.yearsOfExperience}
                    onChange={handleProfessionalChange}
                    min="0"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="credentials">Credentials & Qualifications</label>
                  <textarea
                    id="credentials"
                    name="credentials"
                    value={professionalData.credentials}
                    onChange={handleProfessionalChange}
                    rows="4"
                    placeholder="Your education, certifications, and professional background"
                    required
                  />
                </div>
              </div>
            )}
            
            <div className="form-section">
              <h3>Preferences</h3>
              
              <div className="form-group checkbox">
                <input
                  type="checkbox"
                  id="emailNotifications"
                  name="emailNotifications"
                  checked={formData.preferences.emailNotifications}
                  onChange={handlePreferenceChange}
                />
                <label htmlFor="emailNotifications">
                  Receive email notifications
                </label>
              </div>
              
              <div className="form-group">
                <label htmlFor="privacyLevel">Privacy Level</label>
                <select
                  id="privacyLevel"
                  name="privacyLevel"
                  value={formData.preferences.privacyLevel}
                  onChange={handlePreferenceChange}
                >
                  <option value="low">Low - Share profile with community</option>
                  <option value="standard">Standard - Limited profile visibility</option>
                  <option value="high">High - Maximum privacy</option>
                </select>
              </div>
            </div>
            
            <div className="form-actions">
              <button
                type="submit"
                className="btn-primary"
                disabled={loading}
              >
                {loading ? 'Saving Changes...' : 'Save Changes'}
              </button>
              <button
                type="button"
                className="btn-outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Profile;