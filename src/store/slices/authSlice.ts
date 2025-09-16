import { User } from "@/vm";
import { createSlice } from "@reduxjs/toolkit";
import { PayloadAction } from "./../../../node_modules/@reduxjs/toolkit/src/createAction";

export interface AuthState {
  user?: User;
}

const initialState: AuthState = {};

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
