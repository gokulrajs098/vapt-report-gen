// frontend/src/components/ReportDetailsForm.js
import React, { useContext } from 'react';
import { AppContext } from '../AppContext';
import Card from './Card';

const ReportDetailsForm = () => {
    const { reportType, webReportDetails, networkReportDetails, handleReportDetailsChange, loadSampleData } = useContext(AppContext);
    const currentDetails = reportType === 'web' ? webReportDetails : networkReportDetails;
    const setDetails = reportType === 'web' ? (newVal) => handleReportDetailsChange('web', newVal) : (newVal) => handleReportDetailsChange('network', newVal);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDetails({ ...currentDetails, [name]: value });
    };

    return (
        <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Report Details</h2>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold">General Information</h3>
                <button
                    onClick={loadSampleData}
                    className="px-4 py-2 text-sm bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300"
                >
                    Load Sample {reportType === 'web' ? 'Web' : 'Network'} Data
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="clientName" className="block text-sm font-medium text-gray-700">Client Name</label>
                    <input
                        type="text" id="clientName" name="clientName"
                        value={currentDetails.clientName || ''} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="reportIssuedDate" className="block text-sm font-medium text-gray-700">Report Issued Date</label>
                    <input
                        type="date" id="reportIssuedDate" name="reportIssuedDate"
                        value={currentDetails.reportIssuedDate || ''} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div>
                    <label htmlFor="testingStartDate" className="block text-sm font-medium text-gray-700">Testing Start Date</label>
                    <input
                        type="date" id="testingStartDate" name="testingStartDate"
                        value={currentDetails.testingStartDate || ''} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    />
                </div>
                <div className="col-span-1 md:col-span-2">
                    <label htmlFor="testActivities" className="block text-sm font-medium text-gray-700">Test Activities</label>
                    <textarea
                        id="testActivities" name="testActivities" rows="3"
                        value={currentDetails.testActivities || ''} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                    ></textarea>
                </div>
                {reportType === 'web' && (
                    <>
                        <div>
                            <label htmlFor="webServer" className="block text-sm font-medium text-gray-700">Web Server</label>
                            <input
                                type="text" id="webServer" name="webServer"
                                value={currentDetails.webServer || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="databaseServer" className="block text-sm font-medium text-gray-700">Database Server</label>
                            <input
                                type="text" id="databaseServer" name="databaseServer"
                                value={currentDetails.databaseServer || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="appFramework" className="block text-sm font-medium text-gray-700">App Framework</label>
                            <input
                                type="text" id="appFramework" name="appFramework"
                                value={currentDetails.appFramework || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="progLanguages" className="block text-sm font-medium text-gray-700">Programming Languages</label>
                            <input
                                type="text" id="progLanguages" name="progLanguages"
                                value={currentDetails.progLanguages || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div>
                            <label htmlFor="authMechanisms" className="block text-sm font-medium text-gray-700">Auth Mechanisms</label>
                            <input
                                type="text" id="authMechanisms" name="authMechanisms"
                                value={currentDetails.authMechanisms || ''} onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                    </>
                )}
            </div>
        </Card>
    );
};

export default ReportDetailsForm;
