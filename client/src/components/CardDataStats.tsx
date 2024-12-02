import React, { useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { FaExpand } from "react-icons/fa";
import ResumeModal from "./ResumeModal/ResumeModal";

interface CardDataStatsProps {
  fileName: string;
  score: string;
  fulfilled_keywords: string;
  missing_keywords: string;
}

const CardDataStats: React.FC<CardDataStatsProps> = ({
  fileName,
  score,
  fulfilled_keywords,
  missing_keywords,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleDeleteClicked = () => {
    console.log("Delete clicked");
  };

  return (
    <div className="flex flex-col rounded-sm border border-stroke bg-white p-5 shadow-default dark:border-strokedark dark:bg-boxdark">
      {/* Top Section */}
      <div className="flex flex-col mb-4">
        <h4 className="text-lg font-bold text-black dark:text-white mb-2">
          Score: {score}
        </h4>
        <a
          href={fileName}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-medium text-blue-500 hover:underline break-all"
        >
          {fileName.split("/").pop()}
        </a>
      </div>

      {/* Keywords Section */}
      <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
        <p>
          <strong>Fulfilled Keywords:</strong> {fulfilled_keywords}
        </p>
        <p>
          <strong>Missing Keywords:</strong> {missing_keywords}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-start space-x-4">
        <button
          onClick={() => setIsModalOpen(true)}
          className="text-gray-600 dark:text-white hover:text-gray-800 dark:hover:text-gray-300"
          title="Expand"
        >
          <FaExpand />
        </button>
        <button
          className="text-blue-500 hover:text-blue-700"
          title="Edit"
        >
          <FaRegEdit />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          title="Delete"
        >
          <FaRegTrashCan onClick={() => handleDeleteClicked()} />
        </button>
      </div>

      {/* Modal */}
      <ResumeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        fileName={fileName}
        score={score}
        fulfilledKeywords={fulfilled_keywords}
        missingKeywords={missing_keywords}
      >
        <p>
          This resume scored highly due to strong technical skills and relevant
          industry experience. Consider improving by adding Kubernetes and
          GraphQL expertise.
        </p>
      </ResumeModal>
    </div>
  );
};

export default CardDataStats;
