"use client";

import dynamic from "next/dynamic";
import React from "react";
import ChartOne from "../Charts/ChartOne";
import ChartTwo from "../Charts/ChartTwo";
import ChatCard from "../Chat/ChatCard";
import TableOne from "../Tables/TableOne";
import CardDataStats from "../CardDataStats";
import JobDescriptionCard from "../JobDescriptionCard";
import { Job } from "@/types/job";

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
  return (
    <>
      {job && (
        <div className="w-full">
          <JobDescriptionCard title={job.title} description={job.description} />
        </div>
      )}
      <div className="text-center mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats fileName="resume.pdf" score="95" />
        <div className="flex flex-col items-center justify-center h-full rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default hover:shadow-lg hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:hover:bg-gray-800">
          <h1 className="text-md font-bold text-black dark:text-white text-center">
            Upload New Resume
          </h1>
        </div>
      </div>
    </>
  );
};

export default ECommerce;