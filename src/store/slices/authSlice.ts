import { IStandardAPIResponse, LoginResponse, User } from "@/vm";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { createApiThunk } from "../thunkHelpers";

export interface AuthState {
  user?: User;
  token?: string;
}

const initialState: AuthState = {
  user: undefined,
  token: undefined,
};

export const loginSubmission = createApiThunk<{ empId: number; password: string }, LoginResponse>(
  "auth/login",
  "login",
  "POST"
);

export const getAccessToken = createApiThunk<undefined, { token: string }>(
  "getAccessToken",
  "get-access-token",
  "GET"
);

export const getRoles = createApiThunk<undefined, any>("get/roles", "roles", "GET");

export const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = undefined;
      state.token = undefined;
    },
    setToken: (state, { payload }: PayloadAction<string>) => {
      state.token = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginSubmission.rejected, (state) => {
      state.user = undefined;
    });
    builder.addCase(
      loginSubmission.fulfilled,
      (state, { payload: { data } }: PayloadAction<IStandardAPIResponse<LoginResponse>>) => {
        state.token = data.token;
        state.user = data.user;
      }
    );
    builder.addCase(getRoles.fulfilled, (state, action) => {
      console.log("object entere");
    });
    builder.addCase(getRoles.rejected, (state, action) => {
      console.log("object entered in rejected");
    });
    builder.addCase(getAccessToken.fulfilled, (state, action) => {
      state.token = action.payload.data.token;
    });
    builder.addCase(getAccessToken.rejected, (state, action) => {
      state.token = undefined;
    });
  },
});
export const { logout, setToken } = authSlice.actions;
export default authSlice.reducer;
