import * as types from "../constants/actionTypes";
import { sessionState } from '../../../types';

export default function (state = sessionState, action: any) {
  switch (action.type) {
    // Change isLoggedIn state variable depending on previous value
    case types.UPDATE_SESSION:
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn,
      };

    // Upon successful sign-up or login, update session state with all user info
    case types.UPDATE_USER:
      const {
        _id,
        username,
        email,
        phone,
        role,
        role_id,
        contact_pref,
        mem_threshold,
        cpu_threshold,
        container_stops,
        token,
      } = action.payload;

      return {
        ...state,
        _id,
        username,
        email,
        phone,
        role,
        role_id,
        contact_pref,
        mem_threshold,
        cpu_threshold,
        container_stops,
        token,
      };

    // after logging out, remove all user info from session state
    case types.LOGOUT_USER:
      return {
        ...sessionState,
      };

    default:
      return { ...state };
  }
}
