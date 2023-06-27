import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ContainerStateType,
  ContainerType,
  StoppedListType,
} from '../../types';


// createSlice is the main function used to define the redux logic
// PayloadAction is a TS type that represents 'this is the contents of one given action object'


// Below represents the shape of the state inside of our slice that is managed by the reducer
// if there was an interface



// below are defining the initial state
const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

// Now we define the Slice that contains the reducer logic
export const containerSlice = createSlice({
  name: 'containers',
  initialState,
  reducers: {
    stopRunningContainer: (state, action: PayloadAction<string>) => {
      state.runningList.filter((container) => container.ID !== action.payload);
    },
    runStoppedContainer: (state, action: PayloadAction<string>) => {
      state.stoppedList.filter((container) => container.ID !== action.payload);
    },
    refreshRunningContainers: (
      state,
      action: PayloadAction<ContainerType[]>
    ) => {
      state.runningList = action.payload;
    },
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
});

export const {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
} = containerSlice.actions;

export default containerSlice.reducer;
