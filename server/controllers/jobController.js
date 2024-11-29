import { getAllJobResumes, storeCreateJob, getJobById } from "../utils/dbUtils.js";
import { generateKeywords } from '../utils/gptUtils.js';

export const getResumesForJob = async (req, res) => {
    try {
        // Check if a jobId is present
        const jobId = req.params.jobId;
        if (!jobId) {
            return res.status(400).send('Please provide a jobId');
        }

        // get resumes for job from db
        const result = await getAllJobResumes(jobId);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}

export const getJobForId = async (req, res) => {
    try {
        // Check if a jobId is present
        const jobId = req.params.jobId;
        if (!jobId) {
            return res.status(400).send('Please provide a jobId');
        }
        // get job from db
        const result = await getJobById(jobId);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}


// create a new job
export const createJob = async (req, res) => {
    try {
        // check if title is present
        if (!req.body.title) {
            return res.status(400).send('Please provide a title');
        }

        // check if job description is present
        if (!req.body.jobDescription) {
            return res.status(400).send('Please provide a job description');
        }
        // check if userId is present
        if (!req.body.userId) {
            return res.status(400).send('Please provide a userId');
        }

        // extract keywords from job description with openai
        const keywords = await generateKeywords(req.body.jobDescription);
        console.log(keywords);

        // store job in database
        const result = await storeCreateJob(req.body.userId, req.body.title, req.body.jobDescription, keywords);
        console.log(`Inserted job description with job_id: ${result.rows[0].job_id}`);
        res.status(200).json({ message: 'Job created successfully', jobId: result.rows[0].job_id });
    } catch (error) {
        console.error("Error creating job:", error);
        res.status(500).json({ message: "Error creating job", error: error });
    }
};