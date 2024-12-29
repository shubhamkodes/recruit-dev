// data.ts

import { Button } from "@components/ui/Button";
import CandidateCard, { CandidateProps } from "../Components/CandidateCard";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Candidate, CandidateStatus } from "@app/api/model/Candidate";
import CandidateViewModel from "@app/api/viewmodel/CandidateViewModel";
const ShortlistedCandidatesPage: React.FC = () => {
  const searchParams = useSearchParams();
  const id: string | undefined = searchParams.get("id") ?? undefined; // Extract id from query parameters
  const [candidates, setCandidates] = useState<Candidate[]>([]); // Explicitly define type

  const fetchJobDetail = async (jobId: number) => {
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

  // Ensure fetchJobDetail is called only once when `id` changes
  useEffect(() => {
    if (id) {
      const jobId = parseInt(id, 10); // Convert id to number
      if (!isNaN(jobId)) {
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

  // const handleShortlist = (index: number) => {
  //   const newCandidates = [...candidates];
  //   newCandidates[index].isShortlisted = !newCandidates[index].isShortlisted;
  //   setCandidates(newCandidates);
  // };

  // const handleSelect = (index: number, selected: boolean) => {
  //   const newSelectedCandidates = new Set(selectedCandidates);
  //   if (selected) {
  //     newSelectedCandidates.add(index);
  //   } else {
  //     newSelectedCandidates.delete(index);
  //   }
  //   setSelectedCandidates(newSelectedCandidates);
  // };

  // const handleSelectAll = (selected: boolean) => {
  //   if (selected) {
  //     const allCandidateIndices = candidates.map((_, index) => index);
  //     setSelectedCandidates(new Set(allCandidateIndices));
  //   } else {
  //     setSelectedCandidates(new Set());
  //   }
  // };

  const scheduleInterviews = () => {
    // alert(`Scheduling interviews for ${selectedCandidates.size} candidates`);
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
              // checked={selectedCandidates.size === candidates.length}
              // onChange={(e) => handleSelectAll(e.target.checked)}
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
              onSelect={(selected) =>
                console.log(`Selected ${candidate.candidate.name}: ${selected}`)
              }
            />
          ))
        ) : (
          <p>No candidates available</p>
        )}
      </div>
      {/* <button
        onClick={scheduleInterviews}
        className="fixed bottom-4 right-4 bg-primary text-white px-16 py-4 rounded-md shadow-lg text-lg"
      >
        Schedule Interview ({selectedCandidates.size})
      </button> */}

      <Link href="/dashboard/shortlisted-candidates/interview-shedule" passHref>
        <button className="fixed bottom-4 right-4 bg-primary text-white px-16 py-4 rounded-md shadow-lg text-lg">
          {/* Schedule Interview ({selectedCandidates.size}) */}
        </button>
      </Link>
    </div>
  );
};

export default ShortlistedCandidatesPage;
