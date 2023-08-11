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

export interface ContainersCardsProps {
  containerList?: ContainerType[];
  stopContainer: (container: ContainerType) => void;
  runContainer: (container: ContainerType) => void;
  removeContainer: (container: ContainerType) => void;
  connectToNetwork?: (network: string, container: string) => void;
  disconnectFromNetwork?: (network: string, container: string) => void;
  container?: ContainerType;
  status: string;
  key?: string | number;
}

// ==============================================
// NETWORK LIST MODAL TYPES
// ==============================================

export interface NetworkContainerListType {
  networkName: string;
  containers: NetworkAttachedContainersInfo[];
}

export interface NetworkAttachedContainersInfo {
  containerName: string;
  containerIP: string;
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

// ==============================================
// CONNECT OR DISCONNECT TYPES
// ==============================================

export interface ConnectOrDisconnectProps {
  container: ContainerType;
  networkName: string;
  connectToNetwork: (networkName: string, containerName: string) => void;
  disconnectFromNetwork: (networkName: string, containerName: string) => void;
}