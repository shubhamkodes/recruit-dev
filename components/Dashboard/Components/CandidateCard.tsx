import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import ShortlistButton from "../JobResults/ShortlistButton";
import {
  Candidate,
  CandidateStatus,
  isRejected,
  isShortlisted,
} from "@app/api/model/Candidate";
import { AnimatePresence, motion } from "framer-motion";

export interface CandidateProps {
  candidate: Candidate;
  onUpdateStatus?: (status: CandidateStatus) => void;
  onSelect?: (selected: boolean) => void;
  isSelected?: Boolean;
  onScheduleInterview?: () => void;
}

const CandidateCard: React.FC<CandidateProps> = ({
  candidate,
  onUpdateStatus,
  onSelect,
  isSelected,
  onScheduleInterview,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSelect = () => {
    if (onSelect) {
      onSelect(!isSelected);
    }
  };

  const handleShortlist = () => {
    if (onUpdateStatus) {
      onUpdateStatus(CandidateStatus.SHORTLISTED);
    }
  };

  const handleReject = () => {
    if (onUpdateStatus) {
      onUpdateStatus(CandidateStatus.REJECTED);
    }
  };
  return (
    <div className="shadow-lg rounded-lg mt-12 mb-6 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-center w-full">
          <div className="flex items-start justify-between">
            <h2 className="text-xl font-bold mb-2">
              {candidate.candidate.name}
            </h2>
            <span className="bg-green-100 text-green-800 text-sm font-bold px-2.5 py-1.5 rounded-full ml-3 flex items-center">
              <img
                src="/ic_certified.svg" // Replace this with your image path
                alt="Icon"
                className="w-5 h-5 mr-2" // Adjust width, height, and margin as needed
              />
              {candidate.candidate.score} / 10
            </span>
          </div>
          <div className="ml-4 flex-grow text-right px-3">
            {onSelect && (
              <input
                type="checkbox"
                className="w-5 h-5 cursor-pointer"
                onChange={handleSelect}
                checked={isSelected ? true : false}
              />
            )}
          </div>
        </div>

        <button
          onClick={toggleCollapse}
          className="text-blue-500 flex items-center"
        >
          {isCollapsed ? (
            <ChevronDownIcon className="h-6 w-6" />
          ) : (
            <ChevronUpIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div className="mb-4">
        <p>Experience: {candidate.candidate.experience}</p>
        <p>Current Location: {candidate.candidate.current_location}</p>
        <p>Current Employment: {candidate.candidate.current_employment}</p>
      </div>

      <AnimatePresence>
        {!isCollapsed && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mb-4">
              <h3 className="font-semibold">Education</h3>
              <p>{candidate.candidate.education}</p>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Key Skills</h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(
                  candidate.candidate.key_skills.replace(/'/g, '"')
                ).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <h3 className="font-semibold">Additional Skills</h3>
              <div className="flex flex-wrap gap-2">
                {JSON.parse(
                  candidate.candidate.additional_skills.replace(/'/g, '"')
                ).map((skill: string, index: number) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-sm px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <ShortlistButton
          isShortlisted={isShortlisted(candidate)}
          isRejected={isRejected(candidate)}
          onShortlist={handleShortlist}
          onReject={handleReject}
          onDownloadCV={() => {}}
          onScheduleInterview={() => {
            onScheduleInterview?.();
          }}
        />
      </div>
    </div>
  );
};

export default CandidateCard;
