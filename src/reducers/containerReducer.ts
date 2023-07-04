import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
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
      action: PayloadAction<any>
    ) => {
      state.runningList.forEach((el) => {
        console.log(current(el));
        if (el.Names === action.payload.containerName) {
          console.log(current(el.Networks));
          el.Networks.push(action.payload.networkName);
        }
      });
    },
    networkDisconnect: (
      state,
      action: PayloadAction<any>
    ) => {
      console.log(current(state.runningList));
      state.runningList.forEach((el) => {
        if (el.Names === action.payload.containerName) {
          el.Image.Networks.filter(
            (network) => network !== action.payload.networkName
          );
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
  networkDisconnect,
  openModal
} = containerSlice.actions;

export default containerSlice.reducer;


