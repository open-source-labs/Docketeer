import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch } from './hooks';

const initialState: any = {
  alertList: [],
};

const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setAlert: (state, action: PayloadAction<any>) => {
      return [action.payload.alert, action.payload.type];
    },
  },
});

export const { setAlert } = alertSlice.actions;

// let timeoutId = null;
let timeoutId: any;

export const createAlert = (alert: any, time: any, type: any) => {
  return (useAppDispatch) => {
    useAppDispatch(setAlert({ alert, type }));
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      useAppDispatch(setAlert([]));
    }, time * 1000);
  };
};

export default alertSlice.reducer;
