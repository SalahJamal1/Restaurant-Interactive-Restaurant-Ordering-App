"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GiRiceCooker } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { Loader, logout } from "../_components/account/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../_lib/apiAuth";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

function SideBar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  async function handelLogout(e) {
    e.preventDefault();
    dispatch(Loader());
    await signOut();
    localStorage.removeItem("jwt");
    toast.success("Logout Successfully");
    dispatch(logout());
  }
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <ul className="border-r flex flex-col items-center  pt-44 border-black space-y-8 fixed top-0 left-0 h-full w-[20rem]">
      <li>
        <Link
          href="/account"
          className={`capitalize text-xl tracking-widest flex gap-2 pb-1 ${
            pathname === "/account" && "border-b-2 border-[#FF9900]"
          }`}
        >
          <CgProfile />
          account
        </Link>
      </li>
      <li>
        <Link
          href="/account/orders"
          className={`capitalize text-xl tracking-widest flex gap-2 pb-1 ${
            pathname === "/account/orders" && "border-b-2 border-[#FF9900]"
          }`}
        >
          <GiRiceCooker />
          orders
        </Link>
      </li>
      <li>
        <button
          onClick={handelLogout}
          className=" capitalize text-xl tracking-widest flex gap-2"
        >
          <CiLogout />
          logout
        </button>
      </li>
    </ul>
  );
}

export default SideBar;
