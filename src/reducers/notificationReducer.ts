import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { notificationStateType } from '../../types';

const initialState: notificationStateType = {
  phoneNumber: '',
  memoryNotificationList: new Set(),
  cpuNotificationList: new Set(),
  stoppedNotificationList: new Set(),
};

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phoneNumber = action.payload;
    },
    addMemoryNotification: (state, action: PayloadAction<any>) => {
      console.log('addMemoryNotification action.payload: ', action.payload);
      state.memoryNotificationList = new Set(action.payload);
    },
    addCpuNotification: (state, action: PayloadAction<any>) => {
      console.log('addCpuNotification action.payload: ', action.payload);
      state.cpuNotificationList = new Set(action.payload);
    },
    addStopNotification: (state, action: PayloadAction<any>) => {
      console.log('addStopNotification action.payload: ', action.payload);
      state.stoppedNotificationList = new Set(action.payload);
    },
    removeMemoryNotification: (state, action: PayloadAction<any>) => {
      console.log('removeMemoryNotification action.payload: ', action.payload);
      state.memoryNotificationList.forEach((container) => {
        if (container === action.payload) {
          state.memoryNotificationList.delete(container);
        }
      });
    },
    removeCpuNotification: (state, action: PayloadAction<any>) => {
      console.log('removeCpuNotification action.payload: ', action.payload);
      state.cpuNotificationList.forEach((container) => {
        if (container === action.payload) {
          state.cpuNotificationList.delete(container);
        }
      });
    },
    removeStoppedNotification: (state, action: PayloadAction<any>) => {
      console.log('removeStoppedNotification action.payload: ', action.payload);
      state.stoppedNotificationList.forEach((container) => {
        if (container === action.payload) {
          state.stoppedNotificationList.delete(container);
        }
      });
    },
  },
});

export const {
  addPhoneNumber,
  addMemoryNotification,
  addCpuNotification,
  addStopNotification,
  removeMemoryNotification,
  removeCpuNotification,
  removeStoppedNotification,
} = notificationSlice.actions;

export default notificationSlice.reducer;
