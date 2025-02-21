import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSelector } from "react-redux";

function Navigation() {
  const { user, Auth } = useSelector((store) => store.user);
  const pathname = usePathname();

  return (
    <ul className="flex space-x-12 capitalize text-xl text-[#FFF7EA]">
      <li>
        <Link href="/">Home</Link>
      </li>
      <li>
        <Link href="/menu">menu</Link>
      </li>
      <li>
        <Link href="/about">about</Link>
      </li>
      <li>
        <Link
          href={Auth ? `/account` : "/login"}
          className={`${Auth ? "" : "bg-[#FF9900] px-4 py-2 rounded-md"}`}
        >
          {Auth ? `${user?.firstName}` : "Login"}
        </Link>
      </li>
    </ul>
  );
}

export default Navigation;
