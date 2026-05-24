import { Router } from 'express';
import { createReport, getReports, getReportById } from '../controllers/report.controller.js';
import { verifyJWT } from '../middlewares/auth.middleware.js';
import { validate } from '../middlewares/validate.middleware.js';

const router = Router();

const reportSchema = { body: ['name', 'type'] };

router.post('/', verifyJWT, validate(reportSchema), createReport);
router.get('/', verifyJWT, getReports);
router.get('/:id', verifyJWT, getReportById);

export default router;
