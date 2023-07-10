import { useMemo } from 'react';
import { useAppDispatch } from '../reducers/hooks';

import {
  getNetworkContainers,
  getContainerStacks,
  composeDown,
} from '../reducers/composeReducer';

import {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} from '../reducers/containerReducer';

import { refreshImages } from '../reducers/imageReducer';

import { getLogs } from '../reducers/logReducer';

import {
  updateSession,
  updateUser,
  logoutUser,
} from '../reducers/sessionReducer';

import { getVolumes, getVolumeContainersList } from '../reducers/volumeReducer';

import { refreshNetworkList } from '../reducers/networkReducer';

import {
  ImageObj,
  VolumeObj,
  NetworkObj,
  UserInfo,
  ContainerLogsType,
  VolumeNameObj,
  ContainerType,
  StoppedListType,
  NetworkContainerListType,
} from '../../types';

/**
 * @module | dispatch.tsx
 * @description | Organizes all state dispatch functions into a single custom hook exportable into individual components
 **/

const useSurvey = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      // Dispatch functions used in Home.tsx
      refreshRunningContainers(data: ContainerType[]) {
        dispatch(refreshRunningContainers(data));
      },
      refreshStoppedContainers(data: StoppedListType[]) {
        dispatch(refreshStoppedContainer(data));
      },
      refreshImagesList(data: ImageObj[]) {
        dispatch(refreshImages(data));
      },
      refreshNetworkList(data: NetworkContainerListType[]) {
        dispatch(refreshNetworkList(data));
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
      getVolumes(data: VolumeNameObj[]) {
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
      updateUser(userInfo: UserInfo) {
        dispatch(updateUser(userInfo));
      },

      // Dispatch functions used in Yml.tsx
      getContainerStacks(data: any) {
        dispatch(getContainerStacks(data));
      },
      composeDown(data: any) {
        dispatch(composeDown(data));
      },
      // Dispatch functions used in ProcessLogsTable.tsx
      getContainerLogsDispatcher(data: ContainerLogsType) {
        dispatch(getLogs(data));
      },
    }),
    [dispatch]
  );
  return actions;
};

export default useSurvey;
