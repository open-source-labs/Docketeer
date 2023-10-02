import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NetworkContainerListType, NetworkStateType } from '../../ui-types';
import { NetworkAndContainer, NetworkContainerType } from 'types';

const initialState: NetworkStateType = {
  networkContainerList: [],
};

export const networkSlice = createSlice({
  name: 'networks',
  initialState,
  reducers: {
    refreshNetworkList: (
      state,
      action: PayloadAction<NetworkAndContainer[]>
    ) => {
      state.networkContainerList = action.payload;
    },
  },
});

export const {
  refreshNetworkList,
} = networkSlice.actions;

export default networkSlice.reducer;