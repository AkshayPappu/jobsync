import React, { useState, ReactNode } from "react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void; // Callback for form submission
}

const UploadModal: React.FC<UploadModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("Please upload a file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    onSubmit(formData);
    onClose();
  };

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
        <div className="border-b dark:border-gray-700 px-4 py-2 font-semibold text-lg">
          Upload Resume
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-4 space-y-6">
          {/* File upload */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Attach file
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full cursor-pointer rounded-lg border-[1.5px] border-stroke bg-transparent outline-none file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke file:bg-whiter file:px-5 file:py-3 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:file:border-form-strokedark dark:file:bg-white/30 dark:file:text-white dark:focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end border-t dark:border-gray-700 px-4 py-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-white bg-red-500 rounded hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm text-white bg-blue-500 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadModal;