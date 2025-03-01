// src/components/pages/NotFound.js
import React from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center p-4">
      <FaExclamationTriangle size={50} className="text-red-500 mb-4" />
      <h2 className="text-2xl font-bold">404 - Page Not Found</h2>
      <p className="text-gray-600">The page you're looking for doesn't exist.</p>
    </div>
  );
};

export default NotFound;
