"use client";
import Link from "next/link";
import { CgProfile } from "react-icons/cg";
import { GiRiceCooker } from "react-icons/gi";
import { CiLogout } from "react-icons/ci";
import { logout } from "../_store/userSlice";
import { useDispatch } from "react-redux";
import { signOut } from "../_lib/apiResto";
import toast from "react-hot-toast";
import { usePathname } from "next/navigation";

function SideBar() {
  const pathname = usePathname();
  const dispatch = useDispatch();
  async function handelLogout(e) {
    e.preventDefault();
    const res = await signOut();
    if (res?.data === "success") {
      toast.success("Logout Successfully");
      dispatch(logout());
    }
  }
  return (
    <ul className="border-r border-black pt-12 pr-12 space-y-8 h-[82vh]">
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
