import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { VolumeStateType, VolumeObj, VolumeNameObj } from '../../ui-types';
import { ContainerPS, VolumeType } from '../../../types';
import Client from '../models/Client';

const initialState: VolumeStateType = {
  volumes: [],
  volumeContainersList: [],
};

export const getAllContainersOnVolumes = async () => {
  const volumes = await Client.VolumeService.getAllVolumes();
  const allVolsPromises = volumes.map(async (volume) => {
    const containers = await Client.VolumeService.getContainersOnVolume(volume.Name);
    return { volName: volume["Name"], containers: containers };
  });

  const allVols: VolumeObj[] = await Promise.all(allVolsPromises);
  return allVols;
}

export const fetchAllDockerVolumes = createAsyncThunk(
  'volumes/setVolumes',
  async () => {
    const result = await Client.VolumeService.getAllVolumes();
    return result;
  }
)

export const fetchAllContainersOnVolumes = createAsyncThunk(
  'volumes/setContainersOnVolumes',
  getAllContainersOnVolumes
)

export const volumeSlice = createSlice({
  name: 'volumes',
  initialState,
  reducers: {
    removeVolume: (state, action: PayloadAction<string>) => {
      state.volumeContainersList = state.volumeContainersList.filter(element => {
        element.volName !== action.payload
      })
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchAllDockerVolumes.fulfilled, (state, action) => {
        state.volumes = action.payload;
      })
      .addCase(fetchAllContainersOnVolumes.fulfilled, (state, action) => {
        state.volumeContainersList = action.payload;
    })
  },
});

export const { removeVolume } = volumeSlice.actions;
export default volumeSlice.reducer;
