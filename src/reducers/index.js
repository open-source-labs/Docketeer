import { combineReducers } from "redux";
import graphsReducer from "./graphReducer";
import imageListReducer from "./imageListReducer";
import containerListReducer from "./containerListReducer";
import dockerComposeReducer from "./dockerComposeReducer";
import notificationReducer from "./notificationReducer";

/**
 * Reducer store
 */
const reducers = combineReducers({
  graphs: graphsReducer,
  images: imageListReducer,
  containersList: containerListReducer,
  networkList: dockerComposeReducer,
  notificationList: notificationReducer,
});

export default reducers;
