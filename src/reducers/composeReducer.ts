import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { ContainerStateType } from '../../types';

const initialState: ContainerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

export const composeSlice = createSlice({
  name: 'composes',
  initialState,
  reducers: {
    getNetworkContainers: (state, action: PayloadAction<any>) => {
      state.networkList = action.payload;
    },
    getContainerStacks: (state, action: PayloadAction<any>) => {
      const currentState: any = state.composeStack;

      const composeStackUpdater = (
        firstArray: [],
        secondArray: [],
        outputArray = []
      ) => {
        firstArray.forEach((element) => {
          if (JSON.stringify(secondArray).includes(JSON.stringify(element))) {
            outputArray.push(element);
          }
        });
        secondArray.forEach((element) => {
          if (!JSON.stringify(firstArray).includes(JSON.stringify(element))) {
            outputArray.push(element);
          }
        });
        return outputArray;
      };

      state.composeStack = composeStackUpdater(currentState, action.payload);
    },
    composeYml: (state, action: PayloadAction<any>) => {
      state.networkList.push(action.payload[0]);
    },
    composeDown: (state, action: PayloadAction<any>) => {
      const filePath = action.payload;
      state.composeStack.filter((container) => container.FilePath !== filePath);
    },
  },
});

export const {
  getNetworkContainers,
  getContainerStacks,
  composeYml,
  composeDown,
} = composeSlice.actions;

export default composeSlice.reducer;
