"use client";
import { useDispatch, useSelector } from "react-redux";
import CartMessage from "./CartMessage";

import Link from "next/link";
import CartItem from "./CartItem";
import { useRouter } from "next/navigation";
import { createOrders } from "../_lib/apiResto";
import { ClearCart } from "../_store/cartSlice";
import { addOrder } from "../_store/orderSlice";
import toast from "react-hot-toast";

function CartList() {
  const router = useRouter();
  const { cart } = useSelector((store) => store.cart);
  const { user, Auth } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  if (!cart.length) return <CartMessage />;
  const totalPrice = cart.reduce((a, b) => a + b.totalPrice, 0);

  async function handelCreateOrder(e) {
    e.preventDefault();
    const newOrder = {
      cart,
      orderPrice: totalPrice,
    };
    const res = await createOrders(newOrder);
    if (res?.data) {
      toast.success("Order Created");

      dispatch(addOrder(res.data));
      dispatch(ClearCart());
      router.push("/account/orders");
    }
  }

  return (
    <div className="py-12 space-y-8 px-12">
      <Link
        href="/menu"
        className="font-semibold tracking-widest capitalize border-b-2 border-black pb-1 duration-150 transition-all hover:border-none"
      >
        ← Back to menu
      </Link>
      {!Auth ? (
        <p className="text-center border-y border-[#FF9900] py-1 place-self-center">
          <Link
            href="/login"
            className="font-semibold tracking-widest text-base  text-[#FF9900] mr-2"
          >
            Login
          </Link>
          To Let’s Start Your Dinner With Us
        </p>
      ) : (
        <div className="flex items-start  justify-center">
          <p className="border-y border-[#FF9900] py-[3px] capitalize pr-3">
            Your Cart, {user?.firstName} – Ready for checkout?
          </p>
          <button
            className="bg-[#FF9900] text-white px-3 py-1 capitalize"
            onClick={handelCreateOrder}
          >
            Click Order Now
          </button>
        </div>
      )}

      <ul className="flex flex-col divide-y divide-slate-300 border-b border-slate-300">
        {cart.map((el) => (
          <CartItem key={el.item.id} el={el} />
        ))}
      </ul>
    </div>
  );
}

export default CartList;
