"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("item") ?? "pizza";
  function handelfilter(filter) {
    const params = new URLSearchParams();
    params.set("item", filter);
    router.replace(`${pathname}?${params}`);
  }
  return (
    <div className="flex space-x-20 cursor-pointer mb-14">
      <Button
        onClick={() => handelfilter("pizza")}
        active={active}
        item={"pizza"}
      >
        Pizza
      </Button>
      <Button
        onClick={() => handelfilter("shawarma")}
        active={active}
        item={"shawarma"}
      >
        Shawarma
      </Button>
      <Button
        onClick={() => handelfilter("burger")}
        active={active}
        item={"burger"}
      >
        Burger
      </Button>
    </div>
  );
}

function Button({ children, onClick, active, item }) {
  return (
    <button
      className={`bg-[#FF9900] px-6 py-[2px] text-[#FFF7EA] text-xl -tracking-tighter transition-all duration-150 ${
        active === item ? "-translate-y-2 shadow-xl bg-black" : ""
      }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Filter;
