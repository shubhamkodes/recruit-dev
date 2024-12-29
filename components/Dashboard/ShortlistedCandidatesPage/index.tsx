// data.ts

import { Button } from "@components/ui/Button";
import CandidateCard, { CandidateProps } from "../Components/CandidateCard";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Candidate, CandidateStatus } from "@app/api/model/Candidate";
import CandidateViewModel from "@app/api/viewmodel/CandidateViewModel";
import { JobDetailResponse } from "@app/api/model/JobResponse";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import JobDetailCard from "../JobResults/JobDetailCard";
const ShortlistedCandidatesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id: string | undefined = searchParams.get("id") ?? undefined; // Extract id from query parameters
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Explicitly define type
  const [selectedCandidates, setSelectedCandidates] = useState<number[]>([]); // Store indices of selected candidates

  const fetchJobCandidates = async (jobId: number) => {
    try {
      await CandidateViewModel.loadCandidates(
        jobId,
        CandidateStatus.SHORTLISTED
      );
      const loadedCandidates = CandidateViewModel.getCandidates();
      setCandidates(loadedCandidates);
    } catch (error) {
      console.error("Failed to fetch job candidates:", error);
    }
  };

  const [jobDetail, setJobDetail] = useState<JobDetailResponse>();

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
  useEffect(() => {
    if (id) {
      const jobId = parseInt(id, 10); // Convert id to number
      if (!isNaN(jobId)) {
        fetchJobCandidates(jobId);
        fetchJobDetail(jobId); // Fetch details if id is valid
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

  const handleShortlist = () => {
    const shortlistedCandidates = selectedCandidates.map(
      (index) => candidates[index]
    );
    console.log("Shortlisted Candidates:", shortlistedCandidates);

    // Perform any action with the shortlisted candidates (e.g., send to API)
  };

  const handleSelect = (index: number, selected: boolean) => {
    setSelectedCandidates((prev) => {
      if (selected) {
        return [...prev, index]; // Add candidate index
      } else {
        return prev.filter((i) => i !== index); // Remove candidate index
      }
    });
  };

  const handleSelectAll = (selected: boolean) => {
    if (selected) {
      setSelectedCandidates(candidates.map((_, index) => index)); // Select all indices
    } else {
      setSelectedCandidates([]); // Clear selection
    }
  };

  const scheduleInterviews = () => {
    // alert(`Scheduling interviews for ${selectedCandidates.size} candidates`);
  };

  return (
    <div className="relative p-4 px-16">
      <div className="flex justify-between items-center">
        <div>
          {jobDetail?.data ? (
            <JobDetailCard job={jobDetail.data} />
          ) : (
            <div>Loading...</div>
          )}
        </div>
        <div>
          <div className="flex items-center mr-4">
            <input
              type="checkbox"
              checked={selectedCandidates.length === candidates.length}
              onChange={(e) => handleSelectAll(e.target.checked)}
              className="mr-2 h-4 w-4 border border-primary rounded-sm bg-white checked:bg-primary checked:border-transparent focus:outline-none"
            />
            <p>Select All</p>
          </div>
        </div>
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
              onSelect={(selected) => {
                handleSelect(candidate.candidate_id, selected);
              }}
            />
          ))
        ) : (
          <p>No candidates available</p>
        )}
      </div>

      <Link
        href={`/dashboard/shortlisted-candidates/interview-schedule?candidateId=${selectedCandidates.join(
          ","
        )}&jobId=${id}`}
        passHref
      >
        <button
          className={`fixed bottom-4 right-4 px-16 py-4 rounded-md shadow-lg text-lg ${
            selectedCandidates.length > 0
              ? "bg-primary text-white"
              : "bg-gray-400 text-gray-200 cursor-not-allowed"
          }`}
          disabled={selectedCandidates.length === 0}
        >
          Schedule Interview
          {selectedCandidates.length > 0 && ` (${selectedCandidates.length})`}
        </button>
      </Link>
    </div>
  );
};

export default ShortlistedCandidatesPage;
