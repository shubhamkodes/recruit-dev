import React from "react";

interface ButtonProps {
  isShortlisted: boolean;
  isRejected: boolean;
  onShortlist: () => void;
  onReject: () => void;
}

const ShortlistButton: React.FC<ButtonProps> = ({
  isShortlisted,
  isRejected,
  onShortlist,
  onReject,
}) => {
  return (
    <div className="flex space-x-4">
      {/* Reject Button */}
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

      {/* Shortlist Button */}
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
    </div>
  );
};

export default ShortlistButton;
