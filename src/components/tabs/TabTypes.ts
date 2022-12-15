
// Refer to the Settings Tab for more information on stoppedList and runningList
export interface StoppedListType {
    Names?: string,
    ID: string,
    Image: string,
    RunningFor: string,
    Img: string,
    Created: string,
    name: string,
    CPUPerc: string,
    MemPerc: string,
}
export interface RunningListType {
    BlockIO?: string,
    ID: string,
    CPUPerc: string,
    MemPerc: string,
    MemUsage?: string,
    Name?: string,
    NetIO?: string,
    PIDs?: string,
    Image: string,
    RunningFor: string,
}

// for more info review actions.ts file and Settings.ts
export type ContainerProps = {
    stoppedList: StoppedListType[];
    runStopped: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    runStoppedContainer: (id: string) => void;
    removeContainer: (id: string) => void;
    stopRunningContainer: (id: string) => void;
    remove: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    stop: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    runningList: RunningListType[];
    runIm: (id: ContainerType, runningList: RunningListType, callback_1: () => void, callback_2: () => void) => void;
  }

  // Stopped containers have a Names key and running containers have a Name key
  export type ContainerType = {
    Name?: string;
    Names?: string;
    ID: string;
    Image: string;
    RunningFor: string;
    CPUPerc: string;
    MemPerc: string;
  }

  export type RunningContainerType = {
    Name: string;
    Names?: string;
    ID: string;
    Image: string;
    RunningFor: string;
    CPUPerc: string;
    MemPerc: string;
  }

  export type ChartInfoType = {
    labels: string[];
    datasets: DataSetType[];
    data?: any
  }
  
  export type DataSetType = {
    stack: string;
    label: string;
    data: string[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
    barPercentage: number;
  }


export type DispatchType = (...args: any[]) => void;

export type WindowType = {
  nodeMethod: NodeMethodType;
}

type NodeMethodType = {
  rendInvoke: (arg1: string, arg2: string | RendInvokebody) => Promise<any>;
}

type RendInvokebody = {
    code: string,
    mobileNumber: string
}

export type SettingsProps = {
  addMonitoringFrequency: (data: any) => void;
  addMemoryNotificationSetting: (data: any) => void;
  addCpuNotificationSetting: (data: any) => void;
  addStoppedNotificationSetting: (data: any) => void;
  addPhoneNumber: (data: any) => void;
  addNotificationFrequency: (data: any) => void;
  runningList: any[];
  stop?: (id: any, callback: any) => void;
  stoppedList: any[];
  stopRunningContainer: (id: string) => { type: string; payload: string; };
  runStopped: (id: any, runStoppedContainerDispatcher: any) => void;
  refreshRunningContainers: (data: any[]) => void;
  runStoppedContainer: (id: string) => void;
  phoneNumber?: string[];
  memoryNotificationList: any[];
  cpuNotificationList: any[];
  stoppedNotificationList: any[];
  };

  export interface UserInfo {
    _id: number,
    username: string,
    email: string,
    phone: string,
    role: string,
    role_id: number,
    contact_pref: string | null,
    mem_threshold: number,
    cpu_threshold: number,
    container_stops: boolean,
    token: string
  }