import { getJobStatusDisplayValue, Job } from "@app/api/model/JobResponse";
import { getNoticePeriodDisplayValue } from "@app/api/model/NoticePeriodStatus";
interface JobDetailProps {
  job: Job;
}
const JobDetailCard: React.FC<JobDetailProps> = ({ job }) => {
  return (
    <div className="rounded-lg p-6  ">
      {/* Job Title and Status */}
      <div className="mb-4 flex items-center space-x-4">
        <h1 className="font-bold text-xl text-gray-800">Job ID: {job.id}</h1>
      </div>

      <h2 className="font-bold text-lg text-gray-800 mb-4">{job.keyword}</h2>

      {/* Job Details */}
      <div className="space-y-4 text-gray-600">
        <div>
          <p className="text-sm text-gray-500">Location</p>
          <p className="text-md text-gray-800">{job.location}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">CTC</p>
          <p className="text-md text-gray-800">
            {job.min_ctc} - {job.max_ctc} LPA
          </p>
        </div>
        {job.notice_period && (
          <div>
            <p className="text-sm text-gray-500">Notice Period</p>
            <p className="text-md text-gray-800">
              {getNoticePeriodDisplayValue(job.notice_period)}
            </p>
          </div>
        )}
        {job.skills && job.skills.length > 0 && (
          <div>
            <p className="text-sm text-gray-500 mb-2">Skills</p>
            <div className="flex flex-wrap gap-2">
              {job.skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-800 rounded-full px-3 py-1 text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <p className="mt-6 text-sm text-gray-500">
        Searched on: {new Date(job.created_at).toLocaleDateString()}
      </p>
    </div>
  );
};

export default JobDetailCard;
