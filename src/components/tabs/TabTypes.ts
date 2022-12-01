
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

//BlockIO, MemUsage, Name, NetIO, PIDs
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
    runIm: (id: string, runningList: RunningListType, callback_1: () => void, callback_2: () => void) => void;
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

  
  // uneeded at this point
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

  // dont judge me, im coming back for you
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
  addMonitoringFrequency: (data: string | number) => void;
  addMemoryNotificationSetting: (data: object[]) => void;
  addCpuNotificationSetting: (data: object[]) => void;
  addStoppedNotificationSetting: (data: object[]) => void;
  addPhoneNumber: (data: object[] | string) => void;
  addNotificationFrequency: (data: string | number) => void;
  runningList: RunningListType[];
  stoppedList: StoppedListType[];
  // fixing the below
  memoryNotificationList: {};
  cpuNotificationList: {};
  stoppedNotificationList: {};
  };