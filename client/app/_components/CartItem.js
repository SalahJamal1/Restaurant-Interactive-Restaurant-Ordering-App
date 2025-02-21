import { useSelector } from "react-redux";
import CartOption from "./CartOption";
import Image from "next/image";

function CartItem({ item }) {
  const { cart } = useSelector((store) => store.cart);

  const currentCart = cart.find((el) => el?.name === item?.name);
  return (
    <li className="flex py-4">
      <div className="px-5 pt-4 flex-grow">
        <div className="flex justify-between">
          <div className="flex space-x-4 flex-grow">
            <div className="relative aspect-square">
              <Image
                fill
                src={item.imageUrl}
                alt={item.name}
                className="object-cover rounded-full"
              />
            </div>
            <div className="space-y-4  flex-1">
              <h2 className="text-base flex items-center gap-2">
                <span className="text-xl">{item?.quantity}x</span>
                {item?.name}
              </h2>
              <p className="text-base capitalize items-center gap-1 flex-1">
                price <span className="font-bold">${item?.unitPrice}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center space-y-4">
            <CartOption currentCart={currentCart} />
            <span className="flex items-center text-xl gap-8">
              <span className="font-bold text-base">Total: </span>$
              {Math.round(item?.totalPrice)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CartItem;
