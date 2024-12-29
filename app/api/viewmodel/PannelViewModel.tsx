import PanelRepository from "../repo/PanelRepo";
import {
  PanelRequest,
  PanelResponse,
  PanelsResponse,
} from "../model/PanelRequest";

class PanelViewModel {
  
  async createNewPanel(panelData: PanelRequest): Promise<PanelResponse> {
    try {
      return await PanelRepository.createPanel(panelData);
    } catch (error) {
      console.error("Error creating new panel:", error);
      throw error;
    }
  }

  async getPanels(): Promise<PanelsResponse> {
    try {
      return await PanelRepository.getPanels();
    } catch (error) {
      console.error("Error creating new panel:", error);
      throw error;
    }
  }

}

export default new PanelViewModel();
