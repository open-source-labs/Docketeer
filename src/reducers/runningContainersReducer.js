import * as types from "../constants/actionTypes";

const initialState = {
  runningList: [],
  stoppedList: []
};

export default function (state = initialState, action) {
  switch (action.type) {
<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
=======
  
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/runningContainersReducer.js
    case types.ADD_RUNNING_CONTAINERS:
      const newRunningList = state.runningList.slice();
      for (let container of action.payload) {
        newRunningList.push(container);
      }
      return { ...state, runningList: newRunningList };

<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
    case types.STOP_RUNNING_CONTAINER: 
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList = [];
      for (let container of state.runningList) {
        if (container.ID !== action.payload) {
=======
    case types.STOP_RUNNING_CONTAINER:
      const newStoppedList = state.stoppedList.slice();
      const newestRunningList = [];
      for (let container of state.runningList) {
        if (container.cid !== action.payload) {
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/runningContainersReducer.js
          newestRunningList.push(container);
        }
      }
      return {
        ...state,
        runningList: newestRunningList,
        stoppedList: newStoppedList
      };

<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
    case types.RUN_STOPPED_CONTAINER: 
      const runningListCopy = state.runningList.slice();
      const newerStoppedContainer = [];
      for (let container of state.stoppedList) {
        if (container.ID === action.payload) {
=======
    case types.RUN_STOPPED_CONTAINER:
      const runningListCopy = state.runningList.slice();
      const newerStoppedContainer = [];
      for (let container of state.stoppedList) {
        if (container.cid === action.payload) {
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/runningContainersReducer.js
        } else {
          newerStoppedContainer.push(container);
        }
      }
      return {
        ...state,
        runningList: runningListCopy,
        stoppedList: newerStoppedContainer
      };

<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
    case types.REFRESH_RUNNING_CONTAINERS: 
=======
    case types.REFRESH_RUNNING_CONTAINERS:
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/runningContainersReducer.js
      const newRunningList2 = [];
      for (let container of action.payload) {
        newRunningList2.push(container);
      }
<<<<<<< HEAD:src/module/reducers/runningContainersReducer.js
      return { ...state, runningList: newRunningList2 };

=======
        return { ...state, runningList: newRunningList2 };
      
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/runningContainersReducer.js
    default:
      return state;
  }
}
