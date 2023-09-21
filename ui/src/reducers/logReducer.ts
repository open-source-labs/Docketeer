import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { LogsStateType, ContainerLogsType } from '../../ui-types';

const initialState: LogsStateType = {
  containerLogs: {
    stdout: [],
    stderr: [],
  },
  searchWord: ''
};

export const logSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    getLogs: (state, action: PayloadAction<ContainerLogsType>) => {
      state.containerLogs = action.payload;
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    }
  },
});

export const { getLogs, setSearchWord } = logSlice.actions;
export default logSlice.reducer;
