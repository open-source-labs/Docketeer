import * as types from '../constants/actionTypes';

const initialState = {
  _id: '',
  username: '',
  email: '',
  phone: '',
  role: '',
  role_id: '',
  contact_pref: '',
  mem_threshold: '',
  cpu_threshold: '',
  container_stops: '',
  token: '',
  isLoggedIn: false,
  userList: []
};

export default function (state = initialState, action){
  switch(action.type) {

    // Change isLoggedIn state variable depending on previous value
<<<<<<< HEAD:src/module/reducers/sessionReducer.js
    case types.UPDATE_SESSION: 
      return {
        ...state,
        isLoggedIn: !state.isLoggedIn
      };

=======
    case types.UPDATE_SESSION: {
      return { 
        ...state, 
        isLoggedIn : (!state.isLoggedIn) 
      };
    }
    
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/sessionReducer.js
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
        token
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
        token
      };


    // after logging out, remove all user info from session state
<<<<<<< HEAD:src/module/reducers/sessionReducer.js
    case types.LOGOUT_USER: 
      return {
        ...initialState
=======
    case types.LOGOUT_USER: {
      return { 
        ...initialState 
>>>>>>> 276c4d7 (Revert "Updated linting for project. (#107)"):src/reducers/sessionReducer.js
      };

    default:
      return { ...state };
  }
}