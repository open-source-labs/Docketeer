import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';
import { ArrayOfVolumeNames, volumeStateType, VolumeObj } from '../../types';

/*
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */

const initialState: volumeStateType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    // ! first time: action = page render(useEffect())
    getVolumes: (state, action: PayloadAction<ArrayOfVolumeNames>) => {
      state.arrayOfVolumeNames.push(...action.payload);
    },
    getVolumeContainersList: (state, action: PayloadAction<VolumeObj>) => {
      // TODO change this if statement, doesn't seem to matter
      // ? if statement does nothing, does this solve an edge case?
      // if the state is not empty (state would only be empty at render)
      console.log('getVolumneContainerList action.payload', action.payload);
      console.log(
        'getVolumneContainerList state.volumeContainersList',
        current(state.volumeContainersList)
      );

      // if the stateVCL has volumes
      // if (state.volumeContainersList.length) {
      //   // loop thru VCL
      //   state.volumeContainersList.forEach((volumeContainer) => {
      //     // check if the current vol matches the payload vol (if the payload already exists in the VCL)
      //     if (volumeContainer.vol_name === action.payload.vol_name) {
      //       // return out bc there is no need to modify the VCL
      //       return state.volumeContainersList;
      //     }
      //   });
      // }
      state.volumeContainersList.push(action.payload);
    },
  },
});

export const { getVolumes, getVolumeContainersList } = volumeSlice.actions;
export default volumeSlice.reducer;
