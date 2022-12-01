// this file contains the interfaces for each file. Please search a fil by name in order to find what interfaces it uses.

export interface ContainerObj {
    BlockIO: string, 
    CPUPerc: string,
    Container: string,
    ID: string,
    MemPerc: string,
    MemUsage: string,
    Name: string,
    NetIO: string,
    PIDs: string
}

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