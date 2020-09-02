import * as types from "../constants/actionTypes";

const initialState = {
  containerList: [],
};

const containersReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.ADD_CONTAINER:
      const newContainer = state.containerList.slice();
      console.log('New Container ',  newContainer);
      newContainer.push(action.payload);
      return { ...state, containerList: newContainer };
    default:
      return state;
  }
};

export default containersReducer;
