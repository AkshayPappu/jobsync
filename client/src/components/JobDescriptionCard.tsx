import React from "react";

interface JobDescriptionCardProps {
  title: string;
  description: string;
}

const JobDescriptionCard: React.FC<JobDescriptionCardProps> = ({
  title,
  description
}) => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark w-full">
      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-title-md font-bold text-black dark:text-white text-center">
            {title}
          </h4>
          <div
            className="text-md font-medium max-h-100 overflow-y-auto"
          >
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDescriptionCard;
