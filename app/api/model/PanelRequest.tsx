export interface PanelRequest {
    name: string;
    members: string[];
    role: string;
  }
  
  export interface PanelResponse {
    id: string;
    name: string;
    members: string[];
    role: string;
    createdAt?: string;
  }