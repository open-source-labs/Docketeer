import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { userStateType } from "../../../types";
import { userStateType } from "../../../types";

const initialState: userStateType = {
  userList: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<any>) => {
      state.userList = action.payload;
    },
    updateRoles: (state, action: PayloadAction<any>) => {
      {
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
    },
  },
});

export const { updateUsers, updateRoles } = userSlice.actions;
export default userSlice.reducer;
