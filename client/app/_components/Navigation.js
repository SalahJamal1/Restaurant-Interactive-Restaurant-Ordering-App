import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

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
  const { Auth } = useSelector((store) => store.user);
  const pathname = usePathname();

  return (
    <ul className="flex space-x-12 capitalize text-xl text-[#FFF7EA]">
      {links.map((el) => (
        <li
          key={el.name}
          className={`${
            pathname === el.link
              ? " text-[#FF9900] border-b-2 border-[#FF9900]"
              : ""
          }`}
        >
          <Link href={el.link}>{el.name}</Link>
        </li>
      ))}
      <li>
        <Link
          href={Auth ? "/account" : "/login"}
          className="bg-[#FF9900] px-4 py-2 rounded-md"
        >
          {Auth ? "Account" : "Login"}
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
