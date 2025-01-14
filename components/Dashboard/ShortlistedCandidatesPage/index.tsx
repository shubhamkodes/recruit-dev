// data.ts

import { Button } from "@components/ui/Button";
import CandidateCard, { CandidateProps } from "../Components/CandidateCard";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Candidate, CandidateStatus } from "@app/api/model/Candidate";
import CandidateViewModel from "@app/api/viewmodel/CandidateViewModel";
import { JobDetailResponse } from "@app/api/model/JobResponse";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import JobDetailCard from "../JobResults/JobDetailCard";
import EmptyState from "@components/Common/EmptyStateBox";
const ShortlistedCandidatesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
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
      setSelectedCandidates(
        candidates.map((candidate, index) => candidate.candidate_id)
      ); // Select all indices
    } else {
      setSelectedCandidates([]); // Clear selection
    }
  };

  const scheduleInterviews = () => {
    // alert(`Scheduling interviews for ${selectedCandidates.size} candidates`);
  };

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
      </div>

      {/* Right Panel - Candidates Listing */}
      <div className="col-span-3 md:col-span-3">
        <div className="flex items-center justify-end">
          <input
            type="checkbox"
            checked={
              Array.isArray(selectedCandidates) &&
              Array.isArray(candidates) &&
              selectedCandidates.length === candidates.length
            }
            onChange={(e) => handleSelectAll(e.target.checked)}
            className="w-5 h-5 cursor-pointer"
          />
          <p className="pl-2">Select All</p>
        </div>

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
              isSelected={selectedCandidates.includes(candidate.candidate_id)}
              onScheduleInterview={() => {
                router.push(
                  `/dashboard/shortlisted-candidates/interview-shedule?candidateId=${candidate.candidate_id}&jobId=${id}`
                );
              }}
            />
          ))
        ) : (
          <EmptyState
            message="No Candidates Shortlisted"
            description="Start by shortlisting candidates to view them here."
          />
        )}
      </div>
      {selectedCandidates.length > 0 && (
        <Link
          href={`/dashboard/shortlisted-candidates/interview-shedule?candidateId=${selectedCandidates.join(
            ","
          )}&jobId=${id}`}
        >
          <button className="fixed bottom-4 right-4 px-16 py-4 rounded-md shadow-lg text-lg bg-primary text-white">
            Schedule Interview ({selectedCandidates.length})
          </button>
        </Link>
      )}
    </div>
  );
};

export default ShortlistedCandidatesPage;
