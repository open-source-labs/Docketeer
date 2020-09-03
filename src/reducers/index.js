import { combineReducers } from 'redux';
import listsReducer from './ListsReducer';

const reducers = combineReducers({
	lists: listsReducer,
});

export default reducers;
