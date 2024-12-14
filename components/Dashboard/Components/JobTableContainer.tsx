import React, { useState, useEffect } from 'react';
import JobTable from './JobTable';
import JobViewModel from '@app/api/viewmodel/JobViewModel';
import { Job } from '@app/api/model/JobResponse';

const JobTableContainer: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([]); // Store jobs
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2; // Assuming a static total page count for now

  const fetchJobs = async () => {
    try {
      const jobResponse = await JobViewModel.fetchJobs();
      setJobs(jobResponse.data);
    } catch (error) {
      console.error('Failed to fetch jobs:', error);
    }
  };

  useEffect(() => {
    fetchJobs(); 
  }, []);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto py-8 px-8">
      <JobTable
        jobs={jobs} 
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default JobTableContainer;
