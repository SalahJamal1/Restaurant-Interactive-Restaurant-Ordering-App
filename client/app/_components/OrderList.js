"use client";
import { useDispatch, useSelector } from "react-redux";
import CartMessage from "./CartMessage";
import OrderItem from "./OrderItem";
import { Suspense, useEffect } from "react";
import { setOrders } from "../_store/orderSlice";
import Spinner from "./Spinner";

function OrderList() {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const { orders } = useSelector((store) => store.order);
  useEffect(
    function () {
      if (user) {
        dispatch(setOrders(user.orders));
      }
    },
    [dispatch, user, orders]
  );

  if (!orders.length) return <CartMessage />;
  return (
    <div className="px-12 space-y-2">
      <p className="text-center border-y border-[#FF9900] py-1 place-self-center">
        Your Orders {user?.firstName}
      </p>
      <Suspense fallback={<Spinner />} key={user}>
        <ul className="grid grid-cols-1 gap-x-12 gap-y-8 overflow-y-scroll h-[63vh] space-y-2 py-4">
          {orders?.map((order) => (
            <OrderItem key={order.id} order={order} />
          ))}
        </ul>
      </Suspense>
    </div>
  );
}

export default OrderList;
