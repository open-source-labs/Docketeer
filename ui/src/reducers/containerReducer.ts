import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ContainerStateType,
  ContainerType,
  StoppedListType,
} from '../../ui-types';
import Client from '../models/Client';
import { ContainerPS } from '../../../types';

const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

export const fetchRunningContainers = createAsyncThunk(
  'containers/fetchRunningContainers',
  async () => {
    const result: ContainerPS[] = await Client.ContainerService.getRunningContainers();
    return result;
  }
)

export const containerSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    stopRunningContainer: (state, action: PayloadAction<string>) => {
      state.runningList.filter((container) => container.ID !== action.payload);
    },
    runStoppedContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter(
        (container) =>
          container.ID !== action.payload 
      );
    },
    // refreshRunningContainers: (
    //   state,
    //   action: PayloadAction<ContainerType[]>
    // ) => {
    //   state.runningList = action.payload;
    // },
    removeContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter((container) => container.ID !== action.payload);
    },
    refreshStoppedContainer: (
      state,
      action: PayloadAction<StoppedListType[]>
    ) => {
      state.stoppedList = action.payload;
    },
 
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchRunningContainers.fulfilled, (state, action) => {
          state.runningList = action.payload;
        }
      )
  },

}
);



export const {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} = containerSlice.actions;

export default containerSlice.reducer;


