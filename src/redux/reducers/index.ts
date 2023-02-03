import { combineReducers } from 'redux';
import graphsReducer from './graphReducer';
import imageListReducer from './imageListReducer';
import containerListReducer from './containerListReducer';
import dockerComposeReducer from './dockerComposeReducer';
import notificationReducer from './notificationReducer';
import sessionReducer from './sessionReducer';
import userListReducer from './userListReducer';
import volumeHistoryReducer from './volumeHistoryReducer';
import processLogsReducer from './processLogsReducer';

/**
 * Reducer store
 */
const reducers = combineReducers({
  graphs: graphsReducer,
  images: imageListReducer,
  containersList: containerListReducer,
  networkList: dockerComposeReducer,
  notificationList: notificationReducer,
  session: sessionReducer,
  userList: userListReducer,
  volumeList: volumeHistoryReducer,
  processLogs: processLogsReducer,
});

export default reducers;
