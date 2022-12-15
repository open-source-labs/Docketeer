import * as types from "../constants/actionTypes";

export const addRunningContainers = (data: object[]) => ({
  type: types.ADD_RUNNING_CONTAINERS,
  payload: data,
});

export const removeContainer = (id: string) => ({
  type: types.REMOVE_CONTAINER,
  payload: id,
});

export const stopRunningContainer = (id: string) => ({
  type: types.STOP_RUNNING_CONTAINER,
  payload: id,
});

export const addStoppedContainers = (data: object[]) => ({
  type: types.ADD_STOPPED_CONTAINERS,
  payload: data,
});

export const runStoppedContainer = (id: string) => ({
  type: types.RUN_STOPPED_CONTAINER,
  payload: id,
});

export const getImages = (data: object[]) => ({
  type: types.GET_IMAGES,
  payload: data,
});

export const runImage = (id: string) => ({
  type: types.RUN_IMAGE,
  payload: id,
});

export const removeImage = (id: string) => ({
  type: types.REMOVE_IMAGE,
  payload: id,
});

export const refreshRunningContainers = (data: object[]) => ({
  type: types.REFRESH_RUNNING_CONTAINERS,
  payload: data,
});

export const refreshStoppedContainers = (data: object[]) => ({
  type: types.REFRESH_STOPPED_CONTAINERS,
  payload: data,
});

export const refreshImages = (data: object[]) => ({
  type: types.REFRESH_IMAGES,
  payload: data,
});

/* --------------- */
type composeymlFilesStr = {
  type: string;
  payload: object[];
};
/* --------------- */

export const composeymlFiles = (data: composeymlFilesStr) => ({
  type: types.COMPOSE_YML_FILES,
  payload: data,
});

export const getNetworkContainers = (data: object[]) => ({
  type: types.GET_NETWORK_CONTAINERS,
  payload: data,
});

export const getContainerStacks = (data: object[]) => ({
  type: types.GET_CONTAINER_STACKS,
  payload: data,
});

export const composeDown = (data: object[]) => ({
  type: types.COMPOSE_DOWN,
  payload: data,
});

export const composeUp = (data: object[]) => ({
  type: types.COMPOSE_UP,
  payload: data,
});

export const buildAxis = (data: string) => ({
  type: types.BUILD_AXIS,
  payload: data,
});

export const buildMemory = (data: string) => ({
  type: types.BUILD_MEMORY,
  payload: data,
});

export const buildCpu = (data: string) => ({
  type: types.BUILD_CPU,
  payload: data,
});

export const buildWrittenIO = (data: string) => ({
  type: types.BUILD_WRITTEN_IO,
  payload: data,
});

export const buildReadIO = (data: string) => ({
  type: types.BUILD_READ_IO,
  payload: data,
});

export const addPhoneNumber = (data: object[]) => ({
  type: types.ADD_PHONE_NUMBER,
  payload: data,
});

export const addMemoryNotificationSetting = (data: object[]) => ({
  type: types.ADD_MEMORY_NOTIFICATION_SETTING,
  payload: data,
});

export const addCpuNotificationSetting = (data: object[]) => ({
  type: types.ADD_CPU_NOTIFICATION_SETTING,
  payload: data,
});

export const addStoppedNotificationSetting = (data: object[]) => ({
  type: types.ADD_STOPPED_NOTIFICATION_SETTING,
  payload: data,
});

export const removeMemoryNotificationSetting = (data: object[]) => ({
  type: types.REMOVE_MEMORY_NOTIFICATION_SETTING,
  payload: data,
});

export const removeCpuNotificationSetting = (data: object[]) => ({
  type: types.REMOVE_CPU_NOTIFICATION_SETTING,
  payload: data,
});

export const removeStoppedNotificationSetting = (data: object[]) => ({
  type: types.REMOVE_STOPPED_NOTIFICATION_SETTING,
  payload: data,
});

export const addNotificationFrequency = (data: object[]) => ({
  type: types.NOTIFICATION_FREQUENCY,
  payload: data,
});

export const addMonitoringFrequency = (data: object[]) => ({
  type: types.MONITORING_FREQUENCY,
  payload: data,
});

export const updateSession = () => ({
  type: types.UPDATE_SESSION,
});

export const updateUser = (data: object) => ({
  type: types.UPDATE_USER,
  payload: data,
});

export const logoutUser = () => ({
  type: types.LOGOUT_USER,
  // payload: data
});

export const updateUserList = (data: object[]) => ({
  type: types.UPDATE_USER_LIST,
  payload: data,
});

export const updateUserRole = (data: object[]) => ({
  type: types.UPDATE_USER_ROLE,
  payload: data,
});

// get volume
export const getVolumeList = (data: object[]) => ({
  type: types.GET_VOLUME_LIST,
  payload: data,
});

// get containers that live in volume
export const getVolumeContainersList = (data: object) => ({
  type: types.GET_VOLUME_CONTAINERS_LIST,
  payload: data,
});

// get container logs
export const getContainerLogs = (data: object[]) => ({
  type: types.GET_CONTAINER_LOGS,
  payload: data,
});
