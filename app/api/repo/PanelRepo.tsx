import ApiService from "../service/ApiService";
import { PanelRequest, PanelResponse } from "../model/PanelRequest";

class PanelRepository {
  async createPanel(panelData: PanelRequest): Promise<PanelResponse> {
    const endpoint = 'interviews/api/v1/panel';
    try {
      console.log('Creating panel...');
      const response = await ApiService.post<PanelResponse>(endpoint, panelData);
      console.log('Panel created:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error creating panel:', error);
      throw error;
    }
  }
}

export default new PanelRepository();
