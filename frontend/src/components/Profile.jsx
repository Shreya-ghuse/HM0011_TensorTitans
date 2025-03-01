import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { FaEdit, FaSave, FaTimes, FaSignOutAlt } from 'react-icons/fa';

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
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleProfessionalChange = (e) => {
    const { name, value } = e.target;
    setProfessionalData(prev => ({ ...prev, [name]: value }));
  };
  
  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      preferences: { ...prev.preferences, [name]: type === 'checkbox' ? checked : value }
    }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      const userData = { ...formData, ...(currentUser.role === 'professional' ? professionalData : {}) };
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
    return <div className="text-center text-gray-600 mt-10">Loading profile...</div>;
  }
  
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800">Your Profile</h2>
        {!isEditing ? (
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600" onClick={() => setIsEditing(true)}>
            <FaEdit /> Edit Profile
          </button>
        ) : (
          <button className="flex items-center gap-2 bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500" onClick={() => setIsEditing(false)}>
            <FaTimes /> Cancel
          </button>
        )}
      </div>
      
      {error && <div className="text-red-500 text-sm mb-3">{error}</div>}
      {success && <div className="text-green-500 text-sm mb-3">{success}</div>}
      
      {!isEditing ? (
        <div className="space-y-4">
          <div><strong>Name:</strong> {formData.fullName}</div>
          <div><strong>Email:</strong> {formData.email}</div>
          <div><strong>Phone:</strong> {formData.phone || 'Not provided'}</div>
          <div><strong>Role:</strong> {currentUser.role === 'professional' ? 'Mental Health Professional' : 'Patient'}</div>
          {formData.bio && <div><strong>Bio:</strong> {formData.bio}</div>}
          {currentUser.role === 'professional' && (
            <div>
              <strong>Professional Details:</strong>
              <p>License Number: {professionalData.licenseNumber}</p>
              <p>Specialties: {professionalData.specialties || 'Not specified'}</p>
              <p>Years of Experience: {professionalData.yearsOfExperience || 'Not specified'}</p>
              <p>Credentials: {professionalData.credentials}</p>
            </div>
          )}
          <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600" onClick={handleLogout}>
            <FaSignOutAlt /> Log Out
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold">Full Name</label>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} className="w-full p-2 border rounded-md" required />
          </div>
          <div>
            <label className="block text-sm font-semibold">Phone Number</label>
            <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full p-2 border rounded-md" />
          </div>
          <div>
            <label className="block text-sm font-semibold">Bio</label>
            <textarea name="bio" value={formData.bio} onChange={handleChange} className="w-full p-2 border rounded-md" rows="3" />
          </div>
          <button type="submit" className="flex items-center gap-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600" disabled={loading}>
            <FaSave /> {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      )}
    </div>
  );
};

export default Profile;
