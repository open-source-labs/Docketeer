/* eslint-disable no-case-declarations */
import { PayloadAction } from '@reduxjs/toolkit';
import * as types from '../constants/actionTypes';
import { containerState } from '../../../types';

export default function (state = containerState, action: PayloadAction<any>) {
  switch (action.type) {
    case types.ADD_RUNNING_CONTAINERS:
      const newRunningList: object[] = state.runningList.slice();
      for (const container of action.payload) {
        newRunningList.push(container);
      }
      return { ...state, runningList: newRunningList };

    case types.STOP_RUNNING_CONTAINER:
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList: object[] = [];
      for (const container of state.runningList) {
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
      for (const container of state.stoppedList) {
        // eslint-disable-next-line no-empty
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

    case types.REMOVE_CONTAINER:
      const removeContainerList: object[] = [];
      for (const container of state.stoppedList) {
        if (container.ID !== action.payload) {
          removeContainerList.push(container);
        }
      }
      return { ...state, stoppedList: removeContainerList };

    case types.ADD_STOPPED_CONTAINERS:
      const newerStoppedList: object[] = state.stoppedList.slice();
      for (const container of action.payload) {
        newerStoppedList.push(container);
      }
      return { ...state, stoppedList: newerStoppedList };

    case types.REFRESH_STOPPED_CONTAINERS:
      const newStoppedList4: object[] = [];
      for (const container of action.payload) {
        newStoppedList4.push(container);
      }
      return { ...state, stoppedList: newStoppedList4 };

    default:
      return state;
  };
};