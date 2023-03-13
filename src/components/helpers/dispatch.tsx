import { useMemo } from 'react';
import { useAppDispatch } from '../../reducers/hooks';

import {
  getNetworkContainers,
  getContainerStacks,
  /* composeYml, */
  composeDown,
} from '../../reducers/composeReducer';

import {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} from '../../reducers/containerReducer';

import {
  buildAxis,
  buildMemory,
  buildCpu,
  buildWrittenIO,
  buildReadIO,
  buildReceivedIO,
  buildTransmittedIO,
} from '../../reducers/graphReducer';

import { refreshImages } from '../../reducers/imageReducer';

import { getLogs } from '../../reducers/logReducer';

import {
  addPhoneNumber,
  addMemoryNotification,
  addCpuNotification,
  addStopNotification,
  removeMemoryNotification,
  removeCpuNotification,
  removeStoppedNotification,
} from '../../reducers/notificationReducer';

import {
  updateSession,
  updateUser,
  logoutUser,
} from '../../reducers/sessionReducer';

import { updateUsers, updateRoles } from '../../reducers/userReducer';

import {
  getVolumes,
  getVolumeContainersList,
} from '../../reducers/volumeReducer';

import {
  ContainerObj,
  StoppedContainerObj,
  ImageObj,
  VolumeObj,
  NetworkObj,
  UserInfo,
} from '../../../types';

/**
 * @module | dispatch.tsx
 * @description | Organizes all state dispatch functions into a single custom hook exportable into individual components
 **/

const useSurvey = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      // Dispatch functions used in Home.tsx
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
        dispatch(getVolumeContainersList(data));
      },
      // Dispatch functions used in Containers.tsx
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
      addPhoneNumber(data: string) {
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
