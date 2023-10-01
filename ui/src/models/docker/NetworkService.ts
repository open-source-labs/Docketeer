import { ddClientRequest, encodeQuery, apiRequest } from "../ddClientRequest";
import { ImageType, NetworkType } from "types";
export const NetworkService = {
  async getNetworks(): Promise<NetworkType[]>{
    return await apiRequest('/api/docker/network');
  },

  async pruneNetwork(): Promise<boolean>{
    try {
      await apiRequest('/api/docker/network/prune', 'DELETE');
      return true;
    } catch (error) {
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
      return false;
    }
  }
}