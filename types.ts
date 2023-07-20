import { Request, Response, NextFunction, RequestHandler } from 'express';

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
}

// ? not used anymore?
export interface SignUpValues extends UserBase {
  passwordConfirmation: string;
  showPassword: boolean;
}

export interface UserInfo extends User {
  // removed password property on userInfo as it's not being used.
  // changed id from number type to string type so see if that breaks anything
  _id: string;
  // changed memthreshold from string to string to align with sessionState in sessions reducer. see if it broke something
  mem_threshold: string;
  // changed cpu threshold from string to string let's see what happens
  cpu_threshold: string;
  // changed container_stops from boolean to string so let's see what happens
  container_stops: string;
  token: string;
}

export interface SessionStateType extends UserInfo {
  isLoggedIn: boolean;
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
  contact_pref: string;
  mem_threshold: string;
  cpu_threshold: string;
  container_stops: boolean;
}

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

export interface ProcessLogsSelectorProps {
  containerList: ContainerType[];
  handleCheck: (name: string) => void;
  btnIdList: {
    Names?: boolean;
  }[];
  status: string;
}

export interface ProcessLogsSelectorProps {
  containerList: ContainerType[];
  handleCheck: (name: string) => void;
  btnIdList: { Names?: boolean }[];
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

export type CSVDataType = string[];


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

export interface PruneStateType {
  prunePromptList:
    | [
        prompt: string | null,
        handleSystemPrune: (() => void) | null,
        handleNetworkPrune: (() => void) | null,
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
}

export interface DataFromBackend {
  hash?: string,
  error?: string,
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
  Names: string,
  container: ContainerType,
  isOpen: boolean,
  connectToNetwork: (network: string, container: string) => void;
  disconnectFromNetwork: (network: string, container: string) => void;
  closeNetworkList: () => void;
  networkContainerList: NetworkContainerListType[];
}

export interface NotFoundProps {
  session: boolean | undefined,
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
export type MiddleWareFunction = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

// ==========================================================
// Controller Types
// ==========================================================
export interface ApiController {
  signupEmail: MiddleWareFunction;
  testing: MiddleWareFunction
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
  hashCookie: MiddleWareFunction;
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
   * @description executes docker network prune --force command to remove all unused networks (both dangling and unreferenced); passes a string to prop 'pruneNetworkMessage' in locals relaying the prune
   */
  dockerNetworkPrune: MiddleWareFunction;

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
   * @description List containers attached to each of the networks
   */

  networkListContainers: MiddleWareFunction;

  /**
   * @description Display all networks based on docker-compose in a json object; when the user creates a new network
   */

  networkCreate: MiddleWareFunction;

  /**
   * @description Remove a network
   */

  networkRemove: MiddleWareFunction;

  /**
   * @description Connect a container to a network
   */

  networkConnect: MiddleWareFunction;

  /**
   * @description Connect a container to a network
   */

  networkDisconnect: MiddleWareFunction;

  /**
   * @description inspects docker containers
   * @note is not implemented right now
   */
  inspectDockerContainer: MiddleWareFunction;

  /**
   * @description compose up a network and container from an uploaded yml file
   * @note file path is grabbed from req.body; IS NOT USED
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

  /**
   * @description runs docker to remove selected volume
   */
  volumeRemove: MiddleWareFunction;
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

export interface GrafanaApiController {
  /**
   * @description Gets API key from Grafana API
   */
  getApi?: RequestHandler;

  /**
 * @description Gets dashboard UID from Grafana API using API key
 */
  getUid?: RequestHandler;
}

export interface InitController {
  /**
   * @description Obtains github URL from containers name, and assigns it to 'parameter'
   * @note 'url' property is set on res.locals upon success
   */
  gitUrl?: MiddleWareFunction;

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

export interface SetupController {
  /**
 * @description Installs Prometheus Operator on user's cluster   
 * @note Only needs to install once
 */
  promInstall: MiddleWareFunction;

  /**
   * @description Applys prometheus-grafana.yml on cluster  
   * @note 
   */
  applyGraf: MiddleWareFunction;

  /**
 * @description Port forwards prometheus-grafana pod to 3000
 * @note Must check for prometheus-grafana deployment
 */
  portForward: MiddleWareFunction;
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
   * @description  Performs SQL query to insert a new user, hashing the password before it does, into "users" table and then RETURNS those values.
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
   * @description  adds a cookie to our user's browser to signify they are logged in
   */
  addCookie: MiddleWareFunction;

  /**
   * @description  checks if user has a valid cookie
   */
  checkCookie: MiddleWareFunction;

  /**
   * @description  removes our user's cookie
   */
  removeCookie: MiddleWareFunction;
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
