import * as types from "../constants/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import { logsState } from '../../../types';

const processLogsReducer = (
  state = logsState,
  action: PayloadAction<any>
) => {
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
