export interface ContainerPS {
  ID: string;
  Command?: string;
  CreatedAt: string;
  Image?: string;
  Labels?: string[];
  LocalVolumes?: string;
  Mounts?: string;
  Names?: string;
  Networks?: string[];
  Ports?: string[];
  RunningFor?: string;
  Size?: string;
  State: string; //tells if running
  Status?: string;
}

export interface LogObject {
  timeStamp: string;
  logMsg: string;
  containerName: string;
}

export interface VolumeType{
  Availability?: string;
  Driver?: string;
  Group?: string;
  Labels?: string;
  Links?: string;
  Mountpoint?: string;
  Name: string;
  Scope?: string;
  Size?: string;
  Status?: string;
}

export interface NetworkType{
  CreatedAt?: string;
  Driver: string;
  ID: string;
  IPv6?: string;
  Internal?: string;
  Labels?: string;
  Name: string;
  Scope?: string;
}