import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { getKeyWordsAndDescription, storeResume } from '../utils/dbUtils.js';
import pdf from 'pdf-parse';
import dotenv from 'dotenv';
dotenv.config();

// initialize sqs client
const sqs = new SQSClient({ 
    region: process.env.AWS_REGION, 
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

// upload resume and get analytics
export const uploadResume = async (req, res) => {
    try {
        // Check if a jobId is present
        if (!req.body.jobId) {
            return res.status(400).send('Please provide a jobId');
        }
        // Check if a file is present
        if (!req.files) {
            return res.status(400).send('No files were uploaded.');
        }
        const resume = req.files.file;
        if (!resume) {
            return res.status(400).send('Please upload a resume');
        }
        const buffer = resume.data;
        const data = await pdf(buffer);
        const text = data.text;

        // upload resume to sqs for s3 upload
        const timestamp = new Date().getTime();
        const resume_name = `resume_${timestamp}.pdf`;
        const command = new SendMessageCommand({
            QueueUrl: process.env.SQS_QUEUE_URL,
            DelaySeconds: 1,
            MessageBody: JSON.stringify({
                resume: buffer.toString('base64'),
                file_name: resume_name,
            }),
        });
        const response = await sqs.send(command);
        console.log("Sent Resume to SQS", response);
        const s3_url = `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${resume_name}`;

        // get keywords and description from db query
        const payload = await getKeyWordsAndDescription(req.body.jobId);
        const { keywords, description } = payload;

        // console.log(keywords);

        // send request to openai
        // const completion = await openai.chat.completions.create({
        //     model: 'gpt-4o-mini',
        //     messages: [
        //         { role: "system", content: "You are a helpful assistant who extracts specific details from resumes compared to job descriptions. Return output as purely json and nothign else in this format: Return only json as the output in this format {fulfilled_keywords: , missing_keywords: , rating: }" },
        //         { role: "user", content: `Given this job description: "${description}" this list of keywords: "${keywords}", this resume content: "${text}", please identify the following:
        //         1. List of fulfilled keywords (words/phrases in the resume that match keywords).
        //         2. List of missing keywords (important words/phrases from the keywords that are not in the resume).
        //         3. A rating out of 100 indicating how well the resume matches the job description in general and how well it covers keywords. Also take into account how likely the resume is to be selected for an interview in the rating.
        //         *NOTE, if resume is not in ideal format, read it as if it was in an ideal format.` }
        //     ],
        // });

        // // convert string to json
        // const response = completion.choices[0].message.content;
        // const cleanedResponse = response.replace(/```json\n|```/g, ""); // Remove code block markers
        // const parsedData = JSON.parse(cleanedResponse);
        // fake data
        const parsedData = {
            fulfilled_keywords: ['Python', 'Java', 'React', 'Node.js'],
            missing_keywords: ['C++', 'C#', 'Angular'],
            rating: 90
        };

        // store resume in database
        const store_result = await storeResume(req.body.jobId, s3_url, parsedData);
        return res.status(200).json({ message: 'Resume uploaded successfully', response: parsedData, resumeId: store_result.rows[0].resume_id });
    } catch (error) {
        console.error("Error processing file:", error);
        res.status(500).json({ message: "Error processing file", error: error });
    }
};