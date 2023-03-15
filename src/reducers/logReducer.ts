import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { logsStateType, containerLogsType } from '../../types';

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
      console.log('action.payload: ', action.payload);
      state.containerLogs = action.payload;
    },
  },
});

export const { getLogs } = logSlice.actions;
export default logSlice.reducer;
