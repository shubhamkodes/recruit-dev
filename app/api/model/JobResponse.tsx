export interface Job {
    id: number;
    keyword: string;
    min_ctc: string;
    max_ctc: string;
    location: string;
    min_exp: string;
    max_exp: string;
    status: string;
    created_at: string;
}

export interface JobResponse {
    message: string;
    data: Job[];
}