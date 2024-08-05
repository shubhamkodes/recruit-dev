// components/JobCard.js
import React from 'react'; 

interface JobPreviewCardProps {
  jobId: number;
  position: string;
  experience: string;
  location: string;
  date: string;
  statuses: string[];
}

const JobPeakViewSection: React.FC<JobPreviewCardProps> = ({ jobId, position, experience, location, date, statuses }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-bold text-lg">#{jobId}</span>
        <span className="text-gray-500">{date}</span>
      </div>
      <div className="text-xl font-semibold mb-2">{position}</div>
      <div className="text-gray-600 mb-4">{experience} - {location}</div>
      <div className="flex justify-between">
        {statuses.map((status, index) => (
          <div key={index} className="text-center">
            <div className={`w-6 h-6 mx-auto rounded-full ${status === 'Completed' ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-gray-500">{status}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default JobPeakViewSection;

