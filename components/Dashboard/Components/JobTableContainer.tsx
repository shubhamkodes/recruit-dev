// pages/index.tsx
import React, { useState } from 'react'; 
import JobTable from './JobTable';

interface JobData {
  jobId: number;
  title: string;
  location: string;
}

const jobData: JobData[] = [
  { jobId: 123, title: 'Python Developer', location: 'Noida' },
  { jobId: 126, title: 'Data Analyst', location: 'Gurugram' },
  { jobId: 128, title: 'Product Design', location: 'Noida' },
  { jobId: 129, title: 'Product Manager', location: 'Noida' },
  { jobId: 133, title: 'Growth Manager', location: 'Noida' },
  { jobId: 137, title: 'Data Scientist', location: 'Noida' },
];

const JobTableContainer: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 2;  

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="mx-auto py-8 px-8  ">
      <JobTable jobs={jobData} currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default JobTableContainer;
