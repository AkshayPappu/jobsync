// routes.js
import express from 'express';
import { getUsers } from './controllers/userController.js';
import { uploadResume } from './controllers/resumeController.js';

const router = express.Router();

router.get('/users', getUsers);
router.post('/upload', uploadResume);
export default router;