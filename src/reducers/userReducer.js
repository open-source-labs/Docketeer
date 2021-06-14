import * as types from "../constants/actionTypes";

const initialState = {
  name: '',
  email: '',
  phone: '',
  role: '',
  role_id: '',
  contact_pref: '',
  mem_threshold: '',
  cpu_threshold: '',
  container_stops: false,
  isSysAdmin: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case types.UPDATE_ALL: {
      
    }
    case types.UPDATE_NAME: {

    }
    case types.UPDATE_EMAIL: {

    }
    case types.UPDATE_PHONE: {

    }
    case types.UPDATE_ROLE: {

    }
    case types.UPDATE_CONTACT_PREF: {

    }
    case types.UPDATE_MEM_THRESHOLD: {

    }
    case types.UPDATE_CPU_THRESHOLD: {

    }
    case types.UPDATE_CONTAINER_STOPS: {

    }
    default:
      return state;
  }
}