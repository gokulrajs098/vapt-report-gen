// ESM: Import the shared data source
import { reports } from './mock_db.js';

// @desc    Get all pages for a specific report
export const getAllPages = (req, res) => {
    const report = reports.find((r) => r.id === parseInt(req.params.reportId));
    if (!report) {
        return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report.pages);
};

// @desc    Add a new page to a report
export const addPage = (req, res) => {
    const report = reports.find((r) => r.id === parseInt(req.params.reportId));
    if (!report) {
        return res.status(404).json({ message: "Report not found" });
    }
    const newPage = {
        pageId: new Date().getTime(),
        title: req.body.title,
        type: req.body.type,
        content: req.body.content || "",
    };
    report.pages.push(newPage);
    res.status(201).json(newPage);
};