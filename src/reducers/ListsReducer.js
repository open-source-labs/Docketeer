import * as types from "../constants/actionTypes";

const initialState = {
	//tbd about having two arrays,
	imagesList: [],
	runningList: [],
	stoppedList: [],
};

const listsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_RUNNING_CONTAINER:
			const newRunningList = state.runningList.slice();
			newRunningList.push(action.payload);
			console.log(newRunningList);
			return { ...state, runningList: newRunningList };

		case types.REMOVE_CONTAINER:
			const newerRunningList = [];
			for (let container of state.runningList) {
				if (container.id !== action.payload) {
					newerRunningList.push(container);
				}
			}
			return { ...state, runningList: newerRunningList };

		case types.STOP_RUNNING_CONTAINER:
			const newStoppedList = state.stoppedList.slice();
			const newestRunningList = [];

			for (let container of state.runningList) {
				if (container.id === action.payload) {
					newStoppedList.push(container);
				} else {
					newestRunningList.push(container);
				}
			}
			return {
				...state,
				runningList: newestRunningList,
				stoppedList: newStoppedList,
			};

		case types.ADD_STOPPED_CONTAINER:
			const newerStoppedList = state.stoppedList.slice();
			newerStoppedList.push(action.payload);
			return { ...state, stoppedList: newerStoppedList };

		case types.RUN_STOPPED_CONTAINER:
			const runningListCopy = state.stoppedList.slice();
			const newerStoppedContainer = [];
			for (let container of state.stoppedList) {
				if (container.id === action.payload) {
					runningListCopy.push(container);
				} else {
					newerStoppedContainer.push(container);
				}
			}
			return {
				...state,
				runningList: runningListCopy,
				stoppedList: newerStoppedContainer,
			};
		case types.GET_IMAGES:
			const newImagesList = state.imagesList.slice();
			
			for (let image of action.payload) {
				newImagesList.push(image);
			}
			
			console.log('hi')
			return {
				...state,
				imagesList: newImagesList
			}
		case types.GET_RUNNING_CONTAINERS: 
			const newContainers = state.runningList.slice();
			for (let container of action.payload) {
				newContainers.push(container);
			}
			return {
				...state,
				runningList: newContainers
			}
		case types.REMOVE_IMAGE:
			const newRemoveImage = [];
			for (let image of state.imagesList) {
				if (image.id !== action.payload) {
					newRunningList.push(image);
				}
			}
			return { ...state, imageList: newRemoveImage };
		default:
			return state;
	}
};

export default listsReducer;
