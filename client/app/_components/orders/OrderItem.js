import Image from "next/image";
import UserLoader from "../../_ui/UserLoader";

function formatDate(date) {
  return Intl.DateTimeFormat("en-us", {
    year: "2-digit",
    month: "long",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(new Date(date));
}
function OrderItem({ order }) {
  const x =
    new Date(order?.estimatedDelivery).getMinutes() - new Date().getMinutes();
  return (
    <div className="border-2 border-[#FF9900]">
      <UserLoader />
      <div className="py-3 px-8">
        <div className="flex items-center justify-between mb-4 p-2">
          <span className="text-base font-semibold">
            Order {order?.id} Status
          </span>
          <div>
            <span
              className={`${
                order?.status === "Delivered" ? "bg-green-500 " : "bg-red-600"
              } py-1 px-2 text-slate-100 capitalize rounded-full`}
            >
              {order?.status}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4 bg-[#FF9900] text-white p-2">
          <span className="text-sm font-semibold">
            {order?.actualDelivery !== null
              ? "Your order has been successfully delivered."
              : `Only ${x} minutes left 😃`}
          </span>
          <span className="text-sm font-semibold">
            {order?.actualDelivery !== null
              ? "Thank you for ordering with us. 🚀❤️"
              : `Estimated delivery: ${formatDate(order?.estimatedDelivery)}`}
          </span>
        </div>
        <div className="flex items-center justify-between mb-4 p-2">
          <span className="text-xl flex items-center gap-4">
            Total:
            <span className="text-2xl">${order?.orderPrice}</span>
          </span>
          <span className="text-sm font-semibold capitalize">
            location: {order.address}
          </span>
        </div>
        <ul className="flex flex-col divide-y divide-slate-300 space-y-4">
          {order?.cart?.map((cart) => (
            <li key={cart.item.id} className="flex items-center space-x-4 py-2">
              <Image
                src={cart?.item?.imageUrl}
                alt={cart?.item?.name}
                width="50"
                height="50"
                className="object-cover object-center rounded-full"
              />
              <div className="flex flex-col space-y-2">
                <p className="flex items-center gap-2">
                  <span className="text-xl">{cart?.quantity}x</span>
                  <span className="font-semibold">{cart?.item?.name}</span>
                </p>
                <p className="capitalize italic text-sm">
                  {cart?.item?.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default OrderItem;
