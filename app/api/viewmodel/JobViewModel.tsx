import { JobResponse } from "../model/JobResponse";
import { JobSearchResponse } from "../model/JobSearchResponse";
import JobRepository from "../repo/JobRepo";

class JobViewModel {
    async fetchJobs(): Promise<JobResponse> {
      try {
        const jobResponse = await JobRepository.getJobs();
        console.log('Fetched jobs:', jobResponse.data);
        return jobResponse; // Return the fetched response
      } catch (error) {
        console.error('Failed to fetch jobs:', error);
        throw error;
      }
    }

    async searchJobs(
      keyword: string,
      min_ctc: string,
      max_ctc: string,
      location: string,
      min_exp: string,
      max_exp: string,
      notice_period: number,
      skills: string[] 
    ): Promise<JobSearchResponse> {
      try {
        const response = await JobRepository.searchJobs(
          keyword,
          min_ctc,
          max_ctc,
          location,
          min_exp,
          max_exp,
          notice_period,
          skills
        );
        console.log("Job search successful:", response);
        return response;
      } catch (error) {
        console.error("Job search failed:", error);
        throw error;
      }
    }
  }

export default new JobViewModel();
