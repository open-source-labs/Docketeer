import { ContainerService } from "./docker/ContainerService";
import { VolumeService } from "./docker/VolumeService";
import { ImageService } from "./docker/ImageService";
import { NetworkService, SystemService } from "./docker/NetworkService";
import { ConfigService } from "./prometheus/configService";
import { ddClientRequest, apiRequest, encodeQuery } from "./ddClientRequest";

export default {
  ContainerService,
  VolumeService,
  ImageService,
  NetworkService,
  SystemService,
  ConfigService,
  API: {
    ddClientRequest,
    apiRequest,
    encodeQuery
  }
}