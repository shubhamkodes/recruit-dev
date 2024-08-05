interface JobData {
    jobId: number;
    position: string;
    experience: string;
    location: string;
    date: string;
    statuses: string[];
  }
  
 export const fakeJobData: JobData[] = [
    {
      jobId: 123,
      position: 'Python Developer',
      experience: '5+ Years',
      location: 'Noida',
      date: '22 July 2024',
      statuses: ['Search', 'Search', 'Pending'],
    },
    {
      jobId: 126,
      position: 'Python Developer',
      experience: '5+ Years',
      location: 'Noida',
      date: '22 July 2024',
      statuses: ['Search', 'Search', 'Pending'],
    },
    {
      jobId: 129,
      position: 'Python Developer',
      experience: '5+ Years',
      location: 'Noida',
      date: '22 July 2024',
      statuses: ['Search', 'Search', 'Pending'],
    },
  ];