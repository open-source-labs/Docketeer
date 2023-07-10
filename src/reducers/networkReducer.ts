import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NetworkListContainerType, NetworkStateType } from '../../types';

const initialState: NetworkStateType = {
  networkContainerList: [],
};

export const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    refreshNetworkList: (
      state,
      action: PayloadAction<NetworkListContainerType[]>
    ) => {
      state.networkContainerList = action.payload;
    },
  },
});

export const {
  refreshNetworkList,
} = networkSlice.actions;

export default networkSlice.reducer;