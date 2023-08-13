import { configureStore } from '@reduxjs/toolkit';
import alertReducer from './reducers/alertReducer';
import composeReducer from '../../src/reducers/composeReducer';
import containerReducer from '../../src/reducers/containerReducer';
import imageReducer from '../../src/reducers/imageReducer';
import logReducer from '../../src/reducers/logReducer';
import userReducer from '';
import sessionReducer from './reducers/sessionReducer';
import volumeReducer from './reducers/volumeReducer';
import networkReducer from './reducers/networkReducer';
import pruneReducer from './reducers/pruneReducer';

const store = configureStore({
  reducer: {
    containers: containerReducer,
    images: imageReducer,
    composes: composeReducer,
    sessions: sessionReducer,
    volumes: volumeReducer,
    logs: logReducer,
    users: userReducer,
    alerts: alertReducer,
    networks: networkReducer,
    pruneNetwork: pruneReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;

// grabbing type of state returned from the reducer and setting that equal to RootState
// RootState is used to dynamically change the type of the hooks
export type RootState = ReturnType<typeof store.getState>;

export default store;
