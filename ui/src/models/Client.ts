import { ContainerService } from "./docker/ContainerService";
import { VolumeService } from "./docker/VolumeService";
import { ImageService } from "./docker/ImageService";
import { NetworkService, SystemService } from "./docker/NetworkService";
import { ConfigService } from "./prometheus/configService";
import { MetricService } from "./docker/MetricService";
import { ddClientRequest, encodeQuery } from "./ddClientRequest";

export default {
  ContainerService,
  VolumeService,
  ImageService,
  NetworkService,
  SystemService,
  ConfigService,
  MetricService,
  API: {
    ddClientRequest,
    encodeQuery
  }
}