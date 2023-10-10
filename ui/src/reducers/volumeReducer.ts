import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolumeStateType, VolumeObj, VolumeNameObj } from '../../ui-types';
import { VolumeType } from '../../../types';
import Client from '../models/Client';

/*
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume
 */

const initialState: VolumeStateType = {
  arrayOfVolumeNames: [],
  volumeContainersList: [],
};

export const fetchAllDockerVolumes = createAsyncThunk(
  'volumes/setVolumes',
  async () => {
    const result = await Client.VolumeService.getAllVolumes();
    return result;
  }
)

// export const fetchContainersOnVolumes = createAsyncThunk(
//   'volumes/setContainersOnVolumes',
//   async () => {
//     const result = await Client.VolumeService.getContainersOnVolume()
//   }
// )

export const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    getVolumeContainersList: (state, action: PayloadAction<VolumeObj>) => {
      state.volumeContainersList.push(action.payload);
    },
    removeVolume: (state, action: PayloadAction<string>) => {
      state.volumeContainersList = state.volumeContainersList.filter(
        (volume) => volume.vol_name !== action.payload
      )
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDockerVolumes.fulfilled, (state, action) => {
        state.arrayOfVolumeNames = action.payload;
      })
  },
});

export const { getVolumeContainersList, removeVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
