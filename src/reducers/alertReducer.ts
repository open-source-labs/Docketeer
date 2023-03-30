import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

const initialState: any = {
  alertList: [],
  promptList: [],
};

const alertSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
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
  };
};

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
