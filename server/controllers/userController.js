import { getAllUserJobs } from "../utils/dbUtils.js";

export const getJobsForUser = async (req, res) => {
    try {
        // Check if a userId is present
        const userId = req.params.userId;
        if (!userId) {
            return res.status(400).send('Please provide a userId');
        }

        // get jobs for user from db
        const result = await getAllUserJobs(userId);
        res.status(200).send(result.rows);
    } catch (error) {
        res.status(500).send(error);
    }
}