import { combineReducers } from "redux";
import containerReducer from "./ContainerReducer";

const reducers = combineReducers({
  containers: containerReducer,
});

export default reducers;
