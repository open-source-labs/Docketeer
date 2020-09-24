import { combineReducers } from 'redux';
import listsReducer from './ListsReducer';

/**
 * Reducer store
 */
const reducers = combineReducers({
	lists: listsReducer,
});

export default reducers;
