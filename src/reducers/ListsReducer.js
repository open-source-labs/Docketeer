import * as types from "../constants/actionTypes";

const initialState = {
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
			const newStoppedList = [];
			for (let container of state.stoppedList) {
				if (container.cid !== action.payload) {
					newStoppedList.push(container);
				}
			}
			return { ...state, stoppedList: newStoppedList };

		case types.STOP_RUNNING_CONTAINER:
			const newStoppedList2 = state.stoppedList.slice();
			const newRunningList2 = [];
			for (let container of state.runningList) {
				if (container.cid !== action.payload) {
					newRunningList2.push(container);
				} else {
					newStoppedList2.push(container)
				}
			}
			return {
				...state,
				runningList: newRunningList2,
				stoppedList: newStoppedList2,
			};

		case types.ADD_STOPPED_CONTAINERS:
			const newStoppedList3 = state.stoppedList.slice();
			for (let container of action.payload) {
				newStoppedList3.push(container);
			}
			return { ...state, stoppedList: newStoppedList3 };

		case types.RUN_STOPPED_CONTAINER:
			const newRunningList3 = state.runningList.slice();
			const newStoppedList4 = [];
			for (let container of state.stoppedList) {
				if (container.cid === action.payload) {
				} else {
					newStoppedList4.push(container);
				}
			}
			return {
				...state,
				runningList: newRunningList3,
				stoppedList: newStoppedList4,
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
			const newImagesList2 = [];
			for (let image of state.imagesList) {
				if (image.imgid !== action.payload) {
					newImagesList2.push(image);
				}
			}
			return { ...state, imagesList: newImagesList2 };
		case types.REFRESH_RUNNING_CONTAINERS:
			const newRunningList4 = [];
			for (let container of action.payload) {
				newRunningList4.push(container);
			}
			return { ...state, runningList: newRunningList4 };

		case types.REFRESH_STOPPED_CONTAINERS:
			const newStoppedList5 = [];
			for (let container of action.payload) {
				newStoppedList5.push(container);
			}
			return { ...state, stoppedList: newStoppedList5 };
		case types.REFRESH_IMAGES:
			const newImagesList3 = [];
			for (let image of action.payload) {
				newImagesList3.push(image);
			}
			return { ...state, imagesList: newImagesList3 }

		case types.COMPOSE_YML_FILES:
			const newNetworkList = state.networkList.slice();
			console.log(action.payload[0]);
			newNetworkList.push(action.payload[0]);
			return { ...state, networkList: newNetworkList };

		case types.GET_COMPOSED_YML_FILES:
			const newNetworkList2 = state.networkList.slice();
			console.log('action.payload get compose:', action.payload);

			let keys = Object.keys(action.payload);

			for (let i = 0; i < keys.length; i++) {
				console.log("action.payload[keys[i]]: ", action.payload[keys[i]])
				let newKey = keys[i]
				let obj = {}
				obj[newKey] = action.payload[keys[i]];
				newNetworkList2.push(obj);
			}
			return { ...state, networkList: newNetworkList2 };

		default:
			return state;
	}
};

export default listsReducer;
