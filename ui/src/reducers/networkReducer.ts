import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { NetworkStateType } from '../../ui-types';
import { NetworkAndContainer, NetworkContainerType } from '../../../types';
import Client from '../models/Client';

const initialState: NetworkStateType = {
  networkContainerList: [],
};

export const fetchNetworkAndContainer = createAsyncThunk(
  'networks/setNetworkAndContainer',
  async () => {
    const networkAndContainer: NetworkAndContainer[] = await Client.NetworkService.getAllContainersOnAllNetworks()
    return networkAndContainer;
  }
)

export const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchNetworkAndContainer.fulfilled, (state, action) => {
        state.networkContainerList = action.payload;
      })
  },
});

// export const {
//   refreshNetworkList,
// } = networkSlice.actions;

export default networkSlice.reducer;