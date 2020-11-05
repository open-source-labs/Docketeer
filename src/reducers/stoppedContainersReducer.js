import * as types from "../constants/actionTypes";

const initialState = {
  stoppedList: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.REMOVE_CONTAINER:
      const removeContainerList = [];
      for (let container of state.stoppedList) {
        if (container.cid !== action.payload) {
          removeContainerList.push(container);
        }
      }
      return { ...state, stoppedList: removeContainerList };

    case types.ADD_STOPPED_CONTAINERS:
      const newerStoppedList = state.stoppedList.slice();
      for (let container of action.payload) {
        newerStoppedList.push(container);
      }
      return { ...state, stoppedList: newerStoppedList };

    case types.REFRESH_STOPPED_CONTAINERS:
      const newStoppedList4 = [];
      for (let container of action.payload) {
        newStoppedList4.push(container);
      }
      return { ...state, stoppedList: newStoppedList4 };

    default:
      return state;
  }
}
