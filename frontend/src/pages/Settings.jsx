import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';
import { 
  FaUser, 
  FaLock, 
  FaBell, 
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
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Settings</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        
        {/* Name Input */}
        <div className="flex items-center space-x-3 border p-2 rounded-lg">
          <FaUser className="text-gray-500" />
          <input 
            type="text" 
            name="name" 
            value={settings.name} 
            onChange={handleChange} 
            placeholder="Your Name"
            className="w-full outline-none p-1 text-gray-700"
          />
        </div>

        {/* Password Input */}
        <div className="flex items-center space-x-3 border p-2 rounded-lg">
          <FaLock className="text-gray-500" />
          <input 
            type="password" 
            name="password" 
            onChange={handleChange} 
            placeholder="New Password"
            className="w-full outline-none p-1 text-gray-700"
          />
        </div>

        {/* Notifications Toggle */}
        <div className="flex items-center space-x-3">
          <FaBell className="text-gray-500" />
          <label className="flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              name="notifications" 
              checked={settings.notifications} 
              onChange={handleChange} 
              className="hidden"
            />
            <div className={`w-10 h-5 flex items-center rounded-full p-1 duration-300 ${settings.notifications ? "bg-green-500" : "bg-gray-400"}`}>
              <div className={`bg-white w-4 h-4 rounded-full shadow-md transform ${settings.notifications ? "translate-x-5" : ""}`}></div>
            </div>
            <span className="ml-2 text-gray-700">Enable Notifications</span>
          </label>
        </div>

        {/* Save Button */}
        <button 
          type="submit" 
          className="flex items-center justify-center w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          <FaCheck className="mr-2" /> Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;
