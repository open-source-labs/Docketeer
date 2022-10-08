import { createStore, compose } from 'redux';
import reducers from '../reducers/index';

// Enhancers function uses compose function to pass the Redux Store to the Redux extension.
const enhancers = compose(
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const store = createStore(reducers, enhancers);

export default store;
