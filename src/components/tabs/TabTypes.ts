
// Refer to the Settings Tab for more information on stoppedList and runningList
export interface StoppedListType {
    Names: string,
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
    block: string,
    ID: string,
    CPUPerc: string,
    MemPerc: string,
    MemUsage: string,
    Name: string,
    NetIO: string,
    PIDs: string,
    Image: string,
    RunningFor: string,
}

// for more info review actions.ts file and Settings.ts
export type ContainerProps = {
    stoppedList: Array<StoppedListType>;
    runStopped: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    runStoppedContainer: (id: string) => void;
    removeContainer: (id: string) => void;
    stopRunningContainer: (id: string) => void;
    remove: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    stop: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    runningList: Array<RunningListType>;
    runIm: (id: string, runningList: RunningListType, callback_1: () => void, callback_2: () => void) => void;
    addRunningContainers: (data: object[]) => void;
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
  
//   export interface BarType {
//     options: any;
//     data: any;
//   }
