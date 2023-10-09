import { Request, Response, NextFunction, RequestHandler } from 'express';
import { EndpointType, ImageType, NetworkAndContainer, NetworkContainerType, PromDataSource } from 'types';


// =============================================
// Reducers
// =============================================

export interface ConfigurationState {
  prometheusDataSources: PromDataSource[];
  typeOfEndpoint: EndpointType[];
  entryForm: PromDataSource;
}


// ==============================================
// CONTAINER TYPES
// ==============================================
// Stopped containers have a Names key and running containers have a Name key
// ! Names and Networks had optional parameters `?`, possibly unnecessary so removed
export interface ContainerType {
  ID: string;
  metrics?: stats;
  Names: string;
  Image?: string;
  RunningFor?: string;
  Networks: string[];
}

// for networkReducer's initial state
export interface NetworkContainerListType {
  networkName: string;
  containers: NetworkAttachedContainersInfo[];
}

// Relates to above interfaces containers property
export interface NetworkAttachedContainersInfo {
  containerName: string;
  containerIP: string;
}

// for networkReducer's action
export interface NetworkStateType {
  networkContainerList: NetworkAndContainer[];
}

export interface StoppedListType extends ContainerType {
  Img: string;
  Created: string;
  name: string;
}

// export interface RunningListType {
//   Names?: string;
//   ID: string;
//   Image: string;
//   RunningFor: string;
// }

export interface ContainerStateType {
  runningList: ContainerPS[];
  stoppedList: ContainerPS[];
  networkList: string[];
  composeStack: any[];
}

// for container's being run
export interface ContainerObj extends ContainerType {
  Container: string;
}

// for container's being stopped
export interface StoppedContainerObj extends ContainerType {
  Command: string;
  CreatedAt: string;
  Labels: string;
  LocalVolumes: string;
  Mounts: string;
  Ports: string;
  Size: string;
  State: string;
  Status: string;
  ModalOpen?: boolean;
}

export interface containersList {
  runningList: any[];
  stoppedList: any[];
}

export interface stats {
  BlockIO: string;
  CPUPerc: string;
  Container: string;
  ID: string;
  MemPerc: string;
  MemUsage: string;
  Name: string;
  NetIO: string;
  PIDs: string;
}

// ==============================================
// IMAGE TYPES
// ==============================================
export interface ImageObj {
  reps: string;
  tag: string;
  imgid: string;
  size: string;
}

export interface ImagesStateType {
  imagesList: ImageType[];
}

// ==============================================
// LOGS TYPES
// ==============================================


export interface ProcessLogsSelectorProps {
  containerList?: ContainerType[];
  handleCheck?: (name: string) => void;
  btnIdList?: {
    Names?: boolean;
  }[];
  status?: string;
}

// export interface ProcessLogsSelectorProps {
//   containerList: ContainerType[];
//   handleCheck: (name: string) => void;
//   btnIdList: { Names?: boolean }[];
// }

export interface stdType {
  containerName: string;
  logMsg: string;
  timestamp: string;
}

export interface ContainerLogsType {
  stdout: stdType[];
  stderr: stdType[];
}

export interface LogsStateType {
  containerLogs: ContainerLogsType;
  searchWord: string;
}

export type CSVDataType = any[]; // change

// ==============================================
// VOLUME TYPES
// ==============================================
export interface VolumeContainerObj {
  Names: string;
  State?: string;
  Status?: string;
}

export interface VolumeObj {
  vol_name: string;
  containers: VolumeContainerObj[];
}

export interface VolumeNameObj {
  Name: string;
}

export interface VolumeStateType {
  arrayOfVolumeNames: VolumeNameObj[];
  volumeContainersList: VolumeObj[];
}

// ==============================================
// MISC. TYPES
// ==============================================
export interface NetworkObj {
  CreatedAt: string;
  Driver: string;
  ID: string;
  IPv6: string;
  Internal: string;
  Labels: string;
  Name: string;
  Scope: string;
}

export interface composeStacksDockerObject {
  Name: string[];
  FilePath: string;
  YmlFileName: string;
}

export interface notificationList {
  phoneNumber: string[];
  memoryNotificationList: any[];
  cpuNotificationList: any[];
  stoppedNotificationList: any[];
}

export interface AlertStateType {
  alertList: (string | null)[];
  promptList:
    | [
        prompt: string | null,
        handleAccept: (() => void) | null,
        handleDeny: (() => void) | null,
      ]
    | null[];
}

export interface PruneStateType {
  prunePromptList:
    | [
        prompt: string | null,
        handleSystemPrune: (() => void) | null,
        handleNetworkPrune: (() => void) | null,
        handleDeny: (() => void) | null,
      ]
    | null[];
}

export interface notificationStateType {
  phoneNumber: string;
  memoryNotificationList: Set<any>;
  cpuNotificationList: Set<any>;
  stoppedNotificationList: Set<any>;
}

export interface RowsDataType {
  container: string | undefined;
  type: string;
  time: string;
  message: string;
  id: number;
}

export interface ToggleDisplayProps {
  container: ContainerType;
}

export interface DataFromBackend {
  hash?: string;
  error?: string;
}

export interface ContainersCardsProps {
  containerList?: ContainerType[];
  metrics?: stats;
  stopContainer: (container: ContainerType) => void;
  runContainer: (container: ContainerType) => void;
  removeContainer: (container: ContainerType) => void;
  connectToNetwork?: (network: string, container: string) => void;
  disconnectFromNetwork?: (network: string, container: string) => void;
  container?: ContainerType;
  bashContainer: (container: any) => void;
  status: string;
  key?: string | number;
}

export interface NetworkModal {
  Names: string;
}

export interface ConnectOrDisconnectProps {
  container: ContainerType;
  networkName: string;
  connectToNetwork: (networkName: string, containerName: string) => void;
  disconnectFromNetwork: (networkName: string, containerName: string) => void;
}

export interface NetworkListModalProps {
  Names: string;
  container: ContainerType;
  isOpen: boolean;
  connectToNetwork: (network: string, container: string) => void;
  disconnectFromNetwork: (network: string, container: string) => void;
  closeNetworkList: () => void;
  networkContainerList: NetworkContainerListType[];
}

export interface NotFoundProps {
  session: boolean | undefined;
}

export interface ContainerNetworkObject {
  Name: string;
  Id: string;
  CreatedAt: string;
  Labels: Record<string, string>;
  FilePath?: string;
  YmlFileName?: string;
}

export interface MetricsQuery {
  id: number;
  container_id: string;
  container_name: string;
  cpu_pct: string;
  memory_pct: string;
  memory_usage: string;
  net_io: string;
  block_io: string;
  pid: string;
  created_at: Date;
}
