import { Request, Response, NextFunction } from 'express';

// Refer to the Settings Tab for more information on stoppedList and runningList

export interface UserInfo {
  // removed password property on userInfo as it's not being used.
  // changed id from number type to string type so see if that breaks anything
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  // changed role_id from number to string check if that broke anything
  role_id: string;
  contact_pref: string;
  // changed memthreshold from number to string to align with sessionState in sessions reducer. see if it broke something
  mem_threshold: string;
  // changed cpu threshold from number to string let's see what happens
  cpu_threshold: string;
  // changed container_stops from boolean to string so let's see what happens
  container_stops: string;
  token: string;
}
export interface sessionStateType {
  _id: string;
  username: string;
  email: string;
  phone: string;
  role: string;
  role_id: string;
  contact_pref: string;
  mem_threshold: string;
  cpu_threshold: string;
  container_stops: string;
  token: string;
  isLoggedIn: boolean;
  userList: any[];
}
export interface StoppedListType {
  Names?: string;
  ID: string;
  Image: string;
  RunningFor: string;
  Img: string;
  Created: string;
  name: string;
}
export interface RunningListType {
  Names?: string;
  ID: string;
  Image: string;
  RunningFor: string;
}

// for more info review actions.ts file and Settings.ts
export type ContainerProps = {
  stoppedList: StoppedListType[];
  runStopped: (
    id: string,
    runStoppedContainerDispatcher: (id: string) => void,
  ) => void;
  runStoppedContainer: (id: string) => void;
  removeContainer: (id: string) => void;
  refreshStoppedContainers: (data: StoppedContainerObj[]) => void;
  remove: (
    id: string,
    runStoppedContainerDispatcher: (id: string) => void,
  ) => void;
  stop: (
    id: string,
    refreshStoppedContainers: (data: StoppedContainerObj[]) => void,
  ) => void;
  runningList: RunningListType[];
  runIm: (
    id: ContainerType,
    runningList: RunningListType,
    callback_1: () => void,
    callback_2: () => void,
  ) => void;
};

export type MetricsProps = {
  runningList: any[];
  threshold: any[];
};

// Stopped containers have a Names key and running containers have a Name key
export type ContainerType = {
  Names?: string;
  ID: string;
  Image: string;
  RunningFor: string;
};

export type RunningContainerType = {
  Names?: string;
  ID: string;
  Image: string;
  RunningFor: string;
};

export type ChartInfoType = {
  labels: string[];
  datasets: DataSetType[];
  data?: any;
};

export type DataSetType = {
  stack: string;
  label: string;
  data: string[];
  backgroundColor: string[];
  borderColor: string;
  borderWidth: number;
  barPercentage: number;
};

export type DispatchType = (...args: any[]) => void;

export type WindowType = {
  nodeMethod: NodeMethodType;
};

type NodeMethodType = {
  rendInvoke: (arg1: string, arg2: string | RendInvokebody) => Promise<any>;
};

type RendInvokebody = {
  code: string;
  mobileNumber: string;
};

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

export interface ContainerObj {
  Container: string;
  ID: string;
  Image?: string;
  RunningFor?: string;
}

export interface imageObj {
  reps: string;
  tag: string;
  imgid: string;
  size: string;
}

export interface ImagesProps {
  imagesList: imageObj[];
  runningList: ContainerObj[];
  refreshRunningContainers: (data: ContainerObj[]) => void;
  refreshImagesList: (data: imageObj[]) => void;
  runIm: (
    ele: imageObj,
    refreshRunningContainers: (data: ContainerObj[]) => void,
  ) => void;
  removeIm: (
    id: string,
    imagesList: imageObj[],
    callback_1: (callback: any) => void,
    callback_2: (data: imageObj[]) => void,
  ) => void;
}

// for container's being run
export interface ContainerObj {
  Container: string;
  ID: string;
  Names: string;
  Image?: string;
  RunningFor?: string;
}

// for container's being stopped
export interface StoppedContainerObj {
  Command: string;
  CreatedAt: string;
  ID: string;
  Image: string;
  Labels: string;
  LocalVolumes: string;
  Mounts: string;
  Names: string;
  Networks: string;
  Ports: string;
  RunningFor: string;
  Size: string;
  State: string;
  Status: string;
}

export interface ImageObj {
  imgid: string;
  reps: string;
  size: string;
  tag: string;
}

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

export interface VolumeObj {
  vol_name: string;
  containers: object[];
}

// "any" has been used below since strict typing was used to define these props in the tabs types
export interface containersList {
  runningList: any[];
  stoppedList: any[];
}

interface imagesList {
  imagesList: any[];
}

interface volumeList {
  arrayOfVolumeNames: any[];
  volumeContainersList: any[];
}

interface notificationList {
  phoneNumber: string[];
  memoryNotificationList: any[];
  cpuNotificationList: any[];
  stoppedNotificationList: any[];
}

export interface StateType {
  containersList: containersList;
  images: imagesList;
  notificationList: notificationList;
  session: sessionStateType;
  volumeList: volumeList;
}

export interface RootState {
  session: {
    isLoggedIn?: boolean;
    role: string;
  };
}

export interface containerStateType {
  runningList: RunningListType[];
  stoppedList: StoppedListType[];
  networkList: any[];
  composeStack: any[];
}

export interface graphDataType {
  label: string;
  data: any[];
  fill: string;
}
// need to update this with proper var types
export interface graphStateType {
  graphAxis: any[];
  graphMemory: graphDataType[];
  graphCpu: graphDataType[];
  graphWrittenIO: graphDataType[];
  graphReadIO: graphDataType[];
  graphReceivedIO: graphDataType[];
  graphTransmittedIO: graphDataType[];
}

// need to get type of imagesList later
export interface imagesStateType {
  imagesList: any[];
}

// need to get type of the sets later by seeing what data is in the notification lists
export interface notificationStateType {
  phoneNumber: string;
  memoryNotificationList: Set<any>;
  cpuNotificationList: Set<any>;
  stoppedNotificationList: Set<any>;
}

export interface containerLogsType {
  stdout: any[];
  stderr: any[];
}
export interface logsStateType {
  containerLogs: containerLogsType;
}

export interface userStateType {
  userList: any[];
}

export interface userReducerStateType {
  name: string;
  email: string;
  phone: string;
  role: string;
  role_id: string;
  contact_pref: string;
  mem_threshold: string;
  cpu_threshold: string;
  container_stops: boolean;
  isSysAdmin: boolean;
}

export interface volumeStateType {
  arrayOfVolumeNames: any[];
  volumeContainersList: any[];
}

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
  container: string | undefined;
  type: string;
  time: string;
  message: string;
  id: number;
}

export interface ToggleDisplayProps {
  container: RunningListType;
}

// ==========================================================
// Server-Side Typing
// ==========================================================

export type ServerError = {
  log: string;
  status: number;
  message: {
    err: string;
  };
};

export type SqlQuery = {
  query: (text: string, params?: any | any[], callback?: any) => void | any;
};

// ==========================================================
// Controller Types
// ==========================================================
export interface ApiController {
  sendEmailAlert: (req: Request, res: Response, next: NextFunction) => void;
  signupEmail: (req: Request, res: Response, next: NextFunction) => void;
}

export interface BcryptController {
  hashPassword: (req: Request, res: Response, next: NextFunction) => void;
  hashNewPassword: (req: Request, res: Response, next: NextFunction) => void;
  hashCookie: (req: Request, res: Response, next: NextFunction) => void;
}

export interface CommandController {
  getContainers: (req: Request, res: Response, next: NextFunction) => void;
  runImage: (req: Request, res: Response, next: NextFunction) => void;
  refreshStopped: (req: Request, res: Response, next: NextFunction) => void;
  refreshImages: (req: Request, res: Response, next: NextFunction) => void;
  remove: (req: Request, res: Response, next: NextFunction) => void;
  stopContainer: (req: Request, res: Response, next: NextFunction) => void;
  runStopped: (req: Request, res: Response, next: NextFunction) => void;
  removeImage: (req: Request, res: Response, next: NextFunction) => void;
  dockerPrune: (req: Request, res: Response, next: NextFunction) => void;
  pullImage: (req: Request, res: Response, next: NextFunction) => void;
  networkContainers: (req: Request, res: Response, next: NextFunction) => void;
  inspectDockerContainer: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  composeUp: (req: Request, res: Response, next: NextFunction) => void;
  composeStacks: (req: Request, res: Response, next: NextFunction) => void;
  composeDown: (req: Request, res: Response, next: NextFunction) => void;
  getAllDockerVolumes: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  getVolumeContainers: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  getLogs: (req: Request, res: Response, next: NextFunction) => void;
}
export interface CookieController {
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => void;
  setAdminCookie: (req: Request, res: Response, next: NextFunction) => void;
}

export interface ConfigController {
  configureThresholds: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  updateContactPref: (req: Request, res: Response, next: NextFunction) => void;
  updateCPUThreshold: (req: Request, res: Response, next: NextFunction) => void;
  updateMemThreshold: (req: Request, res: Response, next: NextFunction) => void;
  updateStopPref: (req: Request, res: Response, next: NextFunction) => void;
}

export interface DbController {
  createRoles: (req: Request, res: Response, next: NextFunction) => void;
  insertRoles: (req: Request, res: Response, next: NextFunction) => void;
  createTable: (req: Request, res: Response, next: NextFunction) => void;
  insertAdmin: (req: Request, res: Response, next: NextFunction) => void;
  createAdminPassword: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  removeToken: (req: Request, res: Response, next: NextFunction) => void;
}

export interface InitController {
  gitUrl: (req: Request, res: Response, next: NextFunction) => void;
  addMetrics: (req: Request, res: Response, next: NextFunction) => void;
  getMetrics: (req: Request, res: Response, next: NextFunction) => void;
}

export interface SettingsController {
  addContainer: (req: Request, res: Response, next: NextFunction) => void;
  addContainerSettings: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  deleteContainerSettings: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  notificationSettings: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  addPhoneNumber: (req: Request, res: Response, next: NextFunction) => void;
  notificationFrequency: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  monitoringFrequency: (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void;
  addGitLinks: (req: Request, res: Response, next: NextFunction) => void;
}

export interface SignupController {
  usernameCheck: (req: Request, res: Response, next: NextFunction) => void;
  passwordCheck: (req: Request, res: Response, next: NextFunction) => void;
}

export interface UserController {
  createUser: (req: Request, res: Response, next: NextFunction) => void;
  getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
  getOneUser: (req: Request, res: Response, next: NextFunction) => void;
  verifyUser: (req: Request, res: Response, next: NextFunction) => void;
  checkSysAdmin: (req: Request, res: Response, next: NextFunction) => void;
  switchUserRole: (req: Request, res: Response, next: NextFunction) => void;
  updatePassword: (req: Request, res: Response, next: NextFunction) => void;
  updatePhone: (req: Request, res: Response, next: NextFunction) => void;
  updateEmail: (req: Request, res: Response, next: NextFunction) => void;
}
