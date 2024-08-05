import { ChevronDownIcon, ChevronUpIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import ShortlistButton from "../JobResults/ShortlistButton";

export interface CandidateProps {
  name: string;
  experience: string;
  education: string;
  projects: string[];
  contactInfo: {
    email: string;
    phone: string;
    linkedin: string;
  };
  summary: string;
  technicalSkills: string[];
  professionalExperience: {
    role: string;
    company: string;
    duration: string;
    responsibilities: string[];
  }[];
  certifications: string[];
  showSelect?: boolean;
  isShortlisted?: boolean;
  isRejected?: boolean;
  onShortlist?: () => void;
  onSelect?: (selected: boolean) => void;
}

const CandidateCard: React.FC<CandidateProps> = ({
  name,
  experience,
  education,
  projects,
  contactInfo,
  summary,
  technicalSkills,
  professionalExperience,
  certifications,
  showSelect = false,
  isShortlisted = false,
  isRejected = false,
  onShortlist,
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

  return (
    <div className="shadow-lg rounded-lg p-6 mb-6 container">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold mb-2">{name}</h2>

        <div className="flex flex-nowrap items-center">
          {showSelect && (
            <div className="flex items-center mr-4">
              <input
                type="checkbox"
                checked={isSelected}
                onChange={handleSelect}
                className="mr-2 h-4 w-4 border border-primary rounded-sm bg-white checked:bg-primary checked:border-transparent focus:outline-none"
              />
              <p>Select</p>
            </div>
          )}
          <button
            onClick={toggleCollapse}
            className="text-blue-500 flex items-center"
          >
            {isCollapsed ? <ChevronDownIcon /> : <ChevronUpIcon />}
          </button>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{experience}</p>
      <div className="mb-4">
        <h3 className="font-semibold">Education</h3>
        <p>{education}</p>
      </div>
      <div className="mb-4">
        <h3 className="font-semibold">Projects</h3>
        <ul className="list-disc ml-5">
          {projects.map((project, index) => (
            <li key={index}>{project}</li>
          ))}
        </ul>
      </div>
      {!isCollapsed && (
        <>
          <div className="mb-4">
            <h3 className="font-semibold">Contact Information</h3>
            <p>Email: {contactInfo.email}</p>
            <p>Phone: {contactInfo.phone}</p>
            <p>LinkedIn: {contactInfo.linkedin}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Summary</h3>
            <p>{summary}</p>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Technical Skills</h3>
            <ul className="list-disc ml-5">
              {technicalSkills.map((skill, index) => (
                <li key={index}>{skill}</li>
              ))}
            </ul>
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Professional Experience</h3>
            {professionalExperience.map((experience, index) => (
              <div key={index} className="mb-2">
                <p className="font-semibold">
                  {experience.role} at {experience.company}
                </p>
                <p>{experience.duration}</p>
                <ul className="list-disc ml-5">
                  {experience.responsibilities.map((resp, i) => (
                    <li key={i}>{resp}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="mb-4">
            <h3 className="font-semibold">Certifications</h3>
            <ul className="list-disc ml-5">
              {certifications.map((cert, index) => (
                <li key={index}>{cert}</li>
              ))}
            </ul>
          </div>
        </>
      )}

      <div>
        {!showSelect && (
          <ShortlistButton
            isShortlisted={isShortlisted}
            isRejected={isRejected}
            onClick={onShortlist || (() => {})}
          />
        )}
      </div>
    </div>
  );
};

export default CandidateCard;
