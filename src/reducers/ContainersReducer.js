import * as types from "../constants/actionTypes";

const initialState = {
  //tbd about having two arrays,

  runningList: [],
  stoppedList: [],
};

const containersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTAINER:
      console.log(action.payload);

      const newRunningList = state.runningList.slice();
      newRunningList.push(action.payload);
      console.log(newRunningList);
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

    default:
      return state;
  }
};

export default containersReducer;
