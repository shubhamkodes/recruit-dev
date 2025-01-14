import React from "react";

interface ButtonProps {
  isShortlisted: boolean;
  isRejected: boolean;
  onShortlist: () => void;
  onReject: () => void;
  onDownloadCV: () => void;
  onScheduleInterview: () => void;
}

const ShortlistButton: React.FC<ButtonProps> = ({
  isShortlisted,
  isRejected,
  onShortlist,
  onReject,
  onDownloadCV,
  onScheduleInterview,
}) => {
  return (
    <div className="flex space-x-4">
      {isShortlisted ? (
        // If shortlisted, only show the "Download CV" & "Schedule" button
        <div className="flex justify-between w-full px-4">
          <button
            onClick={onDownloadCV}
            className="px-4 py-2 rounded border-2 bg-transparent text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
          >
            Download CV
          </button>
          <button
            onClick={onScheduleInterview}
            className="px-4 py-2 rounded bg-primary text-white hover:bg-primary-dark transition-colors duration-200"
          >
            Schedule Interview
          </button>
        </div>
      ) : (
        // Otherwise, show Shortlist and Reject buttons
        <>
          <button
            onClick={onReject}
            disabled={!isShortlisted && isRejected} // Disable only if isRejected is true and isShortlisted is false
            className={`px-4 py-2 rounded border-2 ${
              !isShortlisted && isRejected
                ? "opacity-50 cursor-not-allowed bg-transparent text-gray-400 border-gray-400"
                : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
            }`}
          >
            {isRejected ? "Rejected" : "Reject"}
          </button>

          <button
            onClick={onShortlist}
            disabled={!isRejected && isShortlisted} // Disable only if isShortlisted is true and isRejected is false
            className={`px-4 py-2 rounded border-2 ${
              !isRejected && isShortlisted
                ? "opacity-50 cursor-not-allowed bg-transparent text-gray-400 border-gray-400"
                : "bg-transparent text-primary border-primary hover:bg-primary hover:text-white transition-colors duration-200"
            }`}
          >
            {isShortlisted ? "Shortlisted" : "Shortlist"}
          </button>
        </>
      )}
    </div>
  );
};

export default ShortlistButton;
