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
    networkConnect: (
      state,
      action: PayloadAction<string[]>
    ) => {
      state.runningList.forEach((el) => {
        if (el.Names === action.payload[0]) {
          el.ConnectedNetworks.push(action.payload[1]);
        }
      });
    },
    // openModal reducer function will iterate through runningList to find matching container and toggle it's ModalOpen state between true/false
    openModal: (
      state,
      action: PayloadAction<any>
    ) => {
      for (let i = 0; i < state.runningList.length; i++) {
        if (state.runningList[i] === action.payload) {
          state.runningList[i].ModalOpen = !state.runningList[i].ModalOpen;
        }
      }
    }
  }
}
);


export const {
  stopRunningContainer,
  runStoppedContainer,
  refreshRunningContainers,
  removeContainer,
  refreshStoppedContainer,
  networkConnect,
  openModal
} = containerSlice.actions;

export default containerSlice.reducer;


