// src/components/pages/Settings.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  FaUser, 
  FaLock, 
  FaBell, 
  FaCalendarAlt, 
  FaGlobe, 
  FaShieldAlt,
  FaCreditCard,
  FaCheck
} from 'react-icons/fa';

const Settings = () => {
  const { user } = useAuth();
  const [settings, setSettings] = useState({
    name: "",
    email: "",
    password: "",
    notifications: true,
  });

  useEffect(() => {
    if (user) {
      setSettings({
        name: user.name || "",
        email: user.email || "",
        password: "",
        notifications: user.notifications || true,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({ ...settings, [name]: type === "checkbox" ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated successfully!");
  };

  return (
    <div className="settings-container">
      <h2>Settings</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <FaUser />
          <input type="text" name="name" value={settings.name} onChange={handleChange} />
        </div>
        <div>
          <FaLock />
          <input type="password" name="password" onChange={handleChange} placeholder="New Password" />
        </div>
        <div>
          <FaBell />
          <label>
            <input type="checkbox" name="notifications" checked={settings.notifications} onChange={handleChange} />
            Enable Notifications
          </label>
        </div>
        <button type="submit"><FaCheck /> Save Settings</button>
      </form>
    </div>
  );
};

export default Settings;
