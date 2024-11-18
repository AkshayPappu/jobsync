import { getAllJobResumes } from "../utils/dbUtils.js";

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