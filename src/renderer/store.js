import { createStore } from "redux";
import reducers from "../reducers/index";

/**
 * Create Redux global store
 */
const store = createStore(reducers);

export default store;
