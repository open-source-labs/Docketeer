import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolumeStateType, VolumeObj, VolumeNameObj } from '../../ui-types';
import { ContainerPS, VolumeType } from '../../../types';
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

export const fetchContainersOnVolumes = createAsyncThunk(
  'volumes/setContainersOnVolumes',
  async (volumes: VolumeType[]) => {
    const volsAndContainers: { [key: string]: ContainerPS[] } = {};
    volumes.forEach(async (volume) => {
      const containers = await Client.VolumeService.getContainersOnVolume(volume.Name);
      volsAndContainers[volume["Name"]] = containers;
    });
    return volsAndContainers;
  }
)

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
      .addCase(fetchContainersOnVolumes.fulfilled, (state, action) => {
        state.volumeContainersList = action.payload;
    })
  },
});

export const { getVolumeContainersList, removeVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
