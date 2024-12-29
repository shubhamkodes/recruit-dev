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
import Link from "next/link";
import CandidateViewModel from "@app/api/viewmodel/CandidateViewModel";
import { useState } from "react";
import {
  CandidatesResponse,
  Candidate,
  CandidateStatus,
} from "@app/api/model/Candidate";
import { useSearchParams } from "next/navigation";
import { useEffect as useEffecty } from "react";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import { JobDetailResponse } from "@app/api/model/JobResponse";
import JobDetailCard from "./JobDetailCard";

const JobResults = () => {
  const searchParams = useSearchParams();
  const id: string | undefined = searchParams.get("id") ?? undefined; // Extract id from query parameters
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Explicitly define type
  const [jobDetail, setJobDetail] = useState<JobDetailResponse>();
  const fetchJobCandidates = async (jobId: number) => {
    try {
      await CandidateViewModel.loadCandidates(jobId, CandidateStatus.OPEN);
      const loadedCandidates = CandidateViewModel.getCandidates();
      setCandidates(loadedCandidates);
    } catch (error) {
      console.error("Failed to fetch job candidates:", error);
    }
  };

  const fetchJobDetail = async (jobId: number) => {
    try {
      const jobDetailResponse = await JobViewModel.getJobDetail(
        jobId.toString()
      );
      setJobDetail(jobDetailResponse);
    } catch (error) {
      console.error("Failed to fetch job candidates:", error);
    }
  };

  // Ensure fetchJobDetail is called only once when `id` changes
  useEffecty(() => {
    if (id) {
      const jobId = parseInt(id, 10); // Convert id to number
      if (!isNaN(jobId)) {
        fetchJobCandidates(jobId); // Fetch details if id is valid
        fetchJobDetail(jobId);
      } else {
        console.error("Invalid jobId:", id);
      }
    }
  }, [id]);

  const handleUpdateStatus = async (
    candidateId: number,
    status: CandidateStatus
  ) => {
    try {
      await CandidateViewModel.updateCandidateStatus(candidateId, status);
      console.log(`Candidate ${candidateId} status updated to ${status}`);

      // Refresh the UI with updated data
      if (id) {
        const jobId = parseInt(id, 10);
        if (!isNaN(jobId)) {
          fetchJobDetail(jobId); // Fetch updated candidates after status update
        }
      }
    } catch (error) {
      console.error(`Error updating candidate ${candidateId} status:`, error);
    }
  };

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
          {jobDetail?.data ? (
            <JobDetailCard job={jobDetail.data} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <Button className="bg-clear shadow-md text-primary text-base hover:bg-secondary space-x-2">
            <span>
              <Link href={`/dashboard/shortlisted-candidates?id=${id}`}>
                View all shortlisted profiles
              </Link>
            </span>
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
        {Array.isArray(candidates) && candidates.length > 0 ? (
          candidates.map((candidate) => (
            <CandidateCard
              key={candidate.candidate_id}
              candidate={candidate}
              onUpdateStatus={(status) =>
                handleUpdateStatus(candidate.candidate_id, status)
              }
              onSelect={(selected) =>
                console.log(`Selected ${candidate.candidate.name}: ${selected}`)
              }
            />
          ))
        ) : (
          <p>No candidates available</p>
        )}
      </div>
    </div>
  );
};

export default JobResults;
function useEffect(arg0: () => void, arg1: (string | string[] | undefined)[]) {
  throw new Error("Function not implemented.");
}
