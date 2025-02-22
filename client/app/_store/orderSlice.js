const { createSlice } = require("@reduxjs/toolkit");
const orderSlice = createSlice({
  name: "order",
  initialState: {
    orders: [],
  },
  reducers: {
    addOrder(state, action) {
      state.orders.push(action.payload);
      console.log("Add");
    },
    setOrders(state, action) {
      state.orders = action.payload;
    },
    DeleteOrder(state, action) {
      state.orders = state.orders.filter((el) => el.id !== action.payload);
    },
  },
});

export const { addOrder, DeleteOrder, setOrders } = orderSlice.actions;
export default orderSlice.reducer;
