import * as types from '../constants/actionTypes';

const initialState = {
  runningList: [],
  stoppedList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
<<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
    case types.ADD_RUNNING_CONTAINERS: {
========
    case types.ADD_RUNNING_CONTAINERS:
>>>>>>>> 95fc71d (Create a redux folder):src/redux/reducers/runningContainersReducer.js
      const newRunningList = state.runningList.slice();
      for (const container of action.payload) {
        newRunningList.push(container);
      }
      return { ...state, runningList: newRunningList };
    }

    case types.STOP_RUNNING_CONTAINER: {
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList = [];
<<<<<<< HEAD
      for (const container of state.runningList) {
        if (container.cid !== action.payload) {
=======
      for (let container of state.runningList) {
        if (container.ID !== action.payload) {
>>>>>>> f4ae77d (Final updates to Docketeer 7.0.)
          newestRunningList.push(container);
        }
      }
      return {
        ...state,
        runningList: newestRunningList,
        stoppedList: newStoppedList
      };
    }

    case types.RUN_STOPPED_CONTAINER: {
      const runningListCopy = state.runningList.slice();
      const newerStoppedContainer = [];
<<<<<<< HEAD
      for (const container of state.stoppedList) {
        if (container.cid !== action.payload) {
=======
      for (let container of state.stoppedList) {
        if (container.ID === action.payload) {
        } else {
>>>>>>> f4ae77d (Final updates to Docketeer 7.0.)
          newerStoppedContainer.push(container);
        }
      }
      return {
        ...state,
        runningList: runningListCopy,
        stoppedList: newerStoppedContainer
      };
    }

    case types.REFRESH_RUNNING_CONTAINERS: {
      const newRunningList2 = [];
      for (const container of action.payload) {
        newRunningList2.push(container);
      }
      return { ...state, runningList: newRunningList2 };
<<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
    }
========
>>>>>>>> 95fc71d (Create a redux folder):src/redux/reducers/runningContainersReducer.js

    default:
      return state;
  }
}
