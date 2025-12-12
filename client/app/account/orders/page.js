"use client";
import CartMessage from "@/app/_components/cart/CartMessage";
import OrderItem from "@/app/_components/orders/OrderItem";
import { getOrders } from "@/app/_components/orders/orderSlice";
import Spinner from "@/app/_ui/Spinner";
import Error from "@/app/error";
import { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";

function Page() {
  const dispatch = useDispatch();
  const { orders, error, loading } = useSelector((store) => store.order);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    if (!orders?.length) dispatch(getOrders(controller.signal));
    setMounted(true);
    return () => controller.abort();
  }, [dispatch, orders]);

  if (loading || loading === undefined || !mounted || orders === undefined)
    return <Spinner />;
  if (error) return <Error />;
  return (
    <>
      {orders?.length > 0 ? (
        <div
          className={`${
            loading ? "opacity-0 scale-105" : "opacity-100 scale-100"
          } transition-all duration-500`}
        >
          <p className="text-center border-y border-[#FF9900] py-1 place-self-center capitalize">
            Your Orders {orders?.at(0)?.customerName?.split(" ")[0]}
          </p>
          <ul className="grid grid-cols-1 gap-x-12 gap-y-8 space-y-2 py-4">
            {orders?.map((order) => (
              <OrderItem key={order.id} order={order} />
            ))}
          </ul>
        </div>
      ) : (
        <CartMessage />
      )}
    </>
  );
}

export default Page;
