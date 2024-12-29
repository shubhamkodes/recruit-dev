import PanelRepository from "../repo/PanelRepo";
import { PanelRequest, PanelResponse } from "../model/PanelRequest";

class PanelViewModel {
  private panels: PanelResponse[] = [];

  async createNewPanel(panelData: PanelRequest): Promise<PanelResponse> {
    try {
      const newPanel = await PanelRepository.createPanel(panelData);
      this.panels.push(newPanel);
      console.log('Panel added to ViewModel:', newPanel);
      return newPanel;
    } catch (error) {
      console.error('Error creating new panel:', error);
      throw error;
    }
  }

  getPanels(): PanelResponse[] {
    return this.panels;
  }

  getPanelById(panelId: string): PanelResponse | undefined {
    return this.panels.find(panel => panel.id === panelId);
  }
}

export default new PanelViewModel();
