"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const links = [
  { link: "/", name: "Home" },
  { link: "/menu", name: "menu" },
  { link: "/about", name: "about" },
];

function Navigation() {
  const pathname = usePathname();
  const { Auth, user } = useSelector((store) => store.user);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (user === undefined || user === null) return;
    setLoading(false);
  }, [user]);
  if (loading) return <Spinner />;
  return (
    <ul className="flex space-x-12 capitalize text-xl text-[#FFF7EA]">
      {links.map((el) => (
        <li
          key={el.name}
          className={`${pathname === el.link && "text-[#FF9900]"}`}
        >
          <Link href={el.link}>{el.name}</Link>
        </li>
      ))}

      {!Auth ? (
        <li>
          <Link href="/login" className="bg-[#FF9900] px-4 py-2 rounded-md">
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link
            href="/account"
            className={`${pathname === "/account" && "text-[#FF9900]"}`}
          >
            {/* Account */}
            {user?.firstName}
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
