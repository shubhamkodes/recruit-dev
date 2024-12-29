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

export interface PanelDetail {
  id: number;
  name: string;
  members: string[];
  role: string;
  createdAt?: string;
}


export interface PanelsResponse {
  message: string;
  data: PanelDetail[];
}