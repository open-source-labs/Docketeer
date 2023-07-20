import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import {
  ContainerStateType,
  ContainerType,
  StoppedListType,
} from '../../types';

const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

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
 
  }
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


