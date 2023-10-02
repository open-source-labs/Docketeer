import { ddClientRequest, encodeQuery, apiRequest } from "../ddClientRequest";
import { ContainerPS, LogObject } from "types";

export const ContainerService = {
  async getRunningContainers(): Promise<ContainerPS[]> {
    return await apiRequest<ContainerPS[]>('/api/docker/container/running');
  },

  async getStoppedContainers(): Promise<ContainerPS[]> {
    return await apiRequest('/api/docker/container/stopped'); 
  },

  async removeContainer(containerId: string): Promise<boolean> {
    try {
      await apiRequest(`/api/docker/container/${containerId}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(`Failed to remove container with ID ${containerId}`);
      return false;
    }
  },

  async runContainer(containerId: string): Promise<boolean> {
    try {
      await apiRequest(`/api/docker/container/${containerId}/start`, 'POST');
      return true
    } catch (error) {
      console.error(`Failed to start container with ID ${containerId}`);
      return false;
    }
  },

  async stopContainer(containerId: string): Promise<boolean> {
    try {
      await apiRequest(`/api/docker/container/${containerId}/stop`, 'POST');
      return true;
    } catch (error) {
      console.error(`Failed to stop container ${containerId}`);
      return false;
    }
  },

  async getLogs(containerList: string[], start: string, stop: string, offset: number): Promise<LogObject[]>{
    try {
      const containerString = containerList.join(",");
      const query = encodeQuery({ containerNames: containerString, start, stop, offset: String(offset) })
      console.log('Query: ', query);
      const logs: LogObject[] = await apiRequest(`/api/docker/container/logs?${query}`);
      return logs;
    } catch (error) {
      console.error(`Failed to get Logs`);
      return [];
    }
  }
}


