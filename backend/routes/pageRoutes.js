import express from 'express';
// ESM: Notice the .js extension for local files
import { getAllPages, addPage } from '../controllers/pageController.js';

const router = express.Router({ mergeParams: true });

router.route('/').get(getAllPages).post(addPage);

// ESM: Use 'export default' for the main export of a file
export default router;