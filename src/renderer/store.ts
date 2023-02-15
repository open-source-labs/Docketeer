import { configureStore } from "@reduxjs/toolkit";
import composeReducer from "../redux/reducers/composeReducer";
import containerReducer from "../redux/reducers/containerReducer";
import graphReducer from "../redux/reducers/graphReducer";
import imageReducer from "../redux/reducers/imageReducer";
import logReducer from "../redux/reducers/logReducer";
import notificationReducer from "../redux/reducers/notificationReducer";
import sessionReducer from "../redux/reducers/sessionReducer";
import userReducer from "../redux/reducers/userReducer";
import volumeReducer from "../redux/reducers/volumeReducer";

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
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
