import { CandidatesResponse, CandidateStatus } from "../model/Candidate";
import ApiService from "../service/ApiService";

class CandidateRepository {
  async fetchCandidates(jobId: number, status: CandidateStatus): Promise<CandidatesResponse> {
      const endpoint = `jobs/api/v1/search-detail/${jobId}?status=${status}`;
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

  async updateCandidateStatus(candidateId: number, status: CandidateStatus): Promise<void> {
    const endpoint = `jobs/api/v1/update-candidate-status/${candidateId}`;
    const body = { status };

    try {
      console.log(`Updating candidate ${candidateId} status to ${status}...`);
      const response = await ApiService.post(endpoint, body);

      // Check if the status code is 200
      if (response.status === 200) {
        console.log('Status updated successfully:', response.data.message);
        return; // Success, nothing more to do
      } else {
        console.error('Error updating candidate status:', response.data.message);
        throw new Error(response.data.message || 'An error occurred while updating the status.');
      }
    } catch (error: any) {
      // Handle different HTTP status codes if necessary
      if (error.response) {
        const statusCode = error.response.status;
        const errorMessage = error.response.data?.message || 'An unknown error occurred';

        if (statusCode === 400) {
          console.error('Bad Request:', errorMessage);
          throw new Error(`Bad Request: ${errorMessage}`);
        } else if (statusCode === 404) {
          console.error('Candidate Not Found:', errorMessage);
          throw new Error(`Not Found: ${errorMessage}`);
        } else if (statusCode === 500) {
          console.error('Server Error:', errorMessage);
          throw new Error(`Server Error: ${errorMessage}`);
        } else {
          console.error(`Unhandled Error (${statusCode}):`, errorMessage);
          throw new Error(errorMessage);
        }
      } else {
        // Handle unexpected errors (network issues, etc.)
        console.error('Unexpected Error:', error.message);
        throw new Error('Unexpected Error: ' + error.message);
      }
    }
  }
}
 
export default new CandidateRepository();