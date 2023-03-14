import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logsStateType, containerLogsType } from '../../types';

/*
export interface stdType {
  containerName: string;
  logMsg: string;
  timestamp: string;
}

export interface containerLogsType {
  stdout: stdType[];
  stderr: stdType[];
}

export interface logsStateType {
  containerLogs: containerLogsType;
}

TS2345: Argument of type 'object[]' is not assignable to parameter of type 'containerLogsType'.
Type 'object[]' is missing the following properties from type 'containerLogsType': stdout, stderr


*/

const initialState: logsStateType = {
  containerLogs: {
    stdout: [],
    stderr: [],
  },
};

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogs: (state, action: PayloadAction<containerLogsType>) => {
      // console.log('action.payload[0]:', action.payload[0]);
      console.log('action.payload: ', action.payload);
      // console.log(
      //   'state.containerLogs - before: ',
      //   current(state.containerLogs)
      // );

      state.containerLogs = action.payload;
      // console.log(
      //   'state.containerLogs - after: ',
      //   current(state.containerLogs)
      // );
    },
  },
});

export const { getLogs } = logSlice.actions;
export default logSlice.reducer;
