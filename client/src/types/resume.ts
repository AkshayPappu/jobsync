// resume type with job_id, resume_id, file_url, rating, fulfilled_keywords, missing_keywords, created_at
export interface Resume {
    job_id: string;
    resume_id: string;
    file_url: string;
    rating: number;
    fulfilled_keywords: string;
    missing_keywords: string;
    created_at: Date;
}