import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { containerStateType } from "../../../types";

const initialState: containerStateType = {
  runningList: [],
  stoppedList: [],
  networkList: [],
  composeStack: [],
  hostStats: {},
};

export const composeSlice = createSlice({
  name: "composes",
  initialState,
  reducers: {
    getNetworkContainers: (state, action: PayloadAction<any>) => {
      state.networkList.push([...action.payload]);
    },
    getContainerStacks: (state, action: PayloadAction<any>) => {
      // Do this tomorrow
      // It appears these groups were having trouble with implementing redux for compose.
      // Let's consider this function from a high-level, make a plan, and adjust as necessary.
      // Reference the file, `dockerComposeReducer.ts` to see additional information from prev. iterations.
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
