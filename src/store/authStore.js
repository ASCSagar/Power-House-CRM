import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  /* loginOperation : 0 : need to refresh token, 1 mean all set. -1 mean go to login page
  By default it's 1 because we are relying on app data first and either login will happen first or we will get override with localData
*/
  userName: "",
  loggedIn: true,
  accessToken: null,
  refreshToken: null,
  userId: null,
  user_type: null,
  timeOfLogin: null,
  logInOperation: 1,
};

const authStore = createSlice({
  name: "AUTHState",
  initialState,
  reducers: {
    setAuthStatus(state, action) {
      if (action.payload.loggedIn) {
        state.loggedIn = true;
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
        state.timeOfLogin = action.payload.timeOfLogin;
        state.userName = action.payload.userName;
        state.user_type = action.payload.user_type;
        state.userId = action.payload.userId;
        state.logInOperation = action.payload.logInOperation;
      } else {
        state.loggedIn = false;
        state.timeOfLogin = null;
        state.logInOperation = action.payload.logInOperation;
      }
    },
  },
});

export const authAction = authStore.actions;

export default authStore.reducer;