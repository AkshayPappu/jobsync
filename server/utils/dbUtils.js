import { v4 as uuidv4 } from 'uuid';
import { pool } from '../server.js';

export const getKeyWordsAndDescription = async (jobId) => {
    const query = `
        SELECT keywords, description 
        FROM Job_Descriptions
        WHERE job_id = $1;
    `;
    const values = [jobId];
    const result = await pool.query(query, values);
    const { keywords, description } = result.rows[0];
    return { keywords, description };
}

export const storeResume = async (jobId, s3_url, gptData) => {
    const resumeId = uuidv4();
    const query = `
        INSERT INTO Resumes (resume_id, job_id, resume_file, rating, fulfilled_keywords, missing_keywords)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING resume_id;
    `;

    const values = [resumeId, jobId, s3_url, gptData.rating, gptData.fulfilled_keywords, gptData.missing_keywords];
    const result = await pool.query(query, values);
    return result;
}

export const storeCreateJob = async (userId, title, jobDescription, keywords) => {
    const jobId = uuidv4();
    const query = `
        INSERT INTO Job_Descriptions (job_id, user_id, title, description, keywords)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING job_id;
    `;
    const values = [jobId, userId, title, jobDescription, keywords];
    const result = await pool.query(query, values);
    return result;
}

export const getAllUserJobs = async (userId) => {
    const query = `
        SELECT job_id, description, keywords, title, user_id, created_at
        FROM Job_Descriptions
        WHERE user_id = $1;
    `;
    const values = [userId];
    const result = await pool.query(query, values);
    return result;
}

export const getAllJobResumes = async (jobId) => {
    const query = `
        SELECT resume_id, resume_file, rating, fulfilled_keywords, missing_keywords
        FROM Resumes
        WHERE job_id = $1;
    `;
    const values = [jobId];
    const result = await pool.query(query, values);
    return result;
}