import { isAuth } from "../utils/isAuth";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: {},
  Auth: isAuth(),
  loader: false,
};
const userSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.Auth = true;
      state.loader = false;
    },
    logout(state, action) {
      state.user = {};
      state.Auth = false;
      state.loader = false;
    },
    getUser(state, action) {
      state.user = action.payload;
      state.Auth = true;
      state.loader = false;
    },
    Loader(state) {
      state.loader = true;
    },
  },
});

export const { login, logout, getUser, Loader } = userSlice.actions;

export default userSlice.reducer;
