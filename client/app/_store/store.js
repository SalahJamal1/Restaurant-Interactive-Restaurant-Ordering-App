import { configureStore } from "@reduxjs/toolkit";
import user from "@/app/login/userSlice";
import cart from "./cartSlice";
export const store = configureStore({
  reducer: {
    user,
    cart,
  },
});
