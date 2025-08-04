// frontend/src/pages/TemplateManager.js
import React, { useContext, useState } from 'react';
import { AppContext } from '../AppContext';
import Card from '../components/Card';

const TemplateManager = () => {
    const { reportType, vulnerabilities, webReportDetails, networkReportDetails, showMessage } = useContext(AppContext);
    const [templateName, setTemplateName] = useState('');
    const [templates, setTemplates] = useState([]); // This would be fetched from a backend

    const handleSaveTemplate = () => {
        if (!templateName) {
            showMessage("Please provide a name for your template.");
            return;
        }

        // Simulating saving a template
        const newTemplate = {
            id: templates.length + 1,
            name: templateName,
            reportType,
            vulnerabilities,
            reportDetails: reportType === 'web' ? webReportDetails : networkReportDetails
        };

        setTemplates([...templates, newTemplate]);
        setTemplateName('');
        showMessage(`Template "${templateName}" saved successfully!`);
        console.log('Saved templates:', [...templates, newTemplate]);
    };

    const handleLoadTemplate = (template) => {
        // Here you would load the template's data into the main app state
        // This is a placeholder for the actual logic
        showMessage(`Template "${template.name}" loaded successfully!`);
    };

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-900">Manage Templates</h2>
            <Card>
                <h3 className="text-xl font-semibold mb-4">Save Current Report as Template</h3>
                <div className="flex space-x-2">
                    <input
                        type="text"
                        value={templateName}
                        onChange={(e) => setTemplateName(e.target.value)}
                        className="flex-grow px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                        placeholder="Enter template name"
                    />
                    <button
                        onClick={handleSaveTemplate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors"
                    >
                        Save Template
                    </button>
                </div>
            </Card>

            <Card>
                <h3 className="text-xl font-semibold mb-4">Load Existing Templates</h3>
                {templates.length === 0 ? (
                    <p className="text-gray-500">No templates saved yet. Create one above!</p>
                ) : (
                    <ul className="space-y-2">
                        {templates.map(template => (
                            <li key={template.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-md border border-gray-200">
                                <span className="font-semibold">{template.name}</span>
                                <button
                                    onClick={() => handleLoadTemplate(template)}
                                    className="px-4 py-1 text-sm bg-green-600 text-white rounded-md hover:bg-green-700"
                                >
                                    Load
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </Card>
        </div>
    );
};

export default TemplateManager;
