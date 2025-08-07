import express from 'express';
import {
    getAllReports,
    createReport,
    getReportById,
} from '../controllers/reportController.js';
import pageRouter from './pageRoutes.js'; // ESM default import

const router = express.Router();

router.route('/').get(getAllReports).post(createReport);
router.route('/:reportId').get(getReportById);

router.use('/:reportId/pages', pageRouter);

export default router;