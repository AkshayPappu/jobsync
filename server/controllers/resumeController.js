import { CreateQueueCommand, SQSClient } from '@aws-sdk/client-sqs';
import dotenv from 'dotenv';
dotenv.config();

// upload resume to sqs
export const uploadResume = (req, res) => {
    if (!req.files) {
        return res.status(400).send('No files were uploaded.');
    }
    const resume = req.files.file;
    if (!resume) {
        return res.status(400).send('Please upload a resume');
    }

    const fileContent = resume.data.toString('base64');
    res.send('Resume uploaded successfully');
}