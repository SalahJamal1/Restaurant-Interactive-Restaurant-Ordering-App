import Link from "next/link";

function NotFound() {
  return (
    <div className="pt-24 flex flex-col w-full items-center absolute capitalize space-y-4 left-0">
      <h2 className="text-2xl">page not found 😶‍🌫️</h2>
      <Link href="/" className="bg-[#FF9900] px-2 py-1 text-xl text-[#FFF7EA]">
        Go home
      </Link>
    </div>
  );
}

export default NotFound;
