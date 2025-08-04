// frontend/src/components/ToastMessage.js
import React from 'react';

const ToastMessage = ({ message, onClose }) => {
  if (!message) return null;
  return (
    <div className="fixed top-4 right-4 z-50 p-4 bg-gray-800 text-white rounded-lg shadow-lg animate-fade-in-down">
      <div className="flex items-center">
        <span className="text-sm">{message}</span>
        <button onClick={onClose} className="ml-4 text-gray-400 hover:text-white">
          &times;
        </button>
      </div>
    </div>
  );
};

export default ToastMessage;
