import ApiService from "../service/ApiService";
import { JobDetailResponse, JobResponse } from "../model/JobResponse";
import { JobSearchResponse } from "../model/JobSearchResponse";

class JobRepository {
    async getJobs(): Promise<JobResponse> {
      try {
        const response = await ApiService.get<JobResponse>('jobs/api/v1/search-list');
        return response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
        throw error;
      }
    }

    async getJobDetail(jobId: String): Promise<JobDetailResponse> {
      try {
        const response = await ApiService.get<JobDetailResponse>(`jobs/api/v1/job-detail/${jobId}`);
        return response.data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
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
      const endpoint = "/jobs/api/v1/search";
  
      try {
        const response = await ApiService.post<JobSearchResponse>(endpoint, {
          keyword,
          min_ctc,
          max_ctc,
          location,
          min_exp,
          max_exp,
          skills,
          notice_period
        });
        console.log("API Response:", response.data);
        return response.data;
      } catch (error) {
        console.error("Error during job search API call:", error);
        throw error;
      }
    }
  }

export default new JobRepository();
