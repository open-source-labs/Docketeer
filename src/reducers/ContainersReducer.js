import * as types from "../constants/actionTypes";

const initialState = {
  //tbd about having two arrays,

  runningList: [],
  stoppedList: [],
};

const containersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_RUNNING_CONTAINER:
      const newRunningList = state.runningList.slice();
      newRunningList.push(action.payload);
      return { ...state, runningList: newRunningList };

    case types.REMOVE_CONTAINER:
      const newerRunningList = [];
      for (let container of state.runningList) {
        if (container.id !== action.payload) {
          newerRunningList.push(container);
        }
      }
      return { ...state, runningList: newerRunningList };

    case types.STOP_CONTAINER:
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList = [];

      for (let container of state.runningList) {
        if (container.id === action.payload) {
          newStoppedList.push(container);
        } else {
          newestRunningList.push(container);
        }
      }
      return {
        ...state,
        runningList: newestRunningList,
        stoppedList: newStoppedList,
      };

    case types.ADD_STOPPED_CONTAINER:
      const newerStoppedList = state.stoppedList.slice();
      newerStoppedList.push(action.payload);
      return { ...state, stoppedList: newerStoppedList };

    case types.RUN_STOPPED_CONTAINER:
      const runningListCopy = state.stoppedList.slice();
      const newerStoppedContainer = [];
      for (let container of state.stoppedList) {
        if (container.id === action.payload) {
          runningListCopy.push(container);
        } else {
          newerStoppedContainer.push(container);
        }
      }
      return {
        ...state,
        runningList: runningListCopy,
        stoppedList: newerStoppedContainer,
      };

    default:
      return state;
  }
};

export default containersReducer;
