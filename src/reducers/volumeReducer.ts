import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { volumeStateType } from '../../types';

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
    getVolumes: (state, action: PayloadAction<any>) => {
      state.arrayOfVolumeNames.push(...action.payload);
    },
    getVolumeContainersList: (state, action: PayloadAction<any>) => {
      // TODO change this if statement, doesn't seem to matter
      // ? if statement does nothing, does this solve an edge case?
      // if the state is not empty (state would only be empty at render)
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

export const { getVolumes, getVolumeContainersList } = volumeSlice.actions;
export default volumeSlice.reducer;
