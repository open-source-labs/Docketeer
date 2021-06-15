import * as types from '../constants/actionTypes';

const initialState = {
  userList: [],
};

export default function (state = initialState, action){
  switch(action.type) {

  // Change isLoggedIn state variable depending on previous value
  case types.UPDATE_USER_LIST: {
    const userList = action.payload;
    return { 
      userList,  
    };
  }

  default: {
    return {
      ...state
    };
  }}
}