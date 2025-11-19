"use client";
import { useEffect } from "react";
import OrderItem from "./OrderItem";
import CartMessage from "@/app/_components/cart/CartMessage";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "./orderSlice";
import Spinner from "@/app/_ui/Spinner";
import Error from "@/app/error";

function OrderList() {
  const dispatch = useDispatch();
  useEffect(() => {
    const controller = new AbortController();
    dispatch(getOrders(controller.signal));
    return () => controller.abort();
  }, []);
  const { orders, error, loading } = useSelector((store) => store.order);

  if (loading) return <Spinner />;
  if (error) return <Error />;
  if (!orders?.length) return <CartMessage />;
  return (
    <div className="px-6 space-y-2">
      <p className="text-center border-y border-[#FF9900] py-1 place-self-center">
        Your Orders
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
