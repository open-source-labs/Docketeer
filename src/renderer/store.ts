import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "../reducers/alertReducer";
import composeReducer from "../reducers/composeReducer";
import containerReducer from "../reducers/containerReducer";
import graphReducer from "../reducers/graphReducer";
import imageReducer from "../reducers/imageReducer";
import logReducer from "../reducers/logReducer";
import notificationReducer from "../reducers/notificationReducer";
import sessionReducer from "../reducers/sessionReducer";
import userReducer from "../reducers/userReducer";
import volumeReducer from "../reducers/volumeReducer";

const store = configureStore({
  reducer: {
    containers: containerReducer,
    images: imageReducer,
    graphs: graphReducer,
    composes: composeReducer,
    notifications: notificationReducer,
    sessions: sessionReducer,
    users: userReducer,
    volumes: volumeReducer,
    logs: logReducer,
    alerts: alertReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

// grabbing type of state returned from the reducer and setting that equal to RootState
// RootState is used to dynamically change the type of the hooks
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
