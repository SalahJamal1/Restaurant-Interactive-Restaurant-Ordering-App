"use client";
import Link from "next/link";
import { useSelector } from "react-redux";

function CartOverView() {
  const { cart } = useSelector((store) => store.cart);

  if (!cart.length) return;

  const quantity = cart.reduce((a, b) => a + b.quantity, 0);
  const totalPrice = cart.reduce((a, b) => a + b.totalPrice, 0);
  return (
    <div className="bg-black px-12 py-4 flex items-center  justify-between text-slate-100">
      <div className="flex items-center space-x-8">
        <p className="text-xl flex gap-1 capitalize">
          <span>{quantity}</span>
          {quantity > 1 ? "items" : "item"}
        </p>
        <p className="text-xl flex items-center gap-1 capitalize">
          $<span className="text-2xl">{Math.round(totalPrice)}</span>
        </p>
      </div>
      <Link className="text-xl flex gap-1 capitalize" href="/cart">
        Open Cart →
      </Link>
    </div>
  );
}

export default CartOverView;
