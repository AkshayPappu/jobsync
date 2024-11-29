import React, { ReactNode, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaExpand } from "react-icons/fa";
import ResumeModal from "./ResumeModal/ResumeModal";



interface CardDataStatsProps {
  fileName: string;
  score: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  fileName,
  score,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="flex-col rounded-sm border border-stroke bg-white px-7.5 py-6 shadow-default dark:border-strokedark dark:bg-boxdark">

      <div className="mt-4 flex items-end justify-between">
        <div>
          <h4 className="text-fileName-md font-bold text-black dark:text-white">
            {score}
          </h4>
          <span className="text-sm font-medium">{fileName}</span>
        </div>

        <span
          className={`flex items-center gap-1 text-sm font-medium`}>
          {
            <div className="flex space-x-4">
              <button onClick={() => setIsModalOpen(true)}>
                <FaExpand className="text-black dark:text-white" />
              </button>
              <FaRegEdit className="text-blue-500" />
              <FaRegTrashCan className="text-red-500" />
              <ResumeModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                fileName="Jane_Doe_Resume.pdf"
                score="92%"
                fulfilledKeywords="React, TypeScript, AWS, Docker"
                missingKeywords="Kubernetes, GraphQL"
              >
                <p>
                  This resume scored highly due to strong technical skills and relevant
                  industry experience. Consider improving by adding Kubernetes and
                  GraphQL expertise.
                </p>
              </ResumeModal>
            </div>
            }
        </span>
      </div>
    </div>
  );
};

export default CardDataStats;
