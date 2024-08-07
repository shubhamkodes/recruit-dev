// data.ts

import { Button } from "@components/ui/Button";
import CandidateCard, { CandidateProps } from "../Components/CandidateCard";
import React, { useState } from "react";

const generateFakeData = (): CandidateProps[] => {
  return Array.from({ length: 5 }, (_, index) => ({
    name: `John Doe ${index + 1}`,
    experience: `${5 + index} years - Company ${index + 1}`,
    education: `Bachelor of Science in Computer Science`,
    projects: [
      `Project ${index + 1}: Description of project ${index + 1}.`,
      `Project ${index + 1}: Another description of project ${index + 1}.`,
    ],
    contactInfo: {
      email: `john.doe${index + 1}@example.com`,
      phone: `123-456-78${90 + index}`,
      linkedin: `linkedin.com/in/johndoe${index + 1}`,
    },
    summary: `A dedicated professional with experience in developing large-scale applications.`,
    technicalSkills: ["JavaScript", "React", "Node.js", "Python"],
    professionalExperience: [
      {
        role: "Software Engineer",
        company: `Company ${index + 1}`,
        duration: `${2 + index} years`,
        responsibilities: ["Developed...", "Implemented..."],
      },
    ],
    certifications: ["Certified Kubernetes Administrator"],
  }));
};

const ShortlistedCandidatesPage: React.FC = () => {
  const [candidates, setCandidates] = useState<CandidateProps[]>(
    generateFakeData()
  );
  const [selectedCandidates, setSelectedCandidates] = useState<Set<number>>(
    new Set()
  );

  const handleShortlist = (index: number) => {
    const newCandidates = [...candidates];
    newCandidates[index].isShortlisted = !newCandidates[index].isShortlisted;
    setCandidates(newCandidates);
  };

  const handleSelect = (index: number, selected: boolean) => {
    const newSelectedCandidates = new Set(selectedCandidates);
    if (selected) {
      newSelectedCandidates.add(index);
    } else {
      newSelectedCandidates.delete(index);
    }
    setSelectedCandidates(newSelectedCandidates);
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      const allCandidateIndices = candidates.map((_, index) => index);
      setSelectedCandidates(new Set(allCandidateIndices));
    } else {
      setSelectedCandidates(new Set());
    }
  };

  const scheduleInterviews = () => {
    alert(`Scheduling interviews for ${selectedCandidates.size} candidates`);
  };

  return (
    <div className="relative p-4 px-16">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold">Job ID: 123</div>
          <div className="text">Python Developer Profile</div>
        </div>
        <div>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCandidates.size === candidates.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="mr-2 h-4 w-4 border border-primary rounded-sm bg-white checked:bg-primary checked:border-transparent focus:outline-none"
            />
            <p>Select All</p>
          </div>
        </div>
      </div>

      {candidates.map((candidate, index) => (
        <CandidateCard
          key={index}
          {...candidate}
          showSelect={true}
          onShortlist={() => handleShortlist(index)}
          onSelect={(selected) => handleSelect(index, selected)}
          isShortlisted={selectedCandidates.has(index)}
        />
      ))}
      <button
        onClick={scheduleInterviews}
        className="fixed bottom-4 right-4 bg-primary text-white px-16 py-4 rounded-md shadow-lg text-lg"
      >
        Schedule Interview ({selectedCandidates.size})
      </button>
    </div>
  );
};

export default ShortlistedCandidatesPage;
