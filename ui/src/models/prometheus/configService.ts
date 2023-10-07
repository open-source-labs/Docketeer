import { apiRequest } from "../ddClientRequest";
import { PromDataSource, EndpointType } from "types";

export const ConfigService = {
  async getDataSources(): Promise<PromDataSource[]> {
    try {
      return await apiRequest('/api/prometheus/config');
    } catch (error) {
      console.error('Error getting configs: ', error);
      return [];
    }
  },

  async getEndpointTypes(): Promise<EndpointType[]>{
    try {
      return await apiRequest('/api/prometheus/config/types');
    } catch (error) {
      console.error('Error getting endpoint types:', error);
      return [];
    }
  },

  async createDataSource(type_of_id: number, url: string, jobname: string, endpoint: string, match?: string, ssh_key?: string): Promise<number | null> {
    try {
      const body: PromDataSource = { type_of_id, url, jobname, endpoint, match, ssh_key }
      const id: number = await apiRequest('/api/prometheus/config', 'POST', body);
      return Number(id);
    } catch (error) {
      console.error('Could not create data source:', error);
      return null;
    }
  }
}