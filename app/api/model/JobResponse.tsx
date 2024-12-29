import { NoticePeriodStatus } from "./NoticePeriodStatus";

export interface Job {
  id: number;
  keyword: string;
  min_ctc: string;
  max_ctc: string;
  location: string;
  min_exp: string;
  max_exp: string;
  status: JobStatus;
  created_at: string;
  skills: string[];
  notice_period: NoticePeriodStatus;
}

export interface JobDetailResponse {
  message: string;
  data: Job;
}

export interface JobResponse {
  message: string;
  data: Job[];
}
export enum JobStatus {
  FAILED = "F",
  PENDING = "P",
  SUCCESS = "S",
}

// Mapping object for display values
export const JobStatusDisplay = {
  [JobStatus.FAILED]: "Failed",
  [JobStatus.PENDING]: "In-Progress",
  [JobStatus.SUCCESS]: "Successful",
};

// Function to get display value by enum value
export const getJobStatusDisplayValue = (status: JobStatus): string => {
  return JobStatusDisplay[status] || "Unknown";
};
