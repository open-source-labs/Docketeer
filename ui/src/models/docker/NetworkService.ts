import { ddClientRequest, encodeQuery, apiRequest } from "../ddClientRequest";
import { ImageType, NetworkType, NetworkContainerType } from "../../../../types";
export const NetworkService = {
  async getNetworks(): Promise<NetworkType[]>{
    return await apiRequest('/api/docker/network');
  },

  async createNetwork(networkName: string): Promise<boolean>{
    try {
      await apiRequest('/api/docker/network', 'POST', { networkName });
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async getAllContainersOnAllNetworks(): Promise<NetworkContainerType[]>{
    try {
      const data: NetworkContainerType[] = await apiRequest('/api/docker/network/container');
      return data;
    } catch (error) {
      console.error('Couldn\'t fetch all containers on all networks:', error);
      return [];
    }
  },

  async connectContainerToNetwork(networkId: string, containerId: string): Promise<boolean>{
    try {
      await apiRequest('/api/docker/network/container', 'POST', {networkName: networkId, containerName: containerId})
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async disconnectContainerFromNetwork(networkId: string, containerId: string): Promise<boolean> {
    try {
      await apiRequest(`/api/docker/network/${networkId}/container/${containerId}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },


  async pruneNetwork(): Promise<boolean>{
    try {
      await apiRequest('/api/docker/network/prune', 'DELETE');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  },

  async deleteNetwork(idOrName: string): Promise<boolean>{
    try {
      await apiRequest(`/api/docker/network/${idOrName}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}

export const SystemService = {
  async pruneSystem(): Promise<boolean>{
    try {
      await apiRequest('/api/docker/system/prune', 'DELETE');
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}