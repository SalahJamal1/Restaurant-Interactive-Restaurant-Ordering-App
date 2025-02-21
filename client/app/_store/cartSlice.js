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
      const item = state.cart.find((el) => el.name === action.payload);
      item.quantity++;
      item.totalPrice = item.quantity * item.unitPrice;
    },
    Decorder(state, action) {
      const item = state.cart.find((el) => el.name === action.payload);
      item.quantity--;
      item.totalPrice = item.quantity * item.unitPrice;
      if (item.quantity <= 0) cartSlice.caseReducers.DeleteItem(state, action);
    },
    DeleteItem(state, action) {
      state.cart = state.cart.filter((el) => el.name !== action.payload);
    },
    ClearCart(state) {
      state.cart = [];
    },
  },
});

export const { orderNow, Incorder, Decorder, ClearCart } = cartSlice.actions;
export default cartSlice.reducer;
