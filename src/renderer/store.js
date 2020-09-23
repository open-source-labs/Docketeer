import { createStore } from "redux";
import reducers from "../reducers/index";

const store = createStore(reducers);

export default store;
