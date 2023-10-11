import { ddClientRequest } from "../ddClientRequest";
import { PromDataSource, EndpointType } from "types";

export const ConfigService = {
  async getDataSources(): Promise<PromDataSource[]> {
    try {
      return await ddClientRequest('/api/prometheus/config');
    } catch (error) {
      console.error('Error getting configs: ', error);
      return [];
    }
  },

  async getEndpointTypes(): Promise<EndpointType[]>{
    try {
      return await ddClientRequest('/api/prometheus/config/types');
    } catch (error) {
      console.error('Error getting endpoint types:', error);
      return [];
    }
  },

  async createDataSource(type_of_id: number, url: string, jobname: string, endpoint: string, match?: string, ssh_key?: string): Promise<number | null> {
    try {
      const body: PromDataSource = { type_of_id, url, jobname, endpoint, match, ssh_key }
      const id: number = await ddClientRequest('/api/prometheus/config', 'POST', body);
      return Number(id);
    } catch (error) {
      console.error('Could not create data source:', error);
      return null;
    }
  },

  async updateDataSource(id: number, type_of_id?: number, url?: string, jobname?: string, endpoint?: string, match?: string, ssh_key?: string): Promise<boolean>{
    try {
      const body: PromDataSource = { id, type_of_id, url, jobname, endpoint, match, ssh_key}
      await ddClientRequest('/api/prometheus/config', 'PUT', body);
      return true;
    } catch (error) {
      console.error(`Couldn\'t update data source ${id}:`, error);
      return false;
    }
  },

  async deleteDataSource(id: number): Promise<boolean>{
    try{
      await ddClientRequest(`/api/prometheus/config/${id}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(`Couldn't delete data source`, error);
      return false;
    }
  }
}