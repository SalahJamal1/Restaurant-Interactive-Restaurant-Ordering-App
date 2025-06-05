const { createSlice } = require("@reduxjs/toolkit");
const isBrowser = typeof window !== "undefined";

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    Auth: isBrowser && localStorage.getItem("jwt") ? true : false,
  },
  reducers: {
    login(state, action) {
      state.user = action.payload;
      state.Auth = true;
    },
    logout(state, action) {
      state.user = {};
      state.Auth = false;
    },
    getUser(state, action) {
      state.user = action.payload;
      state.Auth = true;
    },
  },
});

export const { login, logout, getUser } = userSlice.actions;

export default userSlice.reducer;
