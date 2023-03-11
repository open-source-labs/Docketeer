import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppDispatch } from "./hooks";

const initialState: any = {
  alertList: [],
  promptList: [],
};

const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    // TODO: any typing in TS
    setAlert: (state, action: PayloadAction<any>) => {
      state.alertList = [action.payload.alert, action.payload.type];
    },
    setPrompt: (state, action: PayloadAction<any>) => {
      state.promptList = [
        action.payload.prompt,
        action.payload.handleAccept,
        action.payload.handleDeny,
      ];
    },
  },
});

export const { setAlert, setPrompt } = alertSlice.actions;

// let timeoutId = null;
let timeoutId: any;

// TODO specify TS types
export const createAlert = (alert: any, time: any, type: any) => {
  return (useAppDispatch) => {
    useAppDispatch(setAlert({ alert, type }));
    useAppDispatch(setPrompt([]));

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      useAppDispatch(setAlert([]));
    }, time * 1000);
    console.log({ timeoutId });
  };
};

// TODO specify TS types
export const createPrompt = (
  prompt: any = null,
  handleAccept: any,
  handleDeny: any
) => {
  return (useAppDispatch) => {
    useAppDispatch(setPrompt({ prompt, handleAccept, handleDeny }));
  };
};

export default alertSlice.reducer;
