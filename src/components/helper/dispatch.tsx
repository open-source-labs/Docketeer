import { useDispatch } from "react-redux";
import { useMemo } from "react";

import {
  refreshHostData,
  refreshRunningContainers,
  getNetworkContainers,
  updateSession,
  logoutUser,
  updateUserList,
  getVolumeList,
  getVolumeContainersList,
  refreshImages,
  runStoppedContainer,
  removeContainer,
  refreshStoppedContainers,
  addNotificationFrequency,
  addMonitoringFrequency,
  addMemoryNotificationSetting,
  addCpuNotificationSetting,
  addStoppedNotificationSetting,
  addPhoneNumber,
  removeMemoryNotificationSetting,
  removeCpuNotificationSetting,
  removeStoppedNotificationSetting,
  updateUserRole,
  getContainerStacks,
  composeDown,
  updateUser,
} from "../../redux/actions/actions";

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
  const dispatch = useDispatch();

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
        dispatch(refreshStoppedContainers(data));
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
      updateUserList(data: UserObj[]) {
        dispatch(updateUserList(data));
      },
      getVolumeList(data: { Name: string }[]) {
        dispatch(getVolumeList(data));
      },
      getVolumeContainersList(data: VolumeObj) {
        dispatch(getVolumeContainersList(data));
      },
      // Dispatch functions used in Containers.tsx
      // Note: refreshStoppedContainers (already exported)
      runStoppedContainer(id: string) {
        dispatch(runStoppedContainer(id));
      },
      removeContainer(id: string) {
        dispatch(removeContainer(id));
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
      addNotificationFrequency(data: any) {
        dispatch(addNotificationFrequency(data));
      },
      addMonitoringFrequency(data: any) {
        dispatch(addMonitoringFrequency(data));
      },
      addMemoryNotificationSetting(data: any) {
        dispatch(addMemoryNotificationSetting(data));
      },
      addCpuNotificationSetting(data: any) {
        dispatch(addCpuNotificationSetting(data));
      },
      addStoppedNotificationSetting(data: any) {
        dispatch(addStoppedNotificationSetting(data));
      },
      removeMemoryNotificationSetting(data: object[]) {
        dispatch(removeMemoryNotificationSetting(data));
      },
      removeCpuNotificationSetting(data: object[]) {
        dispatch(removeCpuNotificationSetting(data));
      },
      removeStoppedNotificationSetting(data: object[]) {
        dispatch(removeStoppedNotificationSetting(data));
      },
      // Dispatch functions used in Users.tsx
      updateUserRole(data: any) {
        dispatch(updateUserRole(data));
      },
      // Dispatch functions used in Yml.tsx
      getContainerStacks(data: any) {
        dispatch(getContainerStacks(data));
      },
      composeDown(data: any) {
        dispatch(composeDown(data));
      },
    }),
    [dispatch]
  );
  return actions;
};

export default useSurvey;
