import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState, UserInfo } from "./types";



const initialState: AuthState = {
  jwt: null,
  userInfo: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setJwt: (state, action: PayloadAction<string>) => {
      state.jwt = action.payload;
    },
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      const jwt = state.jwt;
      if (jwt) {
        // Query the server with the JWT to get the user details
        // Update the userInfo state with the response from the server
      }
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.jwt = null;
      state.userInfo = null;
    },
  },
});

export const { setJwt, setUserInfo, setError, logout } = authSlice.actions;

export default authSlice.reducer;
