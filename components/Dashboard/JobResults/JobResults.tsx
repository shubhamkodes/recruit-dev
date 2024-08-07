import React, { useState } from "react";
import {
  candidateSelectionState,
  educationLevelFilters,
  jobTypeFilters,
  locationFilters,
  locationTypeFilters,
  payFilters,
} from "./Filters";
import { FacetedFilter } from "@components/ui/FacetedFilter";
import { Button } from "@components/ui/Button";
import { ChevronRightIcon } from "@heroicons/react/20/solid";
import { CrossCircledIcon } from "@radix-ui/react-icons";
import CandidateCard from "../Components/CandidateCard";
import { candidates } from "./FakeProfileData";

const JobResults = () => {
  const [selectedPayFilters, setSelectedPayFilters] = useState<Set<string>>(
    new Set()
  );
  const [selectedJobTypeFilters, setSelectedJobTypeFilters] = useState<
    Set<string>
  >(new Set());
  const [selectedEducationLevelFilters, setSelectedEducationLevelFilters] =
    useState<Set<string>>(new Set());
  const [selectedLocationFilters, setSelectedLocationFilters] = useState<
    Set<string>
  >(new Set());
  const [selectedLocationTypeFilters, setSelectedLocationTypeFilters] =
    useState<Set<string>>(new Set());
  const [selectedCandidateSelectionState, setSelectedCandidateSelectionState] =
    useState<Set<string>>(new Set());

  const clearAllFilters = () => {
    setSelectedPayFilters(new Set());
    setSelectedJobTypeFilters(new Set());
    setSelectedEducationLevelFilters(new Set());
    setSelectedLocationFilters(new Set());
    setSelectedLocationTypeFilters(new Set());
    setSelectedCandidateSelectionState(new Set());
  };

  const anyFilterSelected = [
    selectedPayFilters,
    selectedJobTypeFilters,
    selectedEducationLevelFilters,
    selectedLocationFilters,
    selectedLocationTypeFilters,
    selectedCandidateSelectionState,
  ].some((filterSet) => filterSet.size > 0);

  return (
    <div className="px-16 py-2">
      <div className="flex justify-between items-center">
        <div>
          <div className="font-bold">Job ID: 123</div>
          <div className="text">Python Developer Profile</div>
        </div>
        <div>
          <Button className="bg-clear shadow-md text-primary text-base hover:bg-secondary space-x-2">
            <span>View all shortlisted profiles</span>
            <ChevronRightIcon className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-8">
        <FacetedFilter
          options={payFilters}
          title="Pay"
          selectedValues={selectedPayFilters}
          onChange={setSelectedPayFilters}
        />
        <FacetedFilter
          options={jobTypeFilters}
          title="Job Type"
          selectedValues={selectedJobTypeFilters}
          onChange={setSelectedJobTypeFilters}
        />
        <FacetedFilter
          options={educationLevelFilters}
          title="Education Level"
          selectedValues={selectedEducationLevelFilters}
          onChange={setSelectedEducationLevelFilters}
        />
        <FacetedFilter
          options={locationFilters}
          title="Locations"
          selectedValues={selectedLocationFilters}
          onChange={setSelectedLocationFilters}
        />
        <FacetedFilter
          options={locationTypeFilters}
          title="Location Type"
          selectedValues={selectedLocationTypeFilters}
          onChange={setSelectedLocationTypeFilters}
        />
        <FacetedFilter
          options={candidateSelectionState}
          title="Candidate State"
          selectedValues={selectedCandidateSelectionState}
          onChange={setSelectedCandidateSelectionState}
        />

        {anyFilterSelected && (
          <Button
            onClick={clearAllFilters}
            className="bg-clear shadow-md text-primary text-base hover:bg-secondary py-6 flex items-center  space-x-2"
          >
            <CrossCircledIcon className="w-6 h-6" />
            <span>Clear All Filters</span>
          </Button>
        )}
      </div>

      <div className="py-4">
        {candidates.map((candidate, index) => (
          <CandidateCard key={index} {...candidate} />
        ))}
      </div>
    </div>
  );
};

export default JobResults;
