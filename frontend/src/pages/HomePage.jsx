// frontend/src/pages/HomePage.js
import React, { useState, useContext, useEffect } from 'react';
import ReportDetailsForm from '../components/ReportDetailsForm';
import VulnerabilityList from '../components/VulnerabilityList';
import ReportPreview from '../components/ReportPreview';
import DraggableVulnerabilityList from '../components/DraggableVulnerabilityList';
import Dialog from '../components/Dialog';
import AddVulnerabilityForm from '../components/AddVulnerabilityForm';
import ToastMessage from '../components/ToastMessage';
import { AppContext } from '../AppContext';

const HomePage = () => {
  const { 
    vulnerabilities, handleAddVulnerability, handleUpdateVulnerability, showMessage,
    user, handleReorderVulnerabilities, reportType, setReportType, webReportDetails,
    setWebReportDetails, networkReportDetails, setNetworkReportDetails, handleReportDetailsChange,
    loadSampleData, handleEditClick
  } = useContext(AppContext);
  
  const [currentPage, setCurrentPage] = useState('reportDetails');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingVulnerability, setEditingVulnerability] = useState(null);
  const [message, setMessage] = useState('');

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    setEditingVulnerability(null);
  };

  const handleEditClickLocal = (vuln) => {
    setEditingVulnerability(vuln);
    setIsDialogOpen(true);
  };

  return (
    <div className="max-w-7xl w-full flex space-x-8">
      <div className="w-1/4">
        <DraggableVulnerabilityList onEditClick={handleEditClickLocal} />
      </div>
      <div className="w-full md:w-3/4 space-y-8 flex flex-col">
        <header className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight">Collaborative Report Generator</h1>
          <p className="mt-2 text-lg text-gray-600">
            User ID: <span className="font-mono text-sm break-all">{user?.uid || 'Authenticating...'}</span>
          </p>
          <div className="mt-4">
            <label htmlFor="report-type" className="text-gray-700 font-semibold mr-2">Select Report Type:</label>
            <select
              id="report-type"
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="px-4 py-2 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="web">Web Pentesting Report</option>
              <option value="network">Network Pentesting Report</option>
            </select>
          </div>
        </header>
        <nav className="flex space-x-4 border-b border-gray-300">
          <button
            className={`px-4 py-2 font-medium ${currentPage === 'reportDetails' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentPage('reportDetails')}
          >
            Report Details
          </button>
          <button
            className={`px-4 py-2 font-medium ${currentPage === 'vulnerabilities' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => setCurrentPage('vulnerabilities')}
          >
            Vulnerabilities
          </button>
          <button
            className={`px-4 py-2 font-medium ${currentPage === 'preview' ? 'border-b-2 border-blue-500 text-blue-600' : 'text-gray-500'}`}
            onClick={() => vulnerabilities.length > 0 ? setCurrentPage('preview') : showMessage('Please add at least one vulnerability to preview.')}
          >
            Preview
          </button>
        </nav>
        
        {currentPage === 'reportDetails' && (
          <ReportDetailsForm />
        )}
        {currentPage === 'vulnerabilities' && (
          <>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => {
                    setEditingVulnerability(null);
                    setIsDialogOpen(true);
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors duration-200 font-semibold text-lg"
              >
                Add Vulnerability
              </button>
            </div>
            <VulnerabilityList />
          </>
        )}
        {currentPage === 'preview' && (
          <ReportPreview onBack={() => setCurrentPage('vulnerabilities')} />
        )}
      </div>
      <Dialog isOpen={isDialogOpen} onOpenChange={handleCloseDialog}>
        <AddVulnerabilityForm initialData={editingVulnerability} />
      </Dialog>
      <ToastMessage message={message} onClose={() => setMessage('')} />
    </div>
  );
};

export default HomePage;
