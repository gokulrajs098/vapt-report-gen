// ESM: Import the shared data source
import { reports } from '../db.js';

// @desc    Get all reports
export const getAllReports = (req, res) => {
    res.status(200).json(reports);
};

// @desc    Create a new report
export const createReport = (req, res) => {
    const newReport = {
        id: reports.length + 2,
        title: req.body.title || "Untitled Report",
        client: req.body.client || "Unknown Client",
        pages: [],
    };
    reports.push(newReport);
    res.status(201).json(newReport);
};

// @desc    Get a single report by ID
export const getReportById = (req, res) => {
    const report = reports.find((r) => r.id === parseInt(req.params.reportId));
    if (!report) {
        return res.status(404).json({ message: "Report not found" });
    }
    res.status(200).json(report);
};