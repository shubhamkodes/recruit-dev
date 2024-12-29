import { Job } from "@app/api/model/JobResponse";

interface JobDetailProps {
  job: Job;
}

const JobDetailCard: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="bg-white   rounded-lg p-6 hover:shadow-xl transition duration-300 ease-in-out">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-bold text-xl text-gray-800">Job ID: {job.id}</h2>
        <span
          className={`px-4 py-1 text-sm font-medium rounded-full ${
            job.status === "Active"
              ? "bg-green-100 text-green-600"
              : "bg-red-100 text-red-600"
          }`}
        >
          {job.status}
        </span>
      </div>

      <div className="text-gray-600 space-y-2">
        <p>
          <span className="font-semibold text-lg text-gray-700">
            {job.keyword}{" "}
          </span>
          <span font-medium text-sm text-gray-700>
            (Experience {job.min_exp} - {job.max_exp} years)
          </span>
        </p>
        <p>
          <span className="font-medium">Location:</span> {job.location}
        </p>
        <p>
          <span className="font-medium">CTC:</span> {job.min_ctc} -{" "}
          {job.max_ctc} LPA
        </p>
        {job.notice_period && (
          <p>
            <span className="font-medium">Notice Period:</span>{" "}
            {job.notice_period}
          </p>
        )}

        {job.skills && job.skills.length > 0 && (
          <div>
            <span className="font-medium">Skills:</span>
            <ul className="list-disc list-inside text-gray-600">
              {job.skills.map((skill, index) => (
                <li
                  key={index}
                  className="inline-block bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm mr-2 mt-2"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        )}
        <p className="text-sm text-gray-500">
          Posted on: {new Date(job.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default JobDetailCard;
