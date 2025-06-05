const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
  name: "User",
  initialState: {
    user: {},
    Auth: localStorage.getItem("jwt") ? true : false,
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
