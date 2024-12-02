"use client";

import dynamic from "next/dynamic";
import React, { useState, useEffect } from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import JobDescriptionCard from "../JobDescriptionCard";
import { Job } from "@/types/job";
import { Resume } from "@/types/resume";
import UploadModal from "../UploadModal/UploadModal";

interface ECommerceProps {
  job: Job | null;
}

const MapOne = dynamic(() => import("@/components/Maps/MapOne"), {
  ssr: false,
});

const ChartThree = dynamic(() => import("@/components/Charts/ChartThree"), {
  ssr: false,
});

const ECommerce = ({ job }: ECommerceProps) => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  useEffect(() => {
    const fetchResumes = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/resumes/${job?.id}`
        );
        const data = await res.json();
        // for each resume, convert data into Resume
        // for fulfilled_keywords and missing_keywords, convert them into string they are currently in this format {"Python","Java","React","Node.js"} I want "Python, Java, React, Node.js"
        const transformedResumes: Resume[] = data.map((resume: any) => ({
          job_id: job?.id || "", // Use the job ID from props
          resume_id: resume.resume_id,
          file_url: resume.resume_file,
          rating: parseInt(resume.rating, 10), // Convert rating to a number
          fulfilled_keywords: resume.fulfilled_keywords
            .replace("{", "")
            .replace("}", "")
            .replace(/"/g, "")
            .replace(/,/g, ", "), // Clean up fulfilled_keywords
          missing_keywords: resume.missing_keywords
            .replace("{", "")
            .replace("}", "")
            .replace(/"/g, "")
            .replace(/,/g, ", "), // Clean up missing_keywords
          created_at: new Date(), // Set a default timestamp for created_at
        }));
  
        setResumes(transformedResumes);
      } catch (error) {
        console.log(`error is ${error}`);
      }
    };

    fetchResumes();
  }, [job]);

  return (
    <>
      {job && (
        <div className="w-full">
          <JobDescriptionCard title={job.title} description={job.description} />
        </div>
      )}
      <div className="text-center mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        {resumes.map((resume) => (
            <CardDataStats
              key={resume.resume_id}
              fileName={resume.file_url}
              score={resume.rating.toString()}
              fulfilled_keywords={resume.fulfilled_keywords}
              missing_keywords={resume.missing_keywords}
            />
        ))}
        <div 
          className="flex flex-col items-center justify-center h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default hover:shadow-lg hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-800"
          onClick={() => setIsUploadOpen(true)}
        >
          <h1 className="text-md font-bold text-black dark:text-white text-center">
            Upload New Resume
          </h1>
        </div>
      </div>
      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadOpen}
        onClose={() => setIsUploadOpen(false)}
        onSubmit={(formData) => {
          console.log("Form data:", formData);
        }}
      />
    </>
  );
};

export default ECommerce;