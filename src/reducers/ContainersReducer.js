import * as types from "../constants/actionTypes";

const initialState = {
	runningList: [],
	stoppedList: [],
};

const containersReducer = (state = initialState, action) => {
	switch (action.type) {

		case types.ADD_CONTAINER:
			const newRunningList = state.runningList.slice();
			newRunningList.push(action.payload);
			return { ...state, runningList: newRunningList };

		case types.REMOVE_CONTAINER:
			const newerRunningList = [];
			for (let container of state.runningList) {
				if (container.id !== action.payload) {
					newerRunningList.push(container);
				}
			}
			return { ...state, runningList: newerRunningList }

		default:
			return state;
	}
};

export default containersReducer;
