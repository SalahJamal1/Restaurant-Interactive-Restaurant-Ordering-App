import { configureStore } from "@reduxjs/toolkit";
import user from "@/app/login/userSlice";
import cart from "./cartSlice";
import order from "./orderSlice";
export const store = configureStore({
  reducer: {
    user,
    cart,
    order,
  },
});
