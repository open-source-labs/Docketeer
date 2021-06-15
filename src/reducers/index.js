import { combineReducers } from 'redux';
import graphsReducer from './graphReducer';
import imageListReducer from './imageListReducer';
import containerListReducer from './containerListReducer';
import dockerComposeReducer from './dockerComposeReducer';
import notificationReducer from './notificationReducer';
import sessionReducer from './sessionReducer';
import userListReducer from './userListReducer';
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
});

export default reducers;
