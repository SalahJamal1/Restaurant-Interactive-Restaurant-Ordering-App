import Image from "next/image";
import Link from "next/link";
import logo from "@/public/logo.png";
function Logo() {
  return (
    <div>
      <Link href="/">
        <Image src={logo} className="w-20 h-16" alt="logo" />
      </Link>
      <h2 className="text-[#95713A]  font-bold text-xl">RestoNest</h2>
    </div>
  );
}

export default Logo;
