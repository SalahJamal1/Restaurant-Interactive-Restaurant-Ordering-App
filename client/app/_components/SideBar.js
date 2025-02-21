"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GiRiceCooker } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { logout } from "../login/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../_lib/apiResto";

function SideBar() {
  const dispatch = useDispatch();
  async function handelLogout(e) {
    e.preventDefault();
    const res = await signOut();
    if (res?.data === "success") {
      dispatch(logout());
    }
  }
  return (
    <ul className="border-r border-black h-screen pt-12 pr-12 space-y-8">
      <li>
        <Link
          href="/account"
          className=" capitalize text-xl tracking-widest flex gap-2"
        >
          <CgProfile />
          account
        </Link>
      </li>
      <li>
        <Link
          href="/account/orders"
          className=" capitalize text-xl tracking-widest flex gap-2 "
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
