import { Candidate } from '../model/Candidate';
// import CandidateRepository from '../repo/CandidateRepo'


class CandidateViewModel {
  private candidates: Candidate[] = [];

  async loadCandidates(): Promise<void> {
    try {
    //   const response = await CandidateRepository.fetchCandidates();
    //   this.candidates = response.data.candidates;
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
}

export default new CandidateViewModel();
