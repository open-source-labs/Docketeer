import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { containerStateType } from '../../types';

const initialState: containerStateType = {
  // ? why is runningList & stoppedList here
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
};

export const composeSlice = createSlice({
  name: 'composes',
  initialState,
  reducers: {
    // ! doesn't seem like getNetworkContainers is being used anywhere
    getNetworkContainers: (state, action: PayloadAction<any>) => {
      state.networkList.push([...action.payload]);
    },
    getContainerStacks: (state, action: PayloadAction<any>) => {
      const currentState: any = state.composeStack;

      const composeStackUpdater = (
        // TODO: rename arrays to be more readable. Consider moving this function elsewhere for easier readability. Redo the stringifying down below in variables at the top of the function to improve readability. Rename output array to new compose stack array
        // ? are the two forEaches redundant?
        // current state is first array
        firstArray: [],
        // action payload is second array (new stack?)
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
