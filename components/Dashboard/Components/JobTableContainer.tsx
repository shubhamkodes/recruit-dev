import React, { useState, useEffect } from "react";
import JobTable from "./JobTable";
import JobViewModel from "@app/api/viewmodel/JobViewModel";
import { Job } from "@app/api/model/JobResponse";
import { motion, AnimatePresence } from "framer-motion";

const JobTableContainer: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Store all jobs
  const [currentPage, setCurrentPage] = useState(1); // Current page
  const pageSize = 10; // Number of jobs per page

  const fetchJobs = async () => {
    try {
      const jobResponse = await JobViewModel.fetchJobs();
      setJobs(jobResponse.data); // Store all jobs in state
    } catch (error) {
      console.error("Failed to fetch jobs:", error);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Update the current page
  };

  // Calculate paginated data
  const totalPages = Math.ceil(jobs.length / pageSize); // Calculate total pages
  const paginatedJobs = jobs.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  ); // Get jobs for current page

  return (
    <div className="mx-auto py-8 px-8">
      <JobTable
        jobs={paginatedJobs} // Pass only paginated jobs to the table
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobTableContainer;
