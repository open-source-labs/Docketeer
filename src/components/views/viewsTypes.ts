// this file contains the interfaces for each file in the views folder. 

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

// "any" has been used below since strict typing was used to define these props in the tabs file 
interface containersList {
  runningList: any[],
  stoppedList: any[]
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
};