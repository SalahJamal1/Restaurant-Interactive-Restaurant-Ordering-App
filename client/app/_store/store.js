import { configureStore } from "@reduxjs/toolkit";
import user from "@/app/_store/userSlice";
import cart from "./cartSlice";
import order from "./orderSlice";
export const store = configureStore({
  reducer: {
    user,
    cart,
    order,
  },
});
