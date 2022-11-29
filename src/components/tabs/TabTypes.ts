// gotta do all these functions
export type ContainerProps = {
    stoppedList: any[];
    runStopped: any;
    runStoppedContainer: any;
    removeContainer: any;
    stopRunningContainer: any;
    remove: any;
    stop: any;
    runningList: any[];
  }
  // gotta do all those anys
  export type ContainerType = {
    Name: string;
    Names: string;
    ID: number;
    Image: any;
    RunningFor: any;
    CPUPerc: any;
    MemPerc: any;
  
  }
  
  export type ChartInfoType = {
    labels: string[] | number[];
    datasets: DataSetType[];
  
  }
  // just the label function
  export type DataSetType = {
    stack: string;
    label: any;
    data: string[];
    backgroundColor: string[];
    borderColor: string;
    borderWidth: number;
    barPercentage: number;
  }
  