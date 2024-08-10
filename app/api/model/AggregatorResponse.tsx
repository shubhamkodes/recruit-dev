export interface VerificationRequest {
    email: string;
    otp: string;
    aggregator: string; 
  }
  
  export interface VerificationResponse {
    error?: string;  
    message?: string; 
  }