import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LogsStateType, ContainerLogsType } from '../../types';

const initialState: LogsStateType = {
  containerLogs: {
    stdout: [],
    stderr: [],
  },
};

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogs: (state, action: PayloadAction<ContainerLogsType>) => {
      state.containerLogs = action.payload;
    },
  },
});

export const { getLogs } = logSlice.actions;
export default logSlice.reducer;
