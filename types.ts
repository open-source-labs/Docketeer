import { Request, Response, NextFunction } from 'express';

// * BH: I think we should have a separate file for each interface, and then import them into this file. That way, we can keep the interfaces organized and not have to scroll through a huge file to find the interface we need.

// ==============================================
// USER TYPES
// ==============================================
interface UserBase {
  username: string;
  password: string;
}

interface User extends UserBase {
  username: string;
  password: string;
  // changed role_id from number to string check if that broke anything (from previous group)
  role_id: string;
}

// ? not used anymore?
export interface SignUpValues extends UserBase {
  passwordConfirmation: string;
  showPassword: boolean;
}

export interface UserInfo extends User {
// ? not used anymore?
export interface SignUpValues extends UserBase {
  passwordConfirmation: string;
  showPassword: boolean;
}

export interface UserInfo extends User {
  // removed password property on userInfo as it's not being used.
  // changed id from number type to string type so see if that breaks anything
  _id: string;
  email: string;
  phone: string;
  role: string;
  contact_pref: string;
  // changed memthreshold from string to string to align with sessionState in sessions reducer. see if it broke something
  // changed memthreshold from string to string to align with sessionState in sessions reducer. see if it broke something
  mem_threshold: string;
  // changed cpu threshold from string to string let's see what happens
  // changed cpu threshold from string to string let's see what happens
  cpu_threshold: string;
  // changed container_stops from boolean to string so let's see what happens
  container_stops: string;
  token: string;
}

export interface SessionStateType extends UserInfo {
  isLoggedIn: boolean;
  // userList: any[];
}

export interface RootState {
  session: {
    isLoggedIn?: boolean;
    role: string;
  };
}

export interface userStateType {
  userList: UserInfo[];
}

export interface userReducerStateType {
  name: string;

export interface SessionStateType extends UserInfo {
  isLoggedIn: boolean;
  // userList: any[];
}

export interface RootState {
  session: {
    isLoggedIn?: boolean;
    role: string;
  };
}

export interface userStateType {
  userList: UserInfo[];
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

// ==============================================
// CONTAINER TYPES
// ==============================================
// Stopped containers have a Names key and running containers have a Name key
export interface ContainerType {
  ID: string;
  Names?: string;
  Names?: string;
  Image?: string;
  RunningFor?: string;
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
//   Image: string;
//   RunningFor: string;
// }

export interface ContainerStateType {
  runningList: ContainerType[];
  stoppedList: StoppedListType[];
  networkList: any[];
  composeStack: any[];
}

// for container's being run
export interface ContainerObj extends ContainerType {
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
  Networks: string;
  Ports: string;
  Size: string;
  State: string;
  Status: string;
}

export interface containersList {
  runningList: any[];
  stoppedList: any[];
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
  imagesList: ImageObj[];
}

// ==============================================
// LOGS TYPES
// ==============================================
export interface LogObject {
  timeStamp: string;
  logMsg: string;
  containerName: string;
}

// ? might delete this if we get rid of ProcessLogsCards component
export interface LogsCardProps {
  container: ContainerType;
  index: number;
  status: any;
}

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
}

// ==============================================
// VOLUME TYPES
// ==============================================
export interface VolumeContainerObj {
  Names: string;
  State?: string | undefined;
  Status?: string | undefined;
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
        handleDeny: (() => void) | null
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
  container: ContainerType;
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
// MiddleWare Function Type
// ==========================================================
export type MiddleWareFunction = (req: Request, res: Response, next: NextFunction) => void;

// ==========================================================
// Controller Types
// ==========================================================
export interface ApiController {
  sendEmailAlert:  MiddleWareFunction;
  signupEmail:  MiddleWareFunction;
}

export interface BcryptController {
  /**
   * @description destructures password from req.body then hashes it and adds it to locals under 'hash'
   */
  hashPassword: MiddleWareFunction;
  
  /**
   * @description destructures new password from req.body then hashes it and adds it to locals under 'newHashedPassword'
   */
  hashNewPassword: MiddleWareFunction;
  
  /**
   * @description destructures new password from req.body then hashes it and adds it to locals under 'newHashedPassword'
   */
  hashCookie:  MiddleWareFunction;
}

export interface CommandController {
  /**
   * @description pulls running container info from docker ps command as a json object
   */
  getContainers: MiddleWareFunction;

  /**
   * @description executes the docker run command with parameters from body: reps, tag
   * @note imgid is not used; may want it swapped with containerId in the exec?
   */
  runImage: MiddleWareFunction;

  /**
   * @description executes the docker ps command with status=exited flag to get list of stopped containers
   */
  refreshStopped: MiddleWareFunction;
  
  /**
   * @description executes the docker image command to get list of pulled images; invokes convertArrToObj and passes resulting value in locals to imagesList
   */
  refreshImages: MiddleWareFunction;

   /**
   * @description executes docker rm {containerId} command to remove a stopped container
   * @note id is grabbed from req.query
   */
  remove: MiddleWareFunction;
  
  /**
   * @description executes docker stop {id} command to stop a running container
   * @note id is grabbed from req.query
   */
  stopContainer: MiddleWareFunction;
  
  /**
   * @description executes docker start {id} command to run a stopped container
   * @note id is grabbed from req.query
   */
  runStopped: MiddleWareFunction;
  
  /**
   * @description executes `docker rmi -f {id} command to remove a pulled image
   * @note id is grabbed from req.query
   */
  removeImage: MiddleWareFunction;
  
  /**
   * @description executes docker system prune --force command to remove all unused containers, networks, images (both dangling and unreferenced); passes a string to prop 'pruneMessage' in locals relaying the prune
   */
  dockerPrune: MiddleWareFunction;
  
  /**
   * @description executes docker pull {repo} command to pull a new image; send a string to locals 'imgMessage'
   * @note image's repo name grabbed from req.query
   */
  pullImage: MiddleWareFunction;
  
  /**
   * @description Display all containers network based on docker-compose in a json object; when the application starts
   */
  networkContainers: MiddleWareFunction;
  
  /**
   * @description inspects docker containers
   * @note is not implemented right now
   */
  inspectDockerContainer: MiddleWareFunction;

  /**
   * @description compose up a network and container from an uploaded yml file
   * @note file path is grabbed from req.body
   */
  composeUp: MiddleWareFunction;

  /**
   * @description get a list of all current container networks, based on running containers; passes the output to locals
   * @note grabs file path and yml file name from req.body
   */
  composeStacks: MiddleWareFunction;

  /**
   * @description composes down a container and network
   * @note (from v10): causes server to shut down because container is not properly
  stopped; button goes away when you leave the page because the
  file name and location are not in "docker networks" so it gets
  erased from the state
   */
  composeDown: MiddleWareFunction;

  /**
   * @description retrieves the list of running volumes; passes the output to 'dockerVolumes' in locals
   */
  getAllDockerVolumes: MiddleWareFunction;

  /**
   * @description runs docker ps filtering by volume name to get list of containers running in the specified volume; passes output to 'volumeContainers' in locals
   * @note grabs volume name from query
   */
  getVolumeContainers: MiddleWareFunction;

  /**
   * @description runs docker logs with timestamps and presists 'containerLogs' though locals, invokes makeArrayOfObjects passing in stdout/err to add to the 'containerLogs' obj
   */
  getLogs: MiddleWareFunction;
}

// this is not used
export interface CookieController {
  setSSIDCookie: (req: Request, res: Response, next: NextFunction) => void;
  setAdminCookie: (req: Request, res: Response, next: NextFunction) => void;
}

export interface ConfigController {
  configureThresholds: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  updateContactPref: (req: Request, res: Response, next: NextFunction) => void;
  updateCPUThreshold: (req: Request, res: Response, next: NextFunction) => void;
  updateMemThreshold: (req: Request, res: Response, next: NextFunction) => void;
  updateStopPref: (req: Request, res: Response, next: NextFunction) => void;
}


export interface DbController {

  /**
  * @description creates a database table called "roles" if it doesn't exist. db.query executes SQL query.
  * @note OIDS is optional for this middleware
   */
  createRolesTable: MiddleWareFunction;

  /**
  * @description inserts 3 rows into databse for "roles": "system admin" (1), "admin" (2), "user" (3)
  * @note uses single SQl query for all 3 rows in terms of string query
   */
  insertRoles: MiddleWareFunction;

  /**
  * @description Creates a table in database called "users" with user and container info
  */
  createUsersTable: MiddleWareFunction;

  // not used
  // insertAdmin: (req: Request, res: Response, next: NextFunction) => void;

  /**
   * @description Creates a hashed password for the system admin user with 10 salt rounds (decrease for faster processing)
   * @note adds the password as a string for the res.locals object
   */
  createAdminPassword: MiddleWareFunction;

  /**
   * @description Updates user token in the database
   * @note Destructures username and token from request body
   */
  addToken: MiddleWareFunction;

  /**
   * @description Removes token (sets token to null) after user logs out.
   * @note Destructures username from request body. Logout propery is created if SQL query is able to update users token to null.
   */
  removeToken: MiddleWareFunction;
}

export interface InitController {

  /**
   * @description Obtains github URL from containers name, and assigns it to 'parameter'
   * @note 'url' property is set on res.locals upon success
   */
  gitUrl: MiddleWareFunction;

  /**
   * @description adds metrics to our metrics table of each individual container
   */
  addMetrics: MiddleWareFunction;

  /**
   * @description Obtains metrics data
   * @note returns a promise with an object that has the data, located in 'rows'
   */
  getMetrics: MiddleWareFunction;
}

// not used
export interface SettingsController {
  addContainer: (req: Request, res: Response, next: NextFunction) => void;
  addContainerSettings: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  deleteContainerSettings: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  notificationSettings: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  addPhoneNumber: (req: Request, res: Response, next: NextFunction) => void;
  notificationFrequency: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  monitoringFrequency: (
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  addGitLinks: (req: Request, res: Response, next: NextFunction) => void;
}

export interface SignupController {
  /**
   * @description Checks if username already exists in the database
   * @note If user exists, error handler will return an error object with the relevant middleware passing from next()
   */
  usernameCheck: MiddleWareFunction;

  /**
   * @description Checks if password is at least 6 characters long
   * @note Only performed if usernameCheck is successful with NO errors
   */
  passwordCheck: MiddleWareFunction;
}

export interface UserController {
  /**
   * @description  Performs SQL query to insert a new record into "users" table and then RETURNS those values.
   * @note Extract isername, password, and role ID from req.body
   */
  createUser: MiddleWareFunction;

  /**
   * @description  Gets all users; returned in an array
   * @note Sorts them by ASCENDING order
   */
  getAllUsers: MiddleWareFunction;

  /**
   * @description  Gets a single user yser
   * @note Uses destructuring for _id from req.body
   */
  getOneUser: MiddleWareFunction;

  /**
   * @description  verifies username/password are correct and sends back that user info; otherwise sends an error message
   * @note Extract the username and password from req.body. Any errors get passed onto an error object.
   */
  verifyUser: MiddleWareFunction;

  /**
   * @description  grabs all users that have a role of system admin and adds rowCount and id of the users to locals
   * @note System admin ID has a role_id of 1
   */
  checkSysAdmin: MiddleWareFunction;

  /**
   * @description  switches role of user in database upon designation by system admin; must be provided id of user and role
   * @note roleMap maps role strings to the role ID's. If there is only one system admin and the _id's match, it results in an error from hasError being true.
   */
  switchUserRole: MiddleWareFunction;

  /**
   * @description  Checks for error prop in locals; if none, updates password and adds user with updated pw to locals
   * @note If incorrect password is entered, then res.locals error property will exist and next() will occur because error.
   */
  updatePassword: MiddleWareFunction;

  /**
   * @description   updates the phone number of a user; column is 'phone'
   */
  updatePhone: MiddleWareFunction;

  /**
   * @description   updates the email of a user
   */
  updateEmail: MiddleWareFunction;

  /**
   * @description  adds a cookie to our user's browser to signify they are logged in
   */
  addCookie: MiddleWareFunction

  /**
   * @description  checks if user has a valid cookie
   */
  checkCookie: MiddleWareFunction

  /**
   * @description  removes our user's cookie
   */
  removeCookie: MiddleWareFunction
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

export interface GlobalErrorObject {
  log: string;
  status: number;
  message: { err: string };
}

// export interface containersList {
//   runningList: any[];
//   stoppedList: any[];
// }

// interface volumeList {
//   arrayOfVolumeNames: any[];
//   volumeContainersList: any[];
// }

// export interface ArrayOfVolumeNames {Name: string}[];

// "any" has been used below since strict typing was used to define these props in the tabs types

// interface imagesList {
//   imagesList: any[];
// }

// for more info review actions.ts file and Settings.ts
// export type ContainerProps = {
//   stoppedList: StoppedListType[];
//   runStopped: (
//     id: string,
//     runStoppedContainerDispatcher: (id: string) => void
//   ) => void;
//   runStoppedContainer: (id: string) => void;
//   removeContainer: (id: string) => void;
//   refreshStoppedContainers: (data: StoppedContainerObj[]) => void;
//   remove: (
//     id: string,
//     runStoppedContainerDispatcher: (id: string) => void
//   ) => void;
//   stop: (
//     id: string,
//     refreshStoppedContainers: (data: StoppedContainerObj[]) => void
//   ) => void;
//   runningList: RunningListType[];
//   runIm: (
//     id: ContainerType,
//     runningList: RunningListType,
//     callback_1: () => void,
//     callback_2: () => void
//   ) => void;
// };

// export type MetricsProps = {
//   runningList: any[];
//   threshold: any[];
// };

// export type RunningContainerType = {
//   Names?: string;
//   ID: string;
//   Image: string;
//   RunningFor: string;
// };

// not used at all since charts are not being used
// export type ChartInfoType = {
//   labels: string[];
//   datasets: DataSetType[];
//   data?: any;
// };

// export type DataSetType = {
//   stack: string;
//   label: string;
//   data: string[];
//   backgroundColor: string[];
//   borderColor: string;
//   borderWidth: number;
//   barPercentage: number;
// };

// export type DispatchType = (...args: any[]) => void;

// export type WindowType = {
//   nodeMethod: NodeMethodType;
// };

// type NodeMethodType = {
//   rendInvoke: (arg1: string, arg2: string | RendInvokebody) => Promise<any>;
// };

// type RendInvokebody = {
//   code: string;
//   mobileNumber: string;
// };

// export type SettingsProps = {
//   addMonitoringFrequency: (data: any) => void;
//   addMemoryNotificationSetting: (data: any) => void;
//   addCpuNotificationSetting: (data: any) => void;
//   addStoppedNotificationSetting: (data: any) => void;
//   addPhoneNumber: (data: any) => void;
//   addNotificationFrequency: (data: any) => void;
//   runningList: any[];
//   stop?: (id: any, callback: any) => void;
//   stoppedList: any[];
//   refreshStoppedContainers: (data: StoppedContainerObj[]) => void;
//   runStopped: (id: any, runStoppedContainerDispatcher: any) => void;
//   refreshRunningContainers: (data: any[]) => void;
//   runStoppedContainer: (id: string) => void;
//   phoneNumber?: string[];
//   memoryNotificationList: any[];
//   cpuNotificationList: any[];
//   stoppedNotificationList: any[];
// };

// export interface imageObj {
//   reps: string;
//   tag: string;
//   imgid: string;
//   size: string;
// }

// export interface ImagesProps {
//   imagesList: imageObj[];
//   runningList: ContainerObj[];
//   refreshRunningContainers: (data: ContainerObj[]) => void;
//   refreshImagesList: (data: imageObj[]) => void;
//   runIm: (
//     ele: imageObj,
//     refreshRunningContainers: (data: ContainerObj[]) => void
//   ) => void;
//   removeIm: (
//     id: string,
//     imagesList: imageObj[],
//     callback_1: (callback: any) => void,
//     callback_2: (data: imageObj[]) => void
//   ) => void;
// }

// export interface NetworkObj {
//   CreatedAt: string;
//   Driver: string;
//   ID: string;
//   IPv6: string;
//   Internal: string;
//   Labels: string;
//   Name: string;
//   Scope: string;
// }

// export interface VolumeObj {
//   vol_name: string;
//   containers: object[];
// }

// export interface logObject {
//   timeStamp: string;
//   logMsg: string;
//   containerName: string;
// }

// export interface composeStacksDockerObject {
//   Name: string[];
//   FilePath: string;
//   YmlFileName: string;
// }

// // "any" has been used below since strict typing was used to define these props in the tabs types
// export interface containersList {
//   runningList: any[];
//   stoppedList: any[];
// }

// interface volumeList {
//   arrayOfVolumeNames: any[];
//   volumeContainersList: any[];
// }

// interface notificationList {
//   phoneNumber: string[];
//   memoryNotificationList: any[];
//   cpuNotificationList: any[];
//   stoppedNotificationList: any[];
// }

// export interface AlertStateType {
//   alertList: (string | null)[];
//   promptList:
//     | [
//         prompt: string | null,
//         handleAccept: (() => void) | null,
//         handleDeny: (() => void) | null
//       ]
//     | null[];
// }

// export interface StateType {
//   containersList: containersList;
//   images: imagesList;
//   notificationList: notificationList;
//   session: sessionStateType;
//   volumeList: volumeList;
// }

// export interface RootState {
//   session: {
//     isLoggedIn?: boolean;
//     role: string;
//   };
// }

// export interface graphDataType {
//   label: string;
//   data: any[];
//   fill: string;
// }
// need to update this with proper var types
// export interface graphStateType {
//   graphAxis: any[];
//   graphMemory: graphDataType[];
//   graphCpu: graphDataType[];
//   graphWrittenIO: graphDataType[];
//   graphReadIO: graphDataType[];
//   graphReceivedIO: graphDataType[];
//   graphTransmittedIO: graphDataType[];
// }

// need to get type of the sets later by seeing what data is in the notification lists
// export interface notificationStateType {
//   phoneNumber: string;
//   memoryNotificationList: Set<any>;
//   cpuNotificationList: Set<any>;
//   stoppedNotificationList: Set<any>;
// }

// export interface stdType {
//   containerName: string;
//   logMsg: string;
//   timestamp: string;
// }

// export interface containerLogsType {
//   stdout: stdType[];
//   stderr: stdType[];
// }

// export interface logsStateType {
//   containerLogs: containerLogsType;
// }

// export interface userStateType {
//   userList: UserInfo[];
// }

// export interface userReducerStateType {
//   name: string;
//   email: string;
//   phone: string;
//   role: string;
//   role_id: string;
//   contact_pref: string;
//   mem_threshold: string;
//   cpu_threshold: string;
//   container_stops: boolean;
//   isSysAdmin: boolean;
// }

// export interface volumeStateType {
//   arrayOfVolumeNames: ArrayOfVolumeNames;
//   volumeContainersList: VolumeObj[];
// }

// export type ArrayOfVolumeNames = { Name: string }[];

// export interface auxObjType {
//   container?: ContainerInterface;
//   currentContainer?: any;
//   containerName?: string;
// }

// export interface ContainerInterface {
//   memory?: any;
//   cpu?: any;
//   writtenIO?: any;
//   readIO?: any;
// }

// export interface obType {
//   containerName?: any;
// }

// export interface LogsCardProps {
//   container: ContainerType;
//   index: number;
//   status: any;
// }

// export interface RowsDataType {
//   container: string | undefined;
//   type: string;
//   time: string;
//   message: string;
//   id: number;
// }

// export interface ToggleDisplayProps {
//   container: ContainerType;
// }

// ==========================================================
// Server-Side Typing
// ==========================================================
// export type ServerError = {
//   log: string;
//   status: number;
//   message: {
//     err: string;
//   };
// };

// export type SqlQuery = {
//   query: (text: string, params?: any | any[], callback?: any) => void | any;
// };

// ==========================================================
// Controller Types
// ==========================================================
// export interface ApiController {
//   sendEmailAlert: (req: Request, res: Response, next: NextFunction) => void;
//   signupEmail: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface BcryptController {
//   hashPassword: (req: Request, res: Response, next: NextFunction) => void;
//   hashNewPassword: (req: Request, res: Response, next: NextFunction) => void;
//   hashCookie: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface CommandController {
//   getContainers: (req: Request, res: Response, next: NextFunction) => void;
//   runImage: (req: Request, res: Response, next: NextFunction) => void;
//   refreshStopped: (req: Request, res: Response, next: NextFunction) => void;
//   refreshImages: (req: Request, res: Response, next: NextFunction) => void;
//   remove: (req: Request, res: Response, next: NextFunction) => void;
//   stopContainer: (req: Request, res: Response, next: NextFunction) => void;
//   runStopped: (req: Request, res: Response, next: NextFunction) => void;
//   removeImage: (req: Request, res: Response, next: NextFunction) => void;
//   dockerPrune: (req: Request, res: Response, next: NextFunction) => void;
//   pullImage: (req: Request, res: Response, next: NextFunction) => void;
//   networkContainers: (req: Request, res: Response, next: NextFunction) => void;
//   inspectDockerContainer: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   composeUp: (req: Request, res: Response, next: NextFunction) => void;
//   composeStacks: (req: Request, res: Response, next: NextFunction) => void;
//   composeDown: (req: Request, res: Response, next: NextFunction) => void;
//   getAllDockerVolumes: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   getVolumeContainers: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   getLogs: (req: Request, res: Response, next: NextFunction) => void;
// }
// export interface CookieController {
//   setSSIDCookie: (req: Request, res: Response, next: NextFunction) => void;
//   setAdminCookie: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface ConfigController {
//   configureThresholds: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   updateContactPref: (req: Request, res: Response, next: NextFunction) => void;
//   updateCPUThreshold: (req: Request, res: Response, next: NextFunction) => void;
//   updateMemThreshold: (req: Request, res: Response, next: NextFunction) => void;
//   updateStopPref: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface DbController {
//   createRoles: (req: Request, res: Response, next: NextFunction) => void;
//   insertRoles: (req: Request, res: Response, next: NextFunction) => void;
//   createTable: (req: Request, res: Response, next: NextFunction) => void;
//   //  insertAdmin: (req: Request, res: Response, next: NextFunction) => void; // not used
//   createAdminPassword: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   removeToken: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface InitController {
//   gitUrl: (req: Request, res: Response, next: NextFunction) => void;
//   addMetrics: (req: Request, res: Response, next: NextFunction) => void;
//   getMetrics: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface SettingsController {
//   addContainer: (req: Request, res: Response, next: NextFunction) => void;
//   addContainerSettings: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   deleteContainerSettings: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   notificationSettings: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   addPhoneNumber: (req: Request, res: Response, next: NextFunction) => void;
//   notificationFrequency: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   monitoringFrequency: (
//     req: Request,
//     res: Response,
//     next: NextFunction
//   ) => void;
//   addGitLinks: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface SignupController {
//   usernameCheck: (req: Request, res: Response, next: NextFunction) => void;
//   passwordCheck: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface UserController {
//   createUser: (req: Request, res: Response, next: NextFunction) => void;
//   getAllUsers: (req: Request, res: Response, next: NextFunction) => void;
//   getOneUser: (req: Request, res: Response, next: NextFunction) => void;
//   verifyUser: (req: Request, res: Response, next: NextFunction) => void;
//   checkSysAdmin: (req: Request, res: Response, next: NextFunction) => void;
//   switchUserRole: (req: Request, res: Response, next: NextFunction) => void;
//   updatePassword: (req: Request, res: Response, next: NextFunction) => void;
//   updatePhone: (req: Request, res: Response, next: NextFunction) => void;
//   updateEmail: (req: Request, res: Response, next: NextFunction) => void;
// }

// export interface ContainerNetworkObject {
//   Name: string;
//   Id: string;
//   CreatedAt: string;
//   Labels: Record<string, string>;
//   FilePath?: string;
//   YmlFileName?: string;
// }

// export interface MetricsQuery {
//   id: number;
//   container_id: string;
//   container_name: string;
//   cpu_pct: string;
//   memory_pct: string;
//   memory_usage: string;
//   net_io: string;
//   block_io: string;
//   pid: string;
//   created_at: Date;
// }

// export interface User {
//   id: number;
//   username: string;
//   password: string;
//   email: string;
//   phone: string;
//   role: string;
//   role_id: number;
//   contact_pref: string;
//   mem_threshold: number;
//   cpu_threshold: number;
//   container_stops: boolean;
// }

// export interface GlobalErrorObject {
//   log: string;
//   status: number;
//   message: { err: string };
// }
