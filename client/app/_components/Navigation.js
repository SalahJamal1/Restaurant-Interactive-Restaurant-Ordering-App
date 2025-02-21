import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

const links = [
  {
    link: "/",
    name: "Home",
    active: false,
  },
  {
    link: "/menu",
    name: "menu",
    active: false,
  },
  {
    link: "/about",
    name: "about",
    active: false,
  },
  {
    link: "/account",
    name: "account",
    active: true,
  },
  {
    link: "/login",
    name: "login",
    active: false,
  },
];
function Navigation() {
  const { Auth } = useSelector((store) => store.user);
  const pathname = usePathname();

  return (
    <ul className="flex space-x-12 capitalize text-xl text-[#FFF7EA]">
      {links.map((el) => (
        <li
          key={el.name}
          className={`${
            pathname === el.link ? " text-[#FF9900] border-b" : ""
          }`}
        >
          <Link href={el.link}>{el.name}</Link>
        </li>
      ))}
      <li>
        <Link
          href={Auth ? `/account` : "/login"}
          className={`${Auth ? "" : "bg-[#FF9900] px-4 py-2 rounded-md"}`}
        >
          {Auth ? "Account" : "Login"}
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
