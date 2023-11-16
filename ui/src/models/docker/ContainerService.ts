import { ddClientRequest, encodeQuery } from "../ddClientRequest";
import { ContainerPS, LogObject } from "../../../../types";

export const ContainerService = {
  async getRunningContainers(): Promise<ContainerPS[]> {
    return await ddClientRequest<ContainerPS[]>('/api/docker/container/running');
  },

  async getStoppedContainers(): Promise<ContainerPS[]> {
    return await ddClientRequest('/api/docker/container/stopped'); 
  },

  async removeContainer(containerId: string): Promise<boolean> {
    try {
      await ddClientRequest(`/api/docker/container/${containerId}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async runContainer(containerId: string): Promise<boolean> {
    try {
      await ddClientRequest(`/api/docker/container/start`, 'POST', {id: containerId});
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async bashContainer(containerId: string): Promise<boolean> {
    try {
      console.log(containerId)
      await ddClientRequest(`/api/docker/container/bashed`, 'POST', {id: containerId})
      return true
    } catch (error) {
      console.error(`Failed to exec into container with ID ${containerId}`)
      return false
    }
  },

  async stopContainer(containerId: string): Promise<boolean> {
    try {
      await ddClientRequest(`/api/docker/container/stop`, 'POST', {id: containerId});
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getLogs(containerList: string[], start?: string, stop?: string, offset?: number): Promise<{[key: string]: LogObject[]}>{
    try {
      const containerString = containerList.join(",");
      const query = encodeQuery({ containerNames: containerString, start, stop, offset: String(offset) })
      const logs: {[key: string]: LogObject[]} = await ddClientRequest(`/api/docker/container/logs?${query}`);
      return logs;
    } catch (error) {
      console.error(error);
      return {stdout: [], stderr: []};
    }
  },
}


