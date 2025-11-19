"use client";
import CartMessage from "@/app/_components/cart/CartMessage";
import OrderItem from "@/app/_components/orders/OrderItem";
import { getOrders } from "@/app/_components/orders/orderSlice";
import Spinner from "@/app/_ui/Spinner";
import Error from "@/app/error";
import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

function Page() {
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((store) => store.order);
  useEffect(() => {
    const controller = new AbortController();
    dispatch(getOrders(controller.signal));
    return () => controller.abort();
  }, []);
  if (loading) return <Spinner />;
  if (error) return <Error />;
  if (!orders?.length) return <CartMessage />;
  return (
    <div>
      <p className="text-center border-y border-[#FF9900] py-1 place-self-center capitalize">
        Your Orders {orders[0].customerName.split(" ")[0]}
      </p>
      <ul className="grid grid-cols-1 gap-x-12 gap-y-8 space-y-2 py-4">
        {orders?.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </ul>
    </div>
  );
}

export default Page;
