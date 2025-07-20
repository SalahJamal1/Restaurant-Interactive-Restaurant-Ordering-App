const { createSlice } = require("@reduxjs/toolkit");

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cart: [],
  },
  reducers: {
    orderNow(state, action) {
      state.cart.push(action.payload);
    },
    Incorder(state, action) {
      const cart = state.cart.find((el) => el.item.id === action.payload);
      cart.quantity++;
      cart.totalPrice = cart.quantity * cart.item.unitPrice;
    },
    Decorder(state, action) {
      const cart = state.cart.find((el) => el.item.id === action.payload);
      cart.quantity--;
      cart.totalPrice = cart.quantity * cart.item.unitPrice;
      if (cart.quantity <= 0) cartSlice.caseReducers.DeleteItem(state, action);
    },
    DeleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.item.id !== action.payload);
    },
    ClearCart(state) {
      state.cart = [];
    },
  },
});

export const { orderNow, Incorder, Decorder, ClearCart, DeleteItem } =
  cartSlice.actions;
export default cartSlice.reducer;
