import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { VolumeStateType, VolumeObj, VolumeNameObj } from '../../ui-types';

/*
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */

const initialState: VolumeStateType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    getVolumes: (state, action: PayloadAction<VolumeNameObj[]>) => {
      state.arrayOfVolumeNames.push(...action.payload);
    },
    getVolumeContainersList: (state, action: PayloadAction<VolumeObj>) => {
      state.volumeContainersList.push(action.payload);
    },
    removeVolume: (state, action: PayloadAction<string>) => {
      state.volumeContainersList = state.volumeContainersList.filter(
        (volume) => volume.vol_name !== action.payload
      )
    }
  },
});

export const { getVolumes, getVolumeContainersList, removeVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
