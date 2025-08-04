// frontend/src/components/ReportPreview.js
import React, { useContext, useRef, useState, useEffect } from 'react';
import { AppContext } from '../AppContext';
import Card from './Card';

const ReportPreview = ({ onBack }) => {
  const { vulnerabilities, reportType, webReportDetails, networkReportDetails } = useContext(AppContext);
  const reportRef = useRef();
  const [isDownloading, setIsDownloading] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const currentDetails = reportType === 'web' ? webReportDetails : networkReportDetails;

  useEffect(() => {
    const script1 = document.createElement('script');
    script1.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js';
    script1.onload = () => {
      const script2 = document.createElement('script');
      script2.src = 'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js';
      script2.onload = () => {
        setIsScriptLoaded(true);
      };
      document.body.appendChild(script2);
    };
    document.body.appendChild(script1);
    return () => {
      const script2 = document.querySelector('script[src*="jspdf"]');
      if (script1 && document.body.contains(script1)) {
        document.body.removeChild(script1);
      }
      if (script2 && document.body.contains(script2)) {
        document.body.removeChild(script2);
      }
    };
  }, []);

  const handlePdfDownload = async () => {
    if (!isScriptLoaded) {
      console.log('Libraries are still loading...');
      return;
    }
    setIsDownloading(true);
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF('p', 'mm', 'a4');
    const margins = { top: 20, right: 20, bottom: 20, left: 20 };
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    let y = margins.top;
    
    const detailsElement = document.getElementById('report-details-section');
    const detailsImg = await window.html2canvas(detailsElement, { scale: 2 });
    const detailsImgData = detailsImg.toDataURL('image/png');
    const imgWidth = pageWidth - margins.left - margins.right;
    const imgHeight = (detailsElement.offsetHeight * imgWidth) / detailsImg.width;
    doc.addImage(detailsImgData, 'PNG', margins.left, y, imgWidth, imgHeight);
    doc.addPage();

    const tocElement = document.getElementById('table-of-contents-section');
    const tocImg = await window.html2canvas(tocElement, { scale: 2 });
    const tocImgData = tocImg.toDataURL('image/png');
    const tocImgHeight = (tocElement.offsetHeight * imgWidth) / tocImg.width;
    doc.addImage(tocImgData, 'PNG', margins.left, margins.top, imgWidth, tocImgHeight);
    doc.addPage();
    y = margins.top;
    
    const vulnerabilityDetailsElement = document.getElementById('vulnerability-details-section');
    const vulnDetailsChildren = vulnerabilityDetailsElement.children;

    for (const vulnDiv of vulnDetailsChildren) {
      const vulnImg = await window.html2canvas(vulnDiv, { scale: 2 });
      const vulnImgData = vulnImg.toDataURL('image/png');
      const vulnImgHeight = (vulnDiv.offsetHeight * imgWidth) / vulnImg.width;

      if (y + vulnImgHeight > pageHeight - margins.bottom) {
        doc.addPage();
        y = margins.top;
      }
      
      doc.addImage(vulnImgData, 'PNG', margins.left, y, imgWidth, vulnImgHeight);
      y += vulnImgHeight + 10;
    }

    doc.save('vulnerability_report.pdf');
    setIsDownloading(false);
  };
  
  const TableOfContents = () => {
    return (
      <div id="table-of-contents-section" className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Table of Contents</h2>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Vulnerability
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                CVSS Score
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Page
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {vulnerabilities.map((vuln, index) => (
              <tr key={vuln.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {vuln.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {vuln.cvssScore}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                  {index + 2}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <button
          onClick={onBack}
          className="flex items-center px-4 py-2 bg-gray-200 text-gray-800 rounded-lg shadow-md hover:bg-gray-300 transition-colors duration-200"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Editor
        </button>
        <button
          onClick={handlePdfDownload}
          className="px-6 py-3 bg-green-600 text-white rounded-lg shadow-lg hover:bg-green-700 transition-colors duration-200 font-semibold text-lg"
          disabled={isDownloading}
        >
          {isDownloading ? 'Generating PDF...' : 'Download Report as PDF'}
        </button>
      </div>
      <div ref={reportRef} className="bg-white p-8 rounded-lg shadow-xl print:shadow-none">
        <div id="report-details-section" className="border-b-2 pb-4 mb-4">
          <h1 className="text-3xl font-bold text-gray-900">{reportType === 'web' ? 'Web Pentesting Report' : 'Network Pentesting Report'}</h1>
          <p className="text-gray-500">
            <strong>Client Name:</strong> {currentDetails.clientName}
          </p>
          <p className="text-gray-500">
            <strong>Report Issued Date:</strong> {currentDetails.reportIssuedDate}
          </p>
          <p className="text-gray-500">
            <strong>Testing Start Date:</strong> {currentDetails.testingStartDate}
          </p>
          {reportType === 'web' && (
            <>
              <p className="text-gray-500 mt-2">
                <strong>Web Server:</strong> {currentDetails.webServer}
              </p>
              <p className="text-gray-500">
                <strong>Database Server:</strong> {currentDetails.databaseServer}
              </p>
              <p className="text-gray-500">
                <strong>App Framework:</strong> {currentDetails.appFramework}
              </p>
              <p className="text-gray-500">
                <strong>Programming Languages:</strong> {currentDetails.progLanguages}
              </p>
              <p className="text-gray-500">
                <strong>Authentication Mechanisms:</strong> {currentDetails.authMechanisms}
              </p>
            </>
          )}
          <p className="text-gray-500">
            <strong>Test Activities:</strong> {currentDetails.testActivities}
          </p>
        </div>
        <TableOfContents />
        <div id="vulnerability-details-section">
          {vulnerabilities.map((vuln, index) => (
            <div key={vuln.id} className="border-b pb-4 last:border-b-0 mb-8">
              <h3 className="text-xl font-semibold text-red-700">
                {index + 1}. {vuln.name}
              </h3>
              <p className="text-gray-700 mt-2"><strong>Description:</strong> {vuln.description}</p>
              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p><strong>Risk:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  {vuln.risk.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
                <p className="mt-2"><strong>CVSS Score:</strong> {vuln.cvssScore}</p>
                {reportType === 'web' && (
                  <p><strong>Vulnerability Location (URL):</strong> {vuln.url}</p>
                )}
                {reportType === 'network' && (
                  <>
                    <p><strong>Device:</strong> {vuln.device}</p>
                    <p><strong>IP Address:</strong> {vuln.ip}</p>
                    <p><strong>Port:</strong> {vuln.port}</p>
                  </>
                )}
                <p className="mt-2"><strong>Payload:</strong></p>
                <pre className="bg-gray-100 p-2 rounded-md whitespace-pre-wrap">{vuln.payload}</pre>
                <p className="mt-2"><strong>Steps to Reproduce:</strong></p>
                <ol className="list-decimal ml-4 space-y-1">
                  {vuln.steps.map((step, i) => (
                    <li key={i}>{step}</li>
                  ))}
                </ol>
              </div>
              <div className="mt-2 text-sm text-gray-500 space-y-1">
                <p><strong>Remediation:</strong></p>
                <ul className="list-disc ml-4 space-y-1">
                  {vuln.remediation.map((point, i) => (
                    <li key={i}>{point}</li>
                  ))}
                </ul>
              </div>
              {vuln.screenshots && vuln.screenshots.length > 0 && (
                <div className="mt-4">
                  <p className="text-sm font-semibold text-gray-700">Screenshots:</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                    {vuln.screenshots.map((ss, i) => (
                      <div key={i}>
                        <img src={ss.url} alt={ss.caption} className="w-full h-auto rounded-md shadow-sm" />
                        <p className="text-xs text-gray-500 text-center mt-1">{ss.caption}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <p className="text-xs text-gray-400 mt-2">Added by: <span className="font-mono">{vuln.userId}</span> at {vuln.createdAt}</p>
            </div>
          ))}
        </div>

        {/* Report Footer */}
        <div className="bg-gray-800 text-white p-4 rounded-b-lg text-center font-bold text-sm mt-4">
          Report Footer
        </div>
      </div>
    </div>
  );
};


export default ReportPreview;
