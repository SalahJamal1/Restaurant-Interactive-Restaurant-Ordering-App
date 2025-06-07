"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const links = [
  {
    link: "/",
    name: "Home",
  },
  {
    link: "/menu",
    name: "menu",
  },
  {
    link: "/about",
    name: "about",
  },
];
function Navigation() {
  const { Auth, loader } = useSelector((store) => store.user);
  const [ready, setReady] = useState(false);
  const pathname = usePathname();
  useEffect(() => {
    if (Auth === undefined) return;

    if (Auth) {
      setReady(true);
    }
    if (!Auth || !loader) {
      setReady(true);
    }
  }, [Auth, loader]);

  if (!ready) return <Spinner />;

  return (
    <ul className="flex space-x-12 capitalize text-xl text-[#FFF7EA]">
      {links.map((el) => (
        <li
          key={el.name}
          className={`${
            pathname === el.link && "text-[#FF9900] border-b-2 border-[#FF9900]"
          }`}
        >
          <Link href={el.link}>{el.name}</Link>
        </li>
      ))}
      {Auth == undefined || !Auth ? (
        <li>
          <Link href="/login" className={`bg-[#FF9900] px-4 py-2 rounded-md`}>
            Login
          </Link>
        </li>
      ) : (
        <li>
          <Link
            href="/account"
            className={`${
              pathname === "/account" &&
              "text-[#FF9900] border-b-2 border-[#FF9900]"
            }`}
          >
            Account
          </Link>
        </li>
      )}
    </ul>
  );
}

export default Navigation;
