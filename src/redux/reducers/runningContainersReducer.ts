import * as types from '../constants/actionTypes';
import { PayloadAction } from '@reduxjs/toolkit';
import { containerState } from '../../../types';

export default function (state = containerState, action: PayloadAction<any>) {
  switch (action.type) {
    case types.ADD_RUNNING_CONTAINERS:
      const newRunningList = state.runningList.slice();
      for (const container of action.payload) {
        newRunningList.push(container);
      }
      return { ...state, runningList: newRunningList };

    case types.STOP_RUNNING_CONTAINER:
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList: object[] = [];
      for (let container of state.runningList) {
        if (container.ID !== action.payload) {
          newestRunningList.push(container);
        }
      }
      return {
        ...state,
        runningList: newestRunningList,
        stoppedList: newStoppedList
      };

    case types.RUN_STOPPED_CONTAINER: 
      const runningListCopy = state.runningList.slice();
      const newerStoppedContainer: object[] = [];
      for (let container of state.stoppedList) {
        if (container.ID === action.payload) {
        } else {
          newerStoppedContainer.push(container);
        }
      }
      return {
        ...state,
        runningList: runningListCopy,
        stoppedList: newerStoppedContainer
      };

    case types.REFRESH_RUNNING_CONTAINERS: 
      const newRunningList2: object[] = [];
      for (const container of action.payload) {
        newRunningList2.push(container);
      }
      return { ...state, runningList: newRunningList2 };

    default:
      return state;
  }
}
