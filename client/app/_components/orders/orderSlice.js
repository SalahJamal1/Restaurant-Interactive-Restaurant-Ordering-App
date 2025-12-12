import { GetOrders } from "@/app/_lib/apiOrder";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const getOrders = createAsyncThunk(
  "order",
  async (signal, { rejectWithValue }) => {
    try {
      const res = await GetOrders(signal);
      return res.data;
    } catch (err) {
      if (err.name === "CanceledError") {
        rejectWithValue(null);
        return;
      }
      console.log(err);
      return rejectWithValue(
        err.response?.data?.message || err.message || "Something went wrong"
      );
    }
  }
);
const orderSlice = createSlice({
  name: "Order",
  initialState: {
    orders: [],
    loading: true,
    error: "",
  },
  extraReducers: (b) =>
    b
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.orders = action.payload;
        state.loading = false;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      }),
});

export default orderSlice.reducer;
