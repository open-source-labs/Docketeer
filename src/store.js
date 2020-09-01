import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import reducers from "./reducers/index";

const store = createStore(reducers, 
    //composeWithDevTools(),
    
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    );

export default store;
