import Image from "next/image";

function OrderItem({ order }) {
  console.log(order);
  return (
    <li className="flex py-4">
      <div className="px-5 pt-4 flex-grow">
        <div className="flex justify-between">
          <div className="flex space-x-4 flex-grow">
            <div className="relative aspect-square">
              <Image
                fill
                src={order.imageUrl}
                alt={order.name}
                className="object-cover rounded-full"
              />
            </div>
            <div className="space-y-4  flex-1">
              <h2 className="text-base flex orders-center gap-2">
                <span className="text-xl">{order?.quantity}x</span>
                {order?.name}
              </h2>
              <p className="text-base capitalize orders-center gap-1 flex-1">
                price <span className="font-bold">${order?.unitPrice}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-col orders-center space-y-4">
            <span className="flex orders-center text-xl gap-8">
              <span className="font-bold text-base">Total: </span>$
              {Math.round(order?.orderPrice)}
            </span>
          </div>
        </div>
      </div>
    </li>
  );
}

export default OrderItem;
