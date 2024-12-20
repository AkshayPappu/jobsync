import React, { ReactNode } from "react";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName?: string;
  score?: string;
  fulfilledKeywords?: string;
  missingKeywords?: string;
  children?: ReactNode;
}

const ResumeModal: React.FC<ResumeModalProps> = ({
  isOpen,
  onClose,
  fileName,
  score,
  fulfilledKeywords,
  missingKeywords,
  children,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 dark:bg-gray-800 dark:bg-opacity-80"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-boxdark dark:text-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3"
        onClick={(e) => e.stopPropagation()} // Prevent click from closing modal
      >
        {/* Header */}
        {fileName && (
          <div className="border-b dark:border-gray-700 px-4 py-2 font-semibold text-lg">
            {fileName.split("/").pop()}
          </div>
        )}

        {/* Content */}
        <div className="p-4 space-y-4">
          {score && (
            <div>
              <strong>Score:</strong> {score}
            </div>
          )}
          {fulfilledKeywords && (
            <div>
              <strong>Fulfilled Keywords:</strong> {fulfilledKeywords}
            </div>
          )}
          {missingKeywords && (
            <div>
              <strong>Missing Keywords:</strong> {missingKeywords}
            </div>
          )}
          {children && <div>{children}</div>}
        </div>

        {/* Footer */}
        <div className="flex justify-end border-t dark:border-gray-700 px-4 py-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
