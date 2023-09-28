export interface ContainerPS {
  ID: string;
  Command?: string;
  CreatedAt: string;
  Image?: string;
  Labels?: string[];
  LocalVolumes?: string;
  Mounts?: string;
  Names?: string;
  Networks?: string[];
  Ports?: string[];
  RunningFor?: string;
  Size?: string;
  State: string; //tells if running
  Status?: string;
};

// ==============================================
// CONTAINER TYPES
// ==============================================
// Stopped containers have a Names key and running containers have a Name key
export interface ContainerType {
  ID: string;
  Names?: string;
  Image?: string;
  RunningFor?: string;
  Networks?: string[];
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
  networkContainerList: NetworkContainerListType[];
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
  runningList: ContainerType[];
  stoppedList: StoppedListType[];
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

export interface ConnectOrDisconnectProps {
  container: ContainerType;
  networkName: string;
  connectToNetwork: (networkName: string, containerName: string) => void;
  disconnectFromNetwork: (networkName: string, containerName: string) => void;
}

export interface NetworkListModalProps {
  Names: string,
  container: ContainerType,
  isOpen: boolean,
  connectToNetwork: (network: string, container: string) => void;
  disconnectFromNetwork: (network: string, container: string) => void;
  closeNetworkList: () => void;
  networkContainerList: NetworkContainerListType[];
}
// ==========================================================
// Server-Side Typing
// ==========================================================
export interface ServerError {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

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