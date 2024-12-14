import { CandidatesResponse } from "../model/Candidate";
import ApiService from "../service/ApiService";

class CandidateRepository {
    async fetchCandidates(): Promise<CandidatesResponse> {
      const endpoint = '/api/candidates'; 
      try {
        console.log('Fetching candidates from API...');
        const response = await ApiService.get<CandidatesResponse>(endpoint);
        console.log('API Response:', response);
        return response.data;
      } catch (error) {
        console.error('Error fetching candidates:', error);
        throw error;
      }
    }
  }