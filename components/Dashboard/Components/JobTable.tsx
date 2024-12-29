import { Job } from "@app/api/model/JobResponse";
import Link from "next/link"; // Correct import for Link from Next.js
import { motion, AnimatePresence } from "framer-motion";
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
  // Animation variants for table rows
  const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="background shadow-md rounded-lg p-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Job List</h1>
        <span className="text-orange-500 font-semibold">Available Jobs</span>
      </div>

      {/* AnimatePresence ensures smooth removal and addition of rows */}
      <table className="w-full text-left">
        <thead>
          <tr>
            <th className="text-orange-500 py-2">Job ID</th>
            <th className="text-orange-500 py-2">Job Title</th>
            <th className="text-orange-500 py-2">Location</th>
            <th className="py-2"></th>
          </tr>
        </thead>

        {jobs.map((job) => (
          <motion.tr
            key={job.id}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="border-t"
          >
            <td className="py-4">{job.id}</td>
            <td className="py-4">{job.keyword}</td>
            <td className="py-4">{job.location}</td>
            <td className="py-4 text-orange-500 cursor-pointer">
              <Link href={`/dashboard/job-candidates?id=${job.id}`}>
                View details
              </Link>
            </td>
          </motion.tr>
        ))}
      </table>

      {/* Pagination Controls */}
      <div>
        <motion.button
          className="mr-2 p-2 border border-gray-300 text-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === 1}
          onClick={() => onPageChange(currentPage - 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          &lt; &nbsp;Prev
        </motion.button>
        <motion.button
          className="p-2 border border-gray-300 text-gray-500 rounded disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={currentPage === totalPages}
          onClick={() => onPageChange(currentPage + 1)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          Next &nbsp;&gt;
        </motion.button>
      </div>
    </div>
  );
};

export default JobTable;
