import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { volumeStateType } from '../../../types';

/*
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
//  */

const initialState: volumeStateType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    getVolumes: (state, action: PayloadAction<any>) => {
      state.arrayOfVolumeNames.push(...action.payload);
    },
    getVolumeContainersList: (state, action: PayloadAction<any>) => {
      //ensure the volume doesn't already exist before adding the new container to the list
      if (
        state.volumeContainersList.filter(
          (container) => container.vol_name !== action.payload.vol_name,
        ).length === state.volumeContainersList.length
      ) {
        state.arrayOfVolumeNames.push(action.payload);
      }
    },
  },
});

export const { getVolumes, getVolumeContainersList } = volumeSlice.actions;
export default volumeSlice.reducer;
