"use client";
import { useDispatch } from "react-redux";
import { Decorder, DeleteItem, Incorder } from "./cartSlice";

function CartOption({ currentCart }) {
  const dispatch = useDispatch();
  const btn =
    "bg-[#FF9900] text-base text-white h-5 w-5 text-2xl rounded-full flex items-center justify-center";
  return (
    <div className="space-x-2 flex items-center">
      <button
        onClick={() => dispatch(Decorder(currentCart?.item.id))}
        className={btn}
      >
        -
      </button>
      <span className="text-xl rounded-full">{currentCart?.quantity}</span>
      <button
        onClick={() => dispatch(Incorder(currentCart?.item.id))}
        className={btn}
      >
        +
      </button>
      <button
        onClick={() => dispatch(DeleteItem(currentCart?.item.id))}
        className="bg-[#FF9900] text-white px-[6px] h-6 text-xs rounded-full flex items-center"
      >
        Delete
      </button>
    </div>
  );
}

export default CartOption;
