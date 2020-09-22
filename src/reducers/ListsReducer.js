import * as types from "../constants/actionTypes";

const initialState = {
	//tbd about having two arrays,
	imagesList: [],
	runningList: [],
	stoppedList: [],
	networkList: [],
};

const listsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_RUNNING_CONTAINERS:
			const newRunningList = state.runningList.slice();
			for (let container of action.payload) {
				newRunningList.push(container);
			}
			return { ...state, runningList: newRunningList };

		case types.REMOVE_CONTAINER:
			const removeContainerList = [];
			for (let container of state.stoppedList) {
				if (container.cid !== action.payload) {
					removeContainerList.push(container);
				}
			}
			return { ...state, stoppedList: removeContainerList };

		case types.STOP_RUNNING_CONTAINER:
			const newStoppedList = state.stoppedList.slice();
			const newestRunningList = [];
			for (let container of state.runningList) {
				if (container.cid !== action.payload) {
					newestRunningList.push(container);
				}
			}

			return {
				...state,
				runningList: newestRunningList,
				stoppedList: newStoppedList,
			};

		case types.ADD_STOPPED_CONTAINERS:
			const newerStoppedList = state.stoppedList.slice();
			for (let container of action.payload) {
				newerStoppedList.push(container);
			}
			return { ...state, stoppedList: newerStoppedList };

		case types.RUN_STOPPED_CONTAINER:
			const runningListCopy = state.runningList.slice();
			const newerStoppedContainer = [];
			for (let container of state.stoppedList) {
				if (container.cid === action.payload) {
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
			return {
				...state,
				imagesList: newImagesList,
			};
		case types.REMOVE_IMAGE:
			const newRemoveImage = [];
			for (let image of state.imagesList) {
				if (image.id !== action.payload) {
					newRunningList.push(image);
				}
			}
			return { ...state, imageList: newRemoveImage };
		case types.REFRESH_RUNNING_CONTAINERS:
			const newRunningList2 = [];
			for (let container of action.payload) {
				newRunningList2.push(container);
			}
			return { ...state, runningList: newRunningList2 };

		case types.REFRESH_STOPPED_CONTAINERS:
			const newStoppedList4 = [];
			for (let container of action.payload) {
				newStoppedList4.push(container);
			}
			return { ...state, stoppedList: newStoppedList4 };
		case types.REFRESH_IMAGES:
			const newImagesList2 = [];
			for (let image of action.payload) {
				newImagesList2.push(image);
			}
			return { ...state, imagesList: newImagesList2 }

		case types.COMPOSE_YML_FILES:
			const newnetworkList = state.networkList.slice();

			newnetworkList.push(action.payload[0]);
			return { ...state, networkList: newnetworkList };
		default:
			return state;
	}
};

export default listsReducer;
