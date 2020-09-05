import * as types from "../constants/actionTypes";

const initialState = {
	//tbd about having two arrays,
	imagesList: [],
	runningList: [],
	stoppedList: [],
};

const listsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.ADD_RUNNING_CONTAINERS:
			const newRunningList = state.runningList.slice();
			for (let container of action.payload) {
				newRunningList.push(container)
			}
			return { ...state, runningList: newRunningList };

		case types.REMOVE_CONTAINER:
			const removeContainerList = [];
			console.log("removeContainerList1", removeContainerList)
			for (let container of state.stoppedList) {
				if (container.cid !== action.payload) {
					removeContainerList.push(container);
				}
			}
			console.log("removeContainerList2",removeContainerList);
			return { ...state, stoppedList: removeContainerList };

		case types.STOP_RUNNING_CONTAINER:
			const newStoppedList = state.stoppedList.slice();
			const newestRunningList = [];
			for (let container of state.runningList) {
				if (container.cid === action.payload) {
					console.log('action.payload', action.payload)
					console.log('container id', container.cid)
					newStoppedList.push(container);
				}
				if (container.cid !== action.payload) {
					newestRunningList.push(container);
				}
			}
			//console.log('runningList', newestRunningList);
			//console.log('stoppedList', newStoppedList);
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
				if (container.cid === action.payload.cid) {
					console.log('runningListCopy1:', runningListCopy)
					console.log('newerStoppedContainer1:', newerStoppedContainer)
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
