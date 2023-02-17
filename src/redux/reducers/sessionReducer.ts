import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { sessionStateType } from "../../../types";

const initialState: sessionStateType = {
  _id: "",
  username: "",
  email: "",
  phone: "",
  role: "",
  role_id: "",
  contact_pref: "",
  mem_threshold: "",
  cpu_threshold: "",
  container_stops: "",
  token: "",
  isLoggedIn: false,
  userList: [],
};

export const sessionSlice = createSlice({
  name: "sessions",
  initialState,
  reducers: {
    updateSession: (state) => {
      state.isLoggedIn = !state.isLoggedIn;
    },
    updateUser: (state, action: PayloadAction<any>) => {
      return { ...state, ...action.payload };
    },
    logoutUser: (state) => {
      return { ...state };
    },
  },
});

export const { updateSession, updateUser, logoutUser } = sessionSlice.actions;
export default sessionSlice.reducer;
