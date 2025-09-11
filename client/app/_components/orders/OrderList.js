"use client";
import { useSelector } from "react-redux";
import OrderItem from "./OrderItem";
import CartMessage from "@/app/_components/cart/CartMessage";

function OrderList() {
  const { user } = useSelector((store) => store.user);
  const orders = user.orders ? [...user?.orders] : [];
  if (!orders.length) return <CartMessage />;
  console.log(orders);
  return (
    <div className="px-6 space-y-2">
      <p className="text-center border-y border-[#FF9900] py-1 place-self-center">
        Your Orders {user?.firstName}
      </p>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 overflow-y-scroll h-[63vh] space-y-2 py-4">
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default OrderList;
