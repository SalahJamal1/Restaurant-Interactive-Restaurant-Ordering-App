import { configureStore } from "@reduxjs/toolkit";
import user from "@/app/_components/account/userSlice";
import cart from "../_components/cart/cartSlice";
import order from "../_components/orders/orderSlice";
export const store = configureStore({
  reducer: {
    user,
    cart,
    order,
  },
});
