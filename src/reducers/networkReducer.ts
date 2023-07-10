import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NetworkContainerListType, NetworkStateType } from '../../types';

const initialState: NetworkStateType = {
  networkContainerList: [],
};

export const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    refreshNetworkList: (
      state,
      action: PayloadAction<NetworkContainerListType[]>
    ) => {
      state.networkContainerList = action.payload;
    },
  },
});

export const {
  refreshNetworkList,
} = networkSlice.actions;

export default networkSlice.reducer;