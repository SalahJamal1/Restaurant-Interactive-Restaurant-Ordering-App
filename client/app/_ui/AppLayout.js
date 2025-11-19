"use client";
import { Provider } from "react-redux";
import Header from "./Header";
import CartOverView from "../_components/cart/CartOverView";
import { store } from "../_store/store";

export default function AppLayout({ children }) {
  return (
    <Provider store={store}>
      <Header />
      <div className="overflow-y-scroll text-black bg-[#FFF7EA]">
        <main className="max-w-7xl mx-auto">{children}</main>
      </div>
      <CartOverView />
    </Provider>
  );
}
