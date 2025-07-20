"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const links = [
  { link: "/", name: "Home" },
  { link: "/menu", name: "menu" },
  { link: "/about", name: "about" },
];

function Navigation() {
  const pathname = usePathname();
  const { Auth } = useSelector((store) => store.user);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

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
