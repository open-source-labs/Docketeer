import { combineReducers } from "redux";
import listsReducer from "./ListsReducer";
import imageListReducer from "./imageListReducer";
import runningListReducer from "./runningContainersReducer";
import stoppedListReducer from "./stoppedContainersReducer";
import dockerComposeReducer from "./dockerComposeReducer";

/**
 * Reducer store
 */
const reducers = combineReducers({
  lists: listsReducer,
  images: imageListReducer,
  runningList: runningListReducer,
  stoppedList: stoppedListReducer,
  networkList: dockerComposeReducer,
});

export default reducers;
