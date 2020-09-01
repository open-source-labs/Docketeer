import * as types from '../constants/actionTypes';

const { exec } = require('child_process');

const initialState = {
	containerList: [],
};

const containersReducer = (state = initialState, action) => {
	switch (action.type) {
		// case types.GET_RUNNING_CONTAINERS:

		case types.ADD_CONTAINER:
			let newContainerList = state.containerList.slice();
			newContainerList.push(action.payload)
			return { ...state, containerList: newContainerList };
		default:
			return state;
	}
};

export default containersReducer;
