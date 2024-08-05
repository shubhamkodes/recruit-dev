import React from "react";

interface ButtonProps {
  isShortlisted: boolean;
  isRejected: boolean;
  onClick: () => void;
}

const ShortlistButton: React.FC<ButtonProps> = ({
  isShortlisted,
  isRejected,
  onClick,
}) => {
  return (
    <div className="flex space-x-4">
      <button
        onClick={onClick}
        className={`px-4 py-2 rounded border-2 ${
          !isRejected
            ? "bg-transparent text-primary border-primary"
            : "bg-primary text-white border-primary"
        } hover:bg-primary hover:text-white transition-colors duration-200`}
      >
        {isRejected ? "Rejected" : "Reject"}
      </button>

      <button
        onClick={onClick}
        className={`px-4 py-2 rounded border-2 ${
          isShortlisted
            ? "bg-primary text-white border-primary"
            : "bg-transparent text-primary border-primary"
        } hover:bg-primary hover:text-white transition-colors duration-200`}
      >
        {isShortlisted ? "Shortlisted" : "Shortlist"}
      </button>
    </div>
  );
};

export default ShortlistButton;
