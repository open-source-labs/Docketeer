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
    getVolumeContainers: (state, action: PayloadAction<any>) => {
      if (state.volumeContainersList.length) {
        state.volumeContainersList.forEach((volumeContainer) => {
          if (volumeContainer.vol_name === action.payload.vol_name) {
            // If the volume already exists, return to ensure no duplicate volumes
            return state.volumeContainersList;
          }
        });
      }
      state.volumeContainersList.push(action.payload);
    },
  },
});

export const { getVolumes, getVolumeContainers } = volumeSlice.actions;
export default volumeSlice.reducer;
