// routes.js
import express from 'express';
import { getUsers } from './controllers/userController.js';
import { createJob, uploadResume } from './controllers/resumeController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/createJob', createJob);
router.post('/upload', uploadResume);
export default router;