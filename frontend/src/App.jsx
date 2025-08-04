// frontend/src/App.js
import React, { useState, createContext, useEffect, useRef } from 'react';
import HomePage from './pages/HomePage';
import { AppContext } from './AppContext';

const App = () => {
  const [vulnerabilities, setVulnerabilities] = useState([]);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState({ uid: 'local-user' });
  const [isAuthReady, setIsAuthReady] = useState(true);
  const [reportType, setReportType] = useState('web');
  const [editingVulnerability, setEditingVulnerability] = useState(null);
  const [reportPages, setReportPages] = useState([]);
  const [webReportDetails, setWebReportDetails] = useState({
    title: 'Web Application Vulnerability Assessment and Penetration Testing Report',
    preparedBy: 'Shakta Technologies Pvt Ltd',
    clientName: '',
    testingStartDate: '',
    reportIssuedDate: new Date().toISOString().substring(0, 10),
    webServer: '',
    databaseServer: '',
    appFramework: '',
    progLanguages: '',
    authMechanisms: '',
    testActivities: '',
  });
  const [networkReportDetails, setNetworkReportDetails] = useState({
    title: 'Network Infrastructure Vulnerability Assessment and Penetration Testing Report',
    preparedBy: 'Shakta Technologies Pvt Ltd',
    clientName: '',
    testingStartDate: '',
    reportIssuedDate: new Date().toISOString().substring(0, 10),
    testActivities: '',
  });
  const [templates, setTemplates] = useState([]);

  // Mock user and auth for local Express setup
  useEffect(() => {
    setUser({ uid: 'local-user-123' });
    setIsAuthReady(true);
  }, []);

  const showMessage = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(''), 3000);
  };

  const API_BASE_URL = 'http://localhost:3001/api';

  const fetchVulnerabilities = async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${type}/vulnerabilities`);
      if (response.ok) {
        const data = await response.json();
        setVulnerabilities(data);
      }
    } catch (e) {
      console.error('Failed to fetch vulnerabilities:', e);
    }
  };

  const fetchReportDetails = async (type) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${type}/details`);
      if (response.ok) {
        const data = await response.json();
        if (type === 'web') {
          setWebReportDetails(prev => ({ ...prev, ...data }));
        } else {
          setNetworkReportDetails(prev => ({ ...prev, ...data }));
        }
      }
    } catch (e) {
      console.error('Failed to fetch report details:', e);
    }
  };

  useEffect(() => {
    if (isAuthReady && user) {
      fetchVulnerabilities(reportType);
      fetchReportDetails(reportType);
    }
  }, [isAuthReady, user, reportType]);
  
  const handleAddVulnerability = async (newVuln) => {
    const payload = { ...newVuln, sortOrder: vulnerabilities.length };
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportType}/vulnerabilities`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (response.ok) {
        fetchVulnerabilities(reportType);
        return { success: true };
      }
      return { success: false, error: response.statusText };
    } catch (e) {
      console.error("Error adding document: ", e);
      return { success: false, error: e.message };
    }
  };

  const handleUpdateVulnerability = async (updatedVuln) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportType}/vulnerabilities/${updatedVuln.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedVuln),
      });
      if (response.ok) {
        fetchVulnerabilities(reportType);
        return { success: true };
      }
      return { success: false, error: response.statusText };
    } catch (e) {
      console.error("Error updating document: ", e);
      return { success: false, error: e.message };
    }
  };
  
  const handleEditClick = (vuln) => {
    setEditingVulnerability(vuln);
  };
  
  const handleReorderVulnerabilities = async (reorderedIds) => {
    try {
      const response = await fetch(`${API_BASE_URL}/reports/${reportType}/vulnerabilities/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reorderedIds),
      });
      if (!response.ok) {
        throw new Error('Failed to reorder');
      }
      fetchVulnerabilities(reportType);
    } catch (e) {
      console.error("Error reordering documents:", e);
      showMessage('Failed to reorder. Please try again.');
    }
  };

  const handleReportDetailsChange = async (reportType, newDetails) => {
    try {
      await fetch(`${API_BASE_URL}/reports/${reportType}/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newDetails),
      });
      if (reportType === 'web') {
        setWebReportDetails(newDetails);
      } else {
        setNetworkReportDetails(newDetails);
      }
    } catch (e) {
      console.error('Failed to save report details:', e);
      showMessage('Failed to save report details.');
    }
  };

  const loadSampleData = async () => {
    try {
      await fetch(`${API_BASE_URL}/reports/${reportType}/load-sample`, {
        method: 'POST',
      });
      fetchVulnerabilities(reportType);
      fetchReportDetails(reportType);
      showMessage('Sample data loaded successfully!');
    } catch (e) {
      console.error('Failed to load sample data:', e);
      showMessage('Failed to load sample data.');
    }
  };

  return (
    <AppContext.Provider value={{
      vulnerabilities, handleAddVulnerability, handleUpdateVulnerability, showMessage,
      user, handleReorderVulnerabilities, reportType, setReportType, webReportDetails,
      setWebReportDetails, networkReportDetails, setNetworkReportDetails, handleReportDetailsChange,
      loadSampleData, handleEditClick, templates, setTemplates, editingVulnerability, setEditingVulnerability
    }}>
      <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center font-sans">
        <HomePage />
      </div>
    </AppContext.Provider>
  );
};

export default App;
