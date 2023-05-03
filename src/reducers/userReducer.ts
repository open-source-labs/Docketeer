import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserInfo, userStateType } from '../../types';

const initialState: userStateType = {
  userList: [],
};

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.userList = action.payload;
    },
  },
});

export const { updateUsers } = userSlice.actions;
export default userSlice.reducer;

