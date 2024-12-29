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
import { JobDetailResponse, JobStatus } from "@app/api/model/JobResponse";
import JobDetailCard from "./JobDetailCard";
import EmptyState from "@components/Common/EmptyStateBox";

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

  // Dynamic Empty State Messages based on Job Status
  const getEmptyStateMessage = (status?: JobStatus) => {
    switch (status) {
      case JobStatus.FAILED:
        return {
          message: "Oops! Failed",
          description:
            "The search encountered an issue and could not be processed successfully.",
        };
      case JobStatus.PENDING:
        return {
          message: "Job Processing in progress",
          description:
            "The job is still being processed. Please check back later.",
        };
      case JobStatus.SUCCESS:
        return {
          message: "No Candidates Found",
          description: "Start by new job search.",
        };
      default:
        return {
          message: "In Progress",
          description: "Please wait for sometime or refresh...",
        };
    }
  };

  const emptyStateMessage = getEmptyStateMessage(jobDetail?.data?.status);

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
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 px-4 md:px-8 py-4">
      {/* Left Panel - Job Detail */}
      <div className="col-span-1 md:col-span-1  border-gray-200 pr-4 w-100">
        {/* Use w-64 or adjust based on desired width */}
        <div className="mb-4">
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

      {/* Right Panel - Candidates Listing */}
      <div className="col-span-3 md:col-span-3">
        {/* Filter Section */}
        {/* <div className="flex flex-wrap gap-4 mb-6">
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
              className="bg-clear shadow-md text-primary text-base hover:bg-secondary py-2 flex items-center space-x-2"
            >
              <CrossCircledIcon className="w-6 h-6" />
              <span>Clear All Filters</span>
            </Button>
          )}
        </div> */}

        {/* Candidates Section */}
        <div>
          {Array.isArray(candidates) && candidates.length > 0 ? (
            candidates.map((candidate) => (
              <CandidateCard
                key={candidate.candidate_id}
                candidate={candidate}
                onUpdateStatus={(status) =>
                  handleUpdateStatus(candidate.candidate_id, status)
                }
              />
            ))
          ) : (
            <EmptyState
              message={emptyStateMessage.message}
              description={emptyStateMessage.description}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default JobResults;
