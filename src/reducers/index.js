import { combineReducers } from "redux";
import listsReducer from "./ListsReducer";
import imageListReducer from "./imageListReducer";
import containerListReducer from "./containerListReducer";
import dockerComposeReducer from "./dockerComposeReducer";
import notificationReducer from "./notificationReducer";

/**
 * Reducer store
 */
const reducers = combineReducers({
  lists: listsReducer,
  images: imageListReducer,
  containersList: containerListReducer,
  networkList: dockerComposeReducer,
  notificationList: notificationReducer,
});

export default reducers;
