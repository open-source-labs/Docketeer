import * as types from '../constants/actionTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { notificationState } from '../../../types';

export default function (state = notificationState, action: PayloadAction<any>) {
  switch (action.type) {
  case types.ADD_PHONE_NUMBER:
    return {
      ...state,
      phoneNumber: action.payload
    };

  case types.ADD_MEMORY_NOTIFICATION_SETTING: 
    const memoryNotificationList = new Set(action.payload);
    return {
      ...state,
      memoryNotificationList
    };

  case types.ADD_CPU_NOTIFICATION_SETTING: 
    const cpuNotificationList = new Set(action.payload);
    return {
      ...state,
      cpuNotificationList
    };

  case types.ADD_STOPPED_NOTIFICATION_SETTING: 
    const stoppedNotificationList = new Set(action.payload);
    return {
      ...state,
      stoppedNotificationList
    };

  case types.REMOVE_MEMORY_NOTIFICATION_SETTING: 
    const newMemoryNotificationList: any[] = [];
    state.memoryNotificationList.forEach((containerId) => {
      if (containerId !== action.payload)
        newMemoryNotificationList.push(containerId);
    });
    return {
      ...state,
      memoryNotificationList: newMemoryNotificationList
    };

  case types.REMOVE_CPU_NOTIFICATION_SETTING: 
    const newCpuNotificationList: any[] = [];
    state.cpuNotificationList.forEach((containerId) => {
      if (containerId !== action.payload)
        newCpuNotificationList.push(containerId);
    });
    return {
      ...state,
      cpuNotificationList: newCpuNotificationList
    };

  case types.REMOVE_STOPPED_NOTIFICATION_SETTING: 
    const newStoppedNotificationList: any[] = [];
    state.stoppedNotificationList.forEach((containerId) => {
      if (containerId !== action.payload)
        newStoppedNotificationList.push(containerId);
    });
    return {
      ...state,
      stoppedNotificationList: newStoppedNotificationList
    };

  default:
    return state;
  }
}
