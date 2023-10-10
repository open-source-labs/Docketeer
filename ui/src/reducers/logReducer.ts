import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { LogsStateType, ContainerLogsType } from '../../ui-types';
import Client from '../models/Client';
import { LogObject } from '../../../types';

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
    setLogs: (state, action: PayloadAction<{[key:string]: LogObject[]}>) => {
      state.containerLogs = action.payload;
    },
    setSearchWord: (state, action: PayloadAction<string>) => {
      state.searchWord = action.payload;
    }
  },
});

export const { setLogs, setSearchWord } = logSlice.actions;
export default logSlice.reducer;
