import { Request, Response, NextFunction } from 'express';

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

export interface hostStats {
  cpuPerc: string,
  memPerc: string,
}

// for more info review actions.ts file and Settings.ts
export type ContainerProps = {
    stoppedList: StoppedListType[];
    runStopped: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    runStoppedContainer: (id: string) => void;
    removeContainer: (id: string) => void;
    refreshStoppedContainers: (data: StoppedContainerObj[]) => void;
    remove: (id: string, runStoppedContainerDispatcher: (id: string) => void) => void;
    stop: (id: string, refreshStoppedContainers: (data: StoppedContainerObj[]) => void) => void;
    runningList: RunningListType[];
    runIm: (id: ContainerType, runningList: RunningListType, callback_1: () => void, callback_2: () => void) => void;
    hostStats?: hostStats[];
  }

export type MetricsProps = {
  runningList: any[];
  threshold: any[];
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
  refreshStoppedContainers: (data: StoppedContainerObj[]) => void;
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

  export interface ContainerObj {
    BlockIO: string, 
    CPUPerc: string,
    Container: string,
    ID: string,
    MemPerc: string,
    MemUsage: string,
    Name: string,
    NetIO: string,
    PIDs: string,
    Image?: string,
    RunningFor?: string
  }
  
  export interface imageObj {
    reps: string, 
    tag: string, 
    imgid: string, 
    size: string
  }
  
  export interface ImagesProps {
    imagesList: imageObj[],
    runningList: ContainerObj[],
    refreshRunningContainers: (data: ContainerObj[]) => void,
    refreshImagesList: (data: imageObj[]) => void,
    runIm: (ele: imageObj, refreshRunningContainers: (data: ContainerObj[]) => void) => void,
    removeIm: ( id: string, imagesList: imageObj[], callback_1: (callback: any) => void, callback_2: (data: imageObj[]) => void) => void
  }

// for container's being run
export interface ContainerObj {
  BlockIO: string, 
  CPUPerc: string,
  Container: string,
  ID: string,
  MemPerc: string,
  MemUsage: string,
  Name: string,
  NetIO: string,
  PIDs: string,
  Image?: string,
  RunningFor?: string
}

// for container's being stopped
export interface StoppedContainerObj {
  Command: string,
  CreatedAt: string,
  ID: string,
  Image: string,
  Labels: string,
  LocalVolumes: string,
  Mounts: string,
  Names: string,
  Networks: string,
  Ports: string,
  RunningFor: string,
  Size: string,
  State: string,
  Status: string
}

export interface ImageObj {
  imgid: string,
  reps: string,
  size: string,
  tag: string
}

export interface UserObj {
  contact_pref: null | string,
  container_stops: true | false,
  cpu_threshold: number,
  email: string,
  mem_threshold: number,
  password: string,
  phone: string
  role: string,
  role_id: number,
  token: string,
  username: string,
    _id: number
}

export interface NetworkObj {
  CreatedAt: string,
  Driver: string,
  ID: string,
  IPv6: string,
  Internal: string,
  Labels: string, 
  Name: string,
  Scope: string
}

export interface VolumeObj {
  vol_name: string,
  containers: object[]
}

interface session {
  _id: string,
  username: string,
  email: string,
  phone: string,
  role: string,
  role_id: string,
  contact_pref: string,
  mem_threshold: string,
  cpu_threshold: string,
  container_stops: string,
  token: string,
  isLoggedIn: boolean,
  userList: any[]
}

// "any" has been used below since strict typing was used to define these props in the tabs types 
export interface containersList {
  runningList: any[],
  stoppedList: any[],
  hostStats: string[],
}

interface imagesList {
  imagesList: any[]
}

interface volumeList {
  arrayOfVolumeNames: any[]
  volumeContainersList: any[]
}

interface notificationList {
  phoneNumber: string[],
  memoryNotificationList: any[],
  cpuNotificationList: any[],
  stoppedNotificationList: any[],
}

export interface StateType {
  containersList: containersList,
  images: imagesList,
  notificationList: notificationList,
  session: session,
  volumeList: volumeList
}

export interface RootState {
  session: {
    isLoggedIn?: boolean,
    role: string,
  }
}

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

export interface stateType {
  runningList: RunningListType[],
  stoppedList: StoppedListType[],
  networkList: any[],
  composeStack: any[],
  hostStats: {[k: string]: number},
}

export const containerState: stateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
  hostStats: {}
};

export const graphState = {
  graphAxis: [],
  graphMemory: [
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
  graphCpu: [
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
  graphWrittenIO: [
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
  graphReadIO: [
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
  graphReceivedIO: [ // received IO
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
  graphTransmittedIO: [ // transmitted IO
    {
      label: '',
      data: [],
      fill: ''
    }
  ],
};

interface imagesState {
  imagesList: any[]
}

export const imageState: imagesState = {
  imagesList: []
};

export const notificationState = {
  phoneNumber: '',
  memoryNotificationList: new Set(),
  cpuNotificationList: new Set(),
  stoppedNotificationList: new Set()
};

export const logsState = {
  containerLogs: {
    stdoutLogs: [],
    stderrLogs: [],
  },
};

export const sessionState = {
  _id: "",
  username: "",
  email: "",
  phone: "",
  role: "",
  role_id: "",
  contact_pref: "",
  mem_threshold: "",
  cpu_threshold: "",
  container_stops: "",
  token: "",
  isLoggedIn: false,
  userList: [],
};

interface userType {
  userList: any[];
}

export const userState: userType = {
  userList: [],
};

export const userReducerState = {
  name: "",
  email: "",
  phone: "",
  role: "",
  role_id: "",
  contact_pref: "",
  mem_threshold: "",
  cpu_threshold: "",
  container_stops: false,
  isSysAdmin: false,
};

interface volumeType {
  arrayOfVolumeNames: any[];
  volumeContainersList: any[];
}

export const volumeState: volumeType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export interface auxObjType {
  container?: ContainerInterface;
  currentContainer?: any;
  containerName?: string;
}

export interface ContainerInterface {
  memory?: any;
  cpu?: any;
  writtenIO?: any;
  readIO?: any;
}

export interface obType {
  containerName?: any;
}

export interface LogsCardProps {
  container: ContainerType;
  index: number;
  status: any;
}

export interface RowsDataType {
  container: string;
  type: string;
  time: string;
  message: string;
  id: number;
}

export interface ToggleDisplayProps {
  container: RunningListType;
}


export interface UserInfo {
  _id: number;
  username: string;
  email: string;
  phone: string;
  role: string;
  role_id: number;
  contact_pref: string | null;
  mem_threshold: number;
  cpu_threshold: number;
  container_stops: boolean;
  token: string;
}

// ==========================================================
// Server-Side Typing
// ==========================================================

export type ServerError = {
  log: string, 
  status: number,
  message: {
      err: string
  }
}

export type SqlQuery = {
  query: (text: string, params?: any | any[], callback?: any) => void | any,
}

// ==========================================================
// Controller Types
// ==========================================================
export interface ApiController {
  sendEmailAlert: (req: Request, res: Response, next: NextFunction) => void,
  signupEmail: (req: Request, res: Response, next: NextFunction) => void,
}

export interface BcryptController {
 hashPassword: (req: Request, res: Response, next: NextFunction) => void,
 hashNewPassword: (req: Request, res: Response, next: NextFunction) => void,
 hashCookie: (req: Request, res: Response, next: NextFunction) => void
}

export interface CommandController{
  getContainers: (req: Request, res: Response, next: NextFunction) => void,
  getApiData: (req: Request, res: Response, next: NextFunction) => void,
  getHost: (req: Request, res: Response, next: NextFunction) => void,
  runImage: (req: Request, res: Response, next: NextFunction) => void,
  refreshStopped: (req: Request, res: Response, next: NextFunction) => void,
  refreshImages: (req: Request, res: Response, next: NextFunction) => void,
  remove: (req: Request, res: Response, next: NextFunction) => void,
  stopContainer: (req: Request, res: Response, next: NextFunction) => void,
  runStopped: (req: Request, res: Response, next: NextFunction) => void,
  removeImage: (req: Request, res: Response, next: NextFunction) => void,
  dockerPrune: (req: Request, res: Response, next: NextFunction) => void,
  pullImage: (req: Request, res: Response, next: NextFunction) => void,
  networkContainers: (req: Request, res: Response, next: NextFunction) => void,
  inspectDockerContainer: (req: Request, res: Response, next: NextFunction) => void,
  composeUp: (req: Request, res: Response, next: NextFunction) => void,
  composeStacks: (req: Request, res: Response, next: NextFunction) => void,
  composeDown: (req: Request, res: Response, next: NextFunction) => void,
  getAllDockerVolumes: (req: Request, res: Response, next: NextFunction) => void,
  getVolumeContainers: (req: Request, res: Response, next: NextFunction) => void,
  getLogs: (req: Request, res: Response, next: NextFunction) => void,
}
export interface CookieController {
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => void,
  setAdminCookie: (req: Request, res: Response, next: NextFunction) => void,
}

export interface ConfigController{
  configureThresholds: (req: Request, res: Response, next: NextFunction) => void,
  updateContactPref: (req: Request, res: Response, next: NextFunction) => void,
  updateCPUThreshold: (req: Request, res: Response, next: NextFunction) => void,
  updateMemThreshold: (req: Request, res: Response, next: NextFunction) => void,
  updateStopPref: (req: Request, res: Response, next: NextFunction) => void,
}

export interface DbController{
  createRoles: (req: Request, res: Response, next: NextFunction) => void,
  insertRoles: (req: Request, res: Response, next: NextFunction) => void,
  createTable: (req: Request, res: Response, next: NextFunction) => void,
  insertAdmin: (req: Request, res: Response, next: NextFunction) => void,
  createAdminPassword: (req: Request, res: Response, next: NextFunction) => void,
  removeToken: (req: Request, res: Response, next: NextFunction) => void,
}

export interface InitController{
  initDatabase: (req: Request, res: Response, next: NextFunction) => void,
  timeZone: (req: Request, res: Response, next: NextFunction) => void,
  gitUrl: (req: Request, res: Response, next: NextFunction) => void,
  addMetrics: (req: Request, res: Response, next: NextFunction) => void,
  getMetrics:(req: Request, res: Response, next: NextFunction) => void,
}

export interface SettingsController {
  addContainer: (req: Request, res: Response, next: NextFunction) => void,
  addContainerSettings: (req: Request, res: Response, next: NextFunction) => void,
  deleteContainerSettings: (req: Request, res: Response, next: NextFunction) => void,
  notificationSettings: (req: Request, res: Response, next: NextFunction) => void,
  addPhoneNumber: (req: Request, res: Response, next: NextFunction) => void,
  notificationFrequency: (req: Request, res: Response, next: NextFunction) => void,
  monitoringFrequency: (req: Request, res: Response, next: NextFunction) => void,
  addGitLinks: (req: Request, res: Response, next: NextFunction) => void,
}

export interface SignupController {
  usernameCheck: (req: Request, res: Response, next: NextFunction) => void,
  passwordCheck: (req: Request, res: Response, next: NextFunction) => void,
}

export interface UserController {
  createUser: (req: Request, res: Response, next: NextFunction) => void,
  getAllUsers: (req: Request, res: Response, next: NextFunction) => void,
  getOneUser: (req: Request, res: Response, next: NextFunction) => void,
  verifyUser: (req: Request, res: Response, next: NextFunction) => void,
  checkSysAdmin: (req: Request, res: Response, next: NextFunction) => void,
  switchUserRole: (req: Request, res: Response, next: NextFunction) => void,
  updatePassword: (req: Request, res: Response, next: NextFunction) => void,
  updatePhone: (req: Request, res: Response, next: NextFunction) => void,
  updateEmail: (req: Request, res: Response, next: NextFunction) => void,
}

