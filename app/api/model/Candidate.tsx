export interface Candidate {
    candidate_id: number;
    name: string;
    experience: string;
    current_location: string;
    current_employment: string;
    education: string;
    preferred_locations: string;
    key_skills: string[];
    additional_skills: string[];
    status: string;
  }
  
  export interface CandidatesResponse {
    message: string;
    data: {
      candidates: Candidate[];
      created_at: string;
    };
  }