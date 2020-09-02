import * as types from "../constants/actionTypes";

export const addRunningContainer = (data) => ({
  type: types.ADD_RUNNING_CONTAINER,
  payload: data,
});

export const removeContainer = (id) => ({
  type: types.REMOVE_CONTAINER,
  payload: id,
});

export const getRunningContainers = (data) => ({
  type: types.GET_RUNNING_CONTAINERS,
  payload: data,
});

export const stopContainer = (id) => ({
  type: types.STOP_RUNNING_CONTAINERS,
  payload: id,
});

export const addStoppedContainer = () => ({
  type: types.ADD_STOPPED_CONTAINER,
  payload: data,
});

export const runStoppedContainer = () => ({
  type: types.RUN_STOPPED_CONTAINER,
  payload: id,
});
