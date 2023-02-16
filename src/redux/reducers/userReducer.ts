import { PayloadAction, createSlice } from "@reduxjs/toolkit";
// import { userStateType } from "../../../types";
import { UserInfo, userStateType } from "../../../types";

const initialState: userStateType = {
  userList: [],
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    updateUsers: (state, action: PayloadAction<UserInfo[]>) => {
      state.userList = action.payload;
    },
    updateRoles: (state, action: PayloadAction<any>) => {
      // DELETE KENS BEFORE PUSH
      const { _id, role }: { _id: string; role: string } = action.payload;
      for (const user of state.userList) {
        if (user._id === _id) {
          user.role = role;
          return;
        }
      }
    },
    //  {
    //   const { _id, role }: { _id: string; role: string } = action.payload;
    //   const newUserList = [...state.userList];
    //   for (let i = 0; i < newUserList.length; i++) {
    //     if (newUserList[i]._id === _id) {
    //       newUserList[i].role = role;
    //       break;
    //     }
    //   }
    //   return {
    //     ...state,
    //     userList: newUserList,
    //   };
    // },
  },
});

export const { updateUsers, updateRoles } = userSlice.actions;
export default userSlice.reducer;
