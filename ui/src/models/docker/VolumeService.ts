import { ddClientRequest, encodeQuery } from "../ddClientRequest";
import { VolumeType, ContainerPS } from "../../../../types";
export const VolumeService = {
  async getAllVolumes(fields: string[]=[]): Promise<VolumeType> {
    return await ddClientRequest('/api/docker/volume', 'GET');
  },

  async getContainersOnVolume(volumeName: string, fields: string[] = []): Promise<ContainerPS[]>{
    try {
      return await ddClientRequest(`/api/docker/volume/${volumeName}/containers`, 'GET');
    } catch (error) {
      console.error(`Error fetching containers for volume ${volumeName}:`, error);
      throw error;
    }
  },

  async removeVolume(volumeId: string): Promise<boolean> {
    try {
      await ddClientRequest(`/api/docker/volume/${volumeId}`, 'DELETE');
      return true;
    } catch (error) {
      console.error(`Could not delete volume by ID: ${volumeId}:`, error);
      return false;
    }
  }
}