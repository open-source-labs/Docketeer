import { useMemo } from 'react';
import { useAppDispatch } from '../reducers/hooks';

import {
  getNetworkContainers,
  getContainerStacks,
  composeDown,
} from '../reducers/composeReducer';

import {
  // stopRunningContainer,
  // runStoppedContainer,
  // refreshRunningContainers,
  removeContainer,
} from '../reducers/containerReducer';

import { refreshImages } from '../reducers/imageReducer';

import { getLogs } from '../reducers/logReducer';

// import {
//   updateSession,
//   updateUser,
//   logoutUser,
// } from '../reducers/sessionReducer';

import { getVolumes, getVolumeContainersList } from '../reducers/volumeReducer';


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
} from '../../ui-types';

/**
 * @module | dispatch.tsx
 * @description | Organizes all state dispatch functions into a single custom hook exportable into individual components
 **/

const useSurvey = () => {
  const dispatch = useAppDispatch();

  const actions = useMemo(
    () => ({
      getNetworkContainers(data: NetworkObj[]) {
        dispatch(getNetworkContainers(data));
      },

      getVolumeContainerList(data: VolumeObj) {
        dispatch(getVolumeContainersList(data));
      },
      // Dispatch functions used in Containers.tsx
      // runStoppedContainer(id: string) {
      //   dispatch(runStoppedContainer(id));
      // },
      removeContainer(id: string) {
        dispatch(removeContainer(id));
      },
      stopRunningContainer(id: string) {
        dispatch(stopRunningContainer(id));
      },
    }),
    [dispatch]
  );
  return actions;
};

export default useSurvey;
