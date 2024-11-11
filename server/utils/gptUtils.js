import OpenAI from 'openai';
import dotenv from 'dotenv';
dotenv.config();

// initialize openai api
const openai = new OpenAI();

export const generateKeywords = async (jobDescription) => {
    const completion = await openai.chat.completions.create({
        // model: 'gpt-4o-mini',
        model: 'gpt-3.5-turbo',
        messages: [
            { role: "system", content: "You are a helpful assistant who generates a list of technical keywords from a job description. Return output as purely a string and nothing else" },
            { role: "user", content: `Given this job description: "${jobDescription}", please generate a list of solely technical keywords that are important for applicants to this job to have on their resume.
            *NOTE: Make sure to only include technical coding related skills/langauges/frameworks that actually need to be on a resume.` }
        ],
    });
    const response = JSON.stringify(completion.choices[0].message.content);
    return response;

}