import { combineReducers } from "redux";
import containersReducer from "./ContainersReducer";

const reducers = combineReducers({
  containers: containersReducer,
});

export default reducers;
