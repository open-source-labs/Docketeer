import * as types from "../constants/actionTypes";

export const addContainer = (data) => ({
  type: types.ADD_CONTAINER,
  payload: data,
});
