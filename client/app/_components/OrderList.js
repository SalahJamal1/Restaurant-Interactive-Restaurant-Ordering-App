"use client";
import { useSelector } from "react-redux";
import CartMessage from "./CartMessage";

import CartItem from "./CartItem";
import OrderItem from "./OrderItem";

function OrderList() {
  const { user } = useSelector((store) => store.user);
  const { orders } = user;
  if (!orders?.length) return <CartMessage />;
  return (
    <div className="py-12 space-y-8 px-12">
      <p className="text-center border-y border-[#FF9900] py-1 place-self-center">
        To Let’s Start Your Dinner With Us
      </p>

      <ul className="flex flex-col divide-y divide-slate-300 border-b border-slate-300">
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
