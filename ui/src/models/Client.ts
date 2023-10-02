import { ContainerService } from "./docker/ContainerService";
import { VolumeService } from "./docker/VolumeService";
import { ImageService } from "./docker/ImageService";
import { NetworkService, SystemService } from "./docker/NetworkService";
import { ddClientRequest, apiRequest, encodeQuery } from "./ddClientRequest";

export default {
  ContainerService,
  VolumeService,
  ImageService,
  NetworkService,
  SystemService,
  API: {
    ddClientRequest,
    apiRequest,
    encodeQuery
  }
}