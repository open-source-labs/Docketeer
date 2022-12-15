import * as types from "../constants/actionTypes";
import {userReducerState } from '../../../types';

export default function (state = userReducerState, action: any) {
  switch (action.type) {
    case types.UPDATE_ALL:
      return;

    case types.UPDATE_NAME:
      return;

    case types.UPDATE_EMAIL:
      return;

    case types.UPDATE_PHONE:
      return;

    case types.UPDATE_ROLE:
      return;

    case types.UPDATE_CONTACT_PREF:
      return;

    case types.UPDATE_MEM_THRESHOLD:
      return;

    case types.UPDATE_CPU_THRESHOLD:
      return;

    case types.UPDATE_CONTAINER_STOPS:
      return;

    default:
      return state;
  }
}
