// backend/routes/reportRoutes.js
const express = require('express');
const router = express.Router();

module.exports = (db) => {
    // Report Details
    router.get('/reports/:reportType/details', (req, res) => {
        const { reportType } = req.params;
        const details = db['report-details'][reportType] || {};
        res.json(details);
    });

    router.post('/reports/:reportType/details', (req, res) => {
        const { reportType } = req.params;
        db['report-details'][reportType] = { ...db['report-details'][reportType], ...req.body };
        res.json(db['report-details'][reportType]);
    });

    // Vulnerabilities
    router.get('/reports/:reportType/vulnerabilities', (req, res) => {
        const { reportType } = req.params;
        const sortedVulnerabilities = db[`${reportType}-vulnerabilities`].sort((a, b) => a.sortOrder - b.sortOrder);
        res.json(sortedVulnerabilities);
    });

    router.post('/reports/:reportType/vulnerabilities', (req, res) => {
        const { reportType } = req.params;
        const newVuln = { id: Date.now().toString(), ...req.body, createdAt: new Date().toISOString() };
        db[`${reportType}-vulnerabilities`].push(newVuln);
        res.status(201).json(newVuln);
    });
    
    router.put('/reports/:reportType/vulnerabilities/:id', (req, res) => {
        const { reportType, id } = req.params;
        const index = db[`${reportType}-vulnerabilities`].findIndex(v => v.id === id);
        if (index !== -1) {
            db[`${reportType}-vulnerabilities`][index] = { ...db[`${reportType}-vulnerabilities`][index], ...req.body };
            res.json(db[`${reportType}-vulnerabilities`][index]);
        } else {
            res.status(404).send('Vulnerability not found');
        }
    });

    router.put('/reports/:reportType/vulnerabilities/reorder', (req, res) => {
        const { reportType } = req.params;
        const reorderedIds = req.body;
        const oldVulnerabilities = db[`${reportType}-vulnerabilities`];
        const newVulnerabilities = reorderedIds.map((id, index) => {
            const vuln = oldVulnerabilities.find(v => v.id === id);
            return { ...vuln, sortOrder: index };
        });
        db[`${reportType}-vulnerabilities`] = newVulnerabilities;
        res.status(200).send('Reorder successful');
    });

    // Load Sample Data (in-memory simulation)
    router.post('/reports/:reportType/load-sample', (req, res) => {
        const { reportType } = req.params;
        let detailsToLoad = {};
        let vulnerabilitiesToLoad = [];

        db[`${reportType}-vulnerabilities`] = [];
        
        if (reportType === 'web') {
            detailsToLoad = {
              clientName: 'Example Web Client',
              testingStartDate: '2025-07-20',
              reportIssuedDate: new Date().toISOString().substring(0, 10),
              webServer: 'Nginx',
              databaseServer: 'PostgreSQL',
              appFramework: 'React.js / Node.js',
              progLanguages: 'JavaScript, Python',
              authMechanisms: 'OAuth2.0',
              testActivities: 'Comprehensive assessment based on the OWASP Top 10 list for 2023.',
            };
            vulnerabilitiesToLoad = [
              { id: '1', name: 'SQL Injection', description: 'Improper neutralization of special elements used in an SQL command.', cvssScore: '9.8', steps: ['Navigate to the login page.', 'Enter malicious SQL query in username field: \' OR 1=1 --', 'Bypass authentication and gain unauthorized access.'], remediation: ['Implement parameterized queries or prepared statements to prevent malicious input from being interpreted as a command.', 'Validate all user input against a whitelist of acceptable characters and data types.'], risk: ['Data exfiltration', 'Database modification', 'Privilege escalation'], url: 'https://example.com/api/login', payload: 'username=\' OR 1=1 --&password=test', screenshots: [{ url: 'https://via.placeholder.com/600x400.png?text=SQL+Injection+Screenshot+1', caption: 'Login page with SQL payload' }], sortOrder: 0 },
              { id: '2', name: 'Cross-Site Scripting (XSS)', description: 'An attacker injects malicious scripts into web pages viewed by other users.', cvssScore: '8.2', steps: ['Navigate to a comment section.', 'Enter the payload: <script>alert(\'XSS\')</script>', 'The script is executed when another user views the page.'], remediation: ['Sanitize all user-provided data before rendering it in the DOM.', 'Use a context-aware output encoding library and implement a Content Security Policy (CSP).'], risk: ['Session hijacking', 'Credential theft', 'Malware distribution'], url: 'https://example.com/blog/post-1', payload: '<script>alert(\'XSS\')</script>', screenshots: [{ url: 'https://via.placeholder.com/600x400.png?text=XSS+Screenshot+1', caption: 'Comment form with XSS payload' }], sortOrder: 1 }
            ];
        } else {
            detailsToLoad = {
              clientName: 'Example Network Client',
              testingStartDate: '2025-07-21',
              reportIssuedDate: new Date().toISOString().substring(0, 10),
              testActivities: 'Comprehensive assessment of the IT infrastructure including firewalls, servers, and networking devices.',
            };
            vulnerabilitiesToLoad = [
              { id: '3', name: 'Stack Based Buffer Overflow', description: 'A buffer overflow attack on a server that could lead to a denial-of-service or remote code execution.', cvssScore: '9.8', steps: ['Use a specific tool to send a malformed packet to the target IP.', 'The server crashes, leading to a denial of service.'], remediation: ['Patch the server with the latest security updates.', 'Implement a Web Application Firewall (WAF) and network intrusion detection systems (IDS).'], risk: ['Denial of Service (DoS)', 'Remote Code Execution'], device: 'Sonicwall Firewall', ip: '192.168.1.1', port: '443', payload: 'python3 poc.py -x 4 192.168.0.1', screenshots: [{ url: 'https://via.placeholder.com/600x400.png?text=Buffer+Overflow+Screenshot', caption: 'Console output showing successful exploit' }], sortOrder: 0 },
              { id: '4', name: 'Enhanced Audit Logging Not Enabled', description: 'The device does not have enhanced audit logging enabled, making it difficult to trace malicious activity.', cvssScore: '3.5', steps: ['Log into the device administration panel.', 'Check the logging configuration and confirm it is disabled.'], remediation: ['Enable enhanced audit logging on all network devices.', 'Configure a SIEM solution to centralize and analyze log data.'], risk: ['Difficulty in forensic analysis', 'Missed security events'], device: 'Network Switch', ip: '192.168.1.2', port: '22', payload: '', screenshots: [], sortOrder: 1 }
            ];
        }
        
        db['report-details'][reportType] = detailsToLoad;
        db[`${reportType}-vulnerabilities`] = vulnerabilitiesToLoad;
    
        res.status(200).send('Sample data loaded successfully!');
    });

    return router;
};
