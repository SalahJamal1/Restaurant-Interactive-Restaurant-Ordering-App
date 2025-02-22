import Link from "next/link";

function CartMessage() {
  return (
    <div className="pt-12 space-y-12">
      <Link
        href="/menu"
        className="font-semibold tracking-widest capitalize border-b-2 border-black pb-1 duration-150 transition-all hover:border-none"
      >
        Back to menu
      </Link>
      <p className="text-base">
        Oops! Your Cart is Looking a Little Empty 😅.Let’s Start Your Dinner
        With Us
      </p>
    </div>
  );
}

export default CartMessage;
