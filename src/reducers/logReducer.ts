import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { log } from 'console';
import { logsStateType } from '../../../types';

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
    getLogs: (state, action: PayloadAction<any>) => {
      state.containerLogs = action.payload;
    },
  },
});

export const { getLogs } = logSlice.actions;
export default logSlice.reducer;
