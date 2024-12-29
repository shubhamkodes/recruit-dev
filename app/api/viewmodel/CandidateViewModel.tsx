import { Candidate, CandidateStatus } from '../model/Candidate'; 
import CandidateRepo from '../repo/CandidateRepo';
import CandidateRepository from '../repo/CandidateRepo'


class CandidateViewModel {
  private candidates: Candidate[] = [];

  async loadCandidates(jobId: number, status: CandidateStatus): Promise<void> {
    try {
      const response = await  CandidateRepo.fetchCandidates(jobId, status);
      this.candidates = response.data.candidates; // Assuming response.candidates is the array of candidates.
      console.log('Candidates loaded:', this.candidates);
    } catch (error) {
      console.error('Error loading candidates:', error);
      throw error;
    }
  }


  getCandidates(): Candidate[] {
    return this.candidates;
  }

  getCandidateById(candidateId: number): Candidate | undefined {
    return this.candidates.find(candidate => candidate.candidate_id === candidateId);
  }


  async updateCandidateStatus(candidateId: number, status: CandidateStatus): Promise<void> {
    try {
      console.log(`Updating status for candidate with ID ${candidateId} to ${status}...`);

      // Call the updateCandidateStatus method from CandidateRepo
      await CandidateRepo.updateCandidateStatus(candidateId, status);

      console.log(`Status updated for candidate with ID ${candidateId}.`);

      // Optionally, update the local candidates array if needed
      const candidate = this.getCandidateById(candidateId);
      if (candidate) {
        candidate.status = status; // Assuming Candidate model has a `status` field
        console.log(`Candidate with ID ${candidateId} status updated locally.`);
      }
    } catch (error) {
      console.error(`Error updating status for candidate with ID ${candidateId}:`, error);
      throw error;
    }
  }
}

export default new CandidateViewModel();
