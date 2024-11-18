// routes.js
import express from 'express';
import { createJob, uploadResume } from './controllers/resumeController.js';
import { getJobsForUser } from './controllers/userController.js';
import { getResumesForJob } from './controllers/jobController.js';

const router = express.Router();

router.post('/createJob', createJob);
router.post('/upload', uploadResume);
router.get('/jobs/:userId', getJobsForUser);
router.get('/resumes/:jobId', getResumesForJob);
export default router;