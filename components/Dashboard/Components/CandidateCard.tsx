import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import ShortlistButton from "../JobResults/ShortlistButton";
import {
  Candidate,
  CandidateStatus,
  isRejected,
  isShortlisted,
} from "@app/api/model/Candidate";

export interface CandidateProps {
  candidate: Candidate;
  onUpdateStatus?: (status: CandidateStatus) => void;
  onSelect?: (selected: boolean) => void;
}

const CandidateCard: React.FC<CandidateProps> = ({
  candidate,
  onUpdateStatus,
  onSelect,
}) => {
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isSelected, setIsSelected] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const handleSelect = () => {
    const newValue = !isSelected;
    setIsSelected(newValue);
    if (onSelect) {
      onSelect(newValue);
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
    <div className="shadow-xl rounded-lg mt-12 mb-6 p-4">
      <div className="flex flex-row justify-between items-center">
        <div className="flex items-start">
          <h2 className="text-xl font-bold mb-2">{candidate.candidate.name}</h2>
          <span className="ml-2 bg-green-100 text-green-800 text-xs font-bold px-2.5 py-1.5 rounded-full">
            {candidate.candidate.score}
          </span>
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
      {!isCollapsed && (
        <>
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
        </>
      )}

      <div>
        <ShortlistButton
          isShortlisted={isShortlisted(candidate)}
          isRejected={isRejected(candidate)}
          onShortlist={handleShortlist}
          onReject={handleReject}
        />
      </div>
    </div>
  );
};

export default CandidateCard;
