"use client"; 

import React, { useState, useEffect } from "react";
import ECommerce from "@/components/Dashboard/E-commerce";
import DefaultLayout from "../../../components/Layouts/DefaultLayout";
import { Job } from "@/types/job";

export default function JobPage({ params }: { params: { id: string } }) {
    const [job, setJob] = useState<Job | null>(null);
    
    useEffect(() => {    
        // make api call and get jobs from server and iterate through and add to jobs 
        const fetchJobs = async () => {
          try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/job/${params.id}`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
            });
            let data = await res.json();
            data = data[0];

            // convert data into Job
            const retreivedJob: Job = {
              id: data.job_id,
              title: data.title,
              description: data.description,
              created_at: data.created_at,
              user_id: data.user_id,
            };

            setJob(retreivedJob);
            console.log(retreivedJob);
          } catch (error) {
            console.log(`error is ${error}`);
          }
        }
    
        fetchJobs();
      }, []);


    return (
        <DefaultLayout>
            {job ? (
            <ECommerce job={job} />
            ) : (
            <p>Loading job details...</p>
            )}
        </DefaultLayout>
    );
  }  
