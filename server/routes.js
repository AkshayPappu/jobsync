// routes.js
import express from 'express';
import { uploadResume } from './controllers/resumeController.js';
import { getJobsForUser } from './controllers/userController.js';
import { getResumesForJob, createJob } from './controllers/jobController.js';

const router = express.Router();

router.post('/createJob', createJob);
router.post('/upload', uploadResume);
router.post('/jobs/:userId', getJobsForUser);
router.get('/resumes/:jobId', getResumesForJob);
export default router;