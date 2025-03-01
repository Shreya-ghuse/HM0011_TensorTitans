// src/components/layout/Alert.js with Tailwind CSS and react-icons
import React, { useState, useEffect } from 'react';
import { 
  FaCheckCircle, 
  FaExclamationCircle, 
  FaInfoCircle, 
  FaExclamationTriangle,
  FaTimes
} from 'react-icons/fa';

// Alert context would typically be imported to get alert state

const Alert = () => {
  // In a real app, you would get these from your alert context
  const [alerts, setAlerts] = useState([]);

  /*
  // Sample alerts
  useEffect(() => {
    // Add a sample alert for demonstration
    // In a real app, this would come from context
    setAlerts([
      // Uncomment one of these to see the alert in action
      // { id: 1, type: 'success', message: 'Your profile has been updated successfully!' },
      // { id: 2, type: 'error', message: 'There was an error processing your request. Please try again.' },
      // { id: 3, type: 'info', message: 'Your session will expire in 5 minutes. Please save your work.' },
      // { id: 4, type: 'warning', message: 'This action cannot be undone. Please proceed with caution.' },
    ]);
  }, []);*/

  // Remove an alert by ID
  const removeAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  // Auto-remove alerts after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      if (alerts.length > 0) {
        setAlerts(alerts.slice(1));
      }
    }, 5000);

    return () => clearTimeout(timeout);
  }, [alerts]);

  // If no alerts, don't render anything
  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex flex-col items-center px-4 py-6 pointer-events-none sm:p-6 sm:items-end">
      <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
        {alerts.map(alert => (
          <div
            key={alert.id}
            className={`max-w-sm w-full shadow-lg rounded-lg pointer-events-auto ring-1 
              ${alert.type === 'error' ? 'bg-red-50 ring-red-500' : 
                alert.type === 'success' ? 'bg-green-50 ring-green-500' : 
                alert.type === 'warning' ? 'bg-yellow-50 ring-yellow-500' : 
                'bg-blue-50 ring-blue-500'}`}
          >
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {alert.type === 'success' && <FaCheckCircle className="h-6 w-6 text-green-500" />}
                  {alert.type === 'error' && <FaExclamationCircle className="h-6 w-6 text-red-500" />}
                  {alert.type === 'warning' && <FaExclamationTriangle className="h-6 w-6 text-yellow-500" />}
                  {alert.type === 'info' && <FaInfoCircle className="h-6 w-6 text-blue-500" />}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className={`text-sm font-medium 
                    ${alert.type === 'error' ? 'text-red-800' : 
                      alert.type === 'success' ? 'text-green-800' : 
                      alert.type === 'warning' ? 'text-yellow-800' : 
                      'text-blue-800'}`}>
                    {alert.message}
                  </p>
                </div>
                <div className="ml-4 flex-shrink-0 flex">
                  <button
                    className={`inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${alert.type === 'error' ? 'bg-red-50 text-red-500 hover:bg-red-100 focus:ring-red-600' : 
                        alert.type === 'success' ? 'bg-green-50 text-green-500 hover:bg-green-100 focus:ring-green-600' : 
                        alert.type === 'warning' ? 'bg-yellow-50 text-yellow-500 hover:bg-yellow-100 focus:ring-yellow-600' : 
                        'bg-blue-50 text-blue-500 hover:bg-blue-100 focus:ring-blue-600'}`}
                    onClick={() => removeAlert(alert.id)}
                  >
                    <span className="sr-only">Close</span>
                    <FaTimes className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Alert;