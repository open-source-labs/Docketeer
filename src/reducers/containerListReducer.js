/* eslint-disable no-case-declarations */
import * as types from '../constants/actionTypes';

const initialState = {
  runningList: [],
  stoppedList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
  case types.ADD_RUNNING_CONTAINERS:
    const newRunningList = state.runningList.slice();
    for (const container of action.payload) {
      newRunningList.push(container);
    }
    return { ...state, runningList: newRunningList };

  case types.STOP_RUNNING_CONTAINER:
    const newStoppedList = state.stoppedList.slice();
    const newestRunningList = [];
    for (const container of state.runningList) {
      if (container.cid !== action.payload) {
        newestRunningList.push(container);
      }
    }
    return {
      ...state,
      runningList: newestRunningList,
      stoppedList: newStoppedList,
    };

  case types.RUN_STOPPED_CONTAINER:
    const runningListCopy = state.runningList.slice();
    const newerStoppedContainer = [];
    for (const container of state.stoppedList) {
      // eslint-disable-next-line no-empty
      if (container.cid === action.payload) {
      } else {
        newerStoppedContainer.push(container);
      }
    }
    return {
      ...state,
      runningList: runningListCopy,
      stoppedList: newerStoppedContainer,
    };

  case types.REFRESH_RUNNING_CONTAINERS:
    const newRunningList2 = [];
    for (const container of action.payload) {
      newRunningList2.push(container);
    }
    return { ...state, runningList: newRunningList2 };

  case types.REMOVE_CONTAINER:
    const removeContainerList = [];
    for (const container of state.stoppedList) {
      if (container.cid !== action.payload) {
        removeContainerList.push(container);
      }
    }
    return { ...state, stoppedList: removeContainerList };

  case types.ADD_STOPPED_CONTAINERS:
    const newerStoppedList = state.stoppedList.slice();
    for (const container of action.payload) {
      newerStoppedList.push(container);
    }
    return { ...state, stoppedList: newerStoppedList };

  case types.REFRESH_STOPPED_CONTAINERS:
    const newStoppedList4 = [];
    for (const container of action.payload) {
      newStoppedList4.push(container);
    }
    return { ...state, stoppedList: newStoppedList4 };

  default:
    return state;
  }
}
