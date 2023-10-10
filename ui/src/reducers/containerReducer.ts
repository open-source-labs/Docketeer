import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  ContainerStateType,
} from '../../ui-types';
import Client from '../models/Client';
import { ContainerPS } from '../../../types';

const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
};

/**
 * @abstract Fetches containers and updates reducer
 */
export const fetchRunningContainers = createAsyncThunk(
  'containers/fetchRunningContainers',
  async () => {
    const result: ContainerPS[] = await Client.ContainerService.getRunningContainers();
    return result;
  }
)

export const fetchStoppedContainers = createAsyncThunk(
  'containers/fetchStoppedContainers',
  async () => {
    const result: ContainerPS[] = await Client.ContainerService.getStoppedContainers();
    return result;
  }
)



export const containerSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    // stopRunningContainer: (state, action: PayloadAction<string>) => {
    //   state.runningList.filter((container) => container.ID !== action.payload);
    // },
    // runStoppedContainer: (state, action: PayloadAction<string>) => {
    //   state.stoppedList.filter(
    //     (container) =>
    //       container.ID !== action.payload 
    //   );
    // },
 
    removeContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter((container) => container.ID !== action.payload);
    },
  
  },
  extraReducers(builder) {
    builder
      .addCase(
        fetchRunningContainers.fulfilled, (state, action) => {
          state.runningList = action.payload;
        }
    )
      .addCase(
        fetchStoppedContainers.fulfilled, (state, action) => {
          state.stoppedList = action.payload;
      }
    )
  },

}
);



export const {
  // stopRunningContainer,
  // runStoppedContainer,
  removeContainer,
} = containerSlice.actions;

export default containerSlice.reducer;


