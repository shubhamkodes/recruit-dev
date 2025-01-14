export interface CandidateDetails {
  name: string;
  experience: string;
  current_location: string;
  current_employment: string;
  education: string;
  preferred_locations: string;
  key_skills: string; // JSON string
  additional_skills: string; // JSON string
  score: String;
}

export interface Candidate {
  candidate_id: number;
  candidate: CandidateDetails; // Nested candidate object
  status: string;
}

export enum CandidateStatus {
  REJECTED = "REJECTED",
  SHORTLISTED = "SHORTLISTED",
  OPEN = "OPEN",
  INPROGRESS = "INPROGRESS",
}

// Extension function to check if the candidate is shortlisted
export function isShortlisted(candidate: Candidate): boolean {
  return candidate.status === "SHORTLISTED";
}

// Extension function to check if the candidate is rejected
export function isRejected(candidate: Candidate): boolean {
  return candidate.status === "REJECTED";
}

// Extension function to check if the candidate is open
export function isOpen(candidate: Candidate): boolean {
  return candidate.status === "OPEN";
}

export interface CandidatesResponse {
  message: string;
  data: {
    candidates: Candidate[];
    created_at: string;
  };
}
