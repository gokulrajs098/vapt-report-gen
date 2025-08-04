// frontend/src/components/Dialog.js
import React from 'react';

const Dialog = ({ isOpen, onOpenChange, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-end">
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            &times;
          </button>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Dialog;
