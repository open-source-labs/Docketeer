import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LogsStateType, ContainerLogsType } from '../../types';
import { current } from '@reduxjs/toolkit';

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
      console.log('action.payload: ', action.payload);
      state.containerLogs = action.payload;
      console.log('log state', current(state.containerLogs))
    },
  },
});

export const { getLogs } = logSlice.actions;
export default logSlice.reducer;
