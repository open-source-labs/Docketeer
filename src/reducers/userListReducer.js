import * as types from '../constants/actionTypes';

const initialState = {
  userList: [],
};

export default function (state = initialState, action){
  switch(action.type) {

    // Change isLoggedIn state variable depending on previous value
    case types.UPDATE_USER_LIST:
      return { 
        userList: action.payload,  
      };

    case types.UPDATE_USER_ROLE: 
      const { _id, role } = action.payload;
      const newUserList = [...state.userList];
      for (let i = 0; i < newUserList.length; i++){
        if (newUserList[i]._id === _id){
          newUserList[i].role = role;
          break;
        }
      }
      return {
        ...state,
        userList: newUserList,
      };

    default: 
      return {
        ...state
      };
  }
};