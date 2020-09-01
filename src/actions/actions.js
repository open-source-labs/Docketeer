import * as types from '../constants/actionTypes';

export const addContainer = (data) => ({
	type: types.ADD_CONTAINER,
	payload: data,
});

export const getRunningContainers = (data) => ({
	type: types.GET_RUNNING_CONTAINERS,
	payload: data,
});
