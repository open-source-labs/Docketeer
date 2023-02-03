import * as types from "../constants/actionTypes";
import { PayloadAction } from "@reduxjs/toolkit";
import {userState} from '../../../types';

export default function (state = userState, action: PayloadAction<any>) {
  switch (action.type) {
    // Change isLoggedIn state variable depending on previous value
    case types.UPDATE_USER_LIST:
      return {
        userList: action.payload,
      };

    case types.UPDATE_USER_ROLE: {
      const { _id, role }: { _id: string; role: string } = action.payload;
      const newUserList = [...state.userList];
      for (let i = 0; i < newUserList.length; i++) {
        if (newUserList[i]._id === _id) {
          newUserList[i].role = role;
          break;
        }
      }
      return {
        ...state,
        userList: newUserList,
      };
    }
    default:
      return {
        ...state,
      };
  }
}
