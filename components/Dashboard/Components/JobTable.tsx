import { Job } from "@app/api/model/JobResponse";
import Link from "next/link"; // Correct import for Link from Next.js

interface JobTableProps {
  jobs: Job[]; 
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const JobTable: React.FC<JobTableProps> = ({
  jobs,
  currentPage,
  totalPages,
  onPageChange,
}) => {
  return (
    <div className="background shadow-md rounded-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job List</h1>
        <span className="text-orange-500 font-semibold">
          Available Jobs
        </span>
      </div>
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-orange-500 py-2">Job ID</th>
            <th className="text-orange-500 py-2">Job Title</th>
            <th className="text-orange-500 py-2">Location</th>
            <th className="py-2"></th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job.id} className="border-t">
              <td className="py-4">{job.id}</td>
              <td className="py-4">{job.keyword}</td>
              <td className="py-4">{job.location}</td>
              <td className="py-4 text-orange-500 cursor-pointer">
                <Link href={`/dashboard/job-candidates?id=${job.id}`}>
                  View details
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="flex justify-between items-center mt-4">
        <span className="text-gray-500">
          Page {currentPage} of {totalPages}
        </span>
        <div>
          <button
            className="mr-2 p-2 border border-gray-300 text-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
          >
            &lt; &nbsp;Prev
          </button>
          <button
            className="p-2 border border-gray-300 text-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
          >
            Next &nbsp;&gt;
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobTable;
