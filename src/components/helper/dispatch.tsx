// import { useDispatch } from "react-redux";
import { useMemo } from "react";
import { useAppDispatch } from "../../redux/reducers/hooks";

// Import redux toolkit action creators from individual reducer functions
import {
  getNetworkContainers,
  getContainerStacks,
  /* composeYml, */
  composeDown,
} from "../../redux/reducers/composeReducer";

import {
  refreshHostData,
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} from "../../redux/reducers/containerReducer";

import {
  buildAxis,
  buildMemory,
  buildCpu,
  buildWrittenIO,
  buildReadIO,
  buildReceivedIO,
  buildTransmittedIO,
} from "../../redux/reducers/graphReducer";

import { refreshImages } from "../../redux/reducers/imageReducer";

import { getLogs } from "../../redux/reducers/logReducer";

import {
  addPhoneNumber,
  addMemoryNotification,
  addCpuNotification,
  addStopNotification,
  removeMemoryNotification,
  removeCpuNotification,
  removeStoppedNotification,
} from "../../redux/reducers/notificationReducer";

import {
  updateSession,
  updateUser,
  logoutUser,
} from "../../redux/reducers/sessionReducer";

import { updateUsers, updateRoles } from "../../redux/reducers/userReducer";

import {
  getVolumes,
  getVolumeContainerList,
} from "../../redux/reducers/volumeReducer";

import {
  ContainerObj as ContainerObj,
  StoppedContainerObj as StoppedContainerObj,
  ImageObj as ImageObj,
  UserObj as UserObj,
  VolumeObj as VolumeObj,
  NetworkObj as NetworkObj,
  UserInfo as UserInfo,
} from "../../../types";

const useSurvey = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      // Dispatch functions used in Home.tsx
      refreshHostData(data: ContainerObj[]) {
        dispatch(refreshHostData(data));
      },
      refreshRunningContainers(data: ContainerObj[]) {
        dispatch(refreshRunningContainers(data));
      },
      refreshStoppedContainers(data: StoppedContainerObj[]) {
        dispatch(refreshStoppedContainer(data));
      },
      refreshImagesList(data: ImageObj[]) {
        dispatch(refreshImages(data));
      },
      getNetworkContainers(data: NetworkObj[]) {
        dispatch(getNetworkContainers(data));
      },
      updateSession() {
        dispatch(updateSession());
      },
      logoutUser() {
        dispatch(logoutUser());
      },
      updateUsers(data: UserInfo[]) {
        dispatch(updateUsers(data));
      },
      getVolumes(data: { Name: string }[]) {
        dispatch(getVolumes(data));
      },
      getVolumeContainerList(data: VolumeObj) {
        dispatch(getVolumeContainerList(data));
      },
      // Dispatch functions used in Containers.tsx
      // Note: refreshStoppedContainers (already exported)
      runStoppedContainer(id: string) {
        dispatch(runStoppedContainer(id));
      },
      removeContainer(id: string) {
        dispatch(removeContainer(id));
      },
      stopRunningContainer(id: string) {
        dispatch(stopRunningContainer(id));
      },
      // Dispatch functions used in Images.tsx
      // Note: refreshImagesList, refreshRunningContainers (both already exported)
      // Dispatch functions used in Settings.tsx
      // Note: removeMemory..., removeCpu..., and removeStopped... were previously declared in Settings but not used
      addPhoneNumber(data: any) {
        dispatch(addPhoneNumber(data));
      },
      updateUser(userInfo: UserInfo) {
        dispatch(updateUser(userInfo));
      },
      addMemoryNotification(data: any) {
        dispatch(addMemoryNotification(data));
      },
      addCpuNotification(data: any) {
        dispatch(addCpuNotification(data));
      },
      addStopNotification(data: any) {
        dispatch(addStopNotification(data));
      },
      removeMemoryNotification(data: object[]) {
        dispatch(removeMemoryNotification(data));
      },
      removeCpuNotification(data: object[]) {
        dispatch(removeCpuNotification(data));
      },
      removeStoppedNotification(data: object[]) {
        dispatch(removeStoppedNotification(data));
      },
      // Dispatch functions used in Users.tsx
      updateRoles(data: any) {
        dispatch(updateRoles(data));
      },
      // Dispatch functions used in Yml.tsx
      getContainerStacks(data: any) {
        dispatch(getContainerStacks(data));
      },
      composeDown(data: any) {
        dispatch(composeDown(data));
      },
      // Dispatch functions used in LineChartDisplay.tsx
      buildAxis(data: any) {
        dispatch(buildAxis(data));
      },
      buildMemory(data: any) {
        dispatch(buildMemory(data));
      },
      buildCpu(data: any) {
        dispatch(buildCpu(data));
      },
      buildWrittenIO(data: any) {
        dispatch(buildWrittenIO(data));
      },
      buildReadIO(data: any) {
        dispatch(buildReadIO(data));
      },
      buildReceivedIO(data: any) {
        dispatch(buildReceivedIO(data));
      },
      buildTransmittedIO(data: any) {
        dispatch(buildTransmittedIO(data));
      },
      // Dispatch functions used in ProcessLogsTable.tsx
      getContainerLogsDispatcher(data: object[]) {
        dispatch(getLogs(data));
      },
    }),
    [dispatch]
  );
  return actions;
};

export default useSurvey;
