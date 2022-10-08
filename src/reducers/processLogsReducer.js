import * as types from '../constants/actionTypes';

const initialState = {
  containerLogs: {
    stdoutLogs: [],
    stderrLogs: []
  }
};

const processLogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_CONTAINER_LOGS: {
      const newContainerLogs = action.payload;
      return { ...state, containerLogs: newContainerLogs };
    }

    default:
      return state;
  }
};

export default processLogsReducer;
