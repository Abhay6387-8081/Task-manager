import express from 'express';
import { getDashboardStatus, getRecentTasks } from '../controller/dashboardController.js';

const router = express.Router();

router.get('/stats',getDashboardStatus);
router.get('/recent-tasks',getRecentTasks);

export default router;