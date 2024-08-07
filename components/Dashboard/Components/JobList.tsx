import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import { IoMdArrowDropright } from 'react-icons/io';

type Job = {
  id: number;
  title: string;
  experience: string;
  location: string;
  date: string;
};

const jobData: Job[] = [
  { id: 123, title: 'Python developer', experience: '5+ Years', location: 'Noida', date: '22 July 2024' },
  { id: 126, title: 'Python developer', experience: '5+ Years', location: 'Noida', date: '22 July 2024' },
  { id: 128, title: 'Python developer', experience: '5+ Years', location: 'Noida', date: '22 July 2024' },
];

const JobList: React.FC = () => {
  return (
    <div className="job-list w-full shadow-l rounded-xl p-8 border border-[#E6EBF3]">
      {jobData.map((job, index) => (
        <div key={job.id} className={`job-item py-2 flex items-center ${index !== jobData.length - 1 ? 'border-b border-[#E6EBF3]' : ''}`}>
          <div className="job-info flex-grow">
            <p className="job-id text-gray-500">#{job.id}</p>
            <h2 className="job-title font-bold text-lg">{job.title}</h2>
            <p className="job-experience text-gray-500">{job.experience} / {job.location}</p>
            <p className="job-date text-gray-500">{job.date}</p>
          </div>
          <div className="job-status flex items-center">
            <div className="flex items-center">
              <FaCheckCircle className="text-green-500" />
              <p className="ml-2">Search</p>
            </div>
            <div className="ml-8 flex items-center">
              <FaCheckCircle className="text-gray-400" />
              <p className="ml-2 text-gray-400">Search</p>
            </div>
            <div className="ml-8 flex items-center">
              <FaCheckCircle className="text-gray-400" />
              <p className="ml-2 text-gray-400">Pending</p>
            </div>
            <IoMdArrowDropright className="ml-8 text-gray-500" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default JobList;