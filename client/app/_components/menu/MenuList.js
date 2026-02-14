"use client";
import Image from "next/image";
import { IoStarSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import CartOption from "../cart/CartOption";
import { orderNow } from "../cart/cartSlice";

function MenuCard({ item }) {
  const dispatch = useDispatch();

  const { cart } = useSelector((store) => store.cart);
  function addToCart(e) {
    e.preventDefault();
    if (!item) return;
    const newOrder = {
      item,
      quantity: 1,
      totalPrice: item?.unitPrice * 1,
    };
    dispatch(orderNow(newOrder));
  }
  const currentCart = cart.find((el) => el?.item.id === item?.id);
  return (
    <li className="bg-white h-[432px] w-[326px] grid grid-rows-[1fr,10rem] shadow-lg">
      <div className="relative flex-1 overflow-hidden cursor-pointer">
        <Image
          fill
          src={item?.imageUrl}
          alt={item.name}
          loading="lazy"
          onLoad={(e) => e.currentTarget.classList.add("loaded")}
          placeholder="blur"
          blurDataURL="data:image/webp;base64,..."
          className="flex-1 object-cover object-top hover:scale-[1.5] transition-all duration-300"
        />
      </div>
      <div className="px-5 pt-4">
        <div className="flex justify-between mb-1">
          <h2 className="text-base w-10/12 h-11">{item.name}</h2>
          <span className="text-xl text-[#FF9900] font-bold">
            ${item.unitPrice}
          </span>
        </div>

        <p className="text-[10px] capitalize italic text-slate-500 font-semibold tracking-wider h-12">
          {item.description}
        </p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-1">
            <span className="text-base">5.0</span>

            <div className="flex items-center space-x-1 text-[#FF9900]">
              {Array.from({ length: 5 }, (_, i) => (
                <span key={i}>
                  <IoStarSharp />
                </span>
              ))}
            </div>
          </div>

          {currentCart ? (
            <CartOption currentCart={currentCart} />
          ) : (
            <button
              onClick={addToCart}
              className="bg-[#FF9900] text-white px-2 py-1"
            >
              order now
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuCard;
