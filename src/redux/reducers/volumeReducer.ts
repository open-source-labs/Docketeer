import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { volumeStateType } from "../../../types";

/**
 * @description Reducer for the list of containers running in each volume
 * State has been separated into two arrays for future implementation
 *
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */

const initialState: volumeStateType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export const volumeSlice = createSlice({
  name: "volumes",
  initialState,
  reducers: {
    getVolumes: (state, action: PayloadAction<any>) => {
      state.arrayOfVolumeNames.push(...action.payload);
    },
    getVolumeContainerList: (state, action: PayloadAction<any>) => {
      // if (
      //   state.volumeContainersList.filter(
      //     (container) => container.vol_name !== action.payload.vol_name
      //   ).length === state.volumeContainersList.length
      // ) {
      //   state.arrayOfVolumeNames.push(action.payload);
      // }
      if (state.volumeContainersList.length) {
        state.volumeContainersList.forEach((volumeContainer) => {
          if (volumeContainer.vol_name === action.payload.vol_name) {
            return state.volumeContainersList;
          }
        });
      }
      state.volumeContainersList.push(action.payload);
    },
  },
});

export const { getVolumes, getVolumeContainerList } = volumeSlice.actions;
export default volumeSlice.reducer;
