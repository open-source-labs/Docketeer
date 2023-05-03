import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { SessionStateType, UserInfo } from '../../types';

/*
 * @param {Array} arrayOfVolumeNames List of volumes running
 * @param {nested Objects} volumeContainersList Containers running under each volume 
*/

const initialState: SessionStateType = {
  _id: '',
  username: '',
  password: '',
  mem_threshold: '',
  cpu_threshold: '',
  container_stops: '',
  token: '',
  isLoggedIn: false,
};

export const sessionSlice = createSlice({
  name: 'sessions',
  initialState,
  reducers: {
    // This doesn't utilize a payload (see calling of updateSession in Login.tsx)
    updateSession: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    updateUser: (state, action: PayloadAction<UserInfo>) => {
      for (const info in action.payload) {
        if (Object.hasOwnProperty.call(state, info)) {
          state[info as keyof UserInfo] =
            action.payload[info as keyof UserInfo];
        }
      }
    },
    logoutUser: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { updateSession, updateUser, logoutUser } = sessionSlice.actions;
export default sessionSlice.reducer;
