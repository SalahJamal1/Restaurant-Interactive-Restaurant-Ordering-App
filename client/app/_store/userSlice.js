import { isAuth } from "../utils/isAuth";

const { createSlice } = require("@reduxjs/toolkit");

const initialState = {
  user: {},
  Auth: isAuth(),
  loader: false,
  errors: {
    firstName: "",
    lastName: "",
    address: "",
    phone: "",
    email: "",
    password: "",
  },
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
    SET_ERROR(state, action) {
      switch (action.payload.type) {
        case "ERROR_FIRSTNAME":
          return {
            ...state,
            errors: { ...state.errors, firstName: action.payload.value },
          };
        case "ERROR_LASTNAME":
          return {
            ...state,
            errors: { ...state.errors, lastName: action.payload.value },
          };
        case "ERROR_ADDRESS":
          return {
            ...state,
            errors: { ...state.errors, address: action.payload.value },
          };
        case "ERROR_PHONE":
          return {
            ...state,
            errors: { ...state.errors, phone: action.payload.value },
          };
        case "ERROR_EMAIL":
          return {
            ...state,
            errors: { ...state.errors, email: action.payload.value },
          };
        case "ERROR_PASSWORD":
          return {
            ...state,
            errors: { ...state.errors, password: action.payload.value },
          };
        default:
          return state;
      }
    },
  },
});

export const { login, logout, getUser, Loader, SET_ERROR } = userSlice.actions;

export default userSlice.reducer;
